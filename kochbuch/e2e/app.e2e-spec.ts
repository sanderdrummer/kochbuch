import { KochbuchPage } from './app.po';

describe('kochbuch App', function() {
  let page: KochbuchPage;

  beforeEach(() => {
    page = new KochbuchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('kb works!');
  });
});
