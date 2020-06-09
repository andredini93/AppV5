import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard-kpi',
    loadChildren: () => import('./dashboard-kpi/dashboard-kpi.module').then( m => m.DashboardKPIPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'reload-project',
    loadChildren: () => import('./reload-project/reload-project.module').then( m => m.ReloadProjectPageModule)
  },
  {
    path: 'reorder-projects',
    loadChildren: () => import('./reorder-projects/reorder-projects.module').then( m => m.ReorderProjectsPageModule)
  },
  {
    path: 'reorder-tabs',
    loadChildren: () => import('./reorder-tabs/reorder-tabs.module').then( m => m.ReorderTabsPageModule)
  },
  {
    path: 'select-app',
    loadChildren: () => import('./select-app/select-app.module').then( m => m.SelectAppPageModule)
  },
  {
    path: 'select-project',
    loadChildren: () => import('./select-project/select-project.module').then( m => m.SelectProjectPageModule)
  },
  {
    path: 'select-report',
    loadChildren: () => import('./select-report/select-report.module').then( m => m.SelectReportPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
