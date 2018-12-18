import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class MissionIntegralTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '任务项目',
        key: 'name',
      }),
      new TableTitle({
        name: '操作',
        key: 'statusName',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '编辑',
        option: '编辑',
        key: 'tag',
        controlType: ControlType.button,
      })
    ];

    return Titles;
  }
}
