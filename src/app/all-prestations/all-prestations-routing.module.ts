import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllPrestationsPage } from './all-prestations.page';

const routes: Routes = [
  {
    path: '',
    component: AllPrestationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllPrestationsPageRoutingModule {}
