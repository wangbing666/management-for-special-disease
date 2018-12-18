import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  lectureList: 'api/lecture', // 讲座列表
  lectureSave: 'api/lecture', // 新增讲座
  lectureEdit: 'api/lecture', // 编辑讲座
  lectureApply: 'api/lecture/sign', // 报名签到
  lectureStatus: 'api/lecture/status', // 讲座线上线下更改
};

@Injectable()
export class LectureService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  lectureConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '服务号管理',
      subTitle: '讲座管理',
      ifHome: true,
      homeRouter: '/lecture',
      currentRouter: '/lecture'
    });
  }

  lectureDdetailConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '讲座管理',
      subTitle: '讲座报名/签到人数明细',
      ifHome: false,
      homeRouter: '/lecture',
      currentRouter: '/lecture/detail'
    });
  }

  lectureEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '讲座管理',
      subTitle: tag ? '新增讲座' : '编辑讲座',
      ifHome: false,
      homeRouter: '/lecture',
      currentRouter: '/lecture/Edit'
    });
  }
  /**
   * 获取讲座列表
   */
  getLecture() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.lectureList}`);
  }

  /**
   * 新增讲座
   */
  lectureCreate(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.lectureSave}`, data);
  }

  /**
   * 编辑医院
   */
  lectureEdit(data) {
    return this.httpService.put(`${this.app.pci.BASE_URL}${PATH.lectureEdit}`, data);
  }

  /**
   * 报名签到
   */
  getApply(id: number, signStatus = '', joinStatus = '', page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.lectureApply}?lectureId=${id}&signStatus=${signStatus}&joinStatus=${joinStatus}&size=${size}$page=${page}`);
  }

  /**
   * 更改线上线下删除
   */
  lectureStatus(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.lectureStatus}`, data);
  }
}
