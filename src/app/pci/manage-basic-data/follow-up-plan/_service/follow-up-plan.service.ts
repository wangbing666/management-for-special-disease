import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  followList: 'api/flupTemplate/list', // 随访计划模板列表
  followCreate: 'api/flupTemplate/save', // 新增随访计划
  followEdit: 'api/flupTemplate/update', // 编辑随访计划
  followDelete: 'api/flupTemplate/delete', // 删除随访计划
};

@Injectable()
export class FollowUpPlanService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  followUpPlanConfig() {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '随访计划模版数据维护',
      ifHome: true,
      homeRouter: '/follow-up-plan',
      currentRouter: '/follow-up-plan'
    });
  }

  followUpPlanEditConfig(flag) {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: flag ? '编辑随访计划模版' : '新增随访计划模版',
      ifHome: true,
      homeRouter: '/follow-up-plan',
      currentRouter: '/follow-up-plan/edit'
    });
  }

  getFollowUpPlans(type) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.followList}?type=${type}`);
  }

  followUpPlanCreate(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.followCreate}`, data);
  }

  followUpPlanEdit(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.followEdit}`, data);
  }

  followUpPlanDelete(id: number) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.followDelete}?id=${id}`, {});
  }
}
