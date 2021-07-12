import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PosMapPage } from './pos-map.page';

const routes: Routes = [
  {
    path: '',
    component: PosMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosMapPageRoutingModule {}
