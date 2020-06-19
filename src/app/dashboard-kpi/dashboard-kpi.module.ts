import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardKPIPageRoutingModule } from './dashboard-kpi-routing.module';

import { DashboardKPIPage } from './dashboard-kpi.page';
import { VisualizationComponent } from '../components/visualization/visualization.component';
import { KpiModule } from '../components/kpi/kpi.module';
import { LineChartModule } from '../components/lineChart/lineChart.module';
import { VisualizationModule } from '../components/visualization/visualization.module';
import { HttpClientModule } from '@angular/common/http';
import { AtributeFilterModule } from '../components/atribute-filter/atribute-filter.module';
import { AtributeFilterComponent } from '../components/atribute-filter/atribute-filter.component';

@NgModule({
  declarations: [
    DashboardKPIPage
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    DashboardKPIPageRoutingModule,
    KpiModule,
    LineChartModule,
    AtributeFilterModule,
    VisualizationModule
  ],  
  entryComponents: [
    VisualizationComponent,
    AtributeFilterComponent
  ]
})
export class DashboardKPIPageModule {}
