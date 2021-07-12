import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { UtilsService } from '../services/utils/utils.service';
import { InfosService } from '../services/infos/infos.service';
import { StorageService } from '../services/storage/storage.service';
import { DevisService } from '../services/devis/devis.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.page.html',
  styleUrls: ['./stripe-payment.page.scss'],
})
export class StripePaymentPage implements OnInit {

  public devis_result: any;
  public amount: any;
  public myDate: any;
  public devise: any;
  public devis_id: any;
  constructor(private stripe: Stripe,private utilsService: UtilsService, private activatedRoute: ActivatedRoute, private devisService: DevisService, private storageService: StorageService) {
    this.amount = this.activatedRoute.snapshot.paramMap.get('montant');
    this.devise = this.activatedRoute.snapshot.paramMap.get('devise');
    this.devis_id = this.activatedRoute.snapshot.paramMap.get('devis_id');
    this.getResults();
    console.log(new Date);
  }

  ngOnInit() {
    this.myDate = new Date;
  }

  async stripePay(form) {
    const loader = await this.utilsService.createLoader('Un instant, nous procédons au paiement...');
    loader.present();

    let infos = form.form.value;
    let public_key = this.devis_result.integrateur_carte.public_key;

    let exp_date = new Date(infos.exp_date);
    let exp_month = exp_date.getUTCMonth() + 1;
    let exp_year =  exp_date.getFullYear();

    this.stripe.setPublishableKey(public_key);

   let cardDetails = {
      number: infos.numero,
      expMonth: exp_month,
      expYear: exp_year,
      cvc: infos.cvc
    }

    this.stripe.createCardToken(cardDetails)
      .then(async token => {
        loader.dismiss();
        console.log(token);
        await this.devisService.sendPaymenttoken(token.id, this.amount, this.devis_id);
      })
      .catch(async error => {
        const toast = await this.utilsService.createToaster('Echec!', error);
        toast.present();
        loader.dismiss();
        console.error(error)
      });
  }

  async getResults() {
    this.devis_result = await this.storageService.getObject('cotation_result');
    console.log(this.devis_result);
  }

}
