import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import Config  from '../../configs';
import { UtilsService } from '../utils/utils.service';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class InfosService {

  private paysUrl = "/localisation/get-liste-pays";
  private onProduitsUrl = "/publicite/get-produits-vedette";
  private pubVisiteurUrl = "/publicite/get-publicite-visiteur";
  private allProduitsUrl = "/publicite/get-liste-produits";
  private actualiteUrl = "/actualites/get-liste-actualites";
  private professionUrl = "/localisation/get-profession";

  constructor(public http: HTTP, public utilsService: UtilsService, public storageService: StorageService, private router: Router, public translateService: TranslateService) {
    
   }

  public async loadPays () {
    const loader = await this.utilsService.createLoader('Un instant, récupérons des informations...');
    loader.present();

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "lang": this.translateService.currentLang
    };

    try {

      const res = await this.http.get(Config.endPoint + this.paysUrl, null, headers);
      let pays = JSON.parse(res.data).data;

      this.storageService.setObject('pays', pays);
      loader.dismiss();
      console.log(JSON.parse(res.data).data);
      return pays;

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async findPays(pays_id) {
    console.log(pays_id);
    let pays = await this.storageService.getObject('pays');
    let thePays = null;
    for(const country of pays) {
      console.log(country);
      if (country.id === pays_id){
        thePays = country;
        break;
      }
    }
    console.log(thePays);
    return thePays;
  }

  public async loadAdvert () {
    const loader = await this.utilsService.createLoader('Un instant, récupérons des informations...');
    loader.present();
    const pays = await this.storageService.getObject('user_country');
    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "lang": this.translateService.currentLang
    };

    let params = {
      pays_id: pays.id.toString()
    }

    try {

      const res = await this.http.get(Config.endPoint + this.pubVisiteurUrl, params, headers);
      let adverts = JSON.parse(res.data).data;

      this.storageService.setObject('adverts', adverts);
      loader.dismiss();
      console.log(JSON.parse(res.data).data);
      return adverts;

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async loadProduitsFront () {
    const loader = await this.utilsService.createLoader('Un instant, récupérons des informations...');
    loader.present();
    const pays = await this.storageService.getObject('user_country');

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "lang": this.translateService.currentLang
    };

    let params = {
      pays_id: pays.id.toString()
    }

    try {

      const res = await this.http.get(Config.endPoint + this.onProduitsUrl, params, headers);
      let frontProd = JSON.parse(res.data).data;

      this.storageService.setObject('produits', frontProd);
      loader.dismiss();
      console.log(JSON.parse(res.data).data);
      return frontProd;

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async loadAllProduits () {
    const loader = await this.utilsService.createLoader('Un instant, récupérons des informations...');
    loader.present();
    const pays = await this.storageService.getObject('user_country');

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "lang": this.translateService.currentLang
    };

    let params = {
      pays_id: pays.id.toString()
    }

    try {

      const res = await this.http.get(Config.endPoint + this.allProduitsUrl, params, headers);
      let produits = JSON.parse(res.data).data;

      this.storageService.setObject('produits', produits);
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

  public async findProduit(prod_id) {
    console.log(prod_id);
    let produits = await this.storageService.getObject('produits');
    let theProd = null;
    for(const country of produits) {
      console.log(country);
      if (country.id.toString() === prod_id){
        theProd = country;
        break;
      }
    }
    console.log(theProd);
    return theProd;
  }

  public async findAdvert(prod_id) {
    console.log(prod_id);
    let adverts = await this.storageService.getObject('adverts');
    let theAd = null;
    for(const country of adverts) {
      console.log(country);
      if (country.id.toString() === prod_id){
        theAd = country;
        break;
      }
    }
    console.log(theAd);
    return theAd;
  }

  public async loadNews () {
    const loader = await this.utilsService.createLoader('Un instant, récupérons des informations...');
    loader.present();
    const pays = await this.storageService.getObject('user_country');
    console.log('The current language is: '+this.translateService.currentLang);
    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "lang": this.translateService.currentLang
    };

    let params = {
      pays_id: pays.id.toString()
    }

    try {

      const res = await this.http.get(Config.endPoint + this.actualiteUrl, params, headers);
      let news = JSON.parse(res.data).data;

      this.storageService.setObject('news', news);
      loader.dismiss();
      console.log(JSON.parse(res.data).data);
      return news;

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      // let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      // const toast = await this.utilsService.createToaster('Echec!', mess);
      // toast.present();
      console.log(error);

    }
  }

  public async findNews(prod_id) {
    console.log(prod_id);
    let adverts = await this.storageService.getObject('news');
    let theAd = null;
    for(const country of adverts) {
      console.log(country);
      if (country.id.toString() === prod_id){
        theAd = country;
        break;
      }
    }
    console.log(theAd);
    return theAd;
  }

  public async loadProfessions () {
    const loader = await this.utilsService.createLoader('Un instant, récupérons des informations...');
    loader.present();

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "lang": this.translateService.currentLang
    };

    try {

      const res = await this.http.get(Config.endPoint + this.professionUrl, null, headers);
      let professions = JSON.parse(res.data).data;

      this.storageService.setObject('professions', professions);
      loader.dismiss();
      console.log(JSON.parse(res.data).data);
      return professions;

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }
}
