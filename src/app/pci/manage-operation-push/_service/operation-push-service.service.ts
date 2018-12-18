import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

const PATH = {
  operationPushSave: 'opt/operational/pushs/update', // 新增修改推送
  operationPush: 'opt/operational/pushs/list/', // 推送列表
  operationPushSend: 'opt/operational/pushs/send/', // 发送推送
  operationPushDel: 'opt/operational/pushs/delete/', // 删除推送
};

@Injectable()
export class OperationPushService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  operationPushConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '运营消息推送',
      subTitle: '运营推送',
      ifHome: true,
      homeRouter: '/operation-push',
      currentRouter: '/operation-push'
    });
  }

  operationPushEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '运营推送',
      subTitle: tag ? '新增Push' : '编辑Push',
      ifHome: false,
      homeRouter: '/operation-push',
      currentRouter: '/operation-push/edit'
    });
  }

  /**
   * 推送列表
   */
  getOperationPush(idx: number, page: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.operationPush}${idx}?flag=${page}`);
  }

  /**
   * 新增修改推送
   */
  OperationPushAdd(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.operationPushSave}`, data);
  }

  /**
   * 发送推送
   */
  OperationPushSend(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.operationPushSend}${id}`);
  }

  /**
   * 删除推送
   */
  OperationPushDelete(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.operationPushDel}${id}`);
  }
}
