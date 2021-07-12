import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllProduitsPage } from './all-produits.page';

const routes: Routes = [
  {
    path: '',
    component: AllProduitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllProduitsPageRoutingModule {}
