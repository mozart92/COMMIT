import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsSinistrePageRoutingModule } from './details-sinistre-routing.module';

import { DetailsSinistrePage } from './details-sinistre.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsSinistrePageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailsSinistrePage]
})
export class DetailsSinistrePageModule {}
