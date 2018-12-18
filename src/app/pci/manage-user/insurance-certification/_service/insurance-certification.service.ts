import { Injectable, Inject} from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  insuranceCertification: 'opt/validates/listMedicareCard', // 医保卡认证管理
};
@Injectable()
export class InsuranceCertificationService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }


  InsuranceCertificationConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医保卡认证管理',
      subTitle: '医保卡认证列表',
      ifHome: true,
      homeRouter: '/insurance-certification',
      currentRouter: '/insurance-certification'
    });
  }

  /**
   * 获取医保卡认证列表
   * @param {number} page    [description]
   * @param {string} param   [搜索参数，姓名/手机号]
   */
  getData(page: number, size: number, keyword: string) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.insuranceCertification}?page=${page}&size=${size}&&keyword=${keyword}`);
  }
}
