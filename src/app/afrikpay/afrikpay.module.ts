import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfrikpayPageRoutingModule } from './afrikpay-routing.module';

import { AfrikpayPage } from './afrikpay.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfrikpayPageRoutingModule,
    TranslateModule
  ],
  declarations: [AfrikpayPage]
})
export class AfrikpayPageModule {}
