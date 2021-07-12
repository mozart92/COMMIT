import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import Config  from '../../configs';
import { StorageService } from '../storage/storage.service';
import { UtilsService } from '../utils/utils.service';
import { Router } from '@angular/router';
import { FacialrecService } from '../facialrec/facialrec.service';
import { EventsService } from '../events/events.service';
import { TranslateService } from '@ngx-translate/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private activationUrl = "/auth/activationclient";
  private loginUrl = "/auth/login";
  private facialLoginUrl = "/auth/login-facial"
  private resetUrl = "/auth/forgot-password";
  private changePassUrl = "/auth/change-password";
  private updateProfUrl = "/user/post-profileinfoclient";
  private sendPushTokenUrl = "/auth/update-user-token";
  private secondActivationUrl = "/auth/activationcontrat";
  constructor(public http: HTTP, public storageService: StorageService, public utilsService: UtilsService, private router: Router, public facialrecService: FacialrecService, public translateService: TranslateService, public events: EventsService) {
    
  }

  public loadMainPage() {
    let userAuth = this.storageService.getItem('logged');
    if (userAuth) {
      return 'change-password'
    }else {
      return 'login'
    }
  }

  public async activation(activDatas, fileUri) {
    const loader = await this.utilsService.createLoader('Un instant, nous vérifions vos informations...');
    loader.present();

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "lang": this.translateService.currentLang
    };

    try {

      const res = await this.http.post(Config.endPoint + this.activationUrl, activDatas, headers);
      let datas = JSON.parse(res.data)
      let userDatas = {
        apiToken: datas.access_token,
        infos: datas.data
      };
      this.storageService.setObject('user', userDatas);
      this.storageService.setItem('logged', 'true');
      this.events.publishSomeData({
        username: userDatas.infos.nom+' '+userDatas.infos.prenom
      });
      let paysData = {
        id: datas.data.pays_id,
        nom: datas.data.pays
      }
      this.storageService.setObject('user_country', paysData);

      if(fileUri){
        await this.facialrecService.signUpFacial(fileUri, userDatas.infos.main_phone);
      }
      
      this.managePush();

      loader.dismiss();

      const toast = await this.utilsService.createToaster('Bienvenue!', 'Bienvenue sur Activa mobile, votre assurance A portée de main.');
      toast.present();
      this.router.navigate(['/dashboard']);
      console.log(JSON.parse(res.data));

    } catch (error) {
      
      loader.dismiss();
      //let err = JSON.parse(error.error);
      let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }


  }

  public async login(loginDatas) {

    const loader = await this.utilsService.createLoader('Un instant, nous vérifions vos paramètres...');
    loader.present();

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "lang": this.translateService.currentLang
    };

    try {

      const res = await this.http.post(Config.endPoint + this.loginUrl, loginDatas, headers);
      let datas = JSON.parse(res.data)
      let userDatas = {
        apiToken: datas.access_token,
        infos: datas.data
      };
      this.storageService.setObject('user', userDatas);
      this.storageService.setItem('logged', 'true');
      console.log(await this.storageService.getItem('logged'));
      this.events.publishSomeData({
        username: userDatas.infos.nom+' '+userDatas.infos.prenom
      });
      let paysData = {
        id: datas.data.pays_id,
        nom: datas.data.pays
      }
      this.storageService.setObject('user_country', paysData);
      this.managePush();
      loader.dismiss();

      const toast = await this.utilsService.createToaster('Bienvenue!', 'Bon retour sur Activa, regardez ce que vous avez manqué depuis.');
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

  public async FacialLogin() {


    let username = null
    let statusCode = null

    let promise1  =  this.facialrecService.signInWithFacial();

    promise1.then((value) => {
      console.log("le bon deburg ", value);
    });

    //console.log(res)
    

    if(username!=null && statusCode ==="FACE-EXIST"){
      const loader = await this.utilsService.createLoader('Un instant, nous vérifions vos paramètres...');
      loader.present();

      let headers={
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "lang": this.translateService.currentLang
      };

      let logData = {
        username: username
      }

      try {
        console.log("The username is: " + username)
        const res = await this.http.post(Config.endPoint + this.facialLoginUrl, logData, headers);
        let datas = JSON.parse(res.data)
        let userDatas = {
          apiToken: datas.access_token,
          infos: datas.data
        };
        this.storageService.setObject('user', userDatas);
        this.storageService.setItem('logged', 'true');
        this.events.publishSomeData({
          username: userDatas.infos.nom+' '+userDatas.infos.prenom
        });
        let paysData = {
          id: datas.data.pays_id,
          nom: datas.data.pays
        }
        this.storageService.setObject('user_country', paysData);
        this.managePush();
        loader.dismiss();

        const toast = await this.utilsService.createToaster('Bienvenue!', 'Bon retour sur Activa, regardez ce que vous avez manqué depuis.');
        toast.present();
        this.router.navigate(['/dashboard']);
        console.log(JSON.parse(res.data));

      } catch (error) {
        
        // let err = JSON.parse(error.error);
        let mess = error.error ? JSON.parse(error.error).message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
        const toast = await this.utilsService.createToaster('Echec!', mess);
        toast.present();
        console.log(error);
        
        loader.dismiss();
      }
    }else if(statusCode=="ERR-FACE-NOT-EXIST"){
        // let err = JSON.parse(error.error);
        let mess = "Votre visage n'est pas reconnu par le système."
        const toast = await this.utilsService.createToaster('Echec!', mess);
        toast.present();
    }else{
        let mess = "erreur survenue, essayer plus tard"
        const toast = await this.utilsService.createToaster('Echec!', mess);
        toast.present();
    }

  }



  public async resetPassword(resetDatas) {
    const loader = await this.utilsService.createLoader('Un instant, nous vérifions vos informations...');
    loader.present();

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "lang": this.translateService.currentLang
    };

    try {

      const res = await this.http.post(Config.endPoint + this.resetUrl, resetDatas, headers);
      loader.dismiss();

      const toast = await this.utilsService.createToaster('Succès!', 'Utilisez le mot de passe recu par email pour vous reconnecter');
      toast.present();
      this.router.navigate(['/login']);
      console.log(JSON.parse(res.data));

    } catch (error) {
      
      loader.dismiss();
      let err = JSON.parse(error.error);
      let mess = error.error ? err.message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async changePassword(changeDatas) {
    const loader = await this.utilsService.createLoader('Un instant, nous mettons à jour vos informations...');
    loader.present();
    let user = await this.storageService.getObject('user');
    changeDatas.user_id = user.infos.id;

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    try {

      const res = await this.http.post(Config.endPoint + this.changePassUrl, changeDatas, headers);
      this.storageService.setItem('logged', 'false');
      loader.dismiss();

      const toast = await this.utilsService.createToaster('Bienvenue!', 'Votre mot de passe a été mis à jour');
      toast.present();
      this.router.navigate(['/login']);
      console.log(JSON.parse(res.data));

    } catch (error) {
      
      loader.dismiss();
      let err = JSON.parse(error.error);
      let mess = error.error ? err.message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }

  public async updateProfile(changeDatas) {
    const loader = await this.utilsService.createLoader('Un instant, nous mettons à jour vos informations...');
    loader.present();
    let user = await this.storageService.getObject('user');
    changeDatas.user_id = user.infos.id;
    changeDatas.client_id = user.infos.client_id;

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    try {

      const res = await this.http.post(Config.endPoint + this.updateProfUrl, changeDatas, headers);
      let datas = JSON.parse(res.data)
      let userDatas = {
        apiToken: datas.data.api_tokens,
        infos: datas.data
      };
      this.storageService.setObject('user', userDatas);
      loader.dismiss();

      const toast = await this.utilsService.createToaster('Bienvenue!', 'Votre profil a été mis à jour');
      toast.present();
      this.router.navigate(['/change-password']);
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

  private async sendPushToken(token) {

    let user = await this.storageService.getObject('user');

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "lang": this.translateService.currentLang
    };

    let params = {
      'user_id': user.infos.id.toString(),
      'token': token
    }
    console.log(params);

    try {

      const res = await this.http.post(Config.endPoint + this.sendPushTokenUrl, params, headers);
      let datas = JSON.parse(res.data)
      let userDatas = {
        apiToken: datas.access_token,
        infos: datas.data
      };
      console.log(JSON.parse(res.data));

    } catch (error) {
      
      console.log(error);

    }

  }

  private managePush(){
    console.log('Initializing Pushes');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        this.sendPushToken(token.value);
        console.log('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        this.displayToast(notification.title, notification.body);
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

  

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
      }
    );
  }

  private async displayToast(title, message){
    let mess =  message
    const toast = await this.utilsService.createToaster(title, mess);
    toast.present();
  }

  public async signOut() {
    await this.storageService.clear();
    this.router.navigate(['/home']);
  }

  public async secondActivation(activeDatas, type) {
    const loader = await this.utilsService.createLoader('Un instant, nous mettons à jour vos informations...');
    loader.present();
    let user = await this.storageService.getObject('user');
    activeDatas.user_id = user.infos.id;
    activeDatas.client_id = user.infos.client_id;
    activeDatas.type = (type === 'vie') ? '0' : '1';

    let headers={
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Authorization": 'Bearer ' + user.apiToken,
      "lang": this.translateService.currentLang
    };

    try {

      const res = await this.http.post(Config.endPoint + this.secondActivationUrl, activeDatas, headers);
      // this.storageService.setItem('logged', 'false');
      loader.dismiss();

      const toast = await this.utilsService.createToaster('Success!', 'Votre activation est à présent complète. Découvrez tous vos contrats dans le dashboard.');
      toast.present();
      this.router.navigate(['/dashboard']);
      console.log(JSON.parse(res.data));

    } catch (error) {
      
      loader.dismiss();
      let err = JSON.parse(error.error);
      let mess = error.error ? err.message : "Nous n'avons pas pu envoyer les informations, vérifiez votre connexion internet."
      const toast = await this.utilsService.createToaster('Echec!', mess);
      toast.present();
      console.log(error);

    }
  }
}
