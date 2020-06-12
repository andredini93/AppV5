import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'config',
        loadChildren: '../config/config.module#ConfigPageModule'
      },
      {
        path: 'dashboard-kpi',
        loadChildren: '../dashboard-kpi/dashboard-kpi.module#DashboardKPIPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/config'
  }
];

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
