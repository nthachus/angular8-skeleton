import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { FileTypePipe } from '../../shared/pipes/file-type.pipe';
import { UserFileService } from '../services/user-file.service';
import { FilesComponent } from './files.component';

describe('FilesComponent', () => {
  let component: FilesComponent;
  let fixture: ComponentFixture<FilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, TranslateModule.forRoot()],
      providers: [UserFileService],
      declarations: [FileSizePipe, FileTypePipe, FilesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
