import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecondActivationPage } from './second-activation.page';

const routes: Routes = [
  {
    path: '',
    component: SecondActivationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecondActivationPageRoutingModule {}
