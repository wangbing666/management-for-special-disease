import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class ServiceSpecTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '规格名称',
        key: 'name'
      }),
      new TableTitle({
        name: '所属类型',
        key: 'specificationName'
      }),
      new TableTitle({
        name: '价格',
        key: 'price'
      }),
      new TableTitle({
        name: '库存数量',
        key: 'count'
      }),
      new TableTitle({
        name: '对应第三方服务',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '添加人',
        key: 'operator'
      }),
      new TableTitle({
        name: '添加时间',
        key: 'createdDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '状态',
        key: 'enableName'
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button
      }),
    ];
    return Titles;
  }
}
