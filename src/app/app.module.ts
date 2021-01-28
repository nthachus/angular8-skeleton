import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { registerLocaleData } from '@angular/common';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';
import { TranslateInterceptor } from './shared/interceptors/translate.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';

// AoT requires exported functions for factoring
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}

export function jwtOptionsFactory() {
  return {
    tokenGetter: AuthService.currentToken,
    whitelistedDomains: [new RegExp('^.*')],
    blacklistedRoutes: [new RegExp(`^((?!${environment.apiBaseUrl}).)*$`)]
  };
}

@NgModule({
  declarations: [
    AppComponent //
  ],
  imports: [
    BrowserModule, //
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: environment.defaultLanguage
    }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    }),
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TranslateInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    this.registerLocales();
  }

  private registerLocales(): void {
    for (const lang of environment.languages) {
      import(
        /* webpackInclude: /(en|ja)\.js$/ */
        /* webpackExclude: /extra/ */
        /* webpackMode: "lazy-once" */
        /* webpackChunkName: "i18n" */
        `@angular/common/locales/${lang}`
      ).then(m => registerLocaleData(m.default));
    }
  }
}
