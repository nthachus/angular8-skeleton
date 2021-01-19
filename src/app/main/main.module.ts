import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MainRoutingModule } from './main-routing.module';
import { UserFileService } from './services/user-file.service';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';
import { ToastsComponent } from './toasts/toasts.component';

@NgModule({
  declarations: [
    MainComponent, //
    HeaderComponent,
    ToastsComponent
  ],
  imports: [
    CommonModule, //
    NgbDropdownModule,
    NgbToastModule,
    FormsModule,
    TranslateModule,
    MainRoutingModule
  ],
  providers: [UserFileService],
  exports: [MainComponent]
})
export class MainModule {}
