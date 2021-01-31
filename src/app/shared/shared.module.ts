import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileSizePipe } from './pipes/file-size.pipe';
import { FileTypePipe } from './pipes/file-type.pipe';
import { MediaTypePipe } from './pipes/media-type.pipe';

@NgModule({
  declarations: [
    FileSizePipe, //
    FileTypePipe,
    MediaTypePipe
  ],
  imports: [CommonModule],
  exports: [
    FileSizePipe, //
    FileTypePipe,
    MediaTypePipe
  ]
})
export class SharedModule {}
