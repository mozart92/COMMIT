import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllContractUpdatePageRoutingModule } from './all-contract-update-routing.module';

import { AllContractUpdatePage } from './all-contract-update.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllContractUpdatePageRoutingModule,
    TranslateModule
  ],
  declarations: [AllContractUpdatePage]
})
export class AllContractUpdatePageModule {}
