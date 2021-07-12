import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsProduitPageRoutingModule } from './details-produit-routing.module';

import { DetailsProduitPage } from './details-produit.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsProduitPageRoutingModule,
    TranslateModule
  ],
  declarations: [DetailsProduitPage]
})
export class DetailsProduitPageModule {}
