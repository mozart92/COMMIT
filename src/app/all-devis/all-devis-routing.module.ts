import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllDevisPage } from './all-devis.page';

const routes: Routes = [
  {
    path: '',
    component: AllDevisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllDevisPageRoutingModule {}
