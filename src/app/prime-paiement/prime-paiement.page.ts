import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils/utils.service';
import { ContractsService } from '../services/contracts/contracts.service';
import { StorageService } from '../services/storage/storage.service';
import { DevisService } from '../services/devis/devis.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prime-paiement',
  templateUrl: './prime-paiement.page.html',
  styleUrls: ['./prime-paiement.page.scss'],
})
export class PrimePaiementPage implements OnInit {

  public num_contrat: any;
  public myDate: any;
  public contract: any;
  public paymean: any;
  public paying_amount = 0;
  public integrateurs: any;
  public periods = 1;
  constructor(private utilsService: UtilsService, private router: Router, private activatedRoute: ActivatedRoute, private contractsService: ContractsService, private storageService: StorageService) {
    this.num_contrat = this.activatedRoute.snapshot.paramMap.get('contract_num');
    this.loadContract();
  }

  ngOnInit() {
    this.myDate = new Date;
  }

  async loadContract() {
    this.contract = await this.contractsService.loadContract(this.num_contrat);
    this.paying_amount = this.contract.contract_infos.paiments;
    this.loadIntegrateurs();
  }

  async loadIntegrateurs() {
    this.integrateurs = await this.contractsService.loadIntegratorInfos();
    console.log(this.integrateurs);
  }

  async momoPay(form) {
    let infos = form.form.value;
    if(infos.periode <= 0) {
      infos.periode = this.periods;
    }
    let res = await this.contractsService.sendPaymentOrRenewInfos(infos, infos.montant, this.num_contrat, false);
    if(res===true) {
      this.router.navigate(['/prime-history/'+this.num_contrat]);
    }
  }

  getKeys(json_object) {
    return Object.keys(json_object);
  }

  getOperator(event) {
    this.paymean = event.detail.value;
  }

  getPeriods(event) {
    let period = event.detail.value
    if(period && period > 0) {
      this.paying_amount = this.contract.contract_infos.paiments * event.detail.value;
    }else{
      this.paying_amount = this.contract.contract_infos.paiments;
      this.periods = 1;
    }
  }

}
