import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class TranslateInterceptor implements HttpInterceptor {
  private translate: TranslateService;

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url || req.url.indexOf(environment.apiBaseUrl) < 0) {
      return next.handle(req);
    }

    // Add Accept-Language header with the current language if available
    if (!this.translate) {
      this.translate = this.injector.get(TranslateService);
    }

    const lang = this.translate.currentLang;
    if (lang) {
      req = req.clone({
        setHeaders: { 'Accept-Language': lang }
      });
    }

    return next.handle(req);
  }
}
