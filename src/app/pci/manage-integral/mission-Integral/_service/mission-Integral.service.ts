import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  IntegralTask: 'opt/integral/records/getTask', // 积分任务列表
  OperationIntegralTask: 'opt/integral/records/taskStatus', // 积分任务上下架
  IntegralTaskEdit: 'opt/integral/records/updateTask', // 编辑任务
};

@Injectable()
export class MissionIntegralService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService,
  ) {
  }

  missionIntegralConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '积分管理',
      subTitle: '任务积分维护',
      ifHome: true,
      homeRouter: '/mission-integral',
      currentRouter: '/mission-integral'
    });
  }

  missionIntegralEditConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '任务积分维护',
      subTitle: '编辑任务',
      ifHome: false,
      homeRouter: '/mission-integral',
      currentRouter: '/mission-integral/edit'
    });
  }

  /**
   * 获取积分任务列表
   */
  getIntegralTask() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.IntegralTask}`);
  }

  /**
   * 积分任务上下架
   * @param {any} body [description]
   */
  OperationIntegralTask(id: number) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.OperationIntegralTask}?id=${id}`);
  }

  /**
   * 编辑任务
   * @param {any} body [description]
   */
  IntegralTaskEdit(body: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.IntegralTaskEdit}`, body);
  }
}
