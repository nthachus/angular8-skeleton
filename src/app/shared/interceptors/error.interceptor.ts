import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { LOGOUT_CAUSE } from '../constants';
import { Logger } from '../logger';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url || req.url.indexOf(environment.apiBaseUrl) < 0) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError(err => {
        // DEBUG
        Logger.error(err);

        if (err.status === 401) {
          // Auto logout if 401 response returned from API
          localStorage.setItem(LOGOUT_CAUSE, err.error.message || err.error || err.message);
          AuthService.doLogout(this.router);

          return of(err);
        }

        return throwError(err);
      })
    );
  }
}
