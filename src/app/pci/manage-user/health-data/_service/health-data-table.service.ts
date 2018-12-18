import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class HealthDataTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '性别',
        key: 'sex'
      }),
      new TableTitle({
        name: '年龄',
        key: 'age'
      }),
      new TableTitle({
        name: '手术医院',
        key: 'hospital'
      }),
      new TableTitle({
        name: '手术医生',
        key: 'surgeon'
      }),
      new TableTitle({
        name: '指标数据',
        key: 'value'
      }),
      new TableTitle({
        name: '状态',
        key: 'StandardName'
      }),
      new TableTitle({
        name: '上传时间',
        key: 'recordTime'
      })
    ];

    return Titles;
  }
}
