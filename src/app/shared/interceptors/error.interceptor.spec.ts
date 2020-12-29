import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [ErrorInterceptor]
    });
  });

  it('should ...', inject([ErrorInterceptor], (interceptor: ErrorInterceptor) => {
    expect(interceptor).toBeTruthy();
  }));
});
