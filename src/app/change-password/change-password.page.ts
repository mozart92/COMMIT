import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { MenuController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { MapService } from '../services/map/map.service';
import { InfosService } from '../services/infos/infos.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  public contentTitle = 'profile';
  public user: any;
  public villes: any;
  public professions: any;
  constructor(public authService: AuthService, public router: Router, private translateService: TranslateService, public infosService: InfosService, public menuCtrl: MenuController, public storageService: StorageService, private mapService: MapService) {
    menuCtrl.enable(true);
    this.getUser();
    this.getVilles();
    this.getProfessions();
  }

  ngOnInit() {
    this.getUser();
  }

  ionViewWillEnter() {
    this.getUser();
  }

  segmentChanged(ev: any) {
    this.contentTitle = ev.detail.value;
    console.log('Segment changed', ev);
  }

  async changePass(form) {
    console.log(form);
    try {
      const res = await this.authService.changePassword(form.form.value);
    } catch (error) {
      console.log(error);
    }
  }

  async changeProfile(form) {
    console.log(form.form.value);
    const res = this.authService.updateProfile(form.form.value);
  }

  async getUser() {
    this.user = await this.storageService.getObject('user');
    console.log(this.user);
  }

  async getVilles() {
    this.villes = await this.mapService.loadVilles();
    console.log(this.villes);
  }

  async getProfessions() {
    this.professions = await this.infosService.loadProfessions();
    console.log(this.professions);
  }

  compareWithFn(listOfItems,selectedItem){
    return listOfItems && selectedItem && listOfItems.id === selectedItem.id; ;
  }

  activate() {
    this.router.navigate(['/second-activation']);
  }

}
