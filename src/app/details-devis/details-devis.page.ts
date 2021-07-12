import { Component, OnInit } from '@angular/core';
import { DevisService } from '../services/devis/devis.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';
import { UtilsService } from '../services/utils/utils.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-details-devis',
  templateUrl: './details-devis.page.html',
  styleUrls: ['./details-devis.page.scss'],
})
export class DetailsDevisPage implements OnInit {

  public devis_id: any;
  public devis: any;
  public devis_recap: any;
  public offer: any;
  public subs_form: any;
  public repeat_form: any;
  public assurable: boolean = true;
  constructor(public activatedRoute: ActivatedRoute,  private translateService: TranslateService, public devisService: DevisService, private router: Router, public actionSheetController: ActionSheetController, public iab: InAppBrowser, private themeableBrowser: ThemeableBrowser, public utilsService: UtilsService) { 
    let devis_id = this.activatedRoute.snapshot.paramMap.get('id_devis');
    this.getDevis(devis_id);
    console.log(this.devis);
  }

  ngOnInit() {
  }

  async getDevis(devis_id) {
    this.devis = await this.devisService.findDevis(devis_id);
    this.devis_recap = JSON.parse(this.devis.details_devis);
    console.log(this.devis);
  }

  getKeys(json_elt) {
    return Object.keys(json_elt);
  }

  async chooseAnswer(event) {
    this.offer = event.detail.value;
    if(this.offer === 'Offre acceptée'){
      this.subs_form = await this.devisService.getSouscripForm(this.devis.id);
      this.repeat_form = this.subs_form.nombre_assures;
    }else{
      this.subs_form = null;
    }
  }

  splitString(texte) {
    return texte.split(',');
  }

  async respondOffer(form) {
    if(this.offer === 'Offre refusée'){
      await this.devisService.rejectDevis(this.devis.id, form.form.value);
    }else{

      const actionSheet = await this.actionSheetController.create({
        header: 'Moyen de paiement',
        cssClass: 'my-custom-class',
        buttons: [{
          text: 'Payer avec Mobile Money',
          role: 'destructive',
          icon: 'phone-portrait-outline',
          handler: async () => {
            console.log(Object.keys(form.form.value).length === 0);
  
            if(Object.keys(form.form.value).length > 0) {
              let save_sub = await this.devisService.saveSouscription(form.form.value, this.devis.id, this.repeat_form);
              if(save_sub) {
                this.router.navigate(['afrikpay/' + this.devis.prime +'/' + this.devis.devise +'/' + this.devis.code_devis]);
                // let paymentUrl = await this.devisService.getPaymentWidget(this.devis.prime, this.subs_form.integrateur_momo.nom,
                //   this.devis.id, this.subs_form.integrateur_momo.service_key, this.subs_form.integrateur_momo.logo, this.devis.devise);
                // await this.openWidget(paymentUrl);
              }
            }else{
              this.router.navigate(['afrikpay/' + this.devis.prime +'/' + this.devis.devise +'/' + this.devis.code_devis]);
              // let paymentUrl = await this.devisService.getPaymentWidget(this.devis.prime, this.subs_form.integrateur_momo.nom,
              //   this.devis.id, this.subs_form.integrateur_momo.service_key, this.subs_form.integrateur_momo.logo, this.devis.devise);
              // await this.openWidget(paymentUrl);
            }
           
          }
        }, {
          text: 'Payer par carte bancaire',
          role: 'destructive',
          icon: 'card-outline',
          handler: async () => {
            console.log('Share clicked');
            if(Object.keys(form.form.value).length > 0) {
              let save_sub = await this.devisService.saveSouscription(form.form.value, this.devis.id, this.repeat_form);
              if(save_sub) {
                this.router.navigate(['stripe-payment/' + this.devis.prime +'/' + this.devis.devise +'/' + this.devis.id]);
              }
            }else{
              this.router.navigate(['stripe-payment/' + this.devis.prime +'/' + this.devis.devise +'/' + this.devis.id]);
            }
          }
        },{
          text: 'Payer en agence',
          role: 'destructive',
          icon: 'home-outline',
          handler: async () => {
            console.log(Object.keys(form.form.value).length === 0);
  
            if(Object.keys(form.form.value).length > 0) {
              form.form.value.moyen_paiement = 'agence';
              let save_sub = await this.devisService.saveSouscription(form.form.value, this.devis.id, this.repeat_form);
              if(save_sub) {
                this.router.navigate(['all-devis/']);
              }
            }else{
              let save_sub = await this.devisService.updateDevis(this.devis.id, null, 'agence');
              if(save_sub) {
                this.router.navigate(['all-devis/']);
              }
            }
           
          }
        },{
          text: 'Annuler',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();

    }
  }

  async openWidget(url) {
    const options: ThemeableBrowserOptions = {
      statusbar: {
          color: '#ffffffff'
      },
      toolbar: {
          height: 0,
          color: '#ffffffff',
          image: '../../assets/pattern.jpg'
      },
      title: {
          color: '#f4f5f8',
          staticText: 'RUBY'
      },
      closeButton: {
          image: '../../assets/close-icon.png',
          imagePressed: '../../assets/close-icon.png',
          align: 'right',
          event: 'closePressed'
      },
      backButtonCanClose: true
    };

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
    browser.on('exit').subscribe(event => {
      this.router.navigate(['/product-devis']);
    });
    
  }

  listof(time_number) {
    let limit = parseInt(time_number);
    let arr = [];
    for(let i=0; i<limit; i++) {
      arr.push(i)
    }
    return arr;
  }

  async checkAnswer(event) {
    if(event.detail.value === 'Oui') {
      this.assurable = false;
      let mess = "Compte tenu des réponse fournies, il ne sera pas possible de terminer la souscription en ligne. Bien vouloir vous rapprocher d'un point de vente Activa pour plus d'informations."
      const toast = await this.utilsService.createToaster('Désolé!', mess);
      toast.present();
    }else{
      this.assurable = true;
    }
  }

  getkeys(json_object) {
    return Object.keys(json_object);
  }

}
