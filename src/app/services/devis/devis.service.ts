import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import Config  from '../../configs';
import { UtilsService } from '../utils/utils.service';
import { StorageService } from '../storage/storage.service';
import { InfosService } from '../infos/infos.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DevisService {

  private devisFormUrl = "/devis/get-formulaire";
  private submitDevisUrl = "/devis/post-devis";
  private suscribeUrl = "/devis/post-souscription";
  private stripePaymentUrl = "/devis/post-devis-stripe"
  private integratorPaiementUrl = {
    "Monetbil": "https://api.monetbil.com/widget/v2.1/",
    "Afrikpay": "/paiement/afrikpay-placepayment"
  };
  private allDevisUrl = "/devis/getmesdevis";
  private subsFormUrl = "/devis/get-formulaire-souscription-paie";
  private rejetDevisUrl = "/devis/put-rejet-devis";
  private updateDevisUrl = "/devis/save-montant-agence";

  constructor(public http: HTTP, public utilsService: UtilsService, public storageService: StorageService, private router: Router, public translateService: TranslateService) { 

  }

  public async getDevisForm(product_id, type_user) {
    const loader = await this.utilsService.createLoader('Un instant, préparons votre devis...');
    loader.present();
    const pays = await this.storageService.getObject('user_country');

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "lang": this.translateService.currentLang
      // "Authorization": 'Bearer ' + user.apiToken
    };

    let params = {
      produit_id: product_id.toString(),
      pays_id: pays.id.toString(),
      type_user: type_user
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.devisFormUrl, params, headers);
      let devisForm = JSON.parse(res.data).data;
      loader.dismiss();
      console.log(JSON.parse(res.data).data);
      return devisForm;

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      // let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      // const toast = await this.utilsService.createToaster('Echec!', mess);
      // toast.present();
      console.log(error);

    }
    
  }

  public async estimate(formData, product_id, type_user, textFormData) {
    const loader = await this.utilsService.createLoader('Un instant, nous vérifions vos informations...');
    loader.present();
    const pays = await this.storageService.getObject('user_country');

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "lang": this.translateService.currentLang
    };

    formData.produit_id = product_id;
    formData.pays_id = pays.id.toString();
    formData.type_user = type_user;
    formData.text_form_fields = textFormData;

    if(type_user === 'client') {
      let user = await this.storageService.getObject('user');
      formData.client_id = user.infos.client_id.toString()
    }

    try {

      const res = await this.http.post(Config.endPoint + this.submitDevisUrl, formData, headers);
      let datas = JSON.parse(res.data);

      if (datas.data.cotation) {
        this.storageService.setObject('cotation_result', datas.data);
        const toast = await this.utilsService.createToaster('Succès!', 'Voici le résultat de votre devis.');
        toast.present();
        this.router.navigate(['/devis-result']);
      }else{
        this.storageService.setObject('cotation_result', datas.data);
        const toast = await this.utilsService.createToaster('Succès!', 'Votre demande de devis a bien été enregistrée. Un agent vous répondra dans les plus brefs délais.');
        toast.present();
        this.router.navigate(['/product-devis']);
      }

      loader.dismiss();
      console.log(JSON.parse(res.data));

    } catch (error) {
      
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      loader.dismiss();
      console.log(error);

    }


  }

  public async getPaymentWidget(amount, integrator, devis_id, service_key, logo_url, devise) {
    const loader = await this.utilsService.createLoader('Un instant, préparons l\'unité de paiement...');
    loader.present();

    if(integrator === "Monetbil") {

      let headers={
        "Accept": "application/json",
        "Content-Type": "application/json",
        "lang": this.translateService.currentLang
      };
  
      let params = {
        amount: amount,
        item_ref: devis_id,
        logo: logo_url,
        currency: devise
      }
  
      try {
  
        const res = await this.http.post(this.integratorPaiementUrl[integrator] + service_key, params, headers);
        let datas = JSON.parse(res.data)
        console.log(JSON.parse(res.data));
        loader.dismiss();
        return datas.payment_url;
  
      } catch (error) {
        
        loader.dismiss();
        //let err = JSON.parse(error.error);
        // let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
        // const toast = await this.utilsService.createToaster('Echec!', mess);
        // toast.present();
        loader.dismiss();
        console.log(error);
  
      }

    }


  }


  public async sendPaymenttoken(token, amount, devis_id) {
    const loader = await this.utilsService.createLoader('Un instant, nous procédons au paiement...');
    loader.present();
    const pays = await this.storageService.getObject('user_country');

      let headers={
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "lang": this.translateService.currentLang
      };
  
      let params = {
        pays_id: pays.id.toString(),
        amount: amount,
        token: token,
        devis_id: devis_id
      }
      console.log(params);
  
      try {
  
        const res = await this.http.post(Config.endPoint + this.stripePaymentUrl, params, headers);
        console.log(res);
        loader.dismiss();
        let mess = JSON.parse(res.data).message
        const toast = await this.utilsService.createToaster('Infos Paiement', mess);
        toast.present();
        this.router.navigate(['/product-devis']);

  
      } catch (error) {
        
        loader.dismiss();
        let err = JSON.parse(error.error);
        let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
        const toast = await this.utilsService.createToaster('Echec!', mess);
        toast.present();
        console.log(error);
  
      }

  }

  public async sendPaymentInfos(form, amount, devis_code) {
    const loader = await this.utilsService.createLoader('Un instant, nous procédons au paiement...');
    loader.present();
    const pays = await this.storageService.getObject('user_country');

      let headers={
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "lang": this.translateService.currentLang
      };

      form['pays_id'] = pays.id.toString();
      form['code_devis'] = devis_code;
      form['amount'] = amount;
      console.log(form);
      try {
  
        const res = await this.http.post(Config.endPoint + this.integratorPaiementUrl['Afrikpay'], form, headers);
        console.log(res);
        let mess = JSON.parse(res.data).message
        const toast = await this.utilsService.createToaster('Infos Paiement', mess);
        toast.present();
        this.router.navigate(['/product-devis']);
        loader.dismiss();

  
      } catch (error) {
        
        loader.dismiss();
        let err = JSON.parse(error.error);
        let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
        const toast = await this.utilsService.createToaster('Echec!', mess);
        toast.present();
        console.log(error);
  
      }

  }

  public async saveSouscription(formData, devis_id, nbre_assur) {
    const loader = await this.utilsService.createLoader('Un instant, nous enregistrons vos données...');
    loader.present();
    const pays = await this.storageService.getObject('user_country');

      let headers={
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "lang": this.translateService.currentLang
      };

      formData.devis_id = devis_id;

      if(nbre_assur){
        formData.nombre_assures = nbre_assur;
        console.log(formData);
      }

      console.log(formData);
  
      try {
  
        const res = await this.http.post(Config.endPoint + this.suscribeUrl, formData, headers);
        let datas = JSON.parse(res.data)
        console.log(JSON.parse(res.data));
        loader.dismiss();
        return true;
  
      } catch (error) {
        
        loader.dismiss();
        let err = JSON.parse(error.error);
        let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
        const toast = await this.utilsService.createToaster('Echec!', mess);
        toast.present();
        loader.dismiss();
        console.log(error);
        return false;
  
      }

  }

  public async loadAllDevis () {
    const loader = await this.utilsService.createLoader('Un instant, récupérons des informations...');
    loader.present();
    const pays = await this.storageService.getObject('user_country');
    let user = await this.storageService.getObject('user');

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "lang": this.translateService.currentLang
    };

    let params = {
      pays_id: pays.id.toString(),
      user_id: user.infos.id.toString()
    }

    try {

      const res = await this.http.get(Config.endPoint + this.allDevisUrl, params, headers);
      let produits = JSON.parse(res.data).data;

      this.storageService.setObject('user_devis', produits);
      loader.dismiss();
      console.log(JSON.parse(res.data).data);
      return produits;

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async findDevis(devis_id) {
    console.log(devis_id);
    let produits = await this.storageService.getObject('user_devis');
    let theProd = null;
    for(const country of produits) {
      console.log(country);
      if (country.id.toString() === devis_id){
        theProd = country;
        break;
      }
    }
    console.log(theProd);
    return theProd;
  }


  public async getSouscripForm(devis_id) {
    const loader = await this.utilsService.createLoader('Un instant, préparons votre souscription...');
    loader.present();
    const pays = await this.storageService.getObject('user_country');
    let user = await this.storageService.getObject('user');

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    let params = {
      devis_id: devis_id.toString(),
      pays_id: pays.id.toString()
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.subsFormUrl, params, headers);
      let devisForm = JSON.parse(res.data).data;
      this.storageService.setObject('cotation_result', devisForm);
      loader.dismiss();
      console.log(JSON.parse(res.data).data);
      return devisForm;

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      // let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      // const toast = await this.utilsService.createToaster('Echec!', mess);
      // toast.present();
      console.log(error);

    }
    
  }


  public async rejectDevis(devis_id, formData) {
    const loader = await this.utilsService.createLoader('Un instant, nous procédons au paiement...');
    loader.present();
    const pays = await this.storageService.getObject('user_country');
    let user = await this.storageService.getObject('user');


      let headers={
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": 'Bearer ' + user.apiToken,
        "lang": this.translateService.currentLang
      };
  
      
      formData.pays_id = pays.id.toString(),
      formData.devis_id = devis_id,
      formData.user_id = user.infos.id.toString()
      
      console.log(formData);
  
      try {
  
        const res = await this.http.post(Config.endPoint + this.rejetDevisUrl, formData, headers);
        console.log(res);
        loader.dismiss();
        this.router.navigate(['/all-devis']);

  
      } catch (error) {
        
        loader.dismiss();
        let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
        const toast = await this.utilsService.createToaster('Echec!', mess);
        toast.present();
        console.log(error);
  
      }

  }

  public async updateDevis(devis_id, amount=null, moyen_paiement=null) {
    const loader = await this.utilsService.createLoader('Un instant, nous vérifions vos informations...');
    loader.present();

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "lang": this.translateService.currentLang
    };

    let data = {
      devis_id: devis_id,
      amount: amount,
      moyen_paiement: moyen_paiement
    }

    try {

      const res = await this.http.post(Config.endPoint + this.updateDevisUrl, data, headers);
      let datas = JSON.parse(res.data);

      loader.dismiss();
      console.log(JSON.parse(res.data));

      return true;

    } catch (error) {
      
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      loader.dismiss();
      console.log(error);

    }

  }

}
