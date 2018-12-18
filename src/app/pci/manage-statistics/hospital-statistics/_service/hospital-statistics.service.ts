import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { TableTitle } from '../../../../libs/dtable/dtable.entity';

const PATH = {
  channel: 'api/statistics/channel/user',
  hospital: 'api/hospital/hospitals'
};

@Injectable()
export class HospitalStatisticsService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  hospitalStatisticsConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '数据统计',
      subTitle: '医院渠道统计',
      ifHome: true,
      homeRouter: '/hospital-statistics',
      currentRouter: '/hospital-statistics'
    });
  }

  getHospitals() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.hospital}`)
  }

  getUsers(page: number, size: number, date, channel) {
    let query = `?page=${page}&size=${size}`;
    if (date) {
      let start = date && new Date(date.split(' 至 ')[0] + ' 00:00').valueOf() || '';
      let end = date && new Date(date.split(' 至 ')[1] + ' 24:00').valueOf() || '';
      query += `&startTime=${start}&endTime=${end}`;
    }
    if (channel) {
      query += `&channel=${channel}`;
    }
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.channel}${query}`);
  }

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '日期',
        key: 'date'
      }),
      new TableTitle({
        name: '注册用户数',
        key: 'registerCount'
      }),
      new TableTitle({
        name: '实名认证用户数',
        key: 'validateCount'
      }),
      new TableTitle({
        name: '二维码扫描数',
        key: 'click'
      }),
      new TableTitle({
        name: '申请医患关联用户数',
        key: 'relationCount'
      }),
    ];
    return Titles;
  }
}
