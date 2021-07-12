import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllProduitsPageRoutingModule } from './all-produits-routing.module';

import { AllProduitsPage } from './all-produits.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllProduitsPageRoutingModule,
    TranslateModule
  ],
  declarations: [AllProduitsPage]
})
export class AllProduitsPageModule {}
