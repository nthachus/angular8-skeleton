import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { UserFileService } from './user-file.service';

describe('UserFileService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserFileService]
    })
  );

  it('should be created', () => {
    const service: UserFileService = TestBed.get(UserFileService);
    expect(service).toBeTruthy();
  });
});
