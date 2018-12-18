import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { FormEditor } from '../../../libs/dform/_entity/form-editor';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogEdit } from '../../../libs/dmodal/dialog.entity';
import { ControlType, TableOption } from '../../../libs/dtable/dtable.entity';
import { CouponService } from './_service/coupon.service';
import { CouponTableService } from './_service/coupon-table.service';
import { Coupon } from './_entity/coupon.entity';
import { ERRMSG } from '../../_store/static';
import { EditDialog } from '../../../libs/dmodal/dialog-edit.component';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  containerConfig: ContainerConfig;
  couponTable: TableOption;
  controlType = ControlType;
  @select(['coupon', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private couponService: CouponService,
    private couponTableService: CouponTableService,
    private dialog: MatDialog,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.couponService.couponConfig();
    this.couponTable = new TableOption({
      titles: this.couponTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.page.subscribe((page: Array<number>) => {
      this.getCouponList(page[0]);
    });
  }

  getCouponList(page: number) {
    this.action.pageChange('coupon', [page]);
    this.couponTable.reset(page);
    this.couponService.getCouponList(
      page, this.couponTable.size)
      .subscribe(res => {
        this.couponTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.couponTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.couponTable.totalPage = res.data.totalPages;
          this.getStatus(res.data.content);
          this.couponTable.lists = res.data.content;
        } else {
          this.couponTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.couponTable.loading = false;
        console.log(err);
        this.couponTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  // 状态装换
  getStatus(list) {
    list.forEach(data => {
      if (data.status === 'Online') {
        data.statusName = '已上线'
      }
      if (data.status === '') {
        data.statusName = '已下架';
      }
      if (data.fullPrice && data.price) {
        data.couponPrice = `订单满${data.fullPrice}元，减${data.price}元`;
      } else {
        data.couponPrice = data.fullPrice;
      }
    })
  }

  newData() {
    this.action.dataChange('coupon', new Coupon());
    this.router.navigate(['/dc-list/edit']);
  }

  // 请求优惠券说明维护参数
  couponMaintain() {
    this.couponService.couponExplain()
      .subscribe(res => {
        if (res.code === 0) {
          this.getcouponExplain(res.data);
        }
      }, err => {
        alert(err);
      })
  }

  // 优惠券说明维护模态框
  getcouponExplain(data) {
    const config: DialogEdit = new DialogEdit({
      title: '优惠券说明维护',
      form: [
        new FormEditor({
          key: 'message',
          label: '优惠券说明维护',
          value: data || '',
          required: true
        })
      ]
    });
    EditDialog(config, this.dialog).afterClosed().subscribe(result => {
      if (result && result.message) {
        this.toRefuseCoupon(result.message);
      }
    });
  }

  // 编辑优惠券
  gotoHandle(res) {
    const coupon = <Coupon>res.value;
    if (res.key === 'edit') {
      this.action.dataChange('coupon', coupon);
      this.router.navigate(['/dc-list/edit']);
    }
  }

  // 提交优惠券说明维护更改
  toRefuseCoupon(value) {
    this.couponService.couponExplainUpdate(value)
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
