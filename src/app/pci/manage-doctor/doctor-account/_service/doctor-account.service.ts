import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  incomeDetailList: 'api/income/detail/list', // 收入列表
  incomeExchangeCount: 'api/income/exchange/count', // 获取待处理数量
  incomeExchangeList: 'api/income/exchange/list', // 医生兑换列表
  incomeList: 'api/income/list', // 所有账户列表
  incomePurchase: 'api/income/purchase', // 兑换处理
  incomePurchaseList: 'api/income/purchase/list', // 兑换列表
  incomeWithdraw: 'api/income/withdraw', // 提现处理
  incomeWithdrawList: 'api/income/withdraw/list', // 提现列表
  sendFlowers: 'api/income/grantFlower' // 赠送鲜花
};

@Injectable()
export class DoctorAccountService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService,
    @Inject('auth') private admin,
  ) {
  }

  doctorAccountConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医生账户管理',
      subTitle: '医生账户列表',
      ifHome: true,
      homeRouter: '/doctor-account',
      currentRouter: '/doctor-account'
    });
  }

  receiveFlowersConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医生账户管理',
      subTitle: '收到鲜花列表',
      ifHome: false,
      homeRouter: '/doctor-account',
      currentRouter: '/doctor-account'
    });
  }

  exchangeCommoditiesConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医生账户管理',
      subTitle: '已兑换商品列表',
      ifHome: false,
      homeRouter: '/doctor-account',
      currentRouter: '/doctor-account'
    });
  }

  /**
   * 收入列表
   */
  getDetailList(doctorId: number, size: number, page: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.incomeDetailList}?doctorId=${doctorId}&size=${size}&page=${page}`);
  }

  /**
   * 获取待处理数量
   */
  getCount() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.incomeExchangeCount}`);
  }

  /**
   * 医生兑换列表
   */
  getExchangeList(doctorId: number, size: number, page: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.incomeExchangeList}?doctorId=${doctorId}&size=${size}&page=${page}`);
  }

  /**
   * 所有账户列表
   */
  getDoctorAccounts(page: number, size: number, key: string) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.incomeList}?size=${size}&page=${page}&param=${key}`);
  }

  /**
   * 兑换处理
   */
  getPurchase(id: number, expressNo: string, expressName: string, status: number) {
    return this.httpService.post(
      `${this.app.pci.BASE_URL}${PATH.incomePurchase}?id=${id}&adminId=${this.admin.getAdminId()}&expressNo=${expressNo}&expressName=${expressName}&status=${status}`,
      {}
    );
  }

  /**
   * 兑换列表
   */
  getCommodityExchanges(page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.incomePurchaseList}?size=${size}&page=${page}`);
  }

  /**
   * 提现处理
   */
  getWithdraw(id: number) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.incomeWithdraw}?id=${id}&adminId=${this.admin.getAdminId()}`, {});
  }

  /**
   * 提现列表
   */
  getWithdrawDeposits(page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.incomeWithdrawList}?size=${size}&page=${page}`);
  }

  /**
   * 赠送鲜花
   * @param {any} body [description]
   */
  SendFlowers(body: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.sendFlowers}`, body);
  }
}
