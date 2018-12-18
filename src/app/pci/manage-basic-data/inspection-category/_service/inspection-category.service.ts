import { Injectable, Inject } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  inspectionCategory: 'record/examination/type'
};

@Injectable()
export class InspectionCategoryService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  inspectionCategoryConfig() {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '检查类目维护',
      ifHome: true,
      homeRouter: '/inspection-category',
      currentRouter: '/inspection-category'
    });
  }

  getInspectionCategories() {
    return this.httpService.get(`${this.app.pci.COMMON_URL}${PATH.inspectionCategory}`);
  }

  inspectionCategoryCreate(data) {
    return this.httpService.post(`${this.app.pci.COMMON_URL}${PATH.inspectionCategory}`, data);
  }

  inspectionCategoryEdit(data) {
    return this.httpService.put(`${this.app.pci.COMMON_URL}${PATH.inspectionCategory}/${data.id}`, data);
  }

  inspectionCategoryDelete(id) {
    return this.httpService.del(`${this.app.pci.COMMON_URL}${PATH.inspectionCategory}/${id}`);
  }
}
