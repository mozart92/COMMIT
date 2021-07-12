import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';
import { EventsService } from './services/events/events.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public user: any;
  public user_status: boolean = false;
  public user_datas: any = "Bienvenue sur MyActiva";
  public language = 'fr';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService,
    private authService: AuthService,
    private events: EventsService,
    private translateService: TranslateService
  ) {
    
    translateService.setDefaultLang(this.language);
    translateService.use(this.language);
    this.initializeApp();
    this.getConnected();
    this.getUser();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.events.getObservable().subscribe((data) => {
      console.log("Data received:", data);
      if(data.username) {
        this.user_datas = data.username;
        this.user_status = true;
      }else{
        this.user_datas = "Bienvenue sur MyActiva";
        this.user_status = false;
      }
    });
    console.log(this.user_status);
    this.setUserStatus();
  }

  ngOnInit() {
    this.getConnected();
    this.getUser();
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

  }

  async getUser() {
    this.user = await this.storageService.getObject('user');
  }

  async getConnected() {
    this.user_status = await this.storageService.getItem('logged');
  }

  async setUserStatus() {
    await this.storageService.setItem('logged', 'false');
  }

  async disconnect() {
    await this.authService.signOut();
    this.events.publishSomeData({
      username: null
    });
  }

  switch_language(){
    if(this.language==='fr') {
      this.language = 'en';
    }else{
      this.language = 'fr';
    }
    this.translateService.use(this.language);
    // console.log('the current language is: '+this.translateService.currentLang);
  }
}
