import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';

const PATH = {
  flowerClassList: 'api/income/level/list', // 鲜花等级列表
  flowerClassCreate: 'api/income/level/update', // 新建鲜花等级
  flowerClassEdit: 'api/income/level/update', // 编辑鲜花等级
  flowerClassDelete: 'api/income/level/delete', // 删除鲜花等级
};

@Injectable()
export class FlowerGradeService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService,
  ) {
  }

  flowerGradeConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '基础数据维护',
      subTitle: '鲜花等级维护',
      ifHome: true,
      homeRouter: '/flower-grade',
      currentRouter: '/flower-grade'
    });
  }

  flowerGradeEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '鲜花等级维护',
      subTitle: tag ? '新增鲜花等级' : '编辑鲜花等级',
      ifHome: false,
      homeRouter: '/flower-grade',
      currentRouter: '/flower-grade/edit'
    });
  }

  /**
   * 获取鲜花等级
   */
  getFlowerGrades() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.flowerClassList}`);
  }

  /**
   * 新建鲜花等级
   * @param {[type]} title [description]
   * @param {[type]} imgUrl [description]
   * @param {[type]} value [description]
   */
  flowerGradeCreate(title, imgUrl, value) {
    return this.httpService.post(
      `${this.app.pci.BASE_URL}${PATH.flowerClassCreate}?title=${title}&imgUrl=${imgUrl}&value=${value}`,
      {}
    );
  }

  /**
   * 编辑鲜花等级
   * @param id
   * @param title
   * @param imgUrl
   * @param value
   * @returns {any}
   */
  flowerGradeEdit(id, title, imgUrl, value) {
    return this.httpService.post(
      `${this.app.pci.BASE_URL}${PATH.flowerClassEdit}?id=${id}&title=${title}&imgUrl=${imgUrl}&value=${value}`,
      {}
    );
  }

  /**
   * 删除鲜花等级
   * @param {number} id [description]
   */
  flowerGradeDelete(id: number) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.flowerClassDelete}?id=${id}`, {});
  }
}
