import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormText } from '../../../../libs/dform/_entity/form-text';

@Component({
  selector: 'app-integral-signin',
  templateUrl: 'integral-signin-edit.component.html',
  styleUrls: ['integral-edit.component.scss']
})
export class IntegralSigninComponent implements OnInit {
  form: FormGroup;
  config: any;
  option: any;
  errMsg = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<IntegralSigninComponent>,
  ) {
    this.option = this.data
  }

  ngOnInit() {
    this.getIntegral(this.option);
    this.createForm(this.option);
    this.cdr.detectChanges();
  }

  // 进入编辑页面状态转换
  getIntegral(data) {
    if (data.status === 'online') {
      data.status = 0;
    }
    if (data.status === 'offline') {
      data.status = 1;
    }
  }

  createForm(data) {
    this.form = this.fb.group({
      other: new FormControl({value: ''}, Validators.required),
      third: new FormControl({value: ''}, Validators.required),
      seventh: new FormControl({value: ''}, Validators.required),
      status: new FormControl({value: ''}, Validators.required),
      tag: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
      other: new FormText({
        type: 'number',
        label: '其他每天',
        key: 'other ',
        value: data && data.other || ''
      }),
      third: new FormText({
        type: 'text',
        label: '第三天',
        key: 'third  ',
        value: data && data.third || ''
      }),
      seventh: new FormText({
        type: 'text',
        label: '第七天',
        key: 'seventh  ',
        value: data && data.seventh || ''
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
}
