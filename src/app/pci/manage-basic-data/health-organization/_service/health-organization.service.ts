import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  thirdPartyList: 'api/healthorganization/all', // 第三方机构列表
  thirdPartyCreate: 'api/healthorganization/edit', // 新增机构信息
  thirdPartyEdit: 'api/healthorganization/edit', // 编辑机构信息
};

@Injectable()
export class HealthOrganizationService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService,
  ) {
  }

  healthOrganizationConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '第三方机构维护',
      ifHome: true,
      homeRouter: '/BasicData',
      currentRouter: '/health-organization'
    });
  }

  healthOrganizationEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '第三方机构维护',
      subTitle: tag ? '新增第三方机构' : '编辑第三方机构',
      ifHome: false,
      homeRouter: '/health-organization',
      currentRouter: '/health-organization/edit'
    });
  }

  /**
   * 获取第三方机构列表
   */
  getHealthOrganizations() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.thirdPartyList}`);
  }

  /**
   * 新建第三方机构
   * @param {[type]} data [description]
   */
  healthOrganizationCreate(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.thirdPartyCreate}`, data);
  }

  /**
   * 编辑第三方机构
   * @param {[type]} data [description]
   */
  healthOrganizationEdit(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.thirdPartyEdit}`, data);
  }
}
