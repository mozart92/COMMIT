import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { ActionSheetController } from '@ionic/angular';
import { DevisService } from '../services/devis/devis.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UtilsService } from '../services/utils/utils.service';
import { InfosService } from '../services/infos/infos.service';
import { Router } from '@angular/router';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser/ngx';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-devis-result',
  templateUrl: './devis-result.page.html',
  styleUrls: ['./devis-result.page.scss'],
})
export class DevisResultPage implements OnInit {

  public devis_result: any;
  public repeat_times: any;
  public repeat_form: any;
  public assurable: boolean = true;
  public devis_rewind: any;
  public positive_answers = [];
  constructor(public storageService: StorageService, private translateService: TranslateService, public actionSheetController: ActionSheetController, public devisService: DevisService, public iab: InAppBrowser, public utilsService: UtilsService, private router: Router, public infosService: InfosService, private themeableBrowser: ThemeableBrowser) {
    this.getResults();
   }

  ngOnInit() {
  }

  async getResults() {
    this.devis_result = await this.storageService.getObject('cotation_result');
    this.repeat_form = this.devis_result.nombre_assures;
    console.log(this.devis_result);
    this.devis_rewind = JSON.parse(this.devis_result.devis.info_devis);
    console.log(Object.keys(this.devis_rewind));
  }

  async paiement(amount, form) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Moyen de paiement',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Payer avec Mobile Money',
        role: 'destructive',
        icon: 'phone-portrait-outline',
        handler: async () => {
          console.log(Object.keys(form.form.value).length === 0);

          if(Object.keys(form.form.value).length > 0) {
            form.form.value.amount = amount;
            let save_sub = await this.devisService.saveSouscription(form.form.value, this.devis_result.devis.id, this.repeat_form);
            if(save_sub) {
              this.router.navigate(['afrikpay/' + amount +'/' + this.devis_result.devise +'/' + this.devis_result.devis.code]);
              // let paymentUrl = await this.devisService.getPaymentWidget(amount, this.devis_result.integrateur_momo.nom,
              //   this.devis_result.devis.id, this.devis_result.integrateur_momo.service_key, this.devis_result.integrateur_momo.logo, this.devis_result.devise);
              // await this.openWidget(paymentUrl);
            }
          }else{
            
            let save_sub = await this.devisService.updateDevis(this.devis_result.devis.id, amount);
            if (save_sub) {
              this.router.navigate(['afrikpay/' + amount +'/' + this.devis_result.devise +'/' + this.devis_result.devis.code]);
            }
            // let paymentUrl = await this.devisService.getPaymentWidget(amount, this.devis_result.integrateur_momo.nom,
            //   this.devis_result.devis.id, this.devis_result.integrateur_momo.service_key, this.devis_result.integrateur_momo.logo, this.devis_result.devise);
            // await this.openWidget(paymentUrl);
          }
         
        }
      }, {
        text: 'Payer par carte bancaire',
        role: 'destructive',
        icon: 'card-outline',
        handler: async () => {
          console.log('Share clicked');
          if(Object.keys(form.form.value).length > 0) {
            form.form.value.amount = amount;
            let save_sub = await this.devisService.saveSouscription(form.form.value, this.devis_result.devis.id, this.repeat_form);
            if(save_sub) {
              this.router.navigate(['stripe-payment/' + amount +'/' + this.devis_result.devise +'/' + this.devis_result.devis.id]);
            }
          }else{
            let save_sub = await this.devisService.updateDevis(this.devis_result.devis.id, amount);
            if(save_sub) {
              this.router.navigate(['stripe-payment/' + amount +'/' + this.devis_result.devise +'/' + this.devis_result.devis.id]);
            }
          }
        }
      },{
        text: 'Payer en agence',
        role: 'destructive',
        icon: 'home-outline',
        handler: async () => {
          console.log(Object.keys(form.form.value).length === 0);

          if(Object.keys(form.form.value).length > 0) {
            form.form.value.moyen_paiement = 'agence';
            form.form.value.amount = amount;
            let save_sub = await this.devisService.saveSouscription(form.form.value, this.devis_result.devis.id, this.repeat_form);
            if(save_sub) {
              this.router.navigate(['product-devis/']);
            }
          }else{
            let save_sub = await this.devisService.updateDevis(this.devis_result.devis.id, amount, 'agence');
            if(save_sub) {
              this.router.navigate(['product-devis/']);
            }
          }
         
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

  async openWidget(url) {
    const options: ThemeableBrowserOptions = {
      statusbar: {
          color: '#ffffffff'
      },
      toolbar: {
          height: 0,
          color: '#ffffffff',
          image: '../../assets/pattern.jpg'
      },
      title: {
          color: '#f4f5f8',
          staticText: 'RUBY'
      },
      closeButton: {
          image: '../../assets/close-icon.png',
          imagePressed: '../../assets/close-icon.png',
          align: 'right',
          event: 'closePressed'
      },
      backButtonCanClose: true
    };

    const browser: ThemeableBrowserObject = this.themeableBrowser.create(url, '_blank', options);
    browser.on('exit').subscribe(event => {
      this.router.navigate(['/home']);
    });
    
  //   const browser = this.iab.create(url);
  //   browser.on('exit').subscribe(event => {
  //     this.showMessage();
  //  });
  }

  async showMessage() {
    let produit = await this.infosService.findProduit(this.devis_result.devis.produit_id);
    const toast = await this.utilsService.createToaster('Succès!', 'Merci d\'avoir souscris au produit '+produit.nom+' de Avtiva. Vous allez recevoir une notification et un agent entrera en contact avec vous dans les plus brefs délais pour les détails de votre contrat.');
    toast.present();
    this.router.navigate(['/home']);
  }

  download() {
    
  }

  splitString(texte) {
    return texte.split(',');
  }

  repeatFields(event) {
    let limit = parseInt(event.detail.value);
    let arr = [];
    for(let i=0; i<limit; i++) {
      arr.push(i)
    }
    this.repeat_times = arr;
  }

  listof(time_number) {
    let limit = parseInt(time_number);
    let arr = [];
    for(let i=0; i<limit; i++) {
      arr.push(i)
    }
    return arr;
  }

  async checkAnswer(event) {
    if(event.detail.value === 'Oui') {
      this.positive_answers.push('Oui');
      let mess = "Compte tenu des réponse fournies, il ne sera pas possible de terminer la souscription en ligne. Bien vouloir vous rapprocher d'un point de vente Activa pour plus d'informations."
      const toast = await this.utilsService.createToaster('Désolé!', mess);
      toast.present();
    }else{
      this.positive_answers.length > 0 ? this.positive_answers.pop() : console.log("nothing to pop");
    }
    this.assurable = this.positive_answers.length === 0 ? true : false;
  }

  getkeys(json_object) {
    return Object.keys(json_object);
  }

}
