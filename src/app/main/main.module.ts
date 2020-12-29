import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [MainComponent, HeaderComponent],
  imports: [
    CommonModule, //
    MainRoutingModule
  ],
  // providers: [UserService, UserFileService],
  exports: [MainComponent]
})
export class MainModule {}
