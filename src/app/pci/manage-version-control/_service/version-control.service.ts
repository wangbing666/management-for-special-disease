import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

const PATH = {
  versionList: 'api/version/list', //版本信息列表
  versionSave: 'api/version/save', //新建版本信息
  versionUpdate: 'api/version/update', //编辑版本信息
};

@Injectable()
export class VersionControlService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService,
    @Inject('auth') private authService
  ) {
  }

  versionControlConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '版本控制',
      subTitle: '版本控制',
      ifHome: true,
      homeRouter: '/version-control',
      currentRouter: '/version-control'
    });
  }

  versionControlEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '版本控制',
      subTitle: tag ? '新增版本' : '编辑版本',
      ifHome: false,
      homeRouter: '/version-control',
      currentRouter: '/version-control/edit'
    });
  }

  /**
   * 获取版本控制列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getVersionControls(page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.versionList}?page=${page}&size=${size}`);
  }

  /**
   * 新建版本控制
   * @param {[type]} body [description]
   */
  versionControlCreate(body) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.versionSave}`, body);
  }

  /**
   * 更新版本控制
   * @param {[type]} body [description]
   */
  versionControlUpdate(body) {
    return this.httpService.put(`${this.app.pci.BASE_URL}${PATH.versionUpdate}`, body);
  }
}
