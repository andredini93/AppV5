import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardKPIPage } from './dashboard-kpi.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardKPIPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardKPIPageRoutingModule {}
