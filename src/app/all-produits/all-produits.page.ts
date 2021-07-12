import { Component, OnInit } from '@angular/core';
import { InfosService } from '../services/infos/infos.service';
import Config  from '../configs';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-all-produits',
  templateUrl: './all-produits.page.html',
  styleUrls: ['./all-produits.page.scss'],
})
export class AllProduitsPage implements OnInit {

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
