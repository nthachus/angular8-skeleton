/* tslint:disable:no-console */
import { environment } from '../../environments/environment';

export class Logger {
  static log(...args: any[]): void {
    if (!environment.production) {
      console.log(...args);
    }
  }

  static info(...args: any[]): void {
    if (!environment.production) {
      console.info(...args);
    }
  }

  static trace(...args: any[]): void {
    if (!environment.production) {
      (console.trace || console.log)(...args);
    }
  }

  static warn(...args: any[]): void {
    console.warn(...args);
  }

  static error(...args: any[]): void {
    console.error(...args);
  }
}
