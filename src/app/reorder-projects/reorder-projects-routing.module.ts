import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReorderProjectsPage } from './reorder-projects.page';

const routes: Routes = [
  {
    path: '',
    component: ReorderProjectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReorderProjectsPageRoutingModule {}
