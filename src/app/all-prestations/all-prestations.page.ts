import { Component, OnInit } from '@angular/core';
import { ChooseContractComponent } from '../components/choose-contract/choose-contract/choose-contract.component';
import { PrestationComponent } from '../components/prestations/prestation/prestation.component';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ContractsService } from '../services/contracts/contracts.service';
import { PrestationService } from '../services/prestation/prestation.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-all-prestations',
  templateUrl: './all-prestations.page.html',
  styleUrls: ['./all-prestations.page.scss'],
})
export class AllPrestationsPage implements OnInit {
  public prestations: any;
  constructor(public router: Router, public popoverController: PopoverController, private translateService: TranslateService, public contractService: ContractsService, public prestationService: PrestationService) { 
    this.loadSinistres();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadSinistres();
    })
  }

  ngOnInit() {
  }

  async loadSinistres() {
    this.prestations = await this.prestationService.loadAllPrestations();
  }

  async presentPopover() {
    let sinisContracts = await this.contractService.loadPrestableContracts();
    const popover = await this.popoverController.create({
      component: ChooseContractComponent,
      componentProps: {
        "contracts": sinisContracts
      },
      cssClass: 'my-custom-class',
      translucent: true
    }); 

    popover.onDidDismiss().then((datas) => {
      console.log(datas.data);
      if (datas.data) {
        this.router.navigate(['/request-prestations/' + datas.data]);
      }
    });

    return await popover.present();
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
