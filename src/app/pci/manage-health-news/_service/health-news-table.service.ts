import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../libs/dtable/dtable.entity';

@Injectable()
export class HealthNewsTableService {

  setTitles() {
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
        name: '文章标题',
        key: 'title'
      }),
      new TableTitle({
        name: '文章链接',
        key: 'link',
        maxwidth: 500
      }),
      new TableTitle({
        name: '推荐值',
        key: 'ranking'
      }),
      new TableTitle({
        name: '实际阅读量',
        key: 'actualReading'
      }),
      new TableTitle({
        name: '展示阅读量',
        key: 'showReading'
      }),
      new TableTitle({
        name: '上传者',
        key: 'admin'
      }),
      new TableTitle({
        name: '上传时间',
        key: 'createdDate',
        minwidth: 70
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
