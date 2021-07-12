import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfosService } from '../services/infos/infos.service';
import Config  from '../configs';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.page.html',
  styleUrls: ['./details-produit.page.scss'],
})
export class DetailsProduitPage implements OnInit {

  public produit:any;
  public produit_id:any;
  public serverUrl = Config.serverUrl;
  constructor(public activatedRoute: ActivatedRoute, public infosService: InfosService) {
    this.produit_id = this.activatedRoute.snapshot.paramMap.get('product_id');
    this.getProduit();
   }

  ngOnInit() {
  }

  async getProduit() {
    this.produit = await this.infosService.findProduit(this.produit_id);
    console.log(this.produit);
  }

}
