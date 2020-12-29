import { NgModule } from '@angular/core';
import { ROUTER_CONFIGURATION, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: '', loadChildren: () => import('./site/site.module').then(m => m.SiteModule) },
  { path: '**', redirectTo: '/' } // Wildcard route for a 404 page
];

export function routerConfigFactory() {
  return { useHash: !window.history.pushState };
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: ROUTER_CONFIGURATION, useFactory: routerConfigFactory }]
})
export class AppRoutingModule {}
