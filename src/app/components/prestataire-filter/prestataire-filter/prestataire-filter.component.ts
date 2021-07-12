import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { MapService } from '../../../services/map/map.service';

@Component({
  selector: 'app-prestataire-filter',
  templateUrl: './prestataire-filter.component.html',
  styleUrls: ['./prestataire-filter.component.scss'],
})
export class PrestataireFilterComponent implements OnInit {

  public villes: any;
  public categories: any;
  public subs: any = []; 
  public error_mess: string;
  constructor(public popoverController: PopoverController, private navParams: NavParams, private mapService: MapService) {
    this.villes = this.navParams.data.villes;
    this.categories = this.navParams.data.categories;
   }

  ngOnInit() {}

  async filter(form) {
    console.log(form.form.value);
    let datas = form.form.value;
    if(datas.nom==='' && datas.ville==='' && datas.categorie==='' && datas.sub_categorie==='') {
      this.error_mess = '*** Vous devez remplir au moins un critère du filtre ***'
    }else{
      let result = await this.mapService.filterPrestataire(datas.nom, datas.ville, datas.categorie, datas.sub_categorie);
      console.log(result);
      const onCloseDatas = {
        filter: datas,
        result: result
      }
      await this.popoverController.dismiss(onCloseDatas);
    }
  }

  loadSubs(event) {
    for (const cat of this.categories) {
      if(cat.id.toString() === event.detail.value){
        this.subs = cat.children;
        console.log(cat);
        break;
      }
    }
    console.log(event.detail.value);
  }

}
