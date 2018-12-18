import { Injectable } from '@angular/core';

import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class AdDoctorTableService {

  setAdDoctorTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '图片',
        key: 'imageUrl',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '广告名称',
        key: 'title'
      }),
      new TableTitle({
        name: '广告链接',
        key: 'linkUrl',
        minwidth: 85
      }),
      new TableTitle({
        name: '推荐值',
        key: 'ranking'
      }),
      new TableTitle({
        name: '点击量',
        key: 'click'
      }),
      new TableTitle({
        name: '上传者',
        key: 'admin'
      }),
      new TableTitle({
        name: '上传时间',
        key: 'createdDate'
      }),
      new TableTitle({
        name: '状态',
        key: 'statusName'
      }),
      new TableTitle({
        name: '上/下架',
        key: 'updown',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '删除',
        key: 'del',
        controlType: ControlType.button
      })
    ];
    return Titles;
  }
}
