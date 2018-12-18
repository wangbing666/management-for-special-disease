import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  relationship: 'api/relation'
};

@Injectable()
export class RelationshipService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  relationshipConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '医患关联管理',
      subTitle: '医患关联列表',
      ifHome: true,
      homeRouter: '/relationship',
      currentRouter: '/relationship'
    });
  }

  getRelationships(page, size, keyword, accept, channel) {
    const param = `page=${page}&size=${size}&keyword=${keyword || ''}&accept=${accept || ''}&channel=${channel}`;
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.relationship}?${param}`);
  }
}
