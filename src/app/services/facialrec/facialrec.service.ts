import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
import { FileService } from '../files/file.service';
import { UtilsService } from '../utils/utils.service';
// import { AuthService } from '../auth/auth.service';

const { Camera, Filesystem, Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class FacialrecService {

  public baseUrl = "https://cognitive.sevengps.xyz/api/v2";

  constructor(public fileService: FileService, public utilsService: UtilsService) { }

  public async signUpFacial(fileUri, username) {

    // let fileUri = await this.TakePicture();

    await this.fileService.uploadFacial(fileUri, username, this.baseUrl);

  }

  public async signInWithFacial() {

  
    // await this.fileService.checkFacial('', this.baseUrl);
    let fileUri = await this.TakePicture();
    console.log("data de limage recuper", fileUri)
  
    try {
      return this.fileService.checkFacial(fileUri.base64String, this.baseUrl);
      
    } catch (error) {
      console.log(error);
    }
  }

  public async TakePicture() {
    console.log("hello deburgage")
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64, 
      source: CameraSource.Camera, 
      quality: 100 
    });
    
    return capturedPhoto;
  }
}
