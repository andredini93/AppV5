import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReorderTabsPageRoutingModule } from './reorder-tabs-routing.module';

import { ReorderTabsPage } from './reorder-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReorderTabsPageRoutingModule
  ],
  declarations: [ReorderTabsPage]
})
export class ReorderTabsPageModule {}
