import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormDatetime } from '../../../../libs/dform/_entity/form-datetime';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { CouponService } from '../_service/coupon.service';
import { Coupon } from '../_entity/coupon.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-coupon-edit',
  templateUrl: './coupon-edit.component.html',
  styleUrls: ['./coupon-edit.component.scss']
})
export class CouponEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['coupon', 'data']) coupon: Observable<Coupon>;
  errMsg = '';
  exEcl: boolean;
  price: boolean;
  data: any;
  isDonate: boolean;
  assignUser: boolean;
  form: FormGroup;
  config: any;
  couponId: any;
  state: boolean;
  service: boolean;
  serviceNmae: any;
  grantNum: any;
  grantNums: boolean;
  newSurplusNum: boolean;

  constructor(
    @Inject('http') private uploadService,
    private couponService: CouponService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    @Inject('app') private app,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    // 获取第三方服务机构
    this.couponService.getthirdService().subscribe(data => {
      this.couponService.getthirdServiceName().subscribe(res => {
        this.getStatus(res.data);
        if (res.code === 0 && res.data && data.code === 0 && data.data) {
          this.coupon.subscribe(value => {
            this.serviceNmae = data.data;
            if (value.couponId === 0) {
              this.containerConfig = this.couponService.couponEditConfig(true);
              this.createForm(res.data, this.serviceNmae, value);
              this.grantNums = true;
            } else {
              this.couponId = value.couponId;
              this.newSurplusNum = true;
              this.grantNum = value.surplusNum;
              value.newSurplusNum = value.surplusNum;
              this.containerConfig = this.couponService.couponEditConfig(false);
              this.getState(value);
              this.createForm(res.data, this.serviceNmae, value);
            }
          })
        } else {
          this.errMsg = data.msg || ERRMSG.nullMsg;
          this.errMsg = res.msg || ERRMSG.nullMsg;
        }
      }, err => {
        this.errMsg = ERRMSG.netErrMsg;
      })
    }, err => {
      this.errMsg = ERRMSG.netErrMsg;
    })
  }

  getStatus(list) {
    list.forEach(data => {
      if (data.serviceName) {
        data.name = data.serviceName;
      }
    })
  }

  // 进入编辑页面状态转换
  getState(data) {
    if (data.useRange === null) {
      data.useRange = 3;
      this.service = true;
    }
  }

  createForm(service, serviceName, data?) {
    this.form = this.fb.group({
      name: new FormControl({value: ''}, Validators.required),
      fullPrice: new FormControl({value: ''}, Validators.required),
      price: new FormControl({value: ''}, Validators.required),
      code: new FormControl({value: ''}, Validators.required),
      grantNum: new FormControl({value: ''}, Validators.required),
      newSurplusNum: new FormControl({value: ''}, Validators.required),
      assignUser: new FormControl(Validators.required),
      useRange: new FormControl({value: ''}, Validators.required),
      isDonate: new FormControl({value: ''}, Validators.required),
      thirdPartyServiceId: new FormControl(),
      organizationId: new FormControl({value: ''}, Validators.required),
      startDate: new FormControl({value: ''}, Validators.required),
      endDate: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
      name: new FormText({
        type: 'text',
        label: '优惠券名称',
        key: 'name',
        value: data && data.name || ''
      }),
      fullPrice: new FormText({
        type: 'text',
        label: '优惠券面值',
        key: 'fullPrice',
        value: data && data.fullPrice || ''
      }),
      price: new FormText({
        type: 'text',
        label: '优惠券面值',
        key: 'price',
        value: data && data.price || ''
      }),
      code: new FormText({
        type: 'text',
        label: '设置兑换码',
        key: 'code',
        value: data && data.code || ''
      }),
      grantNum: new FormText({
        type: 'number',
        label: '优惠券数量',
        key: 'grantNum',
        value: data && data.grantNum || ''
      }),
      newSurplusNum: new FormText({
        type: 'number',
        label: '库存数量',
        key: 'newSurplusNum',
        value: data && data.newSurplusNum || 0
      }),
      assignUser: new FormRadio({
        label: '是否赠送用户',
        key: 'assignUser',
        options: [{
          id: true,
          name: '是',
        }, {
          id: false,
          name: '否',
        }],
        value: false
      }),
      isDonate: new FormRadio({
        label: '赠送用户',
        key: 'isDonate',
        options: [{
          id: false,
          name: '所有用户',
        }, {
          id: true,
          name: '指定用户',
        }],
        value: data && data.isDonate || false
      }),
      useRange: new FormRadio({
        label: '使用范围',
        key: 'useRange',
        options: [{
          id: 0,
          name: '全平台通用',
        }, {
          id: 1,
          name: '全部医生服务',
        }, {
          id: 2,
          name: '全部第三方服务',
        }, {
          id: 3,
          name: '指定第三方服务',
        }],
        value: data && data.useRange || 0
      }),
      organizationId: new FormDropdown({
        label: '成本构成',
        key: 'organizationId',
        options: serviceName,
        value: data && data.organizationId || 0
      }),
      thirdPartyServiceId: new FormDropdown({
        label: '选择一个第三方服务',
        key: 'thirdPartyServiceId',
        options: service,
        value: data && data.thirdPartyServiceId || 0
      }),
      startDate: new FormDatetime({
        key: 'startDate',
        label: '开始时间',
        value: data && data.startDate || ''
      }),
      endDate: new FormDatetime({
        key: 'endDate',
        label: '结束时间',
        value: data && data.endDate || ''
      }),
    }
  }

  usableRange(value) {
    if (value === 3) {
      this.service = true;
    } else {
      this.service = false;
    }
  }

  getExecl(value) {
    if (value === true) {
      this.exEcl = true;
    } else {
      this.exEcl = false;
    }
  }

  getDonate(value) {
    if (value.value === true) {
      this.assignUser = true;
    } else {
      this.assignUser = false;
    }
  }

  // 上传表格
  uploadChange(files) {
    const myForm = new FormData();
    myForm.append('file', files.target.files[0]);
    this.uploadService.upload(`${this.app.pci.BASE_URL}api/analyticalXlsxBackIds`, myForm)
      .subscribe(res => {
        if (res.code === 0) {
          this.data = res.data;
          HintDialog('上传表格成功！', this.dialog);
        } else {
          HintDialog(res.msg || '上传表格失败！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('上传表格失败！', this.dialog);
      });
  }

// 更新保存状态转换
  useRange(value) {
    if (value.useRange === 0 || value.useRange === 1 || value.useRange === 2) {
      value.thirdPartyServiceId = '';
    }
    if (value.useRange === 3) {
      value.useRange = '';
    }
    if (value.assignUser === true) {
      value.exEcl = this.data;
      delete value.isDonate;
    } else {
      delete value.isDonate;
    }
  }

  getValues(value) {
    this.useRange(value);
    if (value.fullPrice >= value.price) {
      this.price = false;
      if (this.couponId) {
        delete value.grantNum;
        value.surplusNum = this.grantNum;
        value.couponId = this.couponId;
        this.couponService.couponEdit(value)
          .subscribe(res => {
            if (res.code === 0) {
              HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
                this.router.navigate(['/dc-list']);
              });
            } else {
              HintDialog(res.msg || ERRMSG.saveError, this.dialog);
            }
          }, err => {
            console.log(err);
            HintDialog(ERRMSG.saveError, this.dialog);
          });
      } else {
        delete value.newSurplusNum;
        this.couponService.couponEdit(value)
          .subscribe(res => {
            if (res.code === 0) {
              HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
                this.router.navigate(['/dc-list']);
              });
            } else {
              HintDialog(res.msg || ERRMSG.saveError, this.dialog);
            }
          }, err => {
            console.log(err);
            HintDialog(ERRMSG.saveError, this.dialog);
          });
      }
    } else {
      this.price = true;
    }
  }
}
