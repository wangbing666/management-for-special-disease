import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class AssessmentRiskTableService {

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
        key: 'name',
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel'
      }),
      new TableTitle({
        name: '性别',
        key: 'sexName'
      }),
      new TableTitle({
        name: '年龄',
        key: 'age'
      }),
      new TableTitle({
        name: '测评时间',
        key: 'date'
      }),
      new TableTitle({
        name: '风险评估结果',
        key: 'level'
      }),
      new TableTitle({
        name: '查看',
        key: 'show',
        controlType: ControlType.button
      })
    ];
    return Titles;
  }
}
