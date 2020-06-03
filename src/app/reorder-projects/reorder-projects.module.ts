import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReorderProjectsPageRoutingModule } from './reorder-projects-routing.module';

import { ReorderProjectsPage } from './reorder-projects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReorderProjectsPageRoutingModule
  ],
  declarations: [ReorderProjectsPage]
})
export class ReorderProjectsPageModule {}
