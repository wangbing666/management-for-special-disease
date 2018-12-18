import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  doctorRegister: 'api/statistics/doctor', // 医生注册量统计
  userRegister: 'api/statistics/user', // 患者注册量统计
};

@Injectable()
export class RegisterStatisticsService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  registerStatisticsConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '数据统计',
      subTitle: '用户统计',
      ifHome: true,
      homeRouter: '/register-statistics',
      currentRouter: '/register-statistics'
    });
  }

  /**
   * 获取患者注册量统计
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getUsers(page: number, size: number, date) {
    let query = `?page=${page}&size=${size}`;
    if (date) {
      let start = date && new Date(date.split(' 至 ')[0] + ' 00:00').valueOf() || '';
      let end = date && new Date(date.split(' 至 ')[1] + ' 24:00').valueOf() || '';
      query += `&startTime=${start}&endTime=${end}`;
    }
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userRegister}${query}`);
  }

  /**
   * 获取医生注册量统计
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getDoctors(page: number, size: number, date) {
    let query = `?page=${page}&size=${size}`;
    if (date) {
      let start = date && new Date(date.split(' 至 ')[0] + ' 00:00').valueOf() || '';
      let end = date && new Date(date.split(' 至 ')[1] + ' 24:00').valueOf() || '';
      query += `&startTime=${start}&endTime=${end}`;
    }
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.doctorRegister}${query}`);
  }
}
