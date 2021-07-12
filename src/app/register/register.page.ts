import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/files/file.service';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { UtilsService } from '../services/utils/utils.service';
import { FacialrecService } from '../services/facialrec/facialrec.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public photo;
  public document;
  public video;
  public filename = "";
  public imageInfo = {
    name: 'file.png',
    type: 'image/png'
  };
  public textInfo = {
    name: 'file.pdf',
    type: 'text/pdf'
  };
  public videoInfo = {
    name: 'file.mp4',
    type: 'image/mp4'
  };
  public facialPrint = null;

  constructor(public fileService: FileService, public menuCtrl: MenuController, public authService: AuthService, public utilsServices: UtilsService, public facialrecService: FacialrecService) {
    menuCtrl.enable(false);
   }

  ngOnInit() {
  }

  async choosePicture() {
    this.photo = await this.fileService.choose();
    let arr = this.document.fileUrl.split('/');
    this.imageInfo.name = arr[arr.length - 1];
    console.log(this.photo.fileUri);
  }

  async chooseFile() {
    this.document = await this.fileService.choose();
    let arr = this.document.fileUrl.split('/')
    this.filename = arr[arr.length - 1];
    this.textInfo.name = this.filename;
    console.log(this.document);
  }

  async chooseVideo() {
    this.video = await this.fileService.choose();
    let arr = this.document.fileUrl.split('/');
    this.videoInfo.name = arr[arr.length - 1];
    console.log(this.video);
  }

  async addFacialPrint() {
    let image =  await this.facialrecService.TakePicture();
    this.facialPrint = image.path;
    console.log(this.facialPrint)
  }

  async register(form) {
    console.log(form)

    if (form.form.value.password === form.form.value.password_repeat) {
      
      this.authService.activation(form.form.value, this.facialPrint);

    }else {

      let toast = await this.utilsServices.createToaster('Echec!', 'La répétition du mot de passe n\'est pas identique au mot de passe');
      toast.present();

    }
    
  }

}
