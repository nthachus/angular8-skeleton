import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { Logger } from '../logger';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    try {
      const user = this.authService.isAuthenticated();
      if (user) {
        // Check if route is restricted by role
        if (user.role && route.data.authorize && route.data.authorize.indexOf(user.role) < 0) {
          this.router.navigate(['/']).then(ok => Logger.info('canActivate', ok));
          return false;
        }

        // Authorized so return true
        return true;
      }
    } catch (err) {
      localStorage.setItem('logoutCause', err.message);
    }

    // Not logged in so redirect to login page with the return URL
    this.authService.logout(this.router, state);
    return false;
  }
}
