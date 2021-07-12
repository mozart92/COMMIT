import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RenewPaiementPageRoutingModule } from './renew-paiement-routing.module';

import { RenewPaiementPage } from './renew-paiement.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenewPaiementPageRoutingModule,
    TranslateModule
  ],
  declarations: [RenewPaiementPage]
})
export class RenewPaiementPageModule {}
