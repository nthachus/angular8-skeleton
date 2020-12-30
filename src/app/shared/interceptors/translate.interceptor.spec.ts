import { inject, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { TranslateInterceptor } from './translate.interceptor';

describe('TranslateInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({})],
      providers: [TranslateInterceptor]
    });
  });

  it('should ...', inject([TranslateInterceptor], (interceptor: TranslateInterceptor) => {
    expect(interceptor).toBeTruthy();
  }));
});
