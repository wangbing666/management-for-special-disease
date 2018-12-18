import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  getCoupon: 'opt/coupons/user', // 优惠券领取列表
};

@Injectable()
export class CouponIssueService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService,
  ) {
  }

  couponIssueConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '优惠券管理',
      subTitle: '优惠券发放记录',
      ifHome: true,
      homeRouter: '/dc-issue',
      currentRouter: '/dc-issue'
    });
  }

  /**
   * 优惠券领取列表
   */
  getCoupon(page: number, size: number, status: number ) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.getCoupon}?status=${status}&page=${page}&size=${size}`);
  }
}
