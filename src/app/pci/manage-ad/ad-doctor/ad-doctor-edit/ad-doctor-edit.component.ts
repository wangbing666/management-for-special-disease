import { Component, Inject, OnInit, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { MatDialog } from '@angular/material';

import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';

import { AdDoctorService } from '../_service/ad-doctor.service';
import { AdDoctor } from '../_entity/ad-doctor.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-ad-doctor-edit',
  templateUrl: './ad-doctor-edit.component.html'
})
export class AdDoctorEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['adDoctor', 'data']) adDoctor: Observable<AdDoctor>;
  errMsg = '';
  form: FormGroup;
  config: any;
  id: number;

  constructor(
    private adDoctorService: AdDoctorService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    @Inject('auth') private auth,
    @Inject('app') private app
  ) {
  }

  ngOnInit() {
    this.adDoctor.subscribe(data => {
      this.id = data.id || 0;
      if (this.id > 0) {
        this.containerConfig = this.adDoctorService.adDoctorEditConfig(true);
        this.createForm(data);
      } else {
        this.containerConfig = this.adDoctorService.adDoctorEditConfig(false);
        this.createForm();
      }
    }, err => {
      console.log(err);
      this.errMsg = ERRMSG.netErrMsg;
    });
    this.cdr.detectChanges();
  }

  createForm(data?) {
    console.log(data)
    this.form = this.fb.group({
      imageUrl: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      skipType: new FormControl('', Validators.required),
      linkUrl: new FormControl(''),
      img: new FormControl(''),
      ranking: new FormControl('', Validators.required)
    });
    this.config = {
      imageUrl: new FormFile({
        key: 'imageUrl',
        label: '广告图片',
        value: data && data.imageUrl || '',
        url: this.app.pci.UPLOAD_URL,
        required: true,
      }),
      title: new FormText({
        key: 'title',
        label: '广告标题',
        value: data && data.title || '',
        required: true,
        maxlength: 16,
      }),
      skipType: new FormRadio({
        key: 'skipType',
        label: '广告链接',
        options: [{
          id: 0,
          name: '跳转到网址'
        },
          {
            id: 4,
            name: '跳转到图片'
          }],
        value: data && data.skipType || 0,
        required: true,
      }),
      linkUrl: new FormText({
        key: 'linkUrl',
        label: '网页链接',
        value: data && data.linkUrl || '',
        required: false,
      }),
      img: new FormFile({
        key: 'img',
        label: '上传图片',
        value: data && data.linkUrl || '',
        url: this.app.pci.UPLOAD_URL,
        required: true,
      }),
      ranking: new FormText({
        key: 'ranking',
        label: '推荐值',
        value: data && data.ranking || 0,
        required: false,
      })
    }
  }

  getValues(value) {
    if (value.skipType === 0) {
      delete value.img
    }
    if (value.skipType === 4) {
      value.linkUrl = value.img
      delete value.img
    }
    if (this.id > 0) {
      value['type'] = 1;
      value['admin'] = this.auth.getAdminName();
      this.adDoctorService.adEdit(this.id, value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/ad-doctor']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      value['type'] = 1;
      value['admin'] = this.auth.getAdminName();
      this.adDoctorService.adNew(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/ad-doctor']);
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
}
