import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-order-detail',
  styles: [`
    p {
      float: right;
    }
  `],
  template: `
    <h1 mat-dialog-title>订单详情</h1>
    <div mat-dialog-content>
      <mat-list>
        <mat-list-item>
          <h4 mat-line>下单时间：<p>{{data.purchaseTime}}</p></h4>
        </mat-list-item>
        <mat-divider></mat-divider>
        <mat-list-item>
          <h4 mat-line>购买人：<p>{{data.purchaser}}</p></h4>
        </mat-list-item>
        <mat-list-item>
          <h4 mat-line>购买服务类型：<p>{{data.serviceType}}</p></h4>
        </mat-list-item>
        <mat-list-item>
          <h4 mat-line>服务提供者：<p>{{data.supplierName}}</p></h4>
        </mat-list-item>
        <mat-list-item>
          <h4 mat-line>服务名称：<p>{{data.serviceName}}</p></h4>
        </mat-list-item>
        <mat-divider></mat-divider>
        <mat-list-item>
          <h4 mat-line>收货人：<p>{{data.consignee}}</p></h4>
        </mat-list-item>
        <mat-list-item>
          <h4 mat-line>手机号：<p>{{data.deliveryPhone}}</p></h4>
        </mat-list-item>
        <mat-list-item>
          <h4 mat-line>收货地址：<p>{{data.deliveryAddress}}</p></h4>
        </mat-list-item>
        <mat-divider></mat-divider>
        <mat-list-item>
          <h4 mat-line>订单价格：<p>{{data.originalPrice}}</p></h4>
        </mat-list-item>
        <mat-list-item>
          <h4 mat-line>积分抵现：<p>{{data.pointsDeduction}}</p></h4>
        </mat-list-item>
        <mat-list-item>
          <h4 mat-line>优惠券：<p>{{data.discountAmount}}</p></h4>
        </mat-list-item>
        <mat-list-item>
          <h4 mat-line>支付金额：<p>{{data.amount}}</p></h4>
        </mat-list-item>
      </mat-list>
    </div>
  `
})
export class OrderDetailComponent {
  option: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OrderDetailComponent>
  ) {
    this.option = this.data;
  }
}

export function ShowOrderDetail(data, dialog) {
  const option: MatDialogConfig = <MatDialogConfig>{
    data: data,
    width: '50%'
  };
  return dialog.open(OrderDetailComponent, option);
}
