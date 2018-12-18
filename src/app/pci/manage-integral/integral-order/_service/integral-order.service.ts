import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  integralOrderList: 'opt/integral/exchanges/list', // 积分商品订单列表
  integralExpressList: 'opt/courier/companys/list', // 快递列表
  integralExpressEdit: 'opt/integral/exchanges/updateCourier', // 编辑单号
  integralOrderCount: 'opt/integral/exchanges/countProcess', // 积分订单商品数量
};

@Injectable()
export class IntegralOrderService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  integralOrderConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '积分管理',
      subTitle: '积分商品订单管理',
      ifHome: true,
      homeRouter: '/integral-order',
      currentRouter: '/integral-order'
    });
  }

  sendMessageConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '积分商品订单管理',
      subTitle: tag ? '发送短信' : '编辑单号',
      ifHome: false,
      homeRouter: '/integral-order',
      currentRouter: '/integral-order/send-message'
    });
  }

  /**
   * 积分商品订单列表
   */
  getIntegralOrder(idx?: number, flag?: number) {
    if (idx && !flag) {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralOrderList}?idx=${idx}`);
    } else if (!idx && flag) {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralOrderList}?flag=${flag}`);
    } else if (!idx && !flag) {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralOrderList}`);
    } else {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralOrderList}?idx=${idx}&flag=${flag}`);
    }
  }

  /**
   * 积分订单商品数量
   */
  getIntegralOrderCount() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralOrderCount}`);
  }

  /**
   * 快递列表
   */
  getExpressList() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralExpressList}`);
  }

  /**
   * 编辑单号
   */
  editExpressNo(body) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.integralExpressEdit}`, body);

  }
}
