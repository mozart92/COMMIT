import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avenant-popover',
  templateUrl: './avenant-popover.component.html',
  styleUrls: ['./avenant-popover.component.scss'],
})
export class AvenantPopoverComponent implements OnInit {
  public choices = [];
  public contract : any;
  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];
  public elements = ["garanties", "prime", "nom", "prenom", "adresse", "phone", "nom-benef", "prenom-benef", "date-naiss-benef", "duree-contrat", "moyen-paiement"]
  constructor(public popoverController: PopoverController, private router: Router, private navCtrl: NavController, public navParams: NavParams) {
    this.contract = navParams.data.contract;
   }

  ngOnInit() {}

  LoadChoices(form) {
    console.log(form);
  }

  checkboxChange(event) {
    if(event.detail.checked) {
      this.choices.push(event.detail.value)
    }else {
      this.choices.splice(event.detail.value, 1);
    }
    console.log("The choices are", this.choices);
  }

  radioGroupChange(event) {
    console.log("radioGroupChange", event.detail);
    console.log("radioGroupChange", event);
    console.log("Source element", event.srcElement.attributes[2].nodeValue);

    if (event.detail.value){
      this.choices.push(event.detail.value)
    }else{
      this.choices.splice(this.choices.indexOf(event.srcElement.attributes[2].nodeValue), 1);
    }
    console.log("The choices are", this.choices);
  }

  async closePopover() {
    const onCloseDatas = this.choices;
    await this.popoverController.dismiss(onCloseDatas);
  }

  async leavePopover() {
    this.navCtrl.pop();
    await this.popoverController.dismiss();
  }

}
