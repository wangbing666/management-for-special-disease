/**
 * Created by zhanglin on 2017/8/2.
 */
import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  integralProportion: 'opt/integral/records/getRatio', // 获取积分兑换比例
  integralProportionEdit: 'opt/integral/records/ratio', // 编辑积分兑换比例
};

@Injectable()
export class IntegralProportionService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  IntegralProportionConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '积分管理',
      subTitle: '积分比例维护',
      ifHome: true,
      homeRouter: '/integral-proportion',
      currentRouter: '/integral-proportion'
    });
  }

  getIntegralProportion() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralProportion}`);
  }

  integralProportionEdit(id: number, ratio: string) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.integralProportionEdit}?id=${id}&ratio=${ratio}`);
  }
}
