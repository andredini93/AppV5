import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardKPIPageRoutingModule } from './dashboard-kpi-routing.module';

import { DashboardKPIPage } from './dashboard-kpi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardKPIPageRoutingModule
  ],
  declarations: [DashboardKPIPage]
})
export class DashboardKPIPageModule {}
