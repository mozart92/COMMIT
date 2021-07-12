import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController) { 

  }

  public async createLoader(message) {
     const loading = await this.loadingCtrl.create({
      spinner: 'bubbles',
      message: message,
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    return loading;
  }

  public async createToaster(title, message) {
    const toast = await this.toastCtrl.create({
      header: title,
      message: message,
      position: 'top',
      duration: 3000,
      buttons: [
        {
          text: 'ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    return toast;
  }
}
