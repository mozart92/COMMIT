import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsPrestatairePage } from './details-prestataire.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsPrestatairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsPrestatairePageRoutingModule {}
