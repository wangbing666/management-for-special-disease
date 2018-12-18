import { Injectable, Inject} from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  followList: 'api/doctorPatient/flupFeedback', // 随访反馈管理
};
@Injectable()
export class FollowFeedbackService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }


  followFeedbackConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '随访反馈管理',
      subTitle: '随访反馈列表',
      ifHome: true,
      homeRouter: '/followUp-feedback',
      currentRouter: '/followUp-feedback'
    });
  }

  followFeedbackDetailConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '随访反馈列表',
      subTitle: '随访反馈详情',
      ifHome: false,
      homeRouter: '/followUp-feedback',
      currentRouter: '/followUp-feedback/detail'
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
