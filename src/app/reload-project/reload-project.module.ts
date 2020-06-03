import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReloadProjectPageRoutingModule } from './reload-project-routing.module';

import { ReloadProjectPage } from './reload-project.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReloadProjectPageRoutingModule
  ],
  declarations: [ReloadProjectPage]
})
export class ReloadProjectPageModule {}
