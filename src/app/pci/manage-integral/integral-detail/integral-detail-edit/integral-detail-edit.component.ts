import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';

@Component({
  selector: 'app-integral-detail-edit',
  templateUrl: './integral-detail-edit.component.html',
  styleUrls: ['./integral-detail-edit.component.scss']
})
export class IntegralDetailEditComponent implements OnInit {
  form: FormGroup;
  config: any;
  errMsg = '';

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    @Inject('http') private uploadService,
    @Inject('app') private app,
    public dialogRef: MatDialogRef<IntegralDetailEditComponent>,
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.cdr.detectChanges();
  }

  createForm() {
    this.form = this.fb.group({
      type: new FormControl({value: ''}, Validators.required),
      integral: new FormControl({value: ''}, Validators.required),
      exEcl: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
      type: new FormRadio({
        key: 'type',
        label: '选择APP',
        value: '',
        required: true,
        options: [{
          id: 1,
          name: '患者端'
        }, {
          id: 0,
          name: '医生端'
        }],
      }),
      integral: new FormText({
        key: 'integral',
        label: '赠送数量',
        value: '',
        required: true,
      }),
      exEcl: new FormFile({
        key: 'exEcl',
        label: '上传表格',
        value: '',
        required: true,
        url: ''
      })
    }
  }

  // 上传表格
  uploadChange(files) {
    const myForm = new FormData();
    myForm.append('file', files.target.files[0]);
    this.uploadService.upload(`${this.app.pci.BASE_URL}api/analyticalXlsxBackIds`, myForm)
      .subscribe(res => {
        if (res.code === 0) {
          this.config.exEcl.value = res.data;
          HintDialog('上传表格成功！', this.dialog);
        } else {
          HintDialog(res.msg || '上传表格失败！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('上传表格失败！', this.dialog);
      });
  }
}
