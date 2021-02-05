import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { FORCED_LOGOUT, LOGOUT_CAUSE } from '../../shared/constants';
import { Logger } from '../../shared/logger';
import { AuthService, TokenData } from '../../shared/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage: string | null; // TODO: private set
  isLoading: boolean;

  private returnUrl: string | null;
  private routerSub: Subscription;

  constructor(
    private router: Router, //
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.routerSub = this.route.queryParamMap.subscribe(params => {
      this.returnUrl = params.get('returnUrl');

      // Is already logged-in?
      const data = this.authService.tokenData;
      if (data) {
        this.onLoggedIn(data);
      } else if (!localStorage.getItem(FORCED_LOGOUT)) {
        // Auto-login with client SSL
        this.tryLoginWithSsl();
      } else {
        this.initLayout();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  onSubmit(f: NgForm) {
    if (!f.valid || this.isLoading) {
      return;
    }
    this.isLoading = true;

    this.authService
      .login(f.value.loginId, f.value.password)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (user: TokenData) => {
          // TODO: if (!user) Invalid token?
          this.onLoggedIn(user);
        },
        err => {
          // If username or password is incorrect
          f.resetForm();
          this.errorMessage = err.error.message || err.error || err.message;
        }
      );
  }

  private tryLoginWithSsl(): void {
    this.authService.loginSsl().subscribe(user => {
      if (!user) {
        this.initLayout();
      } else {
        this.onLoggedIn(user);
      }
    });
  }

  private initLayout() {
    this.errorMessage = localStorage.getItem(LOGOUT_CAUSE);
    if (this.errorMessage) {
      localStorage.removeItem(LOGOUT_CAUSE);
    }
  }

  private onLoggedIn(data: TokenData) {
    localStorage.removeItem(FORCED_LOGOUT);

    const redirectUrl = this.returnUrl || '/';
    Logger.info('onLoggedIn', data, redirectUrl);

    this.router.navigateByUrl(redirectUrl).then(ok => Logger.info('onLoggedIn', ok));
  }
}
