import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { JwtModule } from '@auth0/angular-jwt';

import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from './header/header.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, //
        NgbDropdownModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
        JwtModule.forRoot({}),
        SharedModule
      ],
      declarations: [MainComponent, HeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
