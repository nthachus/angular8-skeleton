import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UploadxModule } from 'ngx-uploadx';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { FileTypePipe } from '../../shared/pipes/file-type.pipe';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    FileSizePipe, //
    FileTypePipe,
    DashboardComponent
  ],
  imports: [
    CommonModule, //
    TranslateModule,
    UploadxModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {}
