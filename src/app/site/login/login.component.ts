import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { FORCED_LOGOUT, LOGOUT_CAUSE } from '../../shared/constants';
import { Logger } from '../../shared/logger';
import { AuthService, TokenData } from '../../shared/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string | null;
  private returnUrl: string;

  constructor(
    private router: Router, //
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;

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
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
      return;
    }

    this.authService.login(f.value.loginId, f.value.password).subscribe(
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

    this.router.navigate([redirectUrl]).then(ok => Logger.info('onLoggedIn', ok));
  }
}
