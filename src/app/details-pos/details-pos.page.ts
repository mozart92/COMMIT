import { Component, OnInit, Input } from '@angular/core';
import { MapService } from '../services/map/map.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details-pos',
  templateUrl: './details-pos.page.html',
  styleUrls: ['./details-pos.page.scss'],
})
export class DetailsPosPage implements OnInit {

  @Input() pos_id: string;
  public pos: any;
  constructor(public mapService: MapService, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.getPos();
  }

  async getPos() {
    this.pos = await this.mapService.loadPos(this.pos_id);
  }

  closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
