import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractDetailsPage } from './contract-details.page';

const routes: Routes = [
  {
    path: '',
    component: ContractDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractDetailsPageRoutingModule {}
