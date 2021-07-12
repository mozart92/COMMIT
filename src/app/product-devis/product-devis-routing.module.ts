import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDevisPage } from './product-devis.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDevisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDevisPageRoutingModule {}
