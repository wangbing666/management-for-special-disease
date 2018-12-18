import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class CouponTableService {

  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '优惠券名称',
        key: 'name',
      }),
      new TableTitle({
        name: '优惠券面值',
        key: 'couponPrice',
      }),
      new TableTitle({
        name: '结束日期',
        key: 'endDate',
      }),
      new TableTitle({
        name: '已领取数量',
        key: 'receiveQuantity'
      }),
      new TableTitle({
        name: '优惠券总数量',
        key: 'grantNum'
      }),
      new TableTitle({
        name: '状态',
        key: 'status'
      }),
      new TableTitle({
        name: '编辑',
        key: 'edit',
        controlType: ControlType.button,
      })
    ];

    return Titles;
  }
}
