import { Component, OnInit } from '@angular/core';
import { DevisService } from '../services/devis/devis.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-all-devis',
  templateUrl: './all-devis.page.html',
  styleUrls: ['./all-devis.page.scss'],
})
export class AllDevisPage implements OnInit {

  public devis: any;
  public contentTitle = 'to_confirm';
  constructor(public devisService: DevisService, private translateService: TranslateService) { 
    this.getDevis();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getDevis();
    })
  }

  ngOnInit() {
  }

  async getDevis() {
    this.devis = await this.devisService.loadAllDevis();
    console.log(this.devis);
  }

  segmentChanged(ev: any) {
    this.contentTitle = ev.detail.value;
    console.log('Segment changed', ev);
  }

  getColor(statut) {
    if(statut === 1 || statut ===2){
      return 'activgreen';
    }else if(statut === 5){
      return 'danger'
    }else{
      return 'warning'
    }
  }

  async doRefresh(event) {
    console.log('Begin async operation');
    await this.getDevis();
    event.target.complete();
  }

}
