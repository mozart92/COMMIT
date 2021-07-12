import { Component, OnInit } from '@angular/core';
import { ChooseContractComponent } from '../components/choose-contract/choose-contract/choose-contract.component';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ContractsService } from '../services/contracts/contracts.service';
import { SinistreService } from '../services/sinistre/sinistre.service';
import Config  from '../configs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-all-sinistres',
  templateUrl: './all-sinistres.page.html',
  styleUrls: ['./all-sinistres.page.scss'],
})
export class AllSinistresPage implements OnInit {
  public sinistres: any;
  public icones = Config.icones;
  public sinister_icone = {};
  constructor(public router: Router, private translateService: TranslateService, public popoverController: PopoverController, public contractService: ContractsService, public sinistreService: SinistreService) { 
    this.loadSinistres();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadSinistres();
    })
  }

  ngOnInit() {
  }

  async loadSinistres() {
    this.sinistres = await this.sinistreService.loadAllSinistres();
    this.getIconForSinistres();
  }

  async presentPopover() {
    let sinisContracts = await this.contractService.loadSinistrableContracts();
    const popover = await this.popoverController.create({
      component: ChooseContractComponent,
      componentProps: {
        "contracts": sinisContracts
      },
      cssClass: 'contact-popover',
      translucent: true
    }); 

    popover.onDidDismiss().then((datas) => {
      console.log(datas.data);
      if (datas.data) {
        this.router.navigate(['/declaration-sinistre/' + datas.data]);
      }
    });

    return await popover.present();
  }

  async getIconForSinistres(){
    console.log(this.sinistres);
    for(let sinistre of this.sinistres.non_vie) {
      let num_contrat = sinistre.contrat_non_vie.num_contrat;
      let type =  await this.contractService.getTypeContrat(num_contrat);
      this.sinister_icone[num_contrat] = this.icones[type];
    }
    
    for(let sinistre of this.sinistres.vie) {
      let num_contrat = sinistre.contrat_vie.num_contrat;
      let type =  await this.contractService.getTypeContrat(num_contrat);
      this.sinister_icone[num_contrat] = this.icones[type];
    }
  }

}
