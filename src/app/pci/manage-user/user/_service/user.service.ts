import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  userList: 'api/user/list', // 查询患者列表
  userOptionList: 'api/user/option', // 获取医院选项列表
  sourceList: 'api/user/getQrType', // 获取渠道列表
  userCreate: 'api/user/add', // 新增患者
  userUpdate: 'api/user/update', // 编辑患者信息
  sendMessage: 'api/user/sendMsg', // 短信提醒患者
  IntegralDetail: 'opt/integral/records/list/', // 个人积分明细
  photoUpload: '/record/photo/upload', // 上传病历
  importExcel: 'api/user/importExcel' // 批量注册患者
};

@Injectable()
export class UserService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  userConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '患者信息管理',
      subTitle: '患者信息列表',
      ifHome: true,
      homeRouter: '/user',
      currentRouter: '/user'
    });
  }

  userMessageConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '患者信息管理',
      subTitle: '短信提醒患者',
      ifHome: false,
      homeRouter: '/user',
      currentRouter: '/user/message'
    });
  }

  userEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '患者信息管理',
      subTitle: tag ? '新增患者' : '编辑患者信息',
      ifHome: false,
      homeRouter: '/user',
      currentRouter: '/user/edit'
    });
  }

  userIntegralConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '患者信息管理',
      subTitle: '患者积分详情列表',
      ifHome: false,
      homeRouter: '/user',
      currentRouter: '/user/integral'
    });
  }
  userUploadConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '患者信息管理',
      subTitle: '上传病历',
      ifHome: false,
      homeRouter: '/user',
      currentRouter: '/user/upload'
    });
  }

  //  * 获取患者列表
  //  * @param {string} key     [description]
  //  * @param {boolean} bind   [description]
  //  * @param {number} page    [description]
  //  * @param {number} size    [description]
  //  */
  getUsers(key: string, bind: any, registrationTime: any, page: number, size: number, hospitalId?: number, type?: number) {
    let query = `?keyword=${key}&binding=${bind}&registrationTime=${registrationTime}&page=${page}&size=${size}`
    if (hospitalId) {
      query += `&hospitalId=${hospitalId}`;
    }
    if (type) {
      query += `&type=${type}`
    }
    if (type == 0) {
      query += `&sceneId=${hospitalId}&type=${type}`
    }
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.userList}${query}`
    );
  }

  /**
   * 获取医院选项列表
   */
  getOptions() {
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.userOptionList}`
    )
  }

  /**
   * 获取渠道列表
   */
  getQrType() {
    return this.httpService.get(
      `${this.app.pci.BASE_URL}${PATH.sourceList}`
    )
  }

  /**
   * 新建患者
   * @param {[type]} body [description]
   */
  userCreate(body) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.userCreate}`, body)
  }

  /**
   * 更新患者信息
   * @param {[type]} body [description]
   */
  userUpdate(body) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.userUpdate}`, body);
  }

  /**
   * 编辑短信提醒患者
   * @param {any} body [description]
   */
  sendMessage(body: any) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.sendMessage}`, body);
  }

  /**
   * 个人积分明细表
   */
  userIntegralDetail(traderId: number, page: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.IntegralDetail}${traderId}/0?flag=${page}`);
  }

  /**
   * 上传病历
   */
  userUpload(body: any) {
    return this.httpService.post(`${this.app.pci.COMMON_URL}${PATH.photoUpload}`, body);
  }

  /**
   * 批量注册患者
   */
  batchRegisterUser(data: any) {
    return this.httpService.upload(`${this.app.pci.BASE_URL}${PATH.importExcel}`, data);
  }
}
