import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllSinistresPageRoutingModule } from './all-sinistres-routing.module';

import { AllSinistresPage } from './all-sinistres.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllSinistresPageRoutingModule,
    TranslateModule
  ],
  declarations: [AllSinistresPage]
})
export class AllSinistresPageModule {}
