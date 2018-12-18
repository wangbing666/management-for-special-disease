import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  couponMaintenance: 'opt/coupons/declare', // 优惠券说明维护
  couponList: 'opt/coupons/list', // 优惠券列表
  thirdServiceNames: 'opt/coupons/thirdServiceNames', // 成本构成第三方服务名称
  thirdService: 'api/healthorganization/all', // 成本构成第三方服务机构
  couponUpdate: 'opt/coupons/update', // 新增修改优惠券
  couponUpdateDeclare: 'opt/coupons/updateDeclare', // 修改优惠券说明维护
};

@Injectable()
export class CouponService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService,
  ) {
  }

  couponConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '优惠券管理',
      subTitle: '优惠券列表',
      ifHome: true,
      homeRouter: '/dc-list',
      currentRouter: '/dc-list'
    });
  }

  couponEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '优惠券列表',
      subTitle: tag ? '新增优惠券' : '编辑优惠券',
      ifHome: false,
      homeRouter: '/dc-list',
      currentRouter: '/dc-list/edit'
    });
  }

  /**
   * 获取优惠券列表
   */
  getCouponList(page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.couponList}?page=${page}&size=${size}`);
  }

  /**
   * 成本构成第三方服务名称
   */
  getthirdServiceName() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.thirdServiceNames}`);
  }

  /**
   * 成本构成第三方服务结构
   */
  getthirdService() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.thirdService}`);
  }

  /**
   * 新建修改优惠券
   * @param {any} body [description]
   */
  couponEdit(body: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.couponUpdate}`, body);
  }

  /**
   * 修改优惠券说明
   * @param {any} body [description]
   */
  couponExplainUpdate(body: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.couponUpdateDeclare}?description=${body}`);
  }

  /**
   * 优惠券说明
   */
  couponExplain() {
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.couponMaintenance}`
    );
  }
}
