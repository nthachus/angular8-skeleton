import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.initLocalization();
  }

  /**
   * Initializes localization with the browser-language.
   */
  private initLocalization(): void {
    this.translate.addLangs(environment.languages);

    let lang = this.translate.getBrowserLang();
    if (lang && this.translate.langs.indexOf((lang = lang.toLowerCase())) >= 0) {
      this.translate.use(lang); // otherwise, defaultLang
    }
  }
}
