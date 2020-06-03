import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectAppPage } from './select-app.page';

const routes: Routes = [
  {
    path: '',
    component: SelectAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectAppPageRoutingModule {}
