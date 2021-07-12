import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SinistresPage } from './sinistres.page';

const routes: Routes = [
  {
    path: '',
    component: SinistresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SinistresPageRoutingModule {}
