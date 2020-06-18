import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AtributeFilterComponent } from './atribute-filter.component';

@NgModule({
    declarations: [AtributeFilterComponent],
    exports: [AtributeFilterComponent],
    imports: [CommonModule]
})
export class AtributeFilterModule {}