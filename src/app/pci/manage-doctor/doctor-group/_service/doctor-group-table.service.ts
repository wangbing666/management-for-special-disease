import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class DoctorGroupTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '医生小组名称',
        key: 'groupName'
      }),
      new TableTitle({
        name: '组长',
        key: 'name'
      }),
      new TableTitle({
        name: '管理员',
        key: 'managerNames'
      }),
      new TableTitle({
        name: '小组成员',
        key: 'memberNames'
      }),
      new TableTitle({
        name: '开通服务',
        key: 'serviceNames'
      }),
      new TableTitle({
        name: '已服务',
        key: 'serviceCount'
      }),
      new TableTitle({
        name: '正在服务',
        key: 'servicingCount'
      }),
      new TableTitle({
        name: '成立时间',
        key: 'createdDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '服务明细',
        key: 'show',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '已开通服务',
        key: 'serviceList',
        option: '查看',
        controlType: ControlType.button,
      })
    ];

    return Titles;
  }

  setServiceListTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '已开通服务',
        key: 'name'
      }),
      new TableTitle({
        name: '价格',
        key: 'priceUnit'
      }),
      new TableTitle({
        name: '有效期',
        key: 'cycleNumber'
      }),
      new TableTitle({
        name: '服务详情',
        key: 'description',
      })
    ];
    return Titles;
  }
}
