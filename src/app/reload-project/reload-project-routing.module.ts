import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReloadProjectPage } from './reload-project.page';

const routes: Routes = [
  {
    path: '',
    component: ReloadProjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReloadProjectPageRoutingModule {}
