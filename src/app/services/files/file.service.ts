import { Injectable } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Capacitor } from '@capacitor/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import Config  from '../../configs';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Plugins, FilesystemDirectory } from '@capacitor/core'; 
import { Platform } from '@ionic/angular';
import { UtilsService } from '../utils/utils.service';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {decode} from "base64-arraybuffer";

const { FileSelector, Filesystem  } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class FileService {
  public apiUrl = '/sinistre/store-sinistre-doc';

  constructor(private fileChooser: FileChooser, private iab: InAppBrowser, private http: HttpClient, private transfer: FileTransfer, private platform: Platform, public utilsService: UtilsService) { }

  async select(filetype, extensions, numbers) { 
    let multiple_selection = numbers; 
    let ext = extensions;
    // let ext = [".pdf"] // list of extensions
    // let ext = ["MP3", "ImaGes"] // combination of extensions or category 
    //let ext = ["videos", "audios", "images"] // list of all category
    //let ext = ["*"] // Allow any file type
    ext = ext.map(v => v.toLowerCase()); 
    let formData = new FormData(); 
    let selectedFile = await FileSelector.fileSelector({ 
      multiple_selection: multiple_selection, 
      ext: ext 
    }) 

    if(this.platform.is("android")) 
    { 
      let paths = JSON.parse(selectedFile.paths) 
      let original_names = JSON.parse(selectedFile.original_names) 
      let extensions = JSON.parse(selectedFile.extensions)
      let result = [];
      for (let index = 0; index < paths.length; index++) {
        let fileUri = await Filesystem.getUri({directory: FilesystemDirectory.Cache, path: original_names[index] + extensions[index]});
        let extent = extensions[index].split('.');
        let file = {
          uri: fileUri.uri,
          path: paths[index],
          file_type: filetype+'/'+extent[extent.length - 1],
          file_name: original_names[index] + extensions[index]
        }
        result.push(file);
      }
      return result;
    } 
    else 
    { 
      for (let index = 0; index < selectedFile.paths.length; index++) { 
        const file = await fetch(selectedFile.paths[index]).then((r) => r.blob()); 
        formData.append( 
          "myfile[]", 
          file, 
          selectedFile.original_names[index] + selectedFile.extensions[index] 
        ); 
      } 
    } 
}

  public async choose() {
    try {
      let uri = await this.fileChooser.open()
      return {fileUrl: Capacitor.convertFileSrc(uri), fileUri: uri};
    } catch (error) {
      console.log(error);
    }
  }

  public async upload(file, fileDatas, apiToken, fileApiUrl) {
    console.log('Started uploading file named: '+ fileDatas.file);
    console.log(fileDatas);
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: fileDatas.file,
      httpMethod: 'POST',
      mimeType: file.file_type,
      headers: {
        'ContentType': 'multipart/form-data',
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": 'Bearer ' + apiToken  
      },
      params: fileDatas
    };

    try {
      return fileTransfer.upload(file.uri, Config.endPoint + fileApiUrl, options)
    } catch (error) {
      console.log('File failed to upload because of: '+error)
    }
  }

  public async uploadFacial(fileUri, username, baseUrl) {
    const loader = await this.utilsService.createLoader('Un instant, nous chargeons votre image...');
    loader.present();

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'file',
      image: 'photo.png',
      httpMethod: 'POST',
      mimeType: 'image/png',
      headers: {
        'ContentType': 'multipart/form-data',
        'galleryName': 'f2663347-fccd-47a8-8486-b4da9fa2c524',
        'x-api-key': '45100280e5014f036c7ec24255490676603bc0e27ea72b581052c7e8',
        'username': username
      }
    };

    try {
      let res = await fileTransfer.upload(fileUri, baseUrl + '/face/register', options);
      console.log(res);
      loader.dismiss();
    } catch (error) {
      console.log(error);
      loader.dismiss();
    }
  }

  public async checkFacial(fileUri, baseUrl) {
    
    const loader = await this.utilsService.createLoader('Un instant, nous chargeons votre image...');
    loader.present();

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options = {
      headers: {
        'ContentType': 'multipart/form-data',
        'galleryName': 'f2663347-fccd-47a8-8486-b4da9fa2c524',
        'x-api-key': '45100280e5014f036c7ec24255490676603bc0e27ea72b581052c7e8',
      }
    };

    //console.log("data pour option ", options);

   /* try {
      let res = await fileTransfer.upload(fileUri, baseUrl + '/face/verify', options);
      let username = JSON.parse(res.response).name;
      console.log(res);
      console.log('The username is ' + username);
      loader.dismiss();
      return username;
    } catch (error) {
      console.log(error)
      loader.dismiss();
    }*/

    // try{
      
    // }catch(error){
    //   console.log("error ici ",error)
    //   loader.dismiss();
    // }
     const blob = await this.convertBase64ToBlob(fileUri);
      const fd = new FormData();
      fd.append('image', blob);
      //fd.append('numDeclaration', '01012018');
      const retour = await this.http.post(baseUrl + '/face/verify', fd, options);
      console.log('stp attend /////')
      let response = {
        "username": null,
        "statusCode" : null
      }
      retour.subscribe((data)=>{
        // const {statusCode,username,message} = data
        // console.log(statusCode)
        // response['statusCode'] = statusCode
        // response['username'] = username
        console.log(data)
      }, 
      (error)=>{
        // console.log(statusCode)
        // response['statusCode'] = statusCode
        console.log(error)
      })
      //console.log('The username is ' + username);
      loader.dismiss();
      console.log("ici response de mon api",response)
      let promise = new Promise((resolve, reject)=>{
        return resolve(response)
      });

      return promise;// username;
  }

  /*
  public async uploadBase64(base64: string, filename: string) {
    const blob = this.convertBase64ToBlob(base64);
    const fd = new FormData();

    fd.append('filedata', blob, filename);
    fd.append('numDeclaration', '01012018');

    return this.http.post('url', fd)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
  */


  public async convertBase64ToBlob(base64: string) {

    return new Blob([new Uint8Array(decode(base64))], {
      type: `image/jpeg`,
  });

  }



}
