import { Injectable } from '@angular/core';
import { ControlType, TableTitle } from '../../../../libs/dtable/dtable.entity';

@Injectable()
export class UserOrderTableService {

  // 全部订单
  setTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '购买人',
        key: 'purchaser'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '购买服务类型',
        key: 'serviceType'
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'supplierName'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: '订单价格',
        key: 'originalPrice'
      }),
      new TableTitle({
        name: '付款金额',
        key: 'amount'
      }),
      new TableTitle({
        name: '优惠金额',
        key: 'discountAmount'
      }),
      new TableTitle({
        name: '服务开始时间',
        key: 'serviceStart',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: '服务结束时间',
        key: 'serviceEnd',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: '使用情况',
        key: 'usage',
        controlType: ControlType.textButton,
        option: '查看',
      }),
      new TableTitle({
        name: '状态',
        key: 'status'
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'tradeNo'
      }),
      new TableTitle({
        name: '订单详情',
        key: 'detail',
        option: '查看订单详情',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }

  // 待支付订单
  setUnpayTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '购买人',
        key: 'purchaser'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '购买服务类型',
        key: 'serviceType'
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'supplierName'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '订单价格',
        key: 'originalPrice'
      }),
      new TableTitle({
        name: '付款金额',
        key: 'amount'
      }),
      new TableTitle({
        name: '优惠金额',
        key: 'discountAmount'
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'tradeNo'
      }),
      new TableTitle({
        name: '订单详情',
        key: 'detail',
        option: '查看订单详情',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }

  // 申请中订单
  setApplyTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '购买人',
        key: 'purchaser'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '购买服务类型',
        key: 'serviceType'
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'supplierName'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '订单价格',
        key: 'originalPrice'
      }),
      new TableTitle({
        name: '付款金额',
        key: 'amount'
      }),
      new TableTitle({
        name: '优惠金额',
        key: 'discountAmount'
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'tradeNo'
      }),
      new TableTitle({
        name: '订单详情',
        key: 'detail',
        option: '查看订单详情',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }

  // 退款中订单
  setRefundingTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '购买人',
        key: 'purchaser'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '购买服务类型',
        key: 'serviceType'
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'supplierName'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '订单价格',
        key: 'originalPrice'
      }),
      new TableTitle({
        name: '付款金额',
        key: 'amount'
      }),
      new TableTitle({
        name: '优惠金额',
        key: 'discountAmount'
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'tradeNo'
      }),
      new TableTitle({
        name: '操作',
        key: 'refund',
        option: '退款',
        controlType: ControlType.button
      }),
      new TableTitle({
        name: '订单详情',
        key: 'detail',
        option: '查看订单详情',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }

  // 退款成功订单
  setRefundTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '购买人',
        key: 'purchaser'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '购买服务类型',
        key: 'serviceType'
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'supplierName'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '订单价格',
        key: 'originalPrice'
      }),
      new TableTitle({
        name: '付款金额',
        key: 'amount'
      }),
      new TableTitle({
        name: '优惠金额',
        key: 'discountAmount'
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'tradeNo'
      }),
      new TableTitle({
        name: '订单详情',
        key: 'detail',
        option: '查看订单详情',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }

  // 购买成功订单
  setSuccessTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '购买人',
        key: 'purchaser'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '购买服务类型',
        key: 'serviceType'
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'supplierName'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '订单价格',
        key: 'originalPrice'
      }),
      new TableTitle({
        name: '付款金额',
        key: 'amount'
      }),
      new TableTitle({
        name: '优惠金额',
        key: 'discountAmount'
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: '服务开始时间',
        key: 'serviceStart',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: '服务结束时间',
        key: 'serviceEnd',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: '是否有效',
        key: 'invalid'
      }),
      new TableTitle({
        name: '使用情况',
        key: 'usage',
        controlType: ControlType.textButton,
        option: '查看'
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'tradeNo'
      }),
      new TableTitle({
        name: '订单详情',
        key: 'detail',
        option: '查看订单详情',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }

  // 已取消订单
  setCancelTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '购买人',
        key: 'purchaser'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '购买服务类型',
        key: 'serviceType'
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'supplierName'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '订单价格',
        key: 'originalPrice'
      }),
      new TableTitle({
        name: '付款金额',
        key: 'amount'
      }),
      new TableTitle({
        name: '优惠金额',
        key: 'discountAmount'
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'tradeNo'
      }),
      new TableTitle({
        name: '订单详情',
        key: 'detail',
        option: '查看订单详情',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }

  // 未处理第三方订单
  setThirdTitles() {
    const Titles: TableTitle[] = [
      new TableTitle({
        name: '序号',
        key: '',
        controlType: ControlType.index
      }),
      new TableTitle({
        name: '购买人',
        key: 'purchaser'
      }),
      new TableTitle({
        name: '手机号',
        key: 'phone',
        minwidth: 85
      }),
      new TableTitle({
        name: '服务提供者',
        key: 'supplierName'
      }),
      new TableTitle({
        name: '服务名称',
        key: 'serviceName'
      }),
      new TableTitle({
        name: '订单价格',
        key: 'originalPrice'
      }),
      new TableTitle({
        name: '付款金额',
        key: 'amount'
      }),
      new TableTitle({
        name: '优惠金额',
        key: 'discountAmount'
      }),
      new TableTitle({
        name: '购买时间',
        key: 'purchaseTime',
        minwidth: 70,
        maxwidth: 70
      }),
      new TableTitle({
        name: 'Ping++订单号',
        key: 'tradeNo'
      }),
      new TableTitle({
        name: '操作',
        key: 'thirdProcess',
        option: '操作',
        controlType: ControlType.button,
        minwidth: 65
      }),
      new TableTitle({
        name: '订单详情',
        key: 'detail',
        option: '查看订单详情',
        controlType: ControlType.button
      })
    ];

    return Titles;
  }
}
