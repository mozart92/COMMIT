import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecondActivationPageRoutingModule } from './second-activation-routing.module';

import { SecondActivationPage } from './second-activation.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecondActivationPageRoutingModule,
    TranslateModule
  ],
  declarations: [SecondActivationPage]
})
export class SecondActivationPageModule {}
