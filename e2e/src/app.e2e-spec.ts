import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have as title "Skeleton"', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Skeleton');
  });

  it('should display login button', () => {
    page.navigateTo();
    expect(page.getElementText('form .btn[type="submit"]')).toEqual('Login');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({ level: logging.Level.SEVERE } as logging.Entry));
  });
});
