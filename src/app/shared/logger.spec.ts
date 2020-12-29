import { environment } from '../../environments/environment';
import { Logger } from './logger';

describe('Logger', () => {
  it('should create an instance', () => {
    expect(new Logger()).toBeTruthy();
  });

  ['error', 'warn', 'log', 'info', 'trace'].forEach((method, index) => {
    const originalMethod = (console as any)[method];
    const consoleOutput: string[] = [];
    const logMessage = `${method}Message`;

    afterEach(() => {
      (console as any)[method] = originalMethod;
      consoleOutput.length = 0;
    });

    beforeEach(() => {
      (console as any)[method] = (output: string) => consoleOutput.push(output);
    });

    it(`should print ${logMessage}`, () => {
      environment.production = false;

      (Logger as any)[method](logMessage);
      expect(consoleOutput).toEqual([logMessage]);
    });

    it(`should${index < 2 ? '' : `n't`} print ${logMessage} in production mode`, () => {
      environment.production = true;

      (Logger as any)[method](logMessage);
      expect(consoleOutput).toEqual(index < 2 ? [logMessage] : []);
    });
  });
});
