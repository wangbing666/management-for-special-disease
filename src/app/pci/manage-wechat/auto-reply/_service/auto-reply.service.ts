import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  autoReply: 'api/micro/subscribeReply', // 获取订阅号自动回复
};

@Injectable()
export class AutoReplyService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  autoReplyConfig() {
    return new ContainerConfig({
      title: '服务号管理',
      subTitle: '自动回复管理',
      ifHome: true,
      homeRouter: '/auto-raply',
      currentRouter: '/auto-raply'
    });
  }

  getAutoReply() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.autoReply}`);
  }

  autoReplyUpdate(data: string) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.autoReply}`, data);
  }
}
