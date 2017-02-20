import { browser, element, by } from 'protractor';

export class KbPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('hv-root h1')).getText();
  }
}
