import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-avenant-details',
  templateUrl: './avenant-details.component.html',
  styleUrls: ['./avenant-details.component.scss'],
})
export class AvenantDetailsComponent implements OnInit {
  public avenant: any;
  constructor(public popoverController: PopoverController, private navParams: NavParams) { 
    this.avenant = navParams.data.avenant;
  }

  ngOnInit() {}

  getKeys(jsonObject) {
    return Object.keys(jsonObject);
  }

  async closePopover() {
    await this.popoverController.dismiss();
  }

}
