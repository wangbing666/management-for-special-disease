/**
 * Created by zhanglin on 2017/7/31.
 */
import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  agree: 'opt/doctorPersonalService/agree', // 预约床位/挂号管理-已同意
  agreeOrDisagreeApply: '/opt/doctorPersonalService/agreeOrDisagreeApply', // 同意或拒绝申请
  pending: 'opt/doctorPersonalService/pending', // 预约床位/挂号-待处理
  rejected: 'opt/doctorPersonalService/rejected', // 预约床位/挂号-已拒绝
  editInfo: 'opt/doctorPersonalService/editInfo' // 同意或拒绝申请
};

@Injectable()
export class GreenChannelService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  greenChannelConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医生个人服务管理',
      subTitle: '绿色通道管理',
      ifHome: true,
      homeRouter: '/green-channel',
      currentRouter: '/green-channel'
    });
  }

  agree(page: number, size: number, serviceType: number, queryInfo?: string) {
    if (queryInfo == '') {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.agree}?page=${page}&size=${size}&serviceType=${serviceType}`);
    } else {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.agree}?page=${page}&size=${size}&serviceType=${serviceType}&queryInfo=${queryInfo}`);
    }
  }

  agreeOrDisagreeApply(agreeType: number, orderId: number, serviceType: number, date?: string) {
    if (date == '') {
      return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.agreeOrDisagreeApply}?agreeType=${agreeType}&orderId=${orderId}&serviceType=${serviceType}`, {});
    } else {
      return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.agreeOrDisagreeApply}?agreeType=${agreeType}&orderId=${orderId}&serviceType=${serviceType}&date=${date}`, {});
    }
  }

  editInfo(status: number, orderId: number, date?: string) {
    if (date == '') {
      return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.editInfo}?status=${status}&orderId=${orderId}`, {});
    } else {
      return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.editInfo}?status=${status}&orderId=${orderId}&date=${date}`, {});
    }
  }

  pending(page: number, size: number, serviceType: number, queryInfo?: string) {
    if (queryInfo == '') {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.pending}?page=${page}&size${size}&serviceType=${serviceType}`);
    } else {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.pending}?page=${page}&size${size}&serviceType=${serviceType}&queryInfo=${queryInfo}`);
    }
  }

  rejected(page: number, size: number, type: number, queryInfo?: string) {
    if (queryInfo == '') {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.rejected}?page=${page}&size${size}&type=${type}`);
    } else {
      return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.rejected}?page=${page}&size${size}&type=${type}&queryInfo=${queryInfo}`);
    }
  }
}
