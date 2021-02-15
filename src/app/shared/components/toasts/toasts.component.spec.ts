import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastsComponent } from './toasts.component';

describe('ToastsComponent', () => {
  let component: ToastsComponent;
  let fixture: ComponentFixture<ToastsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbToastModule],
      declarations: [ToastsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
