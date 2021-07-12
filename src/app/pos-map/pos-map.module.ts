import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PosMapPageRoutingModule } from './pos-map-routing.module';

import { PosMapPage } from './pos-map.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PosMapPageRoutingModule,
    TranslateModule
  ],
  declarations: [PosMapPage]
})
export class PosMapPageModule {}
