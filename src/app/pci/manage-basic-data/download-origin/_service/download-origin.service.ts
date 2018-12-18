import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  downloadOrigin: 'api/operational/channel',
};

@Injectable()
export class DownloadOriginService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  downloadOriginConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '下载渠道维护',
      ifHome: true,
      homeRouter: '/download-origin',
      currentRouter: '/download-origin'
    });
  }

  getDownloadOrigin() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.downloadOrigin}`);
  }

  downloadOriginCreate(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.downloadOrigin}`, data);
  }

  downloadOriginUpdate(id, data) {
    return this.httpService.put(`${this.app.pci.BASE_URL}${PATH.downloadOrigin}/${id}`, data);
  }

  downloadOriginDel(id) {
    return this.httpService.del(`${this.app.pci.BASE_URL}${PATH.downloadOrigin}/${id}`);
  }
}
