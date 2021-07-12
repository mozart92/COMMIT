import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import Config  from '../../configs';
import { UtilsService } from '../utils/utils.service';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { FileService } from '../files/file.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {
  private listPrestationUrl = "/prestation/get-prestations-du-contrat";
  private declarePrestationUrl = "/prestation/store-new-prestation";
  private listAllPrestationUrl = "/prestation/get-mes-prestations";
  private updateSinistreUrl = "/sinistre/update-sinistre";
  public apiDocUrl = '/prestation/store-prestation-doc';

  private statutsPresta = {
    0: 'Soumise', 
    1: 'Accepté', 
    2: 'Accepté après amandement', 
    3: 'Traité', 
    4: 'Paiement disponible', 
    5: 'Cloturé', 
    6: 'Rejeté',
  }
  constructor(public http: HTTP, public utilsService: UtilsService, public storageService: StorageService, private router: Router, public fileService: FileService, public translateService: TranslateService) { }

  public async loadPrestations(contract_id) {
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
      'contrat_id': contract_id.toString(),
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.listPrestationUrl, params, headers);
      let sinistres = JSON.parse(res.data).data;
      
      for(let contract of sinistres) {
        console.log(contract);
        contract.statut = this.statutsPresta[contract.statut];
      }

      this.storageService.setObject('prestations', sinistres);
      loader.dismiss();
      console.log(sinistres);
      return sinistres;

    } catch (error) {
      loader.dismiss();
      // let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async loadAllPrestations() {
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
      'client_id': user.infos.client_id.toString()
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.listAllPrestationUrl, params, headers);
      let sinistres = JSON.parse(res.data).data;
      for(let contract of sinistres) {
        console.log(contract);
        contract.statut = this.statutsPresta[contract.statut];
      }
      this.storageService.setObject('allPrestations', sinistres);
      loader.dismiss();
      console.log(JSON.parse(res.data));
      return sinistres;

    } catch (error) {
      loader.dismiss();
      // let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async loadPrestation(sinistreId) {
    sinistreId = parseInt(sinistreId);
    let sinistres = await this.storageService.getObject('prestations');
    let all_sinistres = await this.storageService.getObject('allPrestations');
    console.log(all_sinistres);
    let theSinister = null;

    if (all_sinistres){
      for(let sinistre of all_sinistres.non_vie) {
        if (sinistre.id === sinistreId){
          console.log(sinistre);
          theSinister = sinistre
          break;
        }
      }

      if (!theSinister) {
        for(let sinistre of all_sinistres.vie) {
          if (sinistre.id === sinistreId){
            console.log(sinistre);
            theSinister = sinistre
            break;
          }
        }
      }
    }

    if (sinistres && !theSinister) {
      for(let sinistre of sinistres) {
        if (sinistre.id === sinistreId){
          console.log(sinistre);
          theSinister = sinistre
          break;
        }
      }
    }

    console.log(theSinister);
    return theSinister;

  }

  public async recordPrestation(contract_id, num_contrat, formData, sinisterFiles) {
    const loader = await this.utilsService.createLoader('Un instant, nous enregistrons votre demande...');
    loader.present();
    let user = await this.storageService.getObject('user');
    formData.user_id = user.infos.id;
    formData.client_id = user.infos.id;
    formData.contrat_id = contract_id;
    formData.num_contrat = num_contrat;
    formData.fullname = user.infos.nom + ' ' + user.infos.prenom;

    console.log(formData);
    console.log(Array.isArray(formData.beneficiaire))

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    try {

      const res = await this.http.post(Config.endPoint + this.declarePrestationUrl, formData, headers);

      let sinistre = JSON.parse(res.data).data;

      if(sinisterFiles) {
        let filedata = {
          user_id: user.infos.id,
          prestation_id: sinistre.id,
          num_contrat: num_contrat,
          pays_name: user.infos.pays,
          file: ''
        }
  
        const promisesArray: any[] = [];
  
        for (const file of sinisterFiles) {
          console.log('Uploading file' + file.file_name);
          filedata.file = file.file_name;
          promisesArray.push(this.fileService.upload(file, filedata, user.apiToken, this.apiDocUrl));
        }
  
        await Promise.all(promisesArray)
        .then((res) => {
          console.log(res);
          console.log("All uploads done");
        }, (firstErr) => {
          console.error("Error uploading file.", firstErr);
        });
      }
      
      loader.dismiss();
      const toast = await this.utilsService.createToaster('Succès!', 'Votre demande de prestation a été enregistrée et sera traitée dans les plus brefs délais.');
      toast.present();
      this.router.navigate(['/prestations/' + num_contrat]);
      console.log(JSON.parse(res.data));

    } catch (error) {
      
      loader.dismiss();
      // let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async updatePrestation(contract_id, contract_type, num_contrat, sinistre_id, formData, sinisterFiles) {
    const loader = await this.utilsService.createLoader('Un instant, nous mettons à jour votre demande...');
    loader.present();
    let user = await this.storageService.getObject('user');
    formData.user_id = user.infos.id;
    formData.client_id = user.infos.id;
    formData.contrat_id = contract_id;
    formData.num_contrat = num_contrat;
    formData.fullname = user.infos.nom;
    formData.contrat_type = contract_type;
    formData.sinistre_id = sinistre_id;

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    try {

      const res = await this.http.post(Config.endPoint + this.updateSinistreUrl, formData, headers);

      // let sinistre = JSON.parse(res.data).data;
      console.log(res);

      let filedata = {
        user_id: user.infos.id,
        prestation_id: sinistre_id,
        num_contrat: num_contrat,
        pays_name: user.infos.pays,
        file: ''
      }

      const promisesArray: any[] = [];

      for (const file of sinisterFiles) {
        console.log('Uploading file' + file.file_name);
        filedata.file = file.file_name;
        promisesArray.push(this.fileService.upload(file, filedata, user.apiToken, this.apiDocUrl));
      }

      await Promise.all(promisesArray)
      .then((res) => {
        console.log(res);
        console.log("All uploads done");
      }, (firstErr) => {
        console.error("Error uploading file.", firstErr);
      });
      
      
      const toast = await this.utilsService.createToaster('Succès!', 'Votre demande de prestation a été mise à jour et sera traitée dans les plus brefs délais.');
      toast.present();
      this.router.navigate(['/all-sinistres/']);
      loader.dismiss();
      console.log(JSON.parse(res.data));

    } catch (error) {
      
      loader.dismiss();
      // let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async respondOffer(formData, sinistre_id, num_contrat, contract_id) {
    const loader = await this.utilsService.createLoader('Un instant, nous mettons à jour votre déclaration...');
    loader.present();
    let user = await this.storageService.getObject('user');
    formData.user_id = user.infos.id;
    formData.client_id = user.infos.id;
    formData.contrat_id = contract_id;
    formData.num_contrat = num_contrat;
    formData.fullname = user.infos.nom;
    formData.sinistre_id = sinistre_id;

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    try {

      const res = await this.http.post(Config.endPoint + this.updateSinistreUrl, formData, headers);

      // let sinistre = JSON.parse(res.data).data;
      console.log(res);
      
      
      const toast = await this.utilsService.createToaster('Succès!', 'Votre déclaration de sinistre a été mise à jour et sera traitée dans les plus brefs délais.');
      toast.present();
      this.router.navigate(['/all-sinistres/']);
      loader.dismiss();
      console.log(JSON.parse(res.data));

    } catch (error) {
      
      loader.dismiss();
      // let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

}
