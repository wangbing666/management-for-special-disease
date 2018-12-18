import { ManagementForSpecialDiseasePage } from './app.po';

describe('management-for-special-disease App', () => {
  let page: ManagementForSpecialDiseasePage;

  beforeEach(() => {
    page = new ManagementForSpecialDiseasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
