/**
 * Created by zhanglin on 2017/8/1.
 */
import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  recommendRadius: 'opt/config/getRadii', // 获取定位推荐半径
  recommendRadiusEdit: 'opt/config/radii', // 编辑定位推荐半径
};

@Injectable()
export class RecommendRadiusService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  RecommendRadiusConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '定位推荐半径维护',
      ifHome: true,
      homeRouter: '/recommend-radius',
      currentRouter: '/recommend-radius'
    });
  }

  getRecommendRadius() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.recommendRadius}`);
  }

  recommendRadiusEdit(id: number, radii: string) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.recommendRadiusEdit}?id=${id}&radii=${radii}`);
  }
}
