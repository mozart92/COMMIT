import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsActualitePage } from './details-actualite.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsActualitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsActualitePageRoutingModule {}
