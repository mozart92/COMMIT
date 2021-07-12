import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractMenuPageRoutingModule } from './contract-menu-routing.module';

import { ContractMenuPage } from './contract-menu.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContractMenuPageRoutingModule,
    TranslateModule
  ],
  declarations: [ContractMenuPage]
})
export class ContractMenuPageModule {}
