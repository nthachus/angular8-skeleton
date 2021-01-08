import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { LOGOUT_CAUSE } from '../constants';
import { Logger } from '../logger';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastService: ToastService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url || req.url.indexOf(environment.apiBaseUrl) < 0) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError(err => {
        // DEBUG
        Logger.error(err);
        const message = err.error.message || err.error || err.message;

        // Auto logout if 401 response returned from API
        if (err.status === 401) {
          localStorage.setItem(LOGOUT_CAUSE, message);
          AuthService.doLogout(this.router);

          return of(err);
        }

        // Global error notifications
        this.toastService.error(message, err.error.details);

        return throwError(err);
      })
    );
  }
}
