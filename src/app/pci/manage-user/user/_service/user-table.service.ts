import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class UserTableService {

  setUserTitles() {
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
        name: '患者姓名',
        key: 'name',
        minwidth: 80
      }),
      new TableTitle({
        name: '用户ID',
        key: 'id',
        minwidth: 40
      }),
      new TableTitle({
        name: '手机号',
        key: 'tel',
        minwidth: 85
      }),
      new TableTitle({
        name: '微信昵称',
        key: 'nickname',
        minwidth: 100
      }),
      new TableTitle({
        name: '性别',
        key: 'sexName',
        minwidth: 40
      }),
      new TableTitle({
        name: '年龄',
        key: 'age',
        minwidth: 40
      }),
      new TableTitle({
        name: '手术医院',
        key: 'hospitalName',
        minwidth: 100
      }),
      new TableTitle({
        name: '实名认证',
        key: 'validateState',
        minwidth: 80
      }),
      new TableTitle({
        name: '医保卡认证',
        key: 'medicareCardStatus',
        minwidth: 80
      }),
      new TableTitle({
        name: '来源渠道',
        key: 'registerType',
        minwidth: 100
      }),
      new TableTitle({
        name: '注册时间',
        key: 'createdDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '当前积分',
        key: 'integral',
        option: '查看',
        controlType: ControlType.button,
        minwidth: 70
      }),
      new TableTitle({
        name: '备注',
        key: 'remark',
        minwidth: 50
      }),
      new TableTitle({
        name: '上传病历',
        key: 'upload',
        controlType: ControlType.button,
        minwidth: 65
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button,
        minwidth: 65
      })
    ];

    return Titles;
  }
}
