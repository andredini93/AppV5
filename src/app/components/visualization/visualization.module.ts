import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VisualizationComponent } from './visualization.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [VisualizationComponent],
    exports: [VisualizationComponent],
    imports: [
      CommonModule,
      IonicModule
    ]
})
export class VisualizationModule {}