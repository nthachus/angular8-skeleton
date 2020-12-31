import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Logger } from '../../shared/logger';
import { AuthService, TokenData } from '../../shared/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
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
    } else if (!localStorage.getItem('forcedLogout')) {
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
      user => {
        if (!user) {
          // Invalid token?
          f.resetForm();
          this.errorMessage = 'Something went wrong!';
        } else {
          this.onLoggedIn(user);
        }
      },
      ex => {
        // If username or password is incorrect
        f.resetForm();
        this.errorMessage = ex.error.error || ex.message || ex.statusText;
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
    // DEBUG
    Logger.info('initLayout', this.returnUrl);
  }

  private onLoggedIn(data: TokenData) {
    localStorage.removeItem('forcedLogout');

    const redirectUrl = this.returnUrl || '/';
    Logger.info('onLoggedIn', data, redirectUrl);

    this.router.navigate([redirectUrl]).then(ok => Logger.info('onLoggedIn', ok));
  }
}
