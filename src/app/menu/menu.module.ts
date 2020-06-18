import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { Routes, RouterModule } from '@angular/router';
import { ConfigModule } from '@gooddata/gooddata-js/lib/config';
import { ConfigPageModule } from '../config/config.module';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomeModule)
      },
      {
        path: 'dashboard-kpi',
        loadChildren: () => import('../dashboard-kpi/dashboard-kpi.module').then( m => m.DashboardKPIPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'reorder-tabs',
        loadChildren: () => import('../reorder-tabs/reorder-tabs.module').then( m => m.ReorderTabsPageModule)
      },
      {
        path: 'select-project',
        loadChildren: () => import('../select-project/select-project.module').then( m => m.SelectProjectPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
      }
    ]
  }
  // ,
  // {
  //   path: '',
  //   redirectTo: '/menu/config'
  // }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
