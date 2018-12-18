import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  downloadStatistics: 'api/operational/pv' // 渠道来源统计
};

@Injectable()
export class DownloadStatisticsService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  downloadConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '数据统计',
      subTitle: '渠道来源统计',
      ifHome: true,
      homeRouter: '/download-statistics',
      currentRouter: '/download-statistics'
    });
  }

  getDownloadStatistics(start, end, flag) {
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.downloadStatistics}?startTime=${start}&endTime=${end}&product=${flag}`
    );
  }
}
