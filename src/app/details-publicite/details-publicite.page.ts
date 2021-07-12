import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfosService } from '../services/infos/infos.service';
import Config  from '../configs';

@Component({
  selector: 'app-details-publicite',
  templateUrl: './details-publicite.page.html',
  styleUrls: ['./details-publicite.page.scss'],
})
export class DetailsPublicitePage implements OnInit {

  public pub:any;
  public pub_id:any;
  public serverUrl = Config.serverUrl;
  constructor(public activatedRoute: ActivatedRoute, public infosService: InfosService) {
    this.pub_id = this.activatedRoute.snapshot.paramMap.get('pub_id');
    this.getPublicite();
   }

  ngOnInit() {
  }

  async getPublicite() {
    this.pub = await this.infosService.findAdvert(this.pub_id);
    console.log(this.pub);
  } 

}
