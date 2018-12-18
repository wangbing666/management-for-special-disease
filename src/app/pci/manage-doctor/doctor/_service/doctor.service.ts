import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  doctorQuery: 'api/doctor/query', // 查询选项列表
  sendMessage: 'api/doctor/sendMsg', // 编辑短信提醒医生
  doctorOptionList: 'api/doctor/option/list', // 查询选项列表
  doctorCreate: 'api/doctor/add', // 新增医生
  doctorAuditedUpdate: 'api/doctor/audited/update', // 编辑审核通过的医生
  doctorAuditingUpdate: 'api/doctor/auditing/update', // 编辑审核失败医生
  doctorAuditing: 'api/doctor/auditing', // 医生审核
  integralDetail: 'opt/integral/records/list', // 积分明细
  serviceDetail: 'api/doctor/orderServiceDetails',
  serviceList: 'api/doctor/listService',
  doctorQR: 'api/doctor/getQr'
};

@Injectable()
export class DoctorService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService,
    @Inject('auth') private authService
  ) {
  }

  doctorConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医生信息管理',
      subTitle: '医生信息列表',
      ifHome: true,
      homeRouter: '/doctor',
      currentRouter: '/doctor'
    });
  }

  doctorEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '医生信息管理',
      subTitle: tag ? '新增医生' : '编辑医生信息',
      ifHome: false,
      homeRouter: '/doctor',
      currentRouter: '/doctor/edit'
    });
  }

  doctorMessageConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医生信息管理',
      subTitle: '短信提醒医生',
      ifHome: false,
      homeRouter: '/doctor',
      currentRouter: '/doctor/message'
    });
  }

  doctorIntegralConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医生信息管理',
      subTitle: '医生积分详情列表',
      ifHome: false,
      homeRouter: '/doctor',
      currentRouter: '/doctor/integral'
    });
  }

  serviceListConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医生信息管理',
      subTitle: '医生开通的服务',
      ifHome: false,
      homeRouter: '/doctor',
      currentRouter: '/doctor/service-list'
    });
  }

  serviceDetailConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医生信息管理',
      subTitle: '医生服务明细',
      ifHome: false,
      homeRouter: '/doctor',
      currentRouter: '/doctor/service-detail'
    });
  }

  getDoctors(key: string, date: any, page: number, size: number, index: number) {
    let start = date && new Date(date.split(' 至 ')[0] + ' 00:00').valueOf() || '';
    let end = date && new Date(date.split(' 至 ')[1] + ' 24:00').valueOf() || '';
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.doctorQuery}?page=${page}&size=${size}&param=${key}&index=${index}&startDate=${start}&endDate=${end}`
    );
  }

  getAllDoctors(key: string, date: any, page: number, size: number) {
    return this.getDoctors(key, date, page, size, 0);
  }

  getAuditedDoctors(key: string, date: any, page: number, size: number) {
    return this.getDoctors(key, date, page, size, 1);
  }

  getAuditingDoctors(key: string, date: any, page: number, size: number) {
    return this.getDoctors(key, date, page, size, 2);
  }

  getFailureDoctors(key: string, date: any, page: number, size: number) {
    return this.getDoctors(key, date, page, size, 3);
  }

  getDoctorQR(id) {
    return this.httpService.getText(`${this.app.pci.BASE_URL}${PATH.doctorQR}?sceneId=${id}`);
  }

  /**
   * 获取选项列表
   */
  getOptions() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.doctorOptionList}`);
  }

  /**
   * 新建医生
   * @param {any} body [description]
   */
  doctorCreate(body: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.doctorCreate}`, body);
  }

  /**
   * 更新审核通过的医生信息
   * @param {any} body [description]
   */
  doctorAuditedUpdate(body: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.doctorAuditedUpdate}`, body);
  }

  /**
   * 更新审核失败的医生信息
   * @param {any} body [description]
   */
  doctorAuditingUpdate(body: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.doctorAuditingUpdate}`, body);
  }

  /**
   * 通过医生审核
   * @param {number} id [description]
   */
  doctorAuditingSuccess(id: number) {
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.doctorAuditing}?id=${id}&status=1&auditor=${this.authService.getAdminName()}`
    );
  }

  /**
   * 不通过医生审核
   * @param {number} id      [description]
   * @param {string} message [description]
   */
  doctorAuditingFailure(id: number, message: string) {
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.doctorAuditing}?id=${id}&status=0&message=${message}&auditor=${this.authService.getAdminName()}`
    );
  }

  /**
   * 个人积分明细表
   */
  doctorIntegralDetail(traderId: number, page: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.integralDetail}/${traderId}/1?flag=${page}`);
  }

  /**
   * 编辑短信提醒医生
   * @param {any} body [description]
   */
  sendMessage(body: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.sendMessage}`, body);
  }

  getServiceDetail(id, page, size) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.serviceDetail}?page=${page}&size=${size}&doctorId=${id}`);
  }

  getServiceList(id) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.serviceList}/${id}`);
  }
}
