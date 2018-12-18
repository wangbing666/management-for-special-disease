import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  hospitalList: 'api/hospital/all', // 医院列表
  hospitalCreate: 'api/hospital/edit', // 新建医院
  hospitalEdit: 'api/hospital/edit', // 编辑医院
  hospitalqr: 'api/hospital/getQr', // 编辑医院
};

@Injectable()
export class HospitalService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  hospitalConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '医院维护',
      ifHome: true,
      homeRouter: '/BasicData',
      currentRouter: '/hospital'
    });
  }

  hospitalEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '医院维护',
      subTitle: tag ? '新增医院' : '编辑医院',
      ifHome: false,
      homeRouter: '/hospital',
      currentRouter: '/hospital/edit'
    });
  }

  /**
   * 获取医院列表
   */
  getHospital(page, size) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.hospitalList}?pageSize=${size}&pageNumber=${page}`);
  }

  /**
   * 新建医院
   */
  hospitalCreate(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.hospitalCreate}`, data);
  }

  /**
   * 编辑医院
   */
  hospitalEdit(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.hospitalEdit}`, data);
  }

  /**
   * 获取医院二维码
   * @param id
   */
  getHospitalQr(id) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.hospitalqr}?sceneId=${id}`)
  }
}
