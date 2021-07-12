import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsPublicitePage } from './details-publicite.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsPublicitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsPublicitePageRoutingModule {}
