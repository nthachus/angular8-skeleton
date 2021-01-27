import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UploadxModule } from 'ngx-uploadx';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule, //
    TranslateModule,
    UploadxModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
