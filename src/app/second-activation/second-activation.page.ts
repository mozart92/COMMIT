import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-second-activation',
  templateUrl: './second-activation.page.html',
  styleUrls: ['./second-activation.page.scss'],
})
export class SecondActivationPage implements OnInit {

  public user: any;
  constructor(public storageService: StorageService, public authService: AuthService) {
    this.getCurrentUser();
   }

  ngOnInit() {
  }

  async getCurrentUser() {
    this.user = await this.storageService.getObject('user');
  }

  async register(form) {
    console.log(form)
    let type = !this.user.infos.id_vie ? 'vie' : 'non_vie';
    this.authService.secondActivation(form.form.value, type);
    
  }

}
