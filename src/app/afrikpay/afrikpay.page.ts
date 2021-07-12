import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils/utils.service';
import { InfosService } from '../services/infos/infos.service';
import { StorageService } from '../services/storage/storage.service';
import { DevisService } from '../services/devis/devis.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-afrikpay',
  templateUrl: './afrikpay.page.html',
  styleUrls: ['./afrikpay.page.scss'],
})
export class AfrikpayPage implements OnInit {

  public devis_result: any;
  public amount: any;
  public myDate: any;
  public devise: any;
  public devis_code: any;
  public paymean: any;
  constructor(private utilsService: UtilsService, private activatedRoute: ActivatedRoute, private devisService: DevisService, private storageService: StorageService) {
    this.amount = this.activatedRoute.snapshot.paramMap.get('montant');
    this.devise = this.activatedRoute.snapshot.paramMap.get('devise');
    this.devis_code = this.activatedRoute.snapshot.paramMap.get('devis_code');
    this.getResults();
    console.log(new Date);
  }

  ngOnInit() {
    this.myDate = new Date;
  }

  async momoPay(form) {
    let infos = form.form.value;
    await this.devisService.sendPaymentInfos(infos, this.amount, this.devis_code);
  }

  async getResults() {
    this.devis_result = await this.storageService.getObject('cotation_result');
    console.log(this.devis_result);
  }

  getKeys(json_object) {
    return Object.keys(json_object);
  }

  getOperator(event) {
    this.paymean = event.detail.value;
  }

}
