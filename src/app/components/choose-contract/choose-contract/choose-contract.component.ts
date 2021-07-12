import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-choose-contract',
  templateUrl: './choose-contract.component.html',
  styleUrls: ['./choose-contract.component.scss'],
})
export class ChooseContractComponent implements OnInit {

  public contracts: any = [];

  constructor(public popoverController: PopoverController, private navParams: NavParams) { 
    this.contracts = this.navParams.data.contracts;
  }

  async makeChoice(num_contrat) {
    const onCloseDatas = num_contrat;
    await this.popoverController.dismiss(onCloseDatas);
  }

  ngOnInit() {}

}
