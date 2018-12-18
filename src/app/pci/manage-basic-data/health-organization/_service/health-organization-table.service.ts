import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class HealthOrganizationTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '机构图片',
        key: 'imageUrl',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '机构名称',
        key: 'name',
      }),
      new TableTitle({
        name: '编辑',
        key: 'editThirdParty',
        controlType: ControlType.button
      })
    ];
    return Titles;
  }
}
