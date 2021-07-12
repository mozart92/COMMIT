import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { FacialrecService } from '../services/facialrec/facialrec.service';
// import {
//   Plugins,
//   PushNotification,
//   PushNotificationToken,
//   PushNotificationActionPerformed,
// } from '@capacitor/core';

// const { PushNotifications } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public menuCtrl: MenuController, public authService: AuthService, private router: Router, public facialrecService: FacialrecService) {
    menuCtrl.enable(false);
  }

  ngOnInit() {}

  async login(form) {
    console.log(form);
    try {
      const res = await this.authService.login(form.form.value);
    } catch (error) {
      console.log(error);
    }
  }

  display(json) {
    return JSON.stringify(json);
  }

  async signWithFacialPrint() {
    try {
    
      const res = await this.authService.FacialLogin();
    } catch (error) {
      console.log(error);
    }
  }

}
