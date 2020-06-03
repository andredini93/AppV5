import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReorderTabsPage } from './reorder-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: ReorderTabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReorderTabsPageRoutingModule {}
