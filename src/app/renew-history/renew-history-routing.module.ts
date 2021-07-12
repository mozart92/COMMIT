import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RenewHistoryPage } from './renew-history.page';

const routes: Routes = [
  {
    path: '',
    component: RenewHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RenewHistoryPageRoutingModule {}
