import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class IntegralDetailTableService {
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
        name: '当前积分',
        key: 'remainingIntegral'
      }),
      new TableTitle({
        name: '送分时间',
        key: 'recordTime'
      }),
      new TableTitle({
        name: '项目',
        key: 'content'
      }),
      new TableTitle({
        name: '明细',
        key: 'integralTransaction'
      })
    ];

    return Titles;
  }
}
