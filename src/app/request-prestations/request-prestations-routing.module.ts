import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestPrestationsPage } from './request-prestations.page';

const routes: Routes = [
  {
    path: '',
    component: RequestPrestationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestPrestationsPageRoutingModule {}
