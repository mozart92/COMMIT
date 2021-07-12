import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevisPageRoutingModule } from './devis-routing.module';

import { DevisPage } from './devis.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevisPageRoutingModule,
    TranslateModule
  ],
  declarations: [DevisPage]
})
export class DevisPageModule {}
