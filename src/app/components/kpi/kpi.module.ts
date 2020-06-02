import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { KpiComponent } from './kpi.component';

@NgModule({
    declarations: [KpiComponent],
    exports: [KpiComponent],
    imports: [CommonModule]
})
export class KpiModule {}