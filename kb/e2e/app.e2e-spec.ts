import { KbPage } from './app.po';

describe('kb App', function() {
  let page: KbPage;

  beforeEach(() => {
    page = new KbPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
