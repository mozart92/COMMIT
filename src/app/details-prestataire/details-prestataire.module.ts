import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPrestatairePageRoutingModule } from './details-prestataire-routing.module';

import { DetailsPrestatairePage } from './details-prestataire.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPrestatairePageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailsPrestatairePage]
})
export class DetailsPrestatairePageModule {}
