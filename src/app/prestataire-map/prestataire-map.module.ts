import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrestataireMapPageRoutingModule } from './prestataire-map-routing.module';

import { PrestataireMapPage } from './prestataire-map.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrestataireMapPageRoutingModule,
    TranslateModule
  ],
  declarations: [PrestataireMapPage]
})
export class PrestataireMapPageModule {}
