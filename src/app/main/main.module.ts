import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserFileService } from './services/user-file.service';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    MainComponent, //
    HeaderComponent
  ],
  imports: [
    CommonModule, //
    NgbDropdownModule,
    FormsModule,
    TranslateModule,
    SharedModule,
    MainRoutingModule
  ],
  providers: [UserFileService],
  exports: [MainComponent]
})
export class MainModule {}
