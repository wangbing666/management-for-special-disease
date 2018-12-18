import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  doctorServiceList: 'opt/servicePackages/list', // 医生个人服务列表
  doctorServiceUpdate: 'opt/servicePackages/modify', // 医生个人服务修改
};

@Injectable()
export class DoctorServiceService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  doctorServiceConfig() {
    return new ContainerConfig({
      title: '服务维护',
      subTitle: '医生个人服务维护',
      ifHome: true,
      homeRouter: '/doctor-service',
      currentRouter: '/doctor-service'
    });
  }

  doctorServiceEditConfig(flag) {
    return new ContainerConfig({
      title: '医生个人服务维护',
      subTitle: flag ? '编辑基础服务' : '新增基础服务',
      ifHome: true,
      homeRouter: '/doctor-service',
      currentRouter: '/doctor-service/edit'
    });
  }

  /**
   * 获取基础服务列表
   */
  getDoctorServices() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.doctorServiceList}?type=0`);
  }

  /**
   * 更新基础服务
   * @param {any} body [description]
   */
  doctorServiceUpdate(body: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.doctorServiceUpdate}`, body);
  }
}
