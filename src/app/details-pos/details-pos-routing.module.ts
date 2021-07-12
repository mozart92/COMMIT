import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsPosPage } from './details-pos.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsPosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsPosPageRoutingModule {}
