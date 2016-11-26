import { browser, element, by } from 'protractor';

export class KochbuchPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('kb-root h1')).getText();
  }
}
