import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsDevisPageRoutingModule } from './details-devis-routing.module';

import { DetailsDevisPage } from './details-devis.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsDevisPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailsDevisPage]
})
export class DetailsDevisPageModule {}
