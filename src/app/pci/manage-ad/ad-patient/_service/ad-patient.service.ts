import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  adList: 'api/banner', // GET
  adNew: 'api/banner', // POST
  adDelete: 'api/banner', // DELETE
  adEdit: 'api/banner', // PUT
  adStatus: 'api/banner', // PUT, /api/banner/{id}/status
};

@Injectable()
export class AdPatientService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  adPatientConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '广告位管理',
      subTitle: '患者端',
      ifHome: true,
      homeRouter: '/ad-doctor',
      currentRouter: '/ad-patient'
    });
  }

  adPatientEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '广告位管理-患者端',
      subTitle: tag ? '编辑广告位' : '新增广告位',
      ifHome: false,
      homeRouter: '/ad-patient',
      currentRouter: '/ad-patient/edit'
    });
  }

  /**
   * 获取广告列表
   * @param {number} page   [description]
   */
  getAdList(page: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.adList}?type=0&size=10&page=${page}`);
  }

  /**
   * 新增广告
   */
  adNew(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.adNew}`, data);
  }

  /**
   * 编辑广告
   */
  adEdit(id, data) {
    return this.httpService.put(`${this.app.pci.BASE_URL}${PATH.adEdit}/${id}`, data);
  }

  /**
   * 删除广告
   */
  adDelete(id) {
    return this.httpService.del(`${this.app.pci.BASE_URL}${PATH.adDelete}/${id}`);
  }

  /**
   * 广告上下架
   */
  adStatus(id) {
    const data = null;
    return this.httpService.put(`${this.app.pci.BASE_URL}${PATH.adStatus}/${id}/status`, data);
  }

}
