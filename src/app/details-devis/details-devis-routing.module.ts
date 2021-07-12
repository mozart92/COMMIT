import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsDevisPage } from './details-devis.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsDevisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsDevisPageRoutingModule {}
