import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeclarationSinistrePageRoutingModule } from './declaration-sinistre-routing.module';

import { DeclarationSinistrePage } from './declaration-sinistre.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeclarationSinistrePageRoutingModule,
    TranslateModule
  ],
  declarations: [DeclarationSinistrePage]
})
export class DeclarationSinistrePageModule {}
