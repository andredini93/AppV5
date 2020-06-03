import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectProjectPage } from './select-project.page';

const routes: Routes = [
  {
    path: '',
    component: SelectProjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectProjectPageRoutingModule {}
