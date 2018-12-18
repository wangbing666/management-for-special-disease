import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class DiscomfortSymptomTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '图片',
        key: 'symptomUrl',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '不适症状名称',
        key: 'name'
      }),
      new TableTitle({
        name: '状态',
        key: 'enableName'
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
