import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FilesRoutingModule } from './files-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FilesComponent } from './files.component';

@NgModule({
  declarations: [FilesComponent],
  imports: [
    CommonModule, //
    TranslateModule,
    SharedModule,
    FilesRoutingModule
  ]
})
export class FilesModule {}
