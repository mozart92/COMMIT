import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import Config  from '../../configs';
import { UtilsService } from '../utils/utils.service';
import { StorageService } from '../storage/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {
  private advertUrl = "/publicite/get-publicite";
  constructor(public http: HTTP, public utilsService: UtilsService, public storageService: StorageService, public translateService: TranslateService) { 
   
  }

  public async loadImages () {
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
      'pays_id': user.infos.pays_id.toString()
    }
    console.log(params);

    try {

      const res = await this.http.get(Config.endPoint + this.advertUrl, params, headers);
      let datas = JSON.parse(res.data)
      console.log(JSON.parse(res.data));
      let imageSources = [];
      if (datas.success) {
        for (const pub of datas.data) {
          imageSources.push(Config.serverUrl + pub.chemin_acces);
        }
      }

      return imageSources;

    } catch (error) {
      console.log(error);

    }
  }
  
}
