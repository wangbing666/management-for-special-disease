import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class RelationshipTableService {

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
        name: '手机号',
        key: 'doctorTel',
        minwidth: 85
      }),
      new TableTitle({
        name: '所属医院',
        key: 'hospital'
      }),
      new TableTitle({
        name: '所属科室',
        key: 'department'
      }),
      new TableTitle({
        name: '申请患者姓名',
        key: 'userName'
      }),
      new TableTitle({
        name: '申请患者手机号',
        key: 'userTel',
        minwidth: 85
      }),
      new TableTitle({
        name: '是否认证',
        key: 'validateStatus'
      }),
      new TableTitle({
        name: '申请时间',
        key: 'date',
        minwidth: 70
      }),
      new TableTitle({
        name: '通过时间',
        key: 'agreeDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '关联渠道',
        key: 'channel'
      }),
      new TableTitle({
        name: '状态',
        key: 'status'
      }),
      new TableTitle({
        name: '加入小组',
        key: 'groupName'
      }),
      // new TableTitle({
      //   name: '是否赠送服务',
      //   key: 'whetherToGiveFreeService'
      // })
    ];

    return Titles;
  }
}
