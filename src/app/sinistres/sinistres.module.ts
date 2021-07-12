import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinistresPageRoutingModule } from './sinistres-routing.module';

import { SinistresPage } from './sinistres.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinistresPageRoutingModule,
    TranslateModule
  ],
  declarations: [SinistresPage]
})
export class SinistresPageModule {}
