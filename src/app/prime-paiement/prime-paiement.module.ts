import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrimePaiementPageRoutingModule } from './prime-paiement-routing.module';

import { PrimePaiementPage } from './prime-paiement.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrimePaiementPageRoutingModule,
    TranslateModule
  ],
  declarations: [PrimePaiementPage]
})
export class PrimePaiementPageModule {}
