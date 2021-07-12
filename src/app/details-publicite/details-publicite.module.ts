import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPublicitePageRoutingModule } from './details-publicite-routing.module';

import { DetailsPublicitePage } from './details-publicite.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPublicitePageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailsPublicitePage]
})
export class DetailsPublicitePageModule {}
