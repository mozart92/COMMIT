import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../services/map/map.service';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { DetailsPosPage } from '../details-pos/details-pos.page';

declare var google;

@Component({
  selector: 'app-pos-map',
  templateUrl: './pos-map.page.html',
  styleUrls: ['./pos-map.page.scss'],
})
export class PosMapPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  public pos: any = [];
  constructor(public mapService: MapService, public platform: Platform, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.loadDatas();
  }

  async loadDatas() {
    this.pos = await this.mapService.loadPointsVente();
    console.log(this.pos);
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

    for(const point of this.pos){
      let latLngPrest = new google.maps.LatLng(point.latitude, point.longitude);
      this.addMarker(latLngPrest, point.nom, point.id, point.telephone);
    }
    

    this.addPersonMarker(latLng, 'Vous êtes ici');

  }

  addMarker(position, infos, presta_id=null, cat='Moi'){

    let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: position,
        icon: {url: 'assets/icon.png',
        scaledSize: new google.maps.Size(30, 30) }
    });

    let content = "<b>"+infos+"</b>";

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

  addInfoWindow(marker, content, pos_id=null){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
      if(pos_id){
        this.presentModal(pos_id);
      }
    });

      infoWindow.open(this.map, marker);
  }

  async presentModal(pos_id) {
    const modal = await this.modalCtrl.create({
      component: DetailsPosPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'pos_id': pos_id,
      }
    });
    return await modal.present();
  }

}
