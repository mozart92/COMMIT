import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import Config  from '../../configs';
import { StorageService } from '../storage/storage.service';
import { UtilsService } from '../utils/utils.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private prestatairesUrl = '/localisation/get-prestataires-pays';
  private pointsVenteUrl = '/localisation/get-point-de-vente-pays';
  private villesUrl = '/localisation/get-liste-ville';
  private categorieUrl = '/localisation/get-categories-prestataire';

  constructor(public http: HTTP, public storageService: StorageService, public utilsService: UtilsService, private router: Router, public translateService: TranslateService) {
  
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
    return coordinates;
  }

  async loadPrestataires() {
    const loader = await this.utilsService.createLoader('Un instant, nous rassemblons vos informations...');
    loader.present();
    let user = await this.storageService.getObject('user');

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    let params = {
      'user_id': user.infos.id.toString(),
      'client_id': user.infos.client_id.toString(),
      'pays_id': user.infos.pays_id.toString()
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.prestatairesUrl, params, headers);
      let prestataires = JSON.parse(res.data).data;
      this.storageService.setObject('prestataires', prestataires);
      loader.dismiss();
      console.log(JSON.parse(res.data));
      return prestataires;

    } catch (error) {
      loader.dismiss();
      // let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async loadPrestataire(prestaId) {
    prestaId = parseInt(prestaId);
    let presataires = await this.storageService.getObject('prestataires');
    console.log(presataires);
    let prestataire = null;

    for(let presta of presataires) {
      if (presta.id === prestaId){
        console.log(presta);
        prestataire = presta
        break;
      }
    }
    return prestataire;
  }

  async loadPointsVente() {
    const loader = await this.utilsService.createLoader('Un instant, nous rassemblons vos informations...');
    loader.present();
    let user = await this.storageService.getObject('user');

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    let params = {
      'user_id': user.infos.id.toString(),
      'client_id': user.infos.client_id.toString(),
      'pays_id': user.infos.pays_id.toString()
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.pointsVenteUrl, params, headers);
      let pointVente = JSON.parse(res.data).data;
      this.storageService.setObject('pointVente', pointVente);
      loader.dismiss();
      console.log(JSON.parse(res.data));
      return pointVente;

    } catch (error) {
      loader.dismiss();
      // let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async loadPos(pos_id) {
    pos_id = parseInt(pos_id);
    let pos = await this.storageService.getObject('pointVente');
    console.log(pos);
    let point_vente = null;

    for(let presta of pos) {
      if (presta.id === pos_id){
        console.log(presta);
        point_vente = presta
        break;
      }
    }
    return point_vente;
  }

  async loadVilles() {
    const loader = await this.utilsService.createLoader('Un instant, nous rassemblons vos informations...');
    loader.present();
    let user = await this.storageService.getObject('user');

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    let params = {
      'user_id': user.infos.id.toString(),
      'client_id': user.infos.client_id.toString(),
      'pays_id': user.infos.pays_id.toString()
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.villesUrl, params, headers);
      let villes = JSON.parse(res.data).data;
      this.storageService.setObject('villes', villes);
      loader.dismiss();
      console.log(JSON.parse(res.data));
      return villes;

    } catch (error) {
      loader.dismiss();
      // let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  async loadCategories() {
    const loader = await this.utilsService.createLoader('Un instant, nous rassemblons vos informations...');
    loader.present();
    let user = await this.storageService.getObject('user');

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    let params = {
      'user_id': user.infos.id.toString(),
      'client_id': user.infos.client_id.toString(),
      'pays_id': user.infos.pays_id.toString()
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.categorieUrl, params, headers);
      let categories = JSON.parse(res.data).data;
      this.storageService.setObject('villes', categories);
      loader.dismiss();
      console.log(JSON.parse(res.data));
      return categories;

    } catch (error) {
      loader.dismiss();
      // let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async filterPrestataire(name, ville_id, cat_id, sub_cat_id) {

    let prestataires = await this.storageService.getObject('prestataires');
    let result = [];
    let temp = prestataires;
    // console.log(this.similarity(temp[0].nom, name));
    if (name !== '') {
      temp = temp.filter(x => this.similarity(x.nom, name) >= 0.2);
    }

    if(ville_id !== '') {
      temp = temp.filter(x => x.ville_id.toString() === ville_id);
    }

    if(cat_id !== '') {
      temp = temp.filter(x => x.categories.filter(c => c.parent_id.toString() === cat_id).length > 0);
    }

    if(sub_cat_id !== '') {
      temp = temp.filter(x => x.categories.filter(c => c.id.toString() === sub_cat_id).length > 0);
    }

    return temp;

  }

  private similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  private editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }
}
