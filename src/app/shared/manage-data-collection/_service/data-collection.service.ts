import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

const PATH = {
  dataCollections: 'record/upload/list',
  dataCollection: 'record/upload',
  drug: 'api/medicine/list',
  hospital: 'hospitalList',
  medicalHospitals: 'api/hospital/hospitals',
  imglist: 'record/photo/getPhoto',
  updateimg: 'record/photo/update',
  searchHospital: 'api/hospital/getHospital'
};

@Injectable()
export class DataCollectionService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  dataCollectionConfig() {
    return new ContainerConfig({
      title: '病史资料录入',
      subTitle: '病史资料列表',
      ifHome: true,
      homeRouter: '/data-collection',
      currentRouter: '/data-collection'
    })
  }

  dataCollectionDetailConfig() {
    return new ContainerConfig({
      title: '病史资料录入',
      subTitle: '病史资料详情',
      ifHome: false,
      homeRouter: '/data-collection',
      currentRouter: '/data-collection/detail'
    })
  }

  dataCollectionEditConfig() {
    return new ContainerConfig({
      title: '病史资料录入',
      subTitle: '编辑病史资料',
      ifHome: false,
      homeRouter: '/data-collection',
      currentRouter: '/data-collection/edit'
    })
  }

  updateImageConfig() {
    return new ContainerConfig({
      title: '病史资料录入',
      subTitle: '修改病史图片',
      ifHome: false,
      homeRouter: '/data-collection',
      currentRouter: '/data-collection/updateImg'
    })
  }

  /**
   * @param {page} 页码
   * @param {size} 每页显示的数量
   * @param {type} 病史类型
   * @param {hospitalId} 患者所属的医院
   * @param {time} 待录入列表中上传时间或者审核通过列表中审核通过时间
   * @param {hospitalName} 病历医院筛选
   * @param {operation} 录入人筛选
   */
  getDataCollections(page, size, type, mobileOrName?, hospitalId?, time?, hospitalName?, operation?) {
    let query = `?page=${page}&size=${size}&type=${type}`
    if (hospitalId) {
      query += `&hospitalId=${hospitalId}`;
    }
    if (time) {
      let start = (new Date(time.split(' 至 ')[0] + ' 00:00')).valueOf();
      let end = (new Date(time.split(' 至 ')[1] + ' 24:00')).valueOf();
      query += `&start=${start}&end=${end}`;
    }
    if (hospitalName) {
      query += `&hospitalName=${hospitalName}`;
    }
    if (operation) {
      query += `&operation=${operation}`;
    }
    if (mobileOrName) {
      query += `&mobileOrName=${mobileOrName}`;
    }
    return this.httpService.get(`${this.app.pci.COMMON_URL}${PATH.dataCollections}${query}`);
  }

  getDataCollection(id) {
    return this.httpService.get(`${this.app.pci.COMMON_URL}${PATH.dataCollection}/${id}`);
  }

  dataCollectionCreate(id, data) {
    return this.httpService.post(`${this.app.pci.COMMON_URL}${PATH.dataCollection}/${id}`, data);
  }

  statusChanged(id, data) {
    return this.httpService.put(`${this.app.pci.COMMON_URL}${PATH.dataCollection}/${id}`, data);
  }

  getDrugs(key) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.drug}?page=0&size=999999&keyword=${key}`);
  }

  getHospitals() {
    return this.httpService.get(`${this.app.pci.COMMON_URL}${PATH.hospital}`);
  }

  getMedicalHospitals() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.medicalHospitals}`);
  }

  getImageList(id) {
    return this.httpService.get(`${this.app.pci.COMMON_URL}${PATH.imglist}?recordId=${id}`);
  }

  UpdateImage(data) {
    return this.httpService.post(`${this.app.pci.COMMON_URL}${PATH.updateimg}?recordId=${data.id}&imgUrlList=${data.imglist}`);
  }

  getHospitalAll(key) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.searchHospital}?hospitalName=${key}`);
  }
}
