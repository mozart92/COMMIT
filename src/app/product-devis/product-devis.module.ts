import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDevisPageRoutingModule } from './product-devis-routing.module';

import { ProductDevisPage } from './product-devis.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDevisPageRoutingModule,
    TranslateModule
  ],
  declarations: [ProductDevisPage]
})
export class ProductDevisPageModule {}
