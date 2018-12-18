import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  inspectionCategory: 'record/examination/type',
  inspectionItem: 'record/examination/item'
};

@Injectable()
export class InspectionItemService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  inspectionItemConfig() {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '检查子项目维护',
      ifHome: true,
      homeRouter: '/inspection-item',
      currentRouter: '/inspection-item'
    });
  }

  inspectionItemEditConfig(tag) {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: tag ? '编辑检查子项目' : '新增检查子项目',
      ifHome: true,
      homeRouter: '/inspection-item',
      currentRouter: '/inspection-item/edit'
    });
  }

  getInspectionCategories() {
    return this.httpService.get(`${this.app.pci.COMMON_URL}${PATH.inspectionCategory}`);
  }

  getInspectionItems(page: number, size: number, type: number) {
    return this.httpService.get(`${this.app.pci.COMMON_URL}${PATH.inspectionItem}?page=${page}&size=${size}&type=${type}`);
  }

  inspectionItemCreate(data) {
    return this.httpService.post(`${this.app.pci.COMMON_URL}${PATH.inspectionItem}`, data);
  }

  inspectionItemEdit(data) {
    return this.httpService.put(`${this.app.pci.COMMON_URL}${PATH.inspectionItem}/${data.id}`, data);
  }

  inspectionItemDelete(id) {
    return this.httpService.del(`${this.app.pci.COMMON_URL}${PATH.inspectionItem}/${id}`);
  }
}
