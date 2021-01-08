import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LOGIN_LINK } from '../shared/constants';
import { SiteComponent } from './site.component';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      { path: LOGIN_LINK.substr(1), loadChildren: () => import('./login/login.module').then(m => m.LoginModule) } //
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule {}
