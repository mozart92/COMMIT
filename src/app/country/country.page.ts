import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { InfosService } from '../services/infos/infos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {

  public pays:any;

  public flags = {
    "COD": "../../assets/rdc.png",
    "GHA": "../../assets/ghana.png",
    "CIV": "../../assets/civ.png",
    "CMR": "../../assets/cmer.png",
    "SLE": "../../assets/sierra.png",
    "LBR": "../../assets/liberia.png",
    "GIN": "../../assets/guinee.png",
    "MUS": "../../assets/maurice.png",
    "FRA": "../../assets/france.png"
  }

  private user_pays:any;

  constructor(public storageService: StorageService, public infosService: InfosService, public router: Router ) {

  }

  ngOnInit() {
    this.checkCountry();
    

  }

  async getPays() {
    this.pays = await this.infosService.loadPays();
  }

  async checkCountry() {
    let keys = await this.storageService.keys();
    console.log(keys);
    let res = keys.includes('user_country');
    console.log(res);
    if (keys.includes('user_country')) {
      console.log('found country')
      this.router.navigate(['/home']);
    }else{
      console.log('could not get the country')
      this.getPays();
    }
  }

  async choosePays(pays_id) {
    let pays = await this.infosService.findPays(pays_id);
    await this.storageService.setObject('user_country', pays);
    this.router.navigate(['/home']);
  }

}
