import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractUpdatePage } from './contract-update.page';

const routes: Routes = [
  {
    path: '',
    component: ContractUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractUpdatePageRoutingModule {}
