import { NgxLineChartPage } from './app.po';

describe('ngx-line-chart App', () => {
  let page: NgxLineChartPage;

  beforeEach(() => {
    page = new NgxLineChartPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
