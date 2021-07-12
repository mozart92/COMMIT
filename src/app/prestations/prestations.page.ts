import { Component, OnInit } from '@angular/core';
import { PrestationService } from '../services/prestation/prestation.service';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '../services/contracts/contracts.service';
import { PrestationComponent } from '../components/prestations/prestation/prestation.component';
import { PopoverController } from '@ionic/angular';
import Config  from '../configs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-prestations',
  templateUrl: './prestations.page.html',
  styleUrls: ['./prestations.page.scss'],
})
export class PrestationsPage implements OnInit {
  public contractId: any;
  public contract: any;
  public prestations: any;
  public icones = Config.icones;
  constructor(public prestationService: PrestationService, private translateService: TranslateService, public popoverController: PopoverController, public activatedRoute: ActivatedRoute, public contractsService: ContractsService) {
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
    this.prestations = await this.prestationService.loadPrestations(this.contract.contract_infos.id);
  }

  async showDetails(prestation) {
    const popover = await this.popoverController.create({
      component: PrestationComponent,
      componentProps: {
        "prestation": prestation
      },
      cssClass: 'my-custom-class',
      translucent: true
    }); 

    return await popover.present();
  }


}
