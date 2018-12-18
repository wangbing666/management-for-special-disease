import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class CommunityTableService {

  setCommunityTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '小区名称',
        key: 'communityName'
      }),
      new TableTitle({
        name: '地理位置',
        key: 'geography',
        minwidth: 85,
        option: '查看',
        controlType: ControlType.button,
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button,
      })
    ];

    return Titles;
  }
}
