import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LineChartComponent } from './lineChart.component';

@NgModule({
    declarations: [LineChartComponent],
    exports: [LineChartComponent],
    imports: [CommonModule]
})
export class LineChartModule {}