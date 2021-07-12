import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '../services/contracts/contracts.service';
import Config  from '../configs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contract-menu',
  templateUrl: './contract-menu.page.html',
  styleUrls: ['./contract-menu.page.scss'],
})
export class ContractMenuPage implements OnInit {
  public contractId: any;
  public contract: any;
  public icones = Config.icones;
  constructor(private activatedRoute: ActivatedRoute,  private translateService: TranslateService, private contractsService: ContractsService) { 
    
    this.contractId = this.activatedRoute.snapshot.paramMap.get('contractId');
    this.loadContract();
  }

  ngOnInit() {
    this.contractId = this.activatedRoute.snapshot.paramMap.get('contractId');
    console.log(this.contractId);
  }

  async loadContract() {
    this.contract = await this.contractsService.loadContract(this.contractId);
  }

}
