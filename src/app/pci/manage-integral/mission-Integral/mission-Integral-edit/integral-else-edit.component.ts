import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormText } from '../../../../libs/dform/_entity/form-text';

@Component({
  selector: 'app-integral-else',
  templateUrl: 'integral-else-edit.component.html',
  styleUrls: ['integral-edit.component.scss']
})
export class IntegralElseComponent implements OnInit {
  form: FormGroup;
  config: any;
  option: any;
  errMsg = '';
  name: any;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<IntegralElseComponent>,
  ) {
    this.option = this.data;
  }

  ngOnInit() {
    this.name = this.option.name;
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
      integral: new FormControl({value: ''}, Validators.required),
      status: new FormControl({value: ''}, Validators.required),
      name: new FormControl({value: ''}, Validators.required),
      tag: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
      integral: new FormText({
        type: 'text',
        label: '获得积分',
        key: 'integral  ',
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
}
