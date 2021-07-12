import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrimeHistoryPage } from './prime-history.page';

const routes: Routes = [
  {
    path: '',
    component: PrimeHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrimeHistoryPageRoutingModule {}
