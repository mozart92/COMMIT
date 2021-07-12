import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractMenuPage } from './contract-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ContractMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractMenuPageRoutingModule {}
