import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'dashboard-kpi',
        loadChildren: () => import('../dashboard-kpi/dashboard-kpi.module').then( m => m.DashboardKPIPageModule)
      },
      {
        path: 'config',
        loadChildren: () => import('../config/config.module').then( m => m.ConfigPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
