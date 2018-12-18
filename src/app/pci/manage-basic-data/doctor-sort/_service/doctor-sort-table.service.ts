import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class DoctorSortTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '头像',
        key: 'avatarUrl',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '医生姓名',
        key: 'name'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel'
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
        name: '职称',
        key: 'jobTitle'
      }),
      new TableTitle({
        name: '推荐值',
        key: 'ranking'
      }),
      new TableTitle({
        name: '总排名',
        key: ''
      }),
      new TableTitle({
        name: '院内排名',
        key: ''
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }
}
