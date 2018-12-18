import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class IntegralCommodityTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '商品图片',
        key: 'picUrl',
        controlType: ControlType.image
      }),
      new TableTitle({
        name: '商品名称',
        key: 'title',
      }),
      new TableTitle({
        name: '兑换积分',
        key: 'integral'
      }),
      new TableTitle({
        name: '添加人',
        key: 'operator',
      }),
      new TableTitle({
        name: '添加时间',
        key: 'recordTime',
        minwidth: 70
      }),
      new TableTitle({
        name: '库存',
        key: 'stock'
      }),
      new TableTitle({
        name: '推荐值',
        key: 'recommendValue'
      }),
      new TableTitle({
        name: '邮费',
        key: 'freight'
      }),
      new TableTitle({
        name: '客户端',
        key: 'goodsTypeName'
      }),
      new TableTitle({
        name: '状态',
        key: 'goodsStatusName'
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
