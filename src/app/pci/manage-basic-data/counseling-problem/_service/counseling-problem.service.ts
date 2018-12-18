/**
 * Created by zhanglin on 2017/8/1.
 */
import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  counselingProblem: 'opt/config/getQuestion', // 获取咨询问题
  counselingProblemEdit: 'opt/config/question', // 编辑咨询问题
};

@Injectable()
export class CounselingProblemService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  counselingProblemConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '咨询问题维护',
      ifHome: true,
      homeRouter: '/counseling-problem',
      currentRouter: '/counseling-problem'
    });
  }

  getCounselingProblem() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.counselingProblem}`);
  }

  counselingProblemEdit(id: number, question: string) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.counselingProblemEdit}?id=${id}&question=${question}`);
  }
}
