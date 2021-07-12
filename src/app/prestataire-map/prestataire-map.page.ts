import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../services/map/map.service';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DetailsPrestatairePage } from '../details-prestataire/details-prestataire.page';
import { PopoverController } from '@ionic/angular';
import { PrestataireFilterComponent } from '../components/prestataire-filter/prestataire-filter/prestataire-filter.component';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

declare var google;

@Component({
  selector: 'app-prestataire-map',
  templateUrl: './prestataire-map.page.html',
  styleUrls: ['./prestataire-map.page.scss'],
})
export class PrestataireMapPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  public prestataires: any = [];
  public filter_data: any;
  constructor(public mapService: MapService, public platform: Platform, private translateService: TranslateService, public modalCtrl: ModalController, public popoverController: PopoverController) {
    
   }

  ngOnInit() {
    this.loadDatas();
  }

  async loadDatas() {
    this.prestataires = await this.mapService.loadPrestataires();
    console.log(this.prestataires);
    this.loadMap();
  }

  async loadMap(){

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    await this.platform.ready();
    console.log('Platform is ready')
    let position = await this.mapService.getCurrentPosition();
    console.log('position gotten')
    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(latLng)
    let mapOptions = {
        center: latLng,  
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    for(const prestataire of this.prestataires){
      let latLngPrest = new google.maps.LatLng(prestataire.latitude, prestataire.longitude);
      let cat_name = (this.translateService.currentLang === 'en') ? prestataire.categories[0].categorie_parent.categorie_parent_en : prestataire.categories[0].categorie_parent.categorie_parent;
      this.addMarker(latLngPrest, prestataire.nom, prestataire.id, cat_name);
    }
    

    this.addPersonMarker(latLng, 'Vous êtes ici');

  }

  addMarker(position, infos, presta_id=null, cat='Moi'){

    let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: position
    });

    let content = "<b>"+infos+"</b><br><span style='color: #3880ff'>"+cat+"</span>";

    this.addInfoWindow(marker, content, presta_id);

  }

  addPersonMarker(coord, sub){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: coord,
      icon: {url: 'assets/User_Avatar_2.png',
      scaledSize: new google.maps.Size(30, 30) }
    });

    let content = "<b>"+sub+"</b>";

    this.addInfoWindow(marker, content);
  }

  addInfoWindow(marker, content, presta_id=null){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
      if(presta_id){
        this.presentModal(presta_id);
      }
    });

      infoWindow.open(this.map, marker);
  }

  async presentModal(presta_id) {
    const modal = await this.modalCtrl.create({
      component: DetailsPrestatairePage,
      cssClass: 'my-custom-class',
      componentProps: {
        'presta_id': presta_id,
      }
    });
    return await modal.present();
  }

  async openFilter() {
    let villes = await this.mapService.loadVilles();
    let categories = await this.mapService.loadCategories();
    const popover = await this.popoverController.create({
      component: PrestataireFilterComponent,
      componentProps: {
        "villes": villes,
        "categories": categories
      },
      cssClass: 'my-custom-class',
      translucent: true
    }); 

    popover.onDidDismiss().then((datas) => {
      console.log(datas.data);
      if (datas.data) {
        this.prestataires = datas.data.result;
        this.filter_data = this.prestataires.length;
        console.log(this.prestataires);
        this.loadMap();
      }
    });

    return await popover.present();
  }

}
