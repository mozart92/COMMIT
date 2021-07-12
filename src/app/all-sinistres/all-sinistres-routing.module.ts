import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllSinistresPage } from './all-sinistres.page';

const routes: Routes = [
  {
    path: '',
    component: AllSinistresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllSinistresPageRoutingModule {}
