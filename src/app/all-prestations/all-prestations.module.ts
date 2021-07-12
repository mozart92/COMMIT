import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPrestationsPageRoutingModule } from './all-prestations-routing.module';

import { AllPrestationsPage } from './all-prestations.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllPrestationsPageRoutingModule,
    TranslateModule
  ],
  declarations: [AllPrestationsPage]
})
export class AllPrestationsPageModule {}
