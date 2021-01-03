import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Logger } from '../logger';

export interface TokenData {
  sub: number; // user_id
  jti: string; // session_token
  name: string;
  email?: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient, //
    @Inject(DOCUMENT) private document: Document,
    private jwtHelper: JwtHelperService
  ) {}

  login(loginId: string, password: string): Observable<TokenData | null> {
    const model = { username: loginId, password };

    return this.http.post<any>(`${environment.apiBaseUrl}auth/login`, model).pipe(
      map(res => {
        if (!res || !res.jwt) {
          throw res;
        }

        return this.doLogin(res.jwt);
      })
    );
  }

  get tokenData(): TokenData | null {
    const token = AuthService.currentToken();
    return !token ? null : this.decodeTokenData(token);
  }

  isAuthenticated(): TokenData | null {
    const token = AuthService.currentToken();
    return !token || this.jwtHelper.isTokenExpired(token) ? null : this.decodeTokenData(token);
  }

  logout(redirect?: Router, state?: RouterStateSnapshot): void {
    AuthService.doLogout(redirect, state);
  }

  loginSsl(): Observable<TokenData | null> {
    if (!this.isSsl()) {
      return of(null);
    }

    return this.http.post<any>(`${environment.apiBaseUrl}auth/login_ssl`, null).pipe(
      map(res => {
        if (!res || !res.jwt) {
          throw res;
        }

        return this.doLogin(res.jwt);
      }),
      catchError(err => {
        // Skip client SSL errors
        Logger.warn(err.error || err);

        return of(null);
      })
    );
  }

  private doLogin(jwt: string): TokenData | null {
    const data = this.decodeTokenData(jwt);
    localStorage.setItem('token', jwt);

    return data;
  }

  private decodeTokenData(jwt: string): TokenData | null {
    const decoded = this.jwtHelper.decodeToken(jwt);
    return !decoded ? null : (decoded as TokenData);
  }

  private isSsl(): boolean {
    return /^https:/i.test(this.document.location.protocol);
  }

  static currentToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Logout and redirect back to the Login page if specifying.
   *
   * @param redirect Skip this will not redirecting.
   * @param state    Used to retrieve the current URL.
   */
  static doLogout(redirect?: Router, state?: RouterStateSnapshot): void {
    localStorage.removeItem('token');

    if (redirect) {
      const returnUrl = (state || redirect.routerState.snapshot).url;
      Logger.info('logout', returnUrl);

      if (!/^(\/#)?\/login\b/.test(returnUrl)) {
        redirect.navigate(['/login'], { queryParams: { returnUrl } }).then(ok => Logger.info('logged-out', ok));
      }
    }
  }
}
