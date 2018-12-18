import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  customMenu: 'api/micro/menu', // 自定义菜单
};

@Injectable()
export class CustomMenuService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  customMenuConfig() {
    return new ContainerConfig({
      title: '服务号管理',
      subTitle: '自定义菜单',
      ifHome: true,
      homeRouter: '/custom-menu',
      currentRouter: '/custom-menu'
    });
  }

  getMenuLocal() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.customMenu}/local`);
  }

  getMenuRemote() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.customMenu}/fetch`);
  }

  menuCreate(data: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.customMenu}/add`, data);
  }

  menuUpdate(data: any) {
    return this.httpService.put(`${this.app.pci.BASE_URL}${PATH.customMenu}/edit`, data);
  }

  menuDel(id) {
    return this.httpService.delParam(`${this.app.pci.BASE_URL}${PATH.customMenu}/delete`, id);
  }

  menuPush() {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.customMenu}/push`, {});
  }
}
