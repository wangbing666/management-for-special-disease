import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class LectureTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '讲座小图',
        key: 'imgUrl',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '讲座名称',
        key: 'name',
      }),
      new TableTitle({
        name: '讲座时间',
        key: 'date',
        controlType: ControlType.date,
        minwidth: 75
      }),
      new TableTitle({
        name: '讲座地点',
        key: 'address',
        maxwidth: 200
      }),
      new TableTitle({
        name: '讲座链接',
        key: 'url',
        maxwidth: 300
      }),
      new TableTitle({
        name: '签到二维码',
        key: 'signCodeUrl',
        option: '查看',
        controlType: ControlType.button,
        minwidth: 65
      }),
      new TableTitle({
        name: '状态',
        key: 'statusName'
      }),
      new TableTitle({
        name: '报名/签到人数',
        key: 'joinCount',
        option: '查看',
        controlType: ControlType.button,
        minwidth: 65
      }),
      new TableTitle({
        name: '上/下线',
        key: 'state',
        controlType: ControlType.button,
        minwidth: 60
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button,
        minwidth: 60
      }),
      new TableTitle({
        name: '删除',
        key: 'del',
        controlType: ControlType.button,
        minwidth: 60
      }),
    ];
    return Titles;
  }
}
