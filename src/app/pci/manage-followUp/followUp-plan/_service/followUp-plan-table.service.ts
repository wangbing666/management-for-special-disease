import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class FollowPlanTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '医生姓名',
        key: 'doctorName'
      }),
      new TableTitle({
        name: '医生手机号',
        key: 'doctorTel',
        minwidth: 85
      }),
      new TableTitle({
        name: '随访患者',
        key: 'userName'
      }),
      new TableTitle({
        name: '患者手机号',
        key: 'userTel'
      }),
      new TableTitle({
        name: '随访创建时间',
        key: 'planDate'
      }),
      new TableTitle({
        name: '初次随访时间',
        key: 'firstFlupTime'
      }),
      new TableTitle({
        name: '随访反馈率',
        key: 'flupRate'
      }),
      new TableTitle({
        name: '详情',
        key: 'edit',
        controlType: ControlType.button,
      })
    ];

    return Titles;
  }

  setDetailTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '设定随访时间',
        key: 'date',
      }),
      new TableTitle({
        name: '随访项目',
        key: 'plan'
      }),
      new TableTitle({
        name: '已做项目',
        key: 'item',
        minwidth: 85
      }),
      new TableTitle({
        name: '反馈情况',
        key: 'isFlup'
      })
    ];

    return Titles;
  }
}
