import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.scss'],
})
export class PrestationComponent implements OnInit {
  public prestation: any;
  constructor(public popoverController: PopoverController, private navParams: NavParams) {
    this.prestation = this.navParams.data.prestation;
    console.log(this.prestation);
   }

  ngOnInit() {}

}
