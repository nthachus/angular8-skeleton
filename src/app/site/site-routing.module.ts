import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LOGIN_PATH } from '../shared/constants';
import { SiteComponent } from './site.component';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      { path: LOGIN_PATH, loadChildren: () => import('./login/login.module').then(m => m.LoginModule) } //
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule {}
