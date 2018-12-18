import { Injectable, Inject} from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  healthData: 'opt/measures/list', // 患者体征数据管理
};
@Injectable()
export class HealthDataService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }


  UserHealthDataConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '患者体征数据管理',
      subTitle: '患者体征数据列表',
      ifHome: true,
      homeRouter: '/health-data',
      currentRouter: '/health-data'
    });
  }

  /**
   * 获取患者列表
   * @param {number} page    [description]
   * @param {string} param   [搜索参数，姓名/手机号]
   * @param {string} standard   [患者体征项目状态，0正常，1异常]
   */
  getData(page: number, size: number, param: string, standard: string) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.healthData}?page=${page}&size=${size}&&standard=${standard}&&param=${param}`);
  }
}
