import { Component, OnInit } from '@angular/core';
import { InfosService } from '../services/infos/infos.service';
import Config  from '../configs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product-devis',
  templateUrl: './product-devis.page.html',
  styleUrls: ['./product-devis.page.scss'],
})
export class ProductDevisPage implements OnInit {

  public produits: any;
  public serverUrl = Config.serverUrl;
  constructor(public infosService: InfosService, private translateService: TranslateService) { 
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.loadProducts();
    })
  }

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    this.produits = await this.infosService.loadAllProduits();
  }
}
