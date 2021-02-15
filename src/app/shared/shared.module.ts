import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { FileSizePipe } from './pipes/file-size.pipe';
import { FileTypePipe } from './pipes/file-type.pipe';
import { MediaTypePipe } from './pipes/media-type.pipe';
import { ToastsComponent } from './components/toasts/toasts.component';

@NgModule({
  declarations: [
    FileSizePipe, //
    FileTypePipe,
    MediaTypePipe,
    ToastsComponent
  ],
  imports: [
    CommonModule, //
    NgbToastModule
  ],
  exports: [
    FileSizePipe, //
    FileTypePipe,
    MediaTypePipe,
    ToastsComponent
  ]
})
export class SharedModule {}
