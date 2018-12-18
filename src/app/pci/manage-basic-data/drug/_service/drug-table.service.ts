import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class DrugTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '药名',
        key: 'name'
      }),
      new TableTitle({
        name: '品牌',
        key: 'company'
      }),
      new TableTitle({
        name: '建议用法',
        key: 'method'
      }),
      new TableTitle({
        name: '服用剂量',
        key: 'take'
      }),
      new TableTitle({
        name: '单位',
        key: 'dosageForm'
      }),
      new TableTitle({
        name: '药量',
        key: 'doseSpecification'
      }),
      new TableTitle({
        name: '状态',
        key: 'enableName'
      }),
      new TableTitle({
        name: '编辑',
        key: 'editDrug',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }
}
