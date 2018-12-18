/**
 * Created by zhanglin on 2017/7/31.
 */
import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class GreenChannelTableService {
  setAgreeTitles() {
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
        key: 'doctorTel'
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
        key: 'patientName'
      }),
      new TableTitle({
        name: '患者手机号',
        key: 'patientTel'
      }),
      new TableTitle({
        name: '申请时间',
        key: 'applicationTime'
      }),
      new TableTitle({
        name: '可就诊日期',
        key: 'TreatmentTime'
      }),
      new TableTitle({
        name: '状态',
        key: 'status'
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button
      }),
    ];
    return Titles;
  }

  setPendingTitles() {
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
        key: 'doctorTel'
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
        key: 'patientName'
      }),
      new TableTitle({
        name: '患者手机号',
        key: 'patientTel'
      }),
      new TableTitle({
        name: '申请时间',
        key: 'applicationTime'
      }),
      new TableTitle({
        name: '同意',
        key: 'agree',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '拒绝',
        key: 'disagree',
        controlType: ControlType.button
      })
    ];
    return Titles;
  }

  setRejectedTitles() {
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
        key: 'doctorTel'
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
        key: 'patientName'
      }),
      new TableTitle({
        name: '患者手机号',
        key: 'patientTel'
      }),
      new TableTitle({
        name: '申请时间',
        key: 'applicationTime'
      })
    ];
    return Titles;
  }
}
