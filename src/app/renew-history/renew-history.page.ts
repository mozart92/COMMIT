import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '../services/contracts/contracts.service';
import { Router } from '@angular/router';
import Config  from '../configs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../services/utils/utils.service';

@Component({
  selector: 'app-renew-history',
  templateUrl: './renew-history.page.html',
  styleUrls: ['./renew-history.page.scss'],
})
export class RenewHistoryPage implements OnInit {

  public contractId: any;
  public contract: any;
  public history: any;
  public icones = Config.icones;
  constructor(private translateService: TranslateService, public router: Router, public utilsService: UtilsService, public actionSheetController: ActionSheetController, public activatedRoute: ActivatedRoute, public contractsService: ContractsService) { 
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
    this.history = await this.contractsService.loadPaymentOrRenewalHistory('1', this.contract.contract_infos.num_contrat);
  }

  async payPrime(num_contrat) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Quel type de renouvellement souhaitez-vous?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Renouvellement à l\'identique',
        role: 'destructive',
        icon: 'phone-portrait-outline',
        handler: async () => {
          this.router.navigate(['renew-paiement/' + num_contrat]);
        }
      },{
        text: 'Renouvellement avec modification',
        role: 'destructive',
        icon: 'card-outline',
        handler: async () => {
          let mess = "Veuillez dans une de nos agences pour le traitement de votre demande ou alors effectuez un devis sur le produit concerné en pr´cisant vos préférences."
          const toast = await this.utilsService.createToaster('Echec!', mess);
          toast.present();
        }
      },{
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
