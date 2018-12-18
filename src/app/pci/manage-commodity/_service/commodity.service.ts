import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

const PATH = {
  commodityCreate: 'api/goods/add', // 新增商品
  commodityUpdate: 'api/goods/update', // 编辑商品
  commodityStatus: 'api/goods/update/status', // 上下架删除商品
  commodityList: 'api/goods/all', // 查询商品列表
};

@Injectable()
export class CommodityService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  commodityConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '商品维护',
      subTitle: '商品维护',
      ifHome: true,
      homeRouter: '/commodity',
      currentRouter: '/commodity'
    });
  }

  commodityEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '商品维护',
      subTitle: tag ? '新增商品' : '编辑商品信息',
      ifHome: false,
      homeRouter: '/commodity',
      currentRouter: '/commodity/edit'
    });
  }

  /**
   * 商品列表
   */
  getCommodities() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.commodityList}`);
  }

  /**
   * 新增商品
   * @param {[type]} body [description]
   */
  commodityCreate(body) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.commodityCreate}`, body);
  }

  /**
   * 编辑商品
   * @param {[type]} body [description]
   */
  commodityUpdate(body) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.commodityUpdate}`, body);
  }

  /**
   * 上架/下架/删除商品
   * @param {number} id     [description]
   * @param {number} status [description]
   */
  commodityStatus(id: number, status: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.commodityStatus}?id=${id}&status=${status}`);
  }
}
