import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AvenantPopoverComponent } from '../components/avenant-popover/avenant-popover/avenant-popover.component';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '../services/contracts/contracts.service';
import Config  from '../configs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contract-update',
  templateUrl: './contract-update.page.html',
  styleUrls: ['./contract-update.page.scss'],
})
export class ContractUpdatePage implements OnInit {
  public formFields: any = [];
  public contractId: any;
  public contract: any;
  public garanties: any;
  public icones = Config.icones;
  public todays = new Date().toISOString();
  public options: any = [];
  public choosenOption = null;
  constructor(public popoverController: PopoverController, private translateService: TranslateService, private activatedRoute: ActivatedRoute, private contractsService: ContractsService) {
    this.contractId = this.activatedRoute.snapshot.paramMap.get('contractId');
    this.loadContract();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadContract();
    })
   }

  ngOnInit() {
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: AvenantPopoverComponent,
      componentProps: {
        "contract": this.contract
      },
      cssClass: 'my-custom-class',
      translucent: true,
      backdropDismiss: false
    }); 

    popover.onDidDismiss().then((datas) => {
      this.formFields = datas.data
      console.log(datas.data);
    });

    return await popover.present();
  }

  async loadContract() {
    this.contract = await this.contractsService.loadContract(this.contractId);
    console.log(this.contract);
    this.presentPopover();
    this.loadGaranties();
    this.loadTarifOptions();
  }

  async loadGaranties() {
    this.garanties = await this.contractsService.loadGaranties(this.contract.contract_infos.type_contrat.id);
  }

  async loadTarifOptions() {
    this.options = await this.contractsService.loadOptionTarif(this.contract.contract_infos.type_contrat.code);
    console.log(this.options);
  }

  async updateContract(form) {
    console.log(form.form.value);
    const res = await this.contractsService.recordContractUpdate(this.contract.contract_infos.id, this.contract.type, form.form.value);
  }

  loadOptions(event) {
    let id_option = event.detail.value;
    console.log(id_option);
    for(let option of this.options) {
      if(option.id.toString() === id_option) {
        this.choosenOption = option;
        break;
      }
    }
  }

}
