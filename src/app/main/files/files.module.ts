import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FilesRoutingModule } from './files-routing.module';
import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { FileTypePipe } from '../../shared/pipes/file-type.pipe';
import { FilesComponent } from './files.component';

@NgModule({
  declarations: [
    FileSizePipe, //
    FileTypePipe,
    FilesComponent
  ],
  imports: [
    CommonModule, //
    TranslateModule,
    FilesRoutingModule
  ]
})
export class FilesModule {}
