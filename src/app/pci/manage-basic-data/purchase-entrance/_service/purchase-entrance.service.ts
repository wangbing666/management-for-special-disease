/**
 * Created by zhanglin on 2017/8/1.
 */
import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  purchaseEntrance: 'opt/config/getURL', // 获取购药入口
  purchaseEntranceEdit: 'opt/config/url', // 编辑购药入口
};

@Injectable()
export class PurchaseEntranceService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  purchaseEntranceConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '购药入口维护',
      ifHome: true,
      homeRouter: '/purchase-entrance',
      currentRouter: '/purchase-entrance'
    });
  }

  getPurchaseEntrance() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.purchaseEntrance}`);
  }

  purchaseEntranceEdit(id: number, flag: boolean, url: string) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.purchaseEntranceEdit}?id=${id}&flag=${flag}&url=${url}`);
  }
}
