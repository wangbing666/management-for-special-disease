import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  getServiceSpec: 'opt/specifications/list',
  updateServiceSpec: 'opt/specifications/update',
  searchSpecName: 'opt/specifications/listSpecificationName',
  searchThird: 'opt/specifications/listServiceName'
};

@Injectable()
export class ServiceSpecService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  serviceSpecConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '服务维护',
      subTitle: '服务规格维护',
      ifHome: true,
      homeRouter: '/basic-service',
      currentRouter: '/service-spec'
    });
  }

  serviceSpecEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '服务规格维护',
      subTitle: tag ? '新增规格' : '编辑规格',
      ifHome: false,
      homeRouter: '/service-spec',
      currentRouter: '/service-spec/edit'
    });
  }


  getServiceSpec(page, size) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.getServiceSpec}?page=${page}&size=${size}`);
  }

  serviceSpecUpdate(body) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.updateServiceSpec}`, body);
  }

  searchThird(param) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.searchThird}/${param}`);
  }
}
