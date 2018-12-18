import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormEditor } from '../../../../libs/dform/_entity/form-editor';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { IntegralCommodityService } from '../_service/integral-commodity.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ERRMSG } from '../../../_store/static';
import { IntegralCommodity } from '../_entity/integralCommodity.entity';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-integral-commodity-edit',
  templateUrl: './integral-commodity-edit.component.html'
})
export class IntegralCommodityEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['integralCommodity', 'data']) integralCommodity: Observable<IntegralCommodity>;
  errMsg = '';
  form: any;
  config: any;
  freeShipping: boolean;
  integralCommodityId: number;

  statusOptions = [{
    id: 0,
    name: '上架'
  }, {
    id: 1,
    name: '下架'
  }];

  goodsTypeOptions = [{
    id: 0,
    name: '患者端'
  }, {
    id: 1,
    name: '医生端'
  }, {
    id: 2,
    name: '全部'
  }];

  freeShippingOptions = [{
    id: true,
    name: '是'
  }, {
    id: false,
    name: '否'
  }];

  constructor(
    private integralCommodityService: IntegralCommodityService,
    private dialog: MatDialog,
    private router: Router,
    @Inject('app') private app,
    @Inject('auth') private auth,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.integralCommodity.subscribe(data => {
        this.integralCommodityId = data.id;
        if (data.id === 0) {
          this.containerConfig = this.integralCommodityService.integralCommodityEditConfig(true);
          this.createForm();
        } else {
          this.containerConfig = this.integralCommodityService.integralCommodityEditConfig(false);
          if (data.freight === 0) {
            this.freeShipping = true;
          } else {
            this.freeShipping = false;
          }
          this.createForm(data);
        }
      },
      err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
    this.cdr.detectChanges();
  }

  createForm(data?) {
    this.form = this.fb.group({
      picUrl: new FormControl(''),
      title: new FormControl('', Validators.required),
      recommendValue: new FormControl(''),
      integral: new FormControl(''),
      statusIdx: new FormControl('', Validators.required),
      typeIdx: new FormControl(''),
      stock: new FormControl(''),
      freeShipping: new FormControl('', Validators.required),
      freight: new FormControl(''),
      introduction: new FormControl('')
    });
    this.config = {
      picUrl: new FormFile({
        key: 'picUrl',
        label: '商品图片',
        value: data && data.picUrl || '',
        url: this.app.pci.UPLOAD_URL
      }),
      title: new FormText({
        type: 'text',
        key: 'title',
        label: '商品标题',
        value: data && data.title || '',
      }),
      recommendValue: new FormText({
        key: 'recommendValue',
        label: '推荐值',
        value: data && (data.recommendValue === 0 ? data.recommendValue : data.recommendValue || ''),
        type: 'number',
      }),
      integral: new FormText({
        key: 'integral',
        label: '兑换积分',
        value: data && (data.integral === 0 ? data.integral : data.integral || ''),
        type: 'number',
      }),
      statusIdx: new FormDropdown({
        key: 'statusIdx',
        label: '状态',
        value: data && (data.goodsStatus === 0 ? data.goodsStatus : data.goodsStatus || ''),
        options: this.statusOptions
      }),
      typeIdx: new FormDropdown({
        key: 'typeIdx',
        label: '添加到APP',
        options: this.goodsTypeOptions,
        value: data && (data.goodsType === 0 ? data.goodsType : data.goodsType || ''),
      }),
      stock: new FormText({
        key: 'stock',
        label: '库存数量',
        value: data && (data.stock === 0 ? data.stock : data.stock || ''),
        type: 'number',
      }),
      freeShipping: new FormDropdown({
        key: 'freeShipping',
        label: '是否包邮',
        value: this.freeShipping,
        options: this.freeShippingOptions
      }),
      freight: new FormText({
        key: 'freight',
        label: '邮费',
        value: data && (data.freight === 0 ? data.freight : data.freight || ''),
        type: 'number'
      }),
      introduction: new FormEditor({
        key: 'introduction',
        label: '商品描述',
        value: data && data.introduction || ''
      })
    }
  }

  setFreeShipping(data) {
    this.freeShipping = data;
    if (this.freeShipping == true) {
      this.config.freight.value = 0;
    }
    this.cdr.detectChanges();
  }

  getValues(value) {
    if (value.freeShipping == true) {
      value.freight = 0;
    }
    delete value.freeShipping;
    value.goodsId = this.integralCommodityId;
    if (value.goodsId == 0) {
      delete value.goodsId;
    }
    value.operator = this.auth.getAdminName();
    this.integralCommodityService.integralCommodityUpdate(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/integral-commodity']);
          });
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }
}
