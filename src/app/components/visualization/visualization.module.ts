import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VisualizationComponent } from './visualization.component';

@NgModule({
    declarations: [VisualizationComponent],
    exports: [VisualizationComponent],
    imports: [CommonModule]
})
export class VisualizationModule {}