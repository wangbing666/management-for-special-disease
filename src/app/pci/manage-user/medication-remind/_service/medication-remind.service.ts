import { Injectable, Inject} from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  medicationRemind: 'opt/userMedications/list', // 患者用药提醒管理
};
@Injectable()
export class MedicationRemindService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }


  MedicationRemindConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '患者用药提醒管理',
      subTitle: '患者用药提醒列表',
      ifHome: true,
      homeRouter: '/medacation-remind',
      currentRouter: '/medacation-remind'
    });
  }

  /**
   * 获取患者用药提醒列表
   * @param {number} page    [description]
   * @param {string} param   [搜索参数，姓名/手机号]
   * @param {string} standard   [状态，0正常，1异常]
   * @param {string} standard   [闹钟，0正常，1异常]
   */
  getData(page: number, size: number, keyword: string, deleted: boolean, remind: boolean) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.medicationRemind}?page=${page}&size=${size}&&keyword=${keyword}&&deleted=${deleted}&&remind=${remind}`);
  }
}
