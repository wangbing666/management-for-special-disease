import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class LectureAuditingTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: 'id'
      }),
      new TableTitle({
        name: '微信昵称',
        key: 'nickname'
      }),
      new TableTitle({
        name: '姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '年龄',
        key: 'age',
      }),
      new TableTitle({
        name: '性别',
        key: 'sex'
      }),
      new TableTitle({
        name: '报名时间',
        key: 'joinDate',
        controlType: ControlType.date
      }),
      new TableTitle({
        name: '报名号',
        key: 'joinCode',
      }),
      new TableTitle({
        name: '报名状态',
        key: 'joinStatusName',
      }),
      new TableTitle({
        name: '签到时间',
        key: 'signDate',
      }),
      new TableTitle({
        name: '签到状态',
        key: 'signStatusName',
      }),
    ];

    return Titles;
  }
}
