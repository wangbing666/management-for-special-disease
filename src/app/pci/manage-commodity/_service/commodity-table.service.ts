import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../libs/dtable/dtable.entity';

@Injectable()
export class CommodityTableService {
  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '商品图片',
        key: 'avatar',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '商品名称',
        key: 'title',
      }),
      new TableTitle({
        name: '类型',
        key: 'typeName'
      }),
      new TableTitle({
        name: '兑换鲜花',
        key: 'flower',
      }),
      new TableTitle({
        name: '添加人',
        key: 'createUserName',
      }),
      new TableTitle({
        name: '添加时间',
        key: 'createdDate',
        minwidth: 70
      }),
      new TableTitle({
        name: '推荐值',
        key: 'recommendValue'
      }),
      new TableTitle({
        name: '状态',
        key: 'statusName'
      }),
      new TableTitle({
        name: '上／下架',
        key: 'updown',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '删除',
        key: 'del',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }
}
