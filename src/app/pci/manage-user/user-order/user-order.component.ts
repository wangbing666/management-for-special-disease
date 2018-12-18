import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogOptions } from '../../../libs/dmodal/dialog.entity';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { UserOrderService } from './_service/user-order.service';
import { UserOrderTableService } from './_service/user-order-table.service';
import { UserOrder } from './_entity/user-order.entity';
import { ERRMSG } from '../../_store/static';
import { ShowOrderDetail } from './order-detail/order-detail.component';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  containerConfig: ContainerConfig;

  userOrderAllTable: TableOption;
  userOrderUnpayTable: TableOption;
  userOrderApplyTable: TableOption;
  userOrderRefundingTable: TableOption;
  userOrderRefundTable: TableOption;
  userOrderSuccessTable: TableOption;
  userOrderCancelTable: TableOption;
  userOrderThirdTable: TableOption;

  count1: number;
  count2: number;

  constructor(
    @Inject('action') private action,
    private userOrderService: UserOrderService,
    private userOrderTableService: UserOrderTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
    action.dataChange('userOrder', new UserOrder());
  }

  ngOnInit() {
    this.containerConfig = this.userOrderService.userOrderConfig();
    this.userOrderAllTable = new TableOption({
      titles: this.userOrderTableService.setTitles(),
      ifPage: true
    });
    this.userOrderUnpayTable = new TableOption({
      titles: this.userOrderTableService.setUnpayTitles(),
      ifPage: true
    });
    this.userOrderApplyTable = new TableOption({
      titles: this.userOrderTableService.setApplyTitles(),
      ifPage: true
    });
    this.userOrderRefundingTable = new TableOption({
      titles: this.userOrderTableService.setRefundingTitles(),
      ifPage: true
    });
    this.userOrderRefundTable = new TableOption({
      titles: this.userOrderTableService.setRefundTitles(),
      ifPage: true
    });
    this.userOrderSuccessTable = new TableOption({
      titles: this.userOrderTableService.setSuccessTitles(),
      ifPage: true
    });
    this.userOrderCancelTable = new TableOption({
      titles: this.userOrderTableService.setCancelTitles(),
      ifPage: true
    });
    this.userOrderThirdTable = new TableOption({
      titles: this.userOrderTableService.setThirdTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
    this.reset2();
    this.reset3();
    this.reset4();
    this.reset5();
    this.reset6();
    this.reset7();
  }

  reset0() {
    this.userOrderAllTable.queryKey = '';
    this.getUserOrdersAll(0);
  }

  reset1() {
    this.userOrderUnpayTable.queryKey = '';
    this.getUserOrdersUnpay(0);
  }

  reset2() {
    this.userOrderApplyTable.queryKey = '';
    this.getUserOrdersApply(0);
  }

  reset3() {
    this.userOrderRefundingTable.queryKey = '';
    this.getUserOrdersRefunding(0);
    this.getCount();
  }

  reset4() {
    this.userOrderRefundTable.queryKey = '';
    this.getUserOrdersRefund(0);
  }

  reset5() {
    this.userOrderSuccessTable.queryKey = '';
    this.getUserOrdersSuccess(0);
  }

  reset6() {
    this.userOrderCancelTable.queryKey = '';
    this.getUserOrdersCancel(0);
  }

  reset7() {
    this.userOrderThirdTable.queryKey = '';
    this.getUserOrdersThird(0);
    this.getCount();
  }

  getUserOrdersAll(page: number) {
    this.userOrderAllTable.reset(page);
    this.userOrderService.getUserOrdersAll(page, this.userOrderAllTable.size, this.userOrderAllTable.queryKey)
      .subscribe(
        data => {
          this.userOrderAllTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userOrderAllTable.errorMessage = ERRMSG.nullMsg;
          } else if (data.data && data.data.content && data.code === 0) {
            this.userOrderAllTable.totalPage = data.data.totalPages;
            this.userOrderAllTable.lists = data.data.content;
          } else {
            this.userOrderAllTable.errorMessage = data.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userOrderAllTable.loading = false;
          console.log(err);
          this.userOrderAllTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getUserOrdersUnpay(page: number) {
    this.userOrderUnpayTable.reset(page);
    this.userOrderService.getUserOrdersUnpay(page, this.userOrderUnpayTable.size, this.userOrderUnpayTable.queryKey)
      .subscribe(
        data => {
          this.userOrderUnpayTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userOrderUnpayTable.errorMessage = ERRMSG.nullMsg;
          } else if (data.data && data.data.content && data.code === 0) {
            this.userOrderUnpayTable.totalPage = data.data.totalPages;
            this.userOrderUnpayTable.lists = data.data.content;
          } else {
            this.userOrderUnpayTable.errorMessage = data.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userOrderUnpayTable.loading = false;
          console.log(err);
          this.userOrderUnpayTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getUserOrdersApply(page: number) {
    this.userOrderApplyTable.reset(page);
    this.userOrderService.getUserOrdersApply(page, this.userOrderApplyTable.size, this.userOrderApplyTable.queryKey)
      .subscribe(
        data => {
          this.userOrderApplyTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userOrderApplyTable.errorMessage = ERRMSG.nullMsg;
          } else if (data.data && data.data.content && data.code === 0) {
            this.userOrderApplyTable.totalPage = data.data.totalPages;
            this.userOrderApplyTable.lists = data.data.content;
          } else {
            this.userOrderApplyTable.errorMessage = data.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userOrderApplyTable.loading = false;
          console.log(err);
          this.userOrderApplyTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getUserOrdersRefunding(page: number) {
    this.userOrderRefundingTable.reset(page);
    this.userOrderService.getUserOrdersRefunding(page, this.userOrderRefundingTable.size, this.userOrderRefundingTable.queryKey)
      .subscribe(
        data => {
          this.userOrderRefundingTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userOrderRefundingTable.errorMessage = ERRMSG.nullMsg;
          } else if (data.data && data.data.content && data.code === 0) {
            this.userOrderRefundingTable.totalPage = data.data.totalPages;
            this.userOrderRefundingTable.lists = data.data.content;
          } else {
            this.userOrderRefundingTable.errorMessage = data.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userOrderRefundingTable.loading = false;
          console.log(err);
          this.userOrderRefundingTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getUserOrdersRefund(page: number) {
    this.userOrderRefundTable.reset(page);
    this.userOrderService.getUserOrdersRefund(page, this.userOrderRefundTable.size, this.userOrderRefundTable.queryKey)
      .subscribe(
        data => {
          this.userOrderRefundTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userOrderRefundTable.errorMessage = ERRMSG.nullMsg;
          } else if (data.data && data.data.content && data.code === 0) {
            this.userOrderRefundTable.totalPage = data.data.totalPages;
            this.userOrderRefundTable.lists = data.data.content;
          } else {
            this.userOrderRefundTable.errorMessage = data.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userOrderRefundTable.loading = false;
          console.log(err);
          this.userOrderRefundTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getUserOrdersSuccess(page: number) {
    this.userOrderSuccessTable.reset(page);
    this.userOrderService.getUserOrdersSuccess(page, this.userOrderSuccessTable.size, this.userOrderSuccessTable.queryKey)
      .subscribe(
        data => {
          this.userOrderSuccessTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userOrderSuccessTable.errorMessage = ERRMSG.nullMsg;
          } else if (data.data && data.data.content && data.code === 0) {
            this.userOrderSuccessTable.totalPage = data.data.totalPages;
            this.userOrderSuccessTable.lists = data.data.content;
          } else {
            this.userOrderSuccessTable.errorMessage = data.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userOrderSuccessTable.loading = false;
          console.log(err);
          this.userOrderSuccessTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getUserOrdersCancel(page: number) {
    this.userOrderCancelTable.reset(page);
    this.userOrderService.getUserOrdersCancel(page, this.userOrderCancelTable.size, this.userOrderCancelTable.queryKey)
      .subscribe(
        data => {
          this.userOrderCancelTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userOrderCancelTable.errorMessage = ERRMSG.nullMsg;
          } else if (data.data && data.data.content && data.code === 0) {
            this.userOrderCancelTable.totalPage = data.data.totalPages;
            this.userOrderCancelTable.lists = data.data.content;
          } else {
            this.userOrderCancelTable.errorMessage = data.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userOrderCancelTable.loading = false;
          console.log(err);
          this.userOrderCancelTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getUserOrdersThird(page: number) {
    this.userOrderThirdTable.reset(page);
    this.userOrderService.getUserOrdersThird(page, this.userOrderThirdTable.size, this.userOrderThirdTable.queryKey)
      .subscribe(
        data => {
          this.userOrderThirdTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userOrderThirdTable.errorMessage = ERRMSG.nullMsg;
          } else if (data.data && data.data.content && data.code === 0) {
            this.userOrderThirdTable.totalPage = data.data.totalPages;
            this.userOrderThirdTable.lists = data.data.content;
          } else {
            this.userOrderThirdTable.errorMessage = data.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userOrderThirdTable.loading = false;
          console.log(err);
          this.userOrderThirdTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getCount() {
    this.userOrderService.getUserOrderCount().subscribe(res => {
      if (res.code === 0) {
        this.count1 = res.data.refundSum;
        this.count2 = res.data.thirdSum;
      }
    })
  }

  gotoHandle(res) {
    const order = <UserOrder>res.value;
    if (res.key === 'usage') {
      this.action.dataChange('userOrder', order);
      this.router.navigate(['/user-order/edit']);
    }
    if (res.key === 'refund') {
      const config = new DialogOptions({
        title: `您确定要退款${order.purchaser}？`,
        message: '',
        buttons: [{
          key: 'topass',
          value: '确定',
          color: 'primary'
        }, {
          key: 'tocancel',
          value: '取消',
          color: ''
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result.key === 'topass') {
          this.toReimburse(order.id);
        }
      });
    }
    if (res.key === 'thirdProcess') {
      const config = new DialogOptions({
        title: `您确定要处理${order.purchaser}的服务？`,
        message: '',
        buttons: [{
          key: 'torefuse',
          value: '确定',
          color: 'primary'
        }, {
          key: 'tocancel',
          value: '取消',
          color: ''
        }],
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result.key === 'torefuse') {
          this.getThrough(order.id);
        }
      });
    }
    if (res.key === 'detail') {
      ShowOrderDetail(order, this.dialog);
    }
  }

  toReimburse(id) {
    this.userOrderService.userOrderRefund(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }

  getThrough(id) {
    this.userOrderService.userOrderProcess(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }
}
