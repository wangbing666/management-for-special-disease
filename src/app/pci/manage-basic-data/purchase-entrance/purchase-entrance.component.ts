/**
 * Created by zhanglin on 2017/8/1.
 */
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { FormRadio } from '../../../libs/dform/_entity/form-radio';
import { FormText } from '../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';
import { PurchaseEntranceService } from './_service/purchase-entrance.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-purchase-entrance',
  templateUrl: './purchase-entrance.component.html'
})
export class PurchaseEntranceComponent implements OnInit {
  containerConfig: ContainerConfig;
  form: FormGroup;
  config: any;
  purchaseEntranceId: number;

  constructor(
    @Inject('action') private action,
    private purchaseEntranceService: PurchaseEntranceService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.purchaseEntranceService.purchaseEntranceConfig();
    this.getPurchanseEntrance();

    this.cdr.detectChanges();
  }

  getPurchanseEntrance() {
    this.purchaseEntranceService.getPurchaseEntrance().subscribe(
      res => {
        if (res.data) {
          this.createForm(res.data);
        } else {
          this.createForm();
        }
        this.purchaseEntranceId = res.data && res.data.id || 0;
      }, err => {
        console.log(err);
      });
  }

  createForm(data?) {
    this.form = this.fb.group({
      flag: new FormControl({value: ''}),
      url: new FormControl({value: ''}),
    });
    this.config = {
      flag: new FormRadio({
        label: '打开购药入口',
        key: 'flag',
        value: data && (data.flag === false ? data.flag : data.flag || ''),
        options: [{
          id: true,
          name: '是'
        }, {
          id: false,
          name: '否'
        }]
      }),
      url: new FormText({
        label: '购药入口链接',
        key: 'url',
        value: data && data.url || ''
      })
    }
  }

  getValues(value) {
    value.id = this.purchaseEntranceId;
    this.purchaseEntranceService.purchaseEntranceEdit(value.id, value.flag, value.url)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            // HintDialog(ERRMSG.saveSuccess, this.dialog);
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
