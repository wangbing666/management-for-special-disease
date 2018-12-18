import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class HospitalTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '医院图片',
        key: 'imageUrl',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '医院名称',
        key: 'name',
      }),
      new TableTitle({
        name: '医生数量',
        key: 'num',
      }),
      new TableTitle({
        name: '医院服务二维码',
        key: 'qrcode',
        minwidth: 85,
        option: '查看',
        controlType: ControlType.button,
      }),
      new TableTitle({
        name: '地理位置',
        key: 'geography',
        minwidth: 85,
        option: '查看',
        controlType: ControlType.button,
      }),
      new TableTitle({
        name: '状态',
        key: 'enableName',
      }),
      new TableTitle({
        name: '编辑',
        key: 'editHospital',
        controlType: ControlType.button
      })
    ];
    return Titles;
  }
}
