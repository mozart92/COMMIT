import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrestataireMapPage } from './prestataire-map.page';

const routes: Routes = [
  {
    path: '',
    component: PrestataireMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestataireMapPageRoutingModule {}
