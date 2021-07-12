import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrimeHistoryPageRoutingModule } from './prime-history-routing.module';

import { PrimeHistoryPage } from './prime-history.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrimeHistoryPageRoutingModule,
    TranslateModule
  ],
  declarations: [PrimeHistoryPage]
})
export class PrimeHistoryPageModule {}
