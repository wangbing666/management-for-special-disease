import { Injectable, Inject } from '@angular/core';

const PATH = {
  count: 'opt/config/count'
};

@Injectable()
export class NavigationService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService,
    @Inject('main') private mainAction
  ) {
  }

  initSidebars(path) {
    this.mainAction.initNav({path: path});
  }

  setCount(tag, group, key) {
    this.mainAction.updateNav({key: key, group: group, tag: tag})
  }

  getCount() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.count}`)
  }
}
