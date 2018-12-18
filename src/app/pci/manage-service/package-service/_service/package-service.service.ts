import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  packageServiceList: 'opt/combinatorials/list', // 套餐包列表
  packageServiceSave: 'opt/combinatorials/save', // 套餐包列表
  serviceOptionDList: 'opt/combinatorials/listDoctorPackage', // 医生服务列表
  serviceOptionTList: 'opt/combinatorials/listThirdSpecifications', // 第三方服务规格列表
};

@Injectable()
export class PackageServiceService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  packageServiceConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '服务维护',
      subTitle: '套餐包维护',
      ifHome: true,
      homeRouter: '/basic-service',
      currentRouter: '/package-service'
    });
  }

  packageServiceEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '套餐包维护',
      subTitle: tag ? '新增套餐包' : '编辑套餐包',
      ifHome: false,
      homeRouter: '/package-service',
      currentRouter: '/package-service/edit'
    });
  }


  /**
   * [getPackageServices description]
   */
  getPackageServices() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.packageServiceList}`);
  }

  /**
   * [packageServiceSave description]
   * @param {[type]} body [description]
   */
  packageServiceSave(body) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.packageServiceSave}`, body);
  }

  /**
   * [getServiceOptionD description]
   */
  getServiceOptionD() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.serviceOptionDList}`);
  }

  /**
   * [getServiceOptionT description]
   */
  getServiceOptionT() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.serviceOptionTList}`);
  }
}
