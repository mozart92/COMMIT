import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeclarationSinistrePage } from './declaration-sinistre.page';

const routes: Routes = [
  {
    path: '',
    component: DeclarationSinistrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeclarationSinistrePageRoutingModule {}
