import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class UserCertificationTableService {

  setCertificationTitles() {
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
        name: '姓名',
        key: 'name'
      }),
      new TableTitle({
        name: 'ID',
        key: 'id'
      }),
      new TableTitle({
        name: '性别',
        key: 'sexValue'
      }),
      new TableTitle({
        name: '年龄',
        key: 'age'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '身份证号码',
        key: 'idCardNumber',
        minwidth: 100
      }),
      new TableTitle({
        name: '认证照片',
        key: 'idCardImageUrl',
        option: '查看',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '申请时间',
        key: 'validateDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '通过时间',
        key: 'callbackDate',
        minwidth: 70
      })
    ];

    return Titles;
  }

  setUncertificationTitles() {
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
        name: '姓名',
        key: 'name'
      }),
      new TableTitle({
        name: 'ID',
        key: 'id'
      }),
      new TableTitle({
        name: '性别',
        key: 'sexValue'
      }),
      new TableTitle({
        name: '年龄',
        key: 'age'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '注册时间',
        key: 'createdDate',
        minwidth: 70
      })
    ];

    return Titles;
  }

  setCertificatingTitles() {
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
        name: '姓名',
        key: 'name'
      }),
      new TableTitle({
        name: 'ID',
        key: 'id'
      }),
      new TableTitle({
        name: '性别',
        key: 'sexValue'
      }),
      new TableTitle({
        name: '年龄',
        key: 'age'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '身份证号码',
        key: 'idCardNumber',
        minwidth: 100
      }),
      new TableTitle({
        name: '认证照片',
        key: 'idCardImageUrl',
        option: '查看',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '申请时间',
        key: 'validateDate',
        minwidth: 70
      })
    ];

    return Titles;
  }

  setCertificationFailureTitles() {
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
        name: '姓名',
        key: 'name'
      }),
      new TableTitle({
        name: 'ID',
        key: 'id'
      }),
      new TableTitle({
        name: '性别',
        key: 'sexValue'
      }),
      new TableTitle({
        name: '年龄',
        key: 'age'
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '身份证号码',
        key: 'idCardNumber',
        minwidth: 100
      }),
      new TableTitle({
        name: '认证照片',
        key: 'idCardImageUrl',
        option: '查看',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '申请时间',
        key: 'validateDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '失败时间',
        key: 'callbackDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '认证失败原因',
        key: 'validateMsg'
      }),
    ];

    return Titles;
  }
}
