import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePrestationsPageRoutingModule } from './update-prestations-routing.module';

import { UpdatePrestationsPage } from './update-prestations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePrestationsPageRoutingModule
  ],
  declarations: [UpdatePrestationsPage]
})
export class UpdatePrestationsPageModule {}
