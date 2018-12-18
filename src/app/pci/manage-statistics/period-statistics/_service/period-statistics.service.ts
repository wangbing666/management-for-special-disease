import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  userPeriodStatistics: 'api/statistics/login/log/user', // 患者时间段内活跃度统计
  doctorPeriodStatistics: 'api/statistics/login/log/doctor', // 医生时间段内活跃度统计
};

@Injectable()
export class PeriodStatisticsService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  activenessConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '数据统计',
      subTitle: '活跃度统计',
      ifHome: true,
      homeRouter: '/period-statistics',
      currentRouter: '/period-statistics'
    });
  }

  getUserResult(startTime, endTime) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userPeriodStatistics}?startTime=${startTime}&endTime=${endTime}`);
  }

  getDoctorResult(startTime, endTime) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.doctorPeriodStatistics}?startTime=${startTime}&endTime=${endTime}`);
  }
}
