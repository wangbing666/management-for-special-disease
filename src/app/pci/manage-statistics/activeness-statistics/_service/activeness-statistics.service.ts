import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  userActivenessStatistics: 'api/statistics/activity/user', // 患者日活跃度统计
  doctorActivenessStatistics: 'api/statistics/activity/doctor', // 医生日活跃度统计
};

@Injectable()
export class ActivenessStatisticsService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  activenessConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '数据统计',
      subTitle: '日活跃度统计',
      ifHome: true,
      homeRouter: '/activeness-statistics',
      currentRouter: '/activeness-statistics'
    });
  }

  getUserActiveness(page, size, key, date) {
    let query = `?page=${page}&size=${size}`;
    query += key ? `&key=${key}` : '';
    query += date ? `&date=${date}` : '';
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userActivenessStatistics}${query}`);
  }

  getDoctorActiveness(page, size, key, date) {
    let query = `?page=${page}&size=${size}`;
    query += key ? `&key=${key}` : '';
    query += date ? `&date=${date}` : '';
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.doctorActivenessStatistics}${query}`);
  }
}
