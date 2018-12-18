import { Injectable, Inject} from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  followList: 'api/doctorPatient/flup', // 随访计划管理
};
@Injectable()
export class FollowPlanService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }


  followPlanConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '随访计划管理',
      subTitle: '随访计划列表',
      ifHome: true,
      homeRouter: '/followUp-plan',
      currentRouter: '/followUp-plan'
    });
  }

  followPlanDetailConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '随访计划列表',
      subTitle: '随访计划详情',
      ifHome: false,
      homeRouter: '/followUp-plan',
      currentRouter: '/followUp-plan/detail'
    });
  }

  /**
   * 获取随访计划列表
   * @param {number} page    [description]
   * @param {string} item   [搜索参数，医生/患者姓名/手机号]
   * @param {string} startTime   [开始时间]
   * @param {string} endTime   [结束时间]
   */
  getData(page: number, size: number, item: string, startTime: number, endTime: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.followList}?page=${page}&size=${size}&&item=${item}&&startTime=${startTime}&&endTime=${endTime}`);
  }
}
