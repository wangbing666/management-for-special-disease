import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  pushTime: 'opt/app/configs/generalPushTime', // 推送时间
  pushTimeEdit: 'opt/app/configs/update/general/pushTime', // 编辑推送时间
};

@Injectable()
export class PushTimeService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  pushTimeConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '推送时间维护',
      ifHome: true,
      homeRouter: '/push-time',
      currentRouter: '/push-time'
    });
  }

  getPushTime() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.pushTime}`);
  }

  PushTimeEdit(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.pushTimeEdit}?pushTime=${data}`, {});
  }
}
