import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RenewHistoryPageRoutingModule } from './renew-history-routing.module';

import { RenewHistoryPage } from './renew-history.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenewHistoryPageRoutingModule,
    TranslateModule
  ],
  declarations: [RenewHistoryPage]
})
export class RenewHistoryPageModule {}
