import { Inject, Injectable } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';

const PATH = {
  healthNewsList: 'api/article/list', // 获取所有资讯
  healthNewsUpdate: 'api/article/update', // 修改健康资讯
  healthNewsDelete: 'api/article/delete', // 删除健康资讯
  healthNewsCreate: 'api/article/save', // 新增健康资讯
  healthNewsFactor: 'api/article/factor', // 读取修改健康咨询系数
  healthInfoList: 'api/articleType/list', // 获取所有资讯分类
};

@Injectable()
export class HealthNewsService {

  constructor(
    @Inject('app') private app,
    @Inject('http') private httpService
  ) {
  }

  healthNewsConfig(): ContainerConfig {
    return new ContainerConfig({
      title: '健康资讯管理',
      subTitle: '健康资讯列表',
      ifHome: true,
      homeRouter: '/health-news',
      currentRouter: '/health-news'
    });
  }

  healthNewsEditConfig(tag: boolean): ContainerConfig {
    return new ContainerConfig({
      title: '健康资讯管理',
      subTitle: tag ? '新增健康资讯' : '编辑健康资讯',
      ifHome: false,
      homeRouter: '/health-news',
      currentRouter: '/health-news/edit'
    });
  }

  /**
   * 获取新闻资讯类型列表
   */
  getHealthNewsType() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.healthInfoList}`);
  }

  /**
   * 获取新闻资讯列表
   */
  getHealthNews(typeId: number, page: number, size: number) {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.healthNewsList}?typeId=${typeId}&size=${size}&page=${page}`);
  }

  /**
   * 新建新闻资讯
   */
  healthNewsCreate(data) {
    return this.httpService.post(`${this.app.pci.BASE_URL}${PATH.healthNewsCreate}`, data);
  }

  /**
   * 编辑新闻资讯
   */
  healthNewsUpdate(data) {
    return this.httpService.put(`${this.app.pci.BASE_URL}${PATH.healthNewsUpdate}`, data);
  }

  /**
   * 删除新闻资讯
   */
  healthNewsDelete(id: number) {
    return this.httpService.del(`${this.app.pci.BASE_URL}${PATH.healthNewsDelete}?id=${id}`);
  }

  /**
   * 读取健康资讯系数
   */
  healthNewsFetch() {
    return this.httpService.get(`${this.app.pci.BASE_URL}${PATH.healthNewsFactor}`);
  }

  /**
   * 修改健康资讯系
   */
  healthNewsEdit(data) {
    return this.httpService.put(`${this.app.pci.BASE_URL}${PATH.healthNewsFactor}`, data);
  }
}
