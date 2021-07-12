import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevisResultPage } from './devis-result.page';

const routes: Routes = [
  {
    path: '',
    component: DevisResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevisResultPageRoutingModule {}
