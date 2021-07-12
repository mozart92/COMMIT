import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevisResultPageRoutingModule } from './devis-result-routing.module';

import { DevisResultPage } from './devis-result.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevisResultPageRoutingModule,
    TranslateModule
  ],
  declarations: [DevisResultPage]
})
export class DevisResultPageModule {}
