import { Injectable } from '@angular/core';
import { TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class RegisterStatisticsTableService {

  setUserTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '日期',
        key: 'date'
      }),
      new TableTitle({
        name: '注册用户数',
        key: 'registerCount'
      }),
      new TableTitle({
        name: '实名认证用户数',
        key: 'validateCount'
      }),
      new TableTitle({
        name: '申请医患关联用户数',
        key: 'relationCount'
      }),
    ];
    return Titles;
  }

  setDoctorTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '日期',
        key: 'date'
      }),
      new TableTitle({
        name: '注册医生数',
        key: 'registerCount'
      }),
      new TableTitle({
        name: '审核通过医生数',
        key: 'validateCount'
      }),
      new TableTitle({
        name: '加入小组医生数',
        key: 'doctorGroupCount'
      }),
    ];
    return Titles;
  }
}
