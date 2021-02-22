/* tslint:disable:no-console */
import { environment } from '../../environments/environment';

export class Logger {
  static log(...args: any[]): void {
    if (!environment.production && Logger.hasConsole('log')) {
      console.log(...args);
    }
  }

  static debug(...args: any[]): void {
    Logger.log(...args);
  }

  static info(...args: any[]): void {
    if (!environment.production && Logger.hasConsole('info')) {
      console.info(...args);
    }
  }

  static trace(...args: any[]): void {
    if (!environment.production && Logger.hasConsole('trace')) {
      console.trace(...args);
    }
  }

  static warn(...args: any[]): void {
    if (Logger.hasConsole('warn')) {
      console.warn(...args);
    }
  }

  static error(...args: any[]): void {
    if (Logger.hasConsole('error')) {
      console.error(...args);
    }
  }

  private static hasConsole(method: string): boolean {
    const con = console as any;
    if (!con || !con[method]) {
      return false;
    }
    if (typeof con[method] === 'object') {
      con[method] = Function.prototype.bind.call(con[method], con);
    }
    return true;
  }
}
