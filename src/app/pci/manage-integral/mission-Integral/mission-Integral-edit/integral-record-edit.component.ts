import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormText } from '../../../../libs/dform/_entity/form-text';

@Component({
  selector: 'app-integral-record',
  templateUrl: 'integral-record-edit.component.html',
  styleUrls: ['integral-edit.component.scss']
})
export class IntegralRecordComponent implements OnInit {
  form: FormGroup;
  config: any;
  option: any;
  errMsg = '';
  integral: boolean;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<IntegralRecordComponent>,
  ) {
    this.option = this.data;
  }

  ngOnInit() {
    this.getIntegral(this.option);
    this.createForm(this.option);
    this.cdr.detectChanges();
  }

  // 进入编辑页面积分上限状态转换
  getIntegral(data) {
    if (data.toplimit === 0) {
      this.integral = false;
      data.doubleUpper = false;
    } else {
      this.integral = true;
      data.doubleUpper = true;
    }
    if (data.status === 'online') {
      data.status = 0;
    }
    if (data.status === 'offline') {
      data.status = 1;
    }
  }

  createForm(data) {
    this.form = this.fb.group({
      doubleUpper: new FormControl({value: ''}, Validators.required),
      toplimit: new FormControl({value: ''}, Validators.required),
      integral: new FormControl({value: ''}, Validators.required),
      status: new FormControl({value: ''}, Validators.required),
      tag: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
      doubleUpper: new FormDropdown({
        label: '有无积分上限',
        key: 'doubleUpper ',
        options: [{
          id: false,
          name: '无',
        }, {
          id: true,
          name: '有',
        }],
        value: data && data.doubleUpper || false
      }),
      toplimit: new FormText({
        type: 'text',
        label: '积分上限',
        key: 'toplimit ',
        value: data && data.toplimit || ''
      }),
      integral: new FormText({
        type: 'text',
        label: '每次获得积分',
        key: 'integral',
        value: data && data.integral || ''
      }),
      status: new FormDropdown({
        label: '状态',
        key: 'status ',
        options: [{
          id: 0,
          name: '已上架',
        }, {
          id: 1,
          name: '下架',
        }],
        value: data && data.status || 0
      }),
      tag: new FormText({
        type: 'text',
        label: '#',
        key: 'tag',
        value: data && data.tag || ''
      }),
    }
  }

  // 积分上限显示隐藏
  change(data) {
    if (data.value === true) {
      this.integral = true;
    }
    if (data.value === false) {
      this.integral = false;
    }
  }
}
