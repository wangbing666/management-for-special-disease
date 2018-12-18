import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class FollowUpPlanTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '随访项',
        key: 'name'
      }),
      new TableTitle({
        name: '自定义内容',
        key: 'customName'
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
