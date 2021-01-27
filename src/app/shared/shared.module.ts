import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileSizePipe } from './pipes/file-size.pipe';
import { FileTypePipe } from './pipes/file-type.pipe';

@NgModule({
  declarations: [
    FileSizePipe, //
    FileTypePipe
  ],
  imports: [CommonModule],
  exports: [
    FileSizePipe, //
    FileTypePipe
  ]
})
export class SharedModule {}
