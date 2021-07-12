import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '../services/contracts/contracts.service';
import { PopoverController } from '@ionic/angular';
import { AvenantDetailsComponent } from '../components/avenant-details/avenant-details/avenant-details.component';
import Config  from '../configs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-all-contract-update',
  templateUrl: './all-contract-update.page.html',
  styleUrls: ['./all-contract-update.page.scss'],
})
export class AllContractUpdatePage implements OnInit {
  public contractId: any;
  public contract: any;
  public avenants: any;
  public icones = Config.icones;
  constructor(public popoverController: PopoverController, private translateService: TranslateService, private activatedRoute: ActivatedRoute, private contractsService: ContractsService) { 
    this.contractId = this.activatedRoute.snapshot.paramMap.get('contractId');
    this.loadContract();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadContract();
    })
  }

  ngOnInit() {
  }

  async loadContract() {
    this.contract = await this.contractsService.loadContract(this.contractId);
    if (this.contract) {
      this.loadAvenants();
    }
  }

  async loadAvenants() {
    this.avenants = await this.contractsService.loadAvenants(this.contract.contract_infos.id, this.contract.type);
  }

  async loadDetails(avenant) {
      const popover = await this.popoverController.create({
        component: AvenantDetailsComponent,
        componentProps: {
          "avenant": avenant
        },
        cssClass: 'my-custom-class',
        translucent: true,
        backdropDismiss: false
      }); 
  
      return await popover.present();
  }
}
