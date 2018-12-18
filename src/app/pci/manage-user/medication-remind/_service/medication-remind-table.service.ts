import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class MedicationRemindTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '患者姓名',
        key: 'userName'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '用药时间',
        key: 'time'
      }),
      new TableTitle({
        name: '药品名称',
        key: 'medicationName'
      }),
      new TableTitle({
        name: '服用剂量',
        key: 'dosage'
      }),
      new TableTitle({
        name: '剂量单位',
        key: 'unit'
      }),
      new TableTitle({
        name: '创建时间',
        key: 'createdDate'
      }),
      new TableTitle({
        name: '状态',
        key: 'deleted'
      }),
      new TableTitle({
        name: '闹钟开关',
        key: 'remind'
      })
    ];

    return Titles;
  }
}
