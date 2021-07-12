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
export class ContractsService {
  private contractsUrl = "/contrat/get-myclient-contracts";
  private garantiesUrl = "/avenant/get-garanties-for-type";
  private avenantSubmitUrl = "/avenant/store-new-avenant";
  private avenantsUrl = "/avenant/get-contract-avenants";
  private paiementStateUrl = "/contrat/demande-etat-paiement";
  private paiementHistoryUrl = "/contrat/get-mes-paiements";
  // private renewHistoryUrl = "";
  private renewPaymentUrl = "/contrat/save-paiement-renew-prime";
  private optionTarifUrl = "/contrat/get-options-tarifaires";

  private statutsContract = {
    0: 'En cours', 
    1: 'Expiré'
  }

  private integrateursUrl = "/integrateurpaiement/get-liste";

  constructor(public http: HTTP, public utilsService: UtilsService, public storageService: StorageService, private router: Router, public translateService: TranslateService) { }

  public async loadContracts () {
    const loader = await this.utilsService.createLoader('Un instant, nous mettons à jour vos informations...');
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

      const res = await this.http.get(Config.endPoint + this.contractsUrl, params, headers);
      let contracts = JSON.parse(res.data).data;
      for(let contract of contracts.contrat_vie) {
        console.log(contract);
        contract.statut = this.statutsContract[contract.statut];
      }
      for(let contract of contracts.contrat_non_vie) {
        console.log(contract);
        contract.statut = this.statutsContract[contract.statut];
      }
      this.storageService.setObject('contracts', contracts);
      loader.dismiss();
      console.log(JSON.parse(res.data).data);
      return contracts;

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async loadContract(cont_num) {
    let contracts = await this.storageService.getObject('contracts');
    let theCon = null;
    for(const contract of contracts.contrat_vie) {
      if (contract.num_contrat === cont_num){
        theCon = {
          contract_infos: contract,
          type: 'vie'
        };
        break;
      }
    }

    if(!theCon) {
      for(const contract of contracts.contrat_non_vie) {
        if (contract.num_contrat === cont_num){
          theCon = {
            contract_infos: contract,
            type: 'non_vie'
          };
          break;
        }
      } 
    }

    console.log(theCon);
    return theCon;
  }

  public async loadGaranties(type_contrat_id) {

    const loader = await this.utilsService.createLoader('Un instant, nous récupérons des informations...');
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
      'type_contrat_id': type_contrat_id.toString()
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.garantiesUrl, params, headers);
      let garanties = JSON.parse(res.data).data;
      loader.dismiss();
      console.log(JSON.parse(res.data).data);
      return garanties;

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu récolter les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }

  }


  public async recordContractUpdate(contract_id, contract_type, changeDatas) {
    const loader = await this.utilsService.createLoader('Un instant, nous enregistrons votre demande...');
    loader.present();
    let user = await this.storageService.getObject('user');
    changeDatas.user_id = user.infos.id;
    changeDatas.client_id = user.infos.client_id;
    changeDatas.contrat_id = contract_id;
    changeDatas.contrat_type = contract_type;

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    try {

      const res = await this.http.post(Config.endPoint + this.avenantSubmitUrl, changeDatas, headers);
      this.storageService.setItem('logged', false);
      loader.dismiss();

      const toast = await this.utilsService.createToaster('Succès!', 'Votre demande d\'avenant a été enregistrée et sera traitée dans les plus brefs délais.');
      toast.present();
      this.router.navigate(['/dashboard']);
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

  public async loadAvenants (contract_id, contract_type) {
    const loader = await this.utilsService.createLoader('Un instant, nous chargeons vos informations...');
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
      'contrat_type': contract_type
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.avenantsUrl, params, headers);
      let avenants = JSON.parse(res.data).data;
      loader.dismiss();
      console.log(JSON.parse(res.data).data);
      return avenants;

    } catch (error) {
      loader.dismiss();
      // let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async loadSinistrableContracts() {
    let contracts = await this.storageService.getObject('contracts');
    let theCons = [];
    for(const contract of contracts.contrat_non_vie) {
      console.log(contract);
      if (contract.type_contrat.is_sinistrable === 1 && contract.statut === 'En cours'){
        //contract.bien_assure = JSON.parse(contract.bien_assure)
        //contract.garanties = JSON.parse(contract.garanties)
        let theCon = {
          contract_infos: contract,
          type: 'non_vie'
        };
        theCons.push(theCon);
      }
    } 

    for(const contract of contracts.contrat_vie) {
      console.log(contract);
      if (contract.type_contrat.is_sinistrable === 1 && contract.statut === 'En cours'){
        //contract.garanties = JSON.parse(contract.garanties)
        let theCon = {
          contract_infos: contract,
          type: 'vie'
        };
        theCons.push(theCon);
      }
    }

    

    console.log(theCons);
    return theCons;
  }

  public async loadPrestableContracts() {
    let contracts = await this.storageService.getObject('contracts');
    let theCons = [];
    for(const contract of contracts.contrat_vie) {
      if(contract.statut === 'En cours'){
        let theCon = {
          contract_infos: contract,
          type: 'vie'
        };
        theCons.push(theCon);
      }
    } 

    console.log(theCons);
    return theCons;
  }

  public async requestPaiementState(num_contrat) {
    const loader = await this.utilsService.createLoader('Un instant, nous mettons à jour vos informations...');
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
      'pays_id': user.infos.pays_id.toString(),
      'num_contrat': num_contrat
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.paiementStateUrl, params, headers);
      const toast = await this.utilsService.createToaster('Succès!', 'Votre demande a bien été prise en compte.');
      toast.present();
      loader.dismiss();

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async getTypeContrat(num_contrat) {
    let contrat = await this.loadContract(num_contrat);
    return contrat.contract_infos.type_contrat.designation;
  }

  public async loadPaymentOrRenewalHistory (type, num_contrat) {
    const loader = await this.utilsService.createLoader('Un instant, nous mettons à jour vos informations...');
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
      'num_contrat': num_contrat.toString(),
      'type': type
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.paiementHistoryUrl, params, headers);
      let payments = JSON.parse(res.data).data;
      if(type==='paiement'){
        this.storageService.setObject('payments_history', payments);
      }else{
        this.storageService.setObject('renewal_history', payments);
      }
      loader.dismiss();
      console.log(res.data);
      return payments;

    } catch (error) {
      loader.dismiss();
      let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  // public async loadRenewalHistory () {
  //   const loader = await this.utilsService.createLoader('Un instant, nous mettons à jour vos informations...');
  //   loader.present();
  //   let user = await this.storageService.getObject('user');

  //   let headers={ 
  //     "Accept": "application/json",
  //     "Content-Type": "application/json",
  //     "X-Requested-With": "XMLHttpRequest",
  //     "Authorization": 'Bearer ' + user.apiToken,
  //     "lang": this.translateService.currentLang
  //   };

  //   let params = {
  //     'user_id': user.infos.id.toString(),
  //     'client_id': user.infos.client_id.toString()
  //   }
  //   console.log(params);

  //   try {

  //     const res = await this.http.get(Config.endPoint + this.renewHistoryUrl, params, headers);
  //     let payments = JSON.parse(res.data).data;
  //     this.storageService.setObject('renewal_history', payments);
  //     loader.dismiss();
  //     console.log(JSON.parse(res.data).data);
  //     return payments;

  //   } catch (error) {
  //     loader.dismiss();
  //     //let err = JSON.parse(error.error);
  //     let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
  //     const toast = await this.utilsService.createToaster('Echec!', mess);
  //     toast.present();
  //     console.log(error);

  //   }
  // }

  public async sendPaymentOrRenewInfos(form, amount, num_contrat, is_renewal) {
    const loader = await this.utilsService.createLoader('Un instant, nous procédons au paiement...');
    loader.present();
    const pays = await this.storageService.getObject('user_country');
    let user = await this.storageService.getObject('user');

      let headers={
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "lang": this.translateService.currentLang
      };

      form['pays_id'] = pays.id.toString();
      form['num_contrat'] = num_contrat;
      form['amount'] = amount;
      form['type'] = is_renewal ? 1 : 0;
      form['user_id'] = user.infos.id.toString(),
      form['client_id'] = user.infos.client_id.toString()
      console.log(form);
      try {
  
        const res = await this.http.post(Config.endPoint + this.renewPaymentUrl, form, headers);
        console.log(res);
        let mess = JSON.parse(res.data).message
        const toast = await this.utilsService.createToaster('Infos Paiement', mess);
        toast.present();
        // this.router.navigate(['/prime-paiement/'+num_contrat]);
        loader.dismiss();
        return true;
  
      } catch (error) {
        
        loader.dismiss();
        let err = JSON.parse(error.error);
        let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
        const toast = await this.utilsService.createToaster('Echec!', mess);
        toast.present();
        console.log(error);
  
      }

  }

  public async loadIntegratorInfos () {
    const loader = await this.utilsService.createLoader('Un instant, nous mettons à jour vos informations...');
    loader.present();
    let user = await this.storageService.getObject('user');
    
    const pays = await this.storageService.getObject('user_country');

    let headers={ 
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    let params = {
      'pays_id': pays.id.toString()
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.integrateursUrl, params, headers);
      let integs = JSON.parse(res.data).data;

      this.storageService.setObject('integrateurs', integs);
      loader.dismiss();
      console.log(JSON.parse(res.data).data);
      return integs;

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }


  public async loadOptionTarif (type_contrat) {
    console.log(type_contrat);
    const loader = await this.utilsService.createLoader('Un instant, nous mettons à jour vos informations...');
    loader.present();
    let user = await this.storageService.getObject('user');
    
    const pays = await this.storageService.getObject('user_country');

    let headers={ 
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    let params = {
      'code': type_contrat.toString(),
      'pays_id': pays.id.toString()
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.optionTarifUrl, params, headers);
      let options = JSON.parse(res.data).data;

      loader.dismiss();
      console.log(res);
      return options;

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
