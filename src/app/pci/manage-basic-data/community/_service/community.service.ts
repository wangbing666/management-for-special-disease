import { Inject, Injectable } from '@angular/core';

import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  communityQuery: 'opt/doctorsServeTheCommunity/list', // 查询小区列表
  addCommunity: 'opt/doctorsServeTheCommunity/add', // 新增小区
  updateCommunity: 'opt/doctorsServeTheCommunity/update', // 修改小区
};

@Injectable()
export class CommunityService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  communityConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '小区维护',
      ifHome: true,
      homeRouter: '/community',
      currentRouter: '/community'
    });
  }

  communityEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '小区维护',
      subTitle: tag ? '新增小区' : '编辑小区',
      ifHome: false,
      homeRouter: '/community',
      currentRouter: '/community/edit'
    });
  }

  /**
   * ${this.app.pci.BASE_URL}
   * 获取小区列表
   */
  getCommunity(page: number, size: number) {
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.communityQuery}?page=${page}&size=${size}`
    );
  }

  /**
   * 新增小区
   * @param {any} body [description]
   */
  addCommunity(body: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.addCommunity}`, body);
  }

  /**
   * 修改小区
   * @param {any} body [description]
   */
  updateCommunity(body: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.updateCommunity}`, body);
  }
}
