import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class FamilyAccountTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '微信昵称',
        key: 'nickname'
      }),
      new TableTitle({
        name: '真实姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '申请绑定患者',
        key: 'targetName'
      }),
      new TableTitle({
        name: '患者手机号',
        key: 'targetTel',
        minwidth: 85
      }),
      new TableTitle({
        name: '申请时间',
        key: 'date',
        controlType: ControlType.date,
        minwidth: 70
      }),
      new TableTitle({
        name: '申请状态',
        key: 'statusName'
      })
    ];

    return Titles;
  }
}
