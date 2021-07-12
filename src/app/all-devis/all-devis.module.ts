import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllDevisPageRoutingModule } from './all-devis-routing.module';

import { AllDevisPage } from './all-devis.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllDevisPageRoutingModule,
    TranslateModule
  ],
  declarations: [AllDevisPage]
})
export class AllDevisPageModule {}
