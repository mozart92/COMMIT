import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePrestationsPage } from './update-prestations.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePrestationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePrestationsPageRoutingModule {}
