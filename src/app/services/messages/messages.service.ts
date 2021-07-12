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
export class MessagesService {
  private allMessagesUrl = "/messagerie/get-mes-conversations";
  private sendMessageUrl = "/messagerie/save-message";
  private unreadMessagesUrl = "/messagerie/get-total-messages";
  private markMessageReadUrl = "/messagerie/update-read-message";
  private messageFileUrl = "";
  private themesUrl = "/messagerie/get-theme-sous-theme";
  public apiDocUrl = '/sinistre/store-sinistre-doc';

  constructor(public http: HTTP, public utilsService: UtilsService, public storageService: StorageService, private router: Router, private fileService: FileService, public translateService: TranslateService) { 

  }

  public async loadConversations() {
    const loader = await this.utilsService.createLoader('Un instant, nous chargeons vos conversations...');
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

      const res = await this.http.get(Config.endPoint + this.allMessagesUrl, params, headers);
      let conversations = JSON.parse(res.data).data;
      this.storageService.setObject('conversations', conversations);
      loader.dismiss();
      console.log(JSON.parse(res.data).data);
      return conversations;

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async loadConversation(conv_id) {
    conv_id = parseInt(conv_id);
    let conversations = await this.storageService.getObject('conversations');
    let theCon = null;
    for(const conv of conversations) {
      console.log(conv);
      if (conv.conversation.id === conv_id){
        theCon = conv
        break;
      }
    }

    console.log(theCon);
    return theCon;
  } 

  public async countUnreadMessages() {
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

      const res = await this.http.get(Config.endPoint + this.unreadMessagesUrl, params, headers);
      let count = JSON.parse(res.data).data;
      console.log(JSON.parse(res.data).data);
      return count;

    } catch (error) {
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu récupérer les messages, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async markMessagesRead(conv_id) {
    const loader = await this.utilsService.createLoader('Un instant, nous chargeons vos messages...');
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
      'conversation_id': conv_id.toString()
    }
    console.log(params);

    try {
      
      const res = await this.http.get(Config.endPoint + this.markMessageReadUrl, params, headers);
      loader.dismiss();
      console.log(res);

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async loadThemes() {
    const loader = await this.utilsService.createLoader('Un instant, nous chargeons des données pour vous...');
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

      const res = await this.http.get(Config.endPoint + this.themesUrl, params, headers);
      let themes = JSON.parse(res.data).data;
      this.storageService.setObject('themes', themes);
      loader.dismiss();
      console.log(JSON.parse(res.data).data);
      return themes;

    } catch (error) {
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async sendMessage(formData, theme, conv_id=null, files=null) {
    const loader = await this.utilsService.createLoader('Un instant, nous envoyons votre message...');
    loader.present();
    let user = await this.storageService.getObject('user');
    formData.user_id = user.infos.id;
    formData.client_id = user.infos.id;
    formData.designation = theme.designation;
    formData.role_id = theme.role_id;
    formData.pays_id = user.infos.pays_id.toString();
    if(conv_id) {
      formData.conv_id = conv_id;
    }

    console.log(formData);

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    try {

      const res = await this.http.post(Config.endPoint + this.sendMessageUrl, formData, headers);

      let message = JSON.parse(res.data).data;

      if(files) {
        let filedata = {
          user_id: user.infos.id,
          message_id: message.id,
          file: ''
        }

        const promisesArray: any[] = [];

        for (const file of files) {
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
      const toast = await this.utilsService.createToaster('Succès!', 'Votre message a été envoyé et sera consulté dans les plus brefs délais.');
      toast.present();
      this.router.navigate(['/inbox']);
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
