import { Component, OnInit } from '@angular/core';
import { SinistreService } from '../services/sinistre/sinistre.service';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '../services/contracts/contracts.service';
import Config  from '../configs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sinistres',
  templateUrl: './sinistres.page.html',
  styleUrls: ['./sinistres.page.scss'],
})
export class SinistresPage implements OnInit {
  public contractId: any;
  public contract: any;
  public sinistres: any;
  public icones = Config.icones;
  constructor(public sinistreService: SinistreService, private translateService: TranslateService, public activatedRoute: ActivatedRoute, public contractsService: ContractsService) { 
    this.contractId = this.activatedRoute.snapshot.paramMap.get('contractId');
    this.loadContract();
  }

  ngOnInit() {
  }

  async loadContract() {
    this.contract = await this.contractsService.loadContract(this.contractId);
    if(this.contract) {
      this.loadSinistres();
    }
  }

  async loadSinistres() {
    this.sinistres = await this.sinistreService.loadSinistres(this.contract.contract_infos.id, this.contract.type);
  }

}
