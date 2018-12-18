import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  departmentList: 'api/department/all', // 科室列表
  departmentCreate: 'api/department/edit', // 新建科室
  departmentEdit: 'api/department/edit', // 编辑科室
};

@Injectable()
export class DepartmentService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  departmentConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '科室数据维护',
      ifHome: true,
      homeRouter: '/BasicData',
      currentRouter: '/department'
    });
  }

  getDepartments() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.departmentList}`);
  }

  /**
   * 新建医院
   * @param {[type]} data [description]
   */
  departmentCreate(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.departmentCreate}`, data);
  }

  /**
   * 编辑医院
   * @param {[type]} data [description]
   */
  departmentEdit(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.departmentEdit}`, data);
  }
}
