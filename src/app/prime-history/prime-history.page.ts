import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '../services/contracts/contracts.service';
import Config  from '../configs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-prime-history',
  templateUrl: './prime-history.page.html',
  styleUrls: ['./prime-history.page.scss'],
})
export class PrimeHistoryPage implements OnInit {

  public contractId: any;
  public contract: any;
  public history: any;
  public icones = Config.icones;
  constructor(private translateService: TranslateService, public activatedRoute: ActivatedRoute, public contractsService: ContractsService) { 
    this.contractId = this.activatedRoute.snapshot.paramMap.get('contract_num');
    this.loadContract();
  }

  ngOnInit() {
  }

  async loadContract() {
    this.contract = await this.contractsService.loadContract(this.contractId);
    if(this.contract) {
      this.LoadHistory();
    }
  }

  async LoadHistory() {
    this.history = await this.contractsService.loadPaymentOrRenewalHistory('0', this.contract.contract_infos.num_contrat);
    console.log(this.history);
  }

}
