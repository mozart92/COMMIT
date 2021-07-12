import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrestationsPage } from './prestations.page';

const routes: Routes = [
  {
    path: '',
    component: PrestationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestationsPageRoutingModule {}
