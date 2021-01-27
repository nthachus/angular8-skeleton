import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/services/auth.guard';
import { FILES_ROUTE } from '../shared/constants';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: FILES_ROUTE, loadChildren: () => import('./files/files.module').then(m => m.FilesModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
