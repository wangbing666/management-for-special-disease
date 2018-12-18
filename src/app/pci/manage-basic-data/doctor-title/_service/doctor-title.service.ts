import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  positionalTitleList: 'api/doctortitle/all', // 职称列表
  positionalTitleCreate: 'api/doctortitle/edit', // 新建职称
  positionalTitleEdit: 'api/doctortitle/edit', // 编辑职称
};

@Injectable()
export class DoctorTitleService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }
    doctorTitleConfig(): ContainerConfig {
      return new ContainerConfig({
        title: '基础数据维护',
        subTitle: '职称数据维护',
        ifHome: true,
        homeRouter: '/BasicData',
        currentRouter: '/doctorTitle'
      });
    }

  /**
   * 获取职称列表
   */
  getDoctorTitles() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.positionalTitleList}`);
  }

  /**
   * 新建职称
   * @param {[type]} data [description]
   */
  doctorTitleCreate(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.positionalTitleCreate}`, data);
  }

  /**
   * 编辑职称
   * @param {[type]} data [description]
   */
  doctorTitleEdit(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.positionalTitleEdit}`, data);
  }
}
