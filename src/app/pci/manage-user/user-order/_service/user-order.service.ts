import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  userOrderAllList: 'opt/healthOrders/listAll', // 全部订单
  userOrderUnpayList: 'opt/healthOrders/nonPaymentOrder', // 待支付订单
  userOrderApplyList: 'opt/healthOrders/applyingOrder', // 申请中订单
  userOrderRefundingList: 'opt/healthOrders/refundingOrder', // 退款中订单
  userOrderRefundList: 'opt/healthOrders/refundSuccessfullyOrder', // 退款成功订单
  userOrderSuccessList: 'opt/healthOrders/paySuccessfullyOrder', // 购买成功订单
  userOrderCancelList: 'opt/healthOrders/cancellationOrder', // 已取消订单
  userOrderThirdList: 'opt/healthOrders/listThirdServices', // 未处理第三方订单
  userOrderRefundConfirm: 'opt/healthOrders/refund', // 确认退款
  userOrderThirdProcess: 'opt/healthOrders/processThirdService', // 处理第三方服务
  userOrderCount: 'opt/healthOrders/countOrders', // 患者订单统计

  orderRecordList: 'opt/serviceRecords/listRecord', // 服务记录列表
  orderRecordCreate: 'opt/serviceRecords/addServiceRecord', // 添加服务记录
  orderRecordDel: 'opt/serviceRecords/deleteServiceRecord', // 删除服务记录
  orderRecordServiceList: 'opt/serviceRecords/listServiceName', // 选择服务列表
};

@Injectable()
export class UserOrderService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService,
    @Inject('auth') private authService
  ) {
  }

  userOrderConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '患者订单管理',
      subTitle: '患者订单列表',
      ifHome: true,
      homeRouter: '/user-order',
      currentRouter: '/user-order'
    });
  }

  userOrderEditConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '患者订单管理',
      subTitle: '使用情况',
      ifHome: false,
      homeRouter: '/user-order',
      currentRouter: '/user-order/edit'
    });
  }

  /**
   * 获取患者订单列表
   * @param {number} page
   * @param {number} size
   * @param {string} key
   * @param {string} path
   */
  getUserOrders(page: number, size: number, key: string, path: string) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${path}?page=${page}&size=${size}&queryInfo=${key}`);
  }

  getUserOrdersAll(page: number, size: number, key: string) {
    return this.getUserOrders(page, size, key, PATH.userOrderAllList);
  }

  getUserOrdersUnpay(page: number, size: number, key: string) {
    return this.getUserOrders(page, size, key, PATH.userOrderUnpayList);
  }

  getUserOrdersApply(page: number, size: number, key: string) {
    return this.getUserOrders(page, size, key, PATH.userOrderApplyList);
  }

  getUserOrdersRefunding(page: number, size: number, key: string) {
    return this.getUserOrders(page, size, key, PATH.userOrderRefundingList);
  }

  getUserOrdersRefund(page: number, size: number, key: string) {
    return this.getUserOrders(page, size, key, PATH.userOrderRefundList);
  }

  getUserOrdersSuccess(page: number, size: number, key: string) {
    return this.getUserOrders(page, size, key, PATH.userOrderSuccessList);
  }

  getUserOrdersCancel(page: number, size: number, key: string) {
    return this.getUserOrders(page, size, key, PATH.userOrderCancelList);
  }

  getUserOrdersThird(page: number, size: number, key: string) {
    return this.getUserOrders(page, size, key, PATH.userOrderThirdList);
  }

  // 处理退款
  userOrderRefund(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userOrderRefundConfirm}?oid=${id}`);
  }

  // 处理未处理第三方
  userOrderProcess(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userOrderThirdProcess}?oid=${id}`);
  }

  getOrderRecordList(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.orderRecordList}?orderId=${id}`);
  }

  orderRecordCreate(id: number, serviceName: string) {
    return this.httpService.postParma(
      `${this.app.pci.BASE_URL}${PATH.orderRecordCreate}?id=${id}&serviceName=${serviceName}&operator=${this.authService.getAdminName()}`
    );
  }

  orderRecordDel(id: number) {
    return this.httpService.delete(`${this.app.pci.BASE_URL}${PATH.orderRecordDel}?rid=${id}`);
  }

  getOrderRecordServiceList(id: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.orderRecordServiceList}?orderId=${id}`);
  }

  getUserOrderCount() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userOrderCount}`);
  }
}
