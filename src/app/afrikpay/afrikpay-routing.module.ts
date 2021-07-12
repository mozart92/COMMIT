import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AfrikpayPage } from './afrikpay.page';

const routes: Routes = [
  {
    path: '',
    component: AfrikpayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AfrikpayPageRoutingModule {}
