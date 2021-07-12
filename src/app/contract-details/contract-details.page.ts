import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '../services/contracts/contracts.service';
import Config  from '../configs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.page.html',
  styleUrls: ['./contract-details.page.scss'],
})
export class ContractDetailsPage implements OnInit {
  public contentTitle = 'Garanties';
  public contractId: any;
  public contract: any;
  public icones = Config.icones;

  constructor(private activatedRoute: ActivatedRoute, public translateService: TranslateService, private contractsService: ContractsService) {
    this.contractId = this.activatedRoute.snapshot.paramMap.get('contractId');
    this.loadContract();
   }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.contentTitle = ev.detail.value;
    console.log('Segment changed', ev);
  }

  async loadContract() {
    this.contract = await this.contractsService.loadContract(this.contractId);
  }

  getKeys(jsonObject) {
    return Object.values(jsonObject);
  }

  async askPaiementState() {
    this.contractsService.requestPaiementState(this.contractId);
  }

}
