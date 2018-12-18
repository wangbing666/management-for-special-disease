import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  integralCommodityList: 'opt/integral/goods/list', // 积分商品维护列表
  integralCommodityEdit: 'opt/integral/goods/update', // 新增更新商品
  integralCommodityStatus: 'opt/integral/goods/updateStatus', // 更新商品状态
};

@Injectable()
export class IntegralCommodityService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  integralCommodityConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '积分管理',
      subTitle: '积分商品维护',
      ifHome: true,
      homeRouter: '/integral-detail',
      currentRouter: '/integral-commodity'
    });
  }

  integralCommodityEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '积分商品维护',
      subTitle: tag ? '新增商品' : '编辑商品信息',
      ifHome: false,
      homeRouter: '/integral-commodity',
      currentRouter: '/integral-commodity/edit'
    });
  }

  /**
   * 获取积分商品维护列表
   * @param {number} flag   [description]
   */
  getIntegralCommodity(flag: number) {
    if (flag) {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralCommodityList}?flag=${flag}`);
    } else {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralCommodityList}`);
    }
  }

  /**
   * 新增更新商品
   */
  integralCommodityUpdate(body: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.integralCommodityEdit}`, body);
  }

  /**
   * 更新商品状态
   */
  updateIntegralStatus(goodsId: number, idx: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralCommodityStatus}/${goodsId}/${idx}`);
  }
}
