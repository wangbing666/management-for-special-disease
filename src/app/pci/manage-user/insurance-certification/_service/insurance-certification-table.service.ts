import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class InsuranceCertificationTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '患者姓名',
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
        name: '医保卡号码',
        key: 'medicareCard'
      }),
      new TableTitle({
        name: '身份证号码',
        key: 'idCardNumber'
      }),
      new TableTitle({
        name: '通过时间',
        key: 'medicareCardDate'
      })
    ];

    return Titles;
  }
}
