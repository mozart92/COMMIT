import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractUpdatePageRoutingModule } from './contract-update-routing.module';

import { ContractUpdatePage } from './contract-update.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractUpdatePageRoutingModule,
    TranslateModule
  ],
  declarations: [ContractUpdatePage]
})
export class ContractUpdatePageModule {}
