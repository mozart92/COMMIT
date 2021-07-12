import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsPrestationPage } from './details-prestation.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsPrestationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsPrestationPageRoutingModule {}
