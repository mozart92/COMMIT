import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsActualitePageRoutingModule } from './details-actualite-routing.module';

import { DetailsActualitePage } from './details-actualite.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsActualitePageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailsActualitePage]
})
export class DetailsActualitePageModule {}
