import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPosPageRoutingModule } from './details-pos-routing.module';

import { DetailsPosPage } from './details-pos.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPosPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailsPosPage]
})
export class DetailsPosPageModule {}
