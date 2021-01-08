import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { LOGOUT_CAUSE } from '../constants';
import { Logger } from '../logger';
import { AuthService, TokenData } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let user: TokenData | null;
    try {
      user = this.authService.isAuthenticated();
    } catch (err) {
      localStorage.setItem(LOGOUT_CAUSE, err.message);
      user = null;
    }

    if (user) {
      // Check if route is restricted by role
      if (user.role && route.data.authorize && route.data.authorize.indexOf(user.role) < 0) {
        this.router.navigate(['/']).then(ok => Logger.info('canActivate', ok));
        return false;
      }

      // Authorized so return true
      return true;
    }

    // Not logged in so redirect to login page with the return URL
    this.authService.logout(this.router, state);
    return false;
  }
}
