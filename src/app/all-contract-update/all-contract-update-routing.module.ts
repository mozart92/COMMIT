import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllContractUpdatePage } from './all-contract-update.page';

const routes: Routes = [
  {
    path: '',
    component: AllContractUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllContractUpdatePageRoutingModule {}
