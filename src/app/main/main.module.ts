import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [MainComponent, HeaderComponent],
  imports: [
    CommonModule, //
    NgbDropdownModule,
    FormsModule,
    TranslateModule,
    MainRoutingModule
  ],
  // providers: [UserService, UserFileService],
  exports: [MainComponent]
})
export class MainModule {}
