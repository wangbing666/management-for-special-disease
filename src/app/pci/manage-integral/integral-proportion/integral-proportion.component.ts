/**
 * Created by zhanglin on 2017/8/2.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormText } from '../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { IntegralProportionService } from './_service/integral-proportion.service';
import { MatDialog } from '@angular/material';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-integral-proportion',
  templateUrl: './integral-proportion.component.html'
})
export class IntegralProportionComponent implements OnInit {
  containerConfig: ContainerConfig;
  form: FormGroup;
  config: any;
  errMsg = '';
  integralProportionId: number;

  constructor(
    @Inject('action') private action,
    private integralProportionService: IntegralProportionService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.integralProportionService.IntegralProportionConfig();
    this.integralProportionService.getIntegralProportion().subscribe(
      res => {
        if (res.data) {
          this.createForm(res.data);
        } else {
          this.createForm();
        }
        this.integralProportionId = res.data.id;
      }, err => {
        console.log(err);
        this.errMsg = ERRMSG.netErrMsg;
      });
  }

  createForm(data?) {
    this.form = this.fb.group({
      ratio: new FormControl({value: ''})
    });
    this.config = {
      ratio: new FormText({
        label: '积分比例维护（钱：积分）',
        key: 'ratio',
        value: data && data.ratio || ''
      })
    }
  }

  getValues(value) {
    value.id = this.integralProportionId;
    this.integralProportionService.integralProportionEdit(value.id, value.ratio)
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
