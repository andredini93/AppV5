import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { KpiModule } from '../components/kpi/kpi.module';
import { HttpClientModule } from '@angular/common/http';
import { LineChartModule } from '../components/lineChart/lineChart.module';
import { VisualizationModule } from '../components/visualization/visualization.module';
import { VisualizationComponent } from '../components/visualization/visualization.component';


@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    KpiModule,
    LineChartModule,
    VisualizationModule
  ],
  entryComponents: [
    VisualizationComponent
  ]
  
})
export class HomeModule {}
