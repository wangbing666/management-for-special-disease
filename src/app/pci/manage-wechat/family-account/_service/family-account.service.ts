import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  familyAccount: 'api/family', // 获取家庭账号
};

@Injectable()
export class FamilyAccountService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  familyAccountConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '服务号管理',
      subTitle: '家庭账号维护',
      ifHome: true,
      homeRouter: '/family-account',
      currentRouter: '/family-account'
    });
  }

  /**
   * 获取家庭账号列表
   * @param {string} key   [description]
   * @param {number} page   [description]
   * @param {number} size   [description]
   */
  getFamilyAccounts(key: string, page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.familyAccount}?keyword=${key}&page=${page}&size=${size}`);
  }
}
