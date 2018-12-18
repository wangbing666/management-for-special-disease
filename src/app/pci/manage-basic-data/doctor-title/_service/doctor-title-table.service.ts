import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class DoctorTitleTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '职称名称',
        key: 'name',
      }),
      new TableTitle({
        name: '编辑',
        key: 'editPositionalTitle',
        controlType: ControlType.button
      })
    ];
    return Titles;
  }
}
