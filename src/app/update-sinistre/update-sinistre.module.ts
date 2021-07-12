import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateSinistrePageRoutingModule } from './update-sinistre-routing.module';

import { UpdateSinistrePage } from './update-sinistre.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateSinistrePageRoutingModule,
    TranslateModule
  ],
  declarations: [UpdateSinistrePage]
})
export class UpdateSinistrePageModule {}
