import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestPrestationsPageRoutingModule } from './request-prestations-routing.module';

import { RequestPrestationsPage } from './request-prestations.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestPrestationsPageRoutingModule,
    TranslateModule
  ],
  declarations: [RequestPrestationsPage]
})
export class RequestPrestationsPageModule {}
