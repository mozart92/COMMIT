import { Component, Input, OnInit } from '@angular/core';
import { MapService } from '../services/map/map.service';
import { ModalController } from '@ionic/angular';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core'; 

@Component({
  selector: 'app-details-prestataire',
  templateUrl: './details-prestataire.page.html',
  styleUrls: ['./details-prestataire.page.scss'],
})
export class DetailsPrestatairePage implements OnInit {

  @Input() presta_id: string;
  public prestataire: any;
  public categories: string = "";
  constructor(public mapService: MapService,  private translateService: TranslateService, public modalCtrl: ModalController) { 
    console.log('loading prestation for:'+this.presta_id);
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getPrestataire();
    })
  }

  ngOnInit() {
    this.getPrestataire();
  }

  async getPrestataire() {
    this.prestataire = await this.mapService.loadPrestataire(this.presta_id);
    for (const cat of this.prestataire.categories) {
      this.categories += (this.translateService.currentLang === 'en') ? (cat.designation_en + ', ') : (cat.designation + ', ');
    }
    console.log('Prestataire found:'+this.prestataire);
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
