import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectReportPageRoutingModule } from './select-report-routing.module';

import { SelectReportPage } from './select-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectReportPageRoutingModule
  ],
  declarations: [SelectReportPage]
})
export class SelectReportPageModule {}
