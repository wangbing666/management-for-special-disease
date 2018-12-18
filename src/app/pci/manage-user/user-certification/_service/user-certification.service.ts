import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  userCertificationList: 'opt/validates/listAudited', // 已实名认证用户列表
  userUnCertificationList: 'opt/validates/listUnAudit', // 未实名认证用户列表
  userCertificatingList: 'opt/validates/listAuditing', // 实名认证申请中用户列表
  userCertificationFailureList: 'opt/validates/listFailure', // 实名认证失败用户列表
  userCertificationCount: 'opt/validates/countValidate', // 实名认证统计数量
  userCertificationQuery: 'opt/validates/findByTel', // 实名认证搜索
};

@Injectable()
export class UserCertificationService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  UserCertificationConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '实名认证管理',
      subTitle: '实名认证列表',
      ifHome: true,
      homeRouter: '/user-certification',
      currentRouter: '/user-certification'
    });
  }

  getUserCertifications(page: number, size: number, keyWord: string) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userCertificationList}?page=${page}&size=${size}&keyWord=${keyWord}`);
  }

  getUserUncertifications(page: number, size: number, keyWord: string) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userUnCertificationList}?page=${page}&size=${size}&keyWord=${keyWord}`);
  }

  getUserCertificatings(page: number, size: number, keyWord: string) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userCertificatingList}?page=${page}&size=${size}&keyWord=${keyWord}`);
  }

  getUserCertificationFailures(page: number, size: number, keyWord: string) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.userCertificationFailureList}?page=${page}&size=${size}&keyWord=${keyWord}`);
  }

  // getCertificationCount() {
  //   return this._apiService.get(`${PATH.userCertificationCount}`);
  // }
  //
  // getUserCertificationQuery(tel: string) {
  //   return this._apiService.get(`${PATH.userCertificationQuery}?tel=${tel}`);
  // }
}
