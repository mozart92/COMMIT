import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrimePaiementPage } from './prime-paiement.page';

const routes: Routes = [
  {
    path: '',
    component: PrimePaiementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrimePaiementPageRoutingModule {}
