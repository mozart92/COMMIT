import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsProduitPage } from './details-produit.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsProduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsProduitPageRoutingModule {}
