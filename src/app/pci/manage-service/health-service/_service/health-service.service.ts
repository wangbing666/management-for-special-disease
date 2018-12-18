import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  healthServiceList: 'api/healthService/list', // 查询第三方服务列表
  healthServiceDetail: 'api/healthService/detail', // 查询第三方服务详情
  healthServiceCreate: 'api/healthService/save', // 新增第三方服务
  healthServiceUpdate: 'api/healthService/update', // 修改第三方服务
  thirdPartyList: 'api/healthorganization/all', // 第三方机构列表
};

@Injectable()
export class HealthServiceService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  healthServiceConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '服务维护',
      subTitle: '第三方维护',
      ifHome: true,
      homeRouter: '/basic-service',
      currentRouter: '/health-service'
    });
  }

  healthServiceEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '服务维护',
      subTitle: tag ? '新增第三方服务' : '编辑第三方服务',
      ifHome: false,
      homeRouter: '/health-service',
      currentRouter: '/health-service/edit'
    });
  }

  getHealthServices(page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.healthServiceList}?page=${page}&size=${size}`);
  }

  getHealthService(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.healthServiceDetail}/${id}`);
  }

  healthServiceCreate(body) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.healthServiceCreate}`, body);
  }

  healthServiceUpdate(body) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.healthServiceUpdate}`, body);
  }

  getOrganization() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.thirdPartyList}`);
  }
}
