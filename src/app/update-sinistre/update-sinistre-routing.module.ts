import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateSinistrePage } from './update-sinistre.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateSinistrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateSinistrePageRoutingModule {}
