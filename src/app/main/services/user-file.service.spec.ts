import { TestBed } from '@angular/core/testing';

import { UserFileService } from './user-file.service';

describe('UserFileService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [UserFileService]
    })
  );

  it('should be created', () => {
    const service: UserFileService = TestBed.get(UserFileService);
    expect(service).toBeTruthy();
  });
});
