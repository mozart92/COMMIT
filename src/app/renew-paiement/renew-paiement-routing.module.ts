import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RenewPaiementPage } from './renew-paiement.page';

const routes: Routes = [
  {
    path: '',
    component: RenewPaiementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenewPaiementPageRoutingModule {}
