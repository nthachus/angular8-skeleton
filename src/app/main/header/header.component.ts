import { Component, OnInit } from '@angular/core';

import { FILES_LINK, FORCED_LOGOUT, LOGIN_LINK } from '../../shared/constants';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  readonly loginLink = LOGIN_LINK;
  readonly filesLink = FILES_LINK;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    localStorage.setItem(FORCED_LOGOUT, `${true}`);
  }
}
