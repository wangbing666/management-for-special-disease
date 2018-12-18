import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  doctorRankList: 'api/doctor/rank/list', // 医生排序
  doctorRankEdit: 'api/doctor/rank/edit', // 编辑医生排序
  doctorHospital: 'api/doctor/hospital', // 医院查询
};

@Injectable()
export class DoctorSortService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  doctorSortConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '医生排序列表',
      ifHome: true,
      homeRouter: '/doctor-sort',
      currentRouter: '/doctor-sort'
    });
  }

  doctorSortEditConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '编辑医生排序',
      ifHome: false,
      homeRouter: '/doctor-sort',
      currentRouter: '/doctor-sort'
    });
  }

  /**
   * 医院和手机号和姓名搜索医生排序列表
   * @param {number} page   [description]
   * @param {number} size   [description]
   * @param {[type]} keyword   [description]
   * @param {[type]} id   [description]
   */
  getDoctorRank(page: number, size: number, keyword, id) {
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.doctorRankList}?hospitalId=${id || ''}&keyword=${keyword || ''}&size=${size}&page=${page}`
    );
  }

  /**
   * 编辑医生排序
   * @param {[type]} data [description]
   */
  doctorRankEdit(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.doctorRankEdit}`, data);
  }

  /**
   * 查询医院
   */
  getDoctor() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.doctorHospital}`);
  }
}
