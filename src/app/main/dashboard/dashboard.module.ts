import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadxModule } from 'ngx-uploadx';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule, //
    UploadxModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
