import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsSinistrePage } from './details-sinistre.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsSinistrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsSinistrePageRoutingModule {}
