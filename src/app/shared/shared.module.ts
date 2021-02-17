import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastsComponent } from './components/toasts/toasts.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { FileTypePipe } from './pipes/file-type.pipe';
import { MediaTypePipe } from './pipes/media-type.pipe';
import { SortableComponent } from './components/sortable/sortable.component';

@NgModule({
  declarations: [
    ToastsComponent, //
    FileSizePipe,
    FileTypePipe,
    MediaTypePipe,
    SortableComponent
  ],
  imports: [
    CommonModule, //
    NgbToastModule
  ],
  exports: [
    ToastsComponent, //
    FileSizePipe,
    FileTypePipe,
    MediaTypePipe,
    SortableComponent
  ]
})
export class SharedModule {}
