import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPrestationPageRoutingModule } from './details-prestation-routing.module';

import { DetailsPrestationPage } from './details-prestation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPrestationPageRoutingModule
  ],
  declarations: [DetailsPrestationPage]
})
export class DetailsPrestationPageModule {}
