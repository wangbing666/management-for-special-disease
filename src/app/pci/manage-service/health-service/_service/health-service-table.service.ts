import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class HealthServiceTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '服务图片',
        key: 'imageUrl',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '服务名称',
        key: 'title',
      }),
      new TableTitle({
        name: '服务ID',
        key: 'serviceId'
      }),
      new TableTitle({
        name: '服务机构',
        key: 'name'
      }),
      new TableTitle({
        name: '服务次数',
        key: 'name'
      }),
      new TableTitle({
        name: '服务价格',
        key: 'name'
      }),
      new TableTitle({
        name: '添加人',
        key: 'createdBy',
      }),
      new TableTitle({
        name: '添加时间',
        key: 'createdDate',
      }),
      new TableTitle({
        name: '状态',
        key: 'enable',
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button
      })
    ];
    return Titles;
  }
}
