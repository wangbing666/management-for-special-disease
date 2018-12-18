import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';

import { AdPatientService } from '../_service/ad-patient.service';
import { AdPatient } from '../_entity/ad-patient.entity';
import { ERRMSG } from '../../../_store/static';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ad-patient-edit',
  templateUrl: './ad-patient-edit.component.html'
})
export class AdPatientEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['adPatient', 'data']) adPatient: Observable<AdPatient>;
  form: any;
  config: any;
  errMsg = '';
  id: number;

  constructor(
    private adPatientService: AdPatientService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    @Inject('auth') private auth
  ) {
  }

  ngOnInit() {
    this.adPatient.subscribe(data => {
      this.id = data.id || 0;
      if (data.id > 0) {
        this.containerConfig = this.adPatientService.adPatientEditConfig(true);
        this.createForm(data);
      } else {
        this.containerConfig = this.adPatientService.adPatientEditConfig(false);
        this.createForm();
      }
      this.cdr.detectChanges();
    }, err => {
      console.log(err);
      this.errMsg = ERRMSG.otherMsg;
    });
  }

  createForm(data?) {
    this.form = this.fb.group({
      title: new FormControl('', Validators.required),
      subTitle: new FormControl('', Validators.required),
      linkUrl: new FormControl(''),
      skipType: new FormControl(''),
      skipId: new FormControl(''),
      ranking: new FormControl(''),
      type: new FormControl(''),
    });
    this.config = {
      title: new FormText({
        key: 'title',
        label: '广告标题',
        value: data && data.title || ''
      }),
      subTitle: new FormText({
        key: 'subTitle',
        label: '广告短标题',
        maxlength: 4,
        value: data && data.subTitle || ''
      }),
      skipType: new FormRadio({
        key: 'skipType',
        label: '广告链接',
        options: [{
          id: 0,
          name: '跳转到网址'
        }, {
          id: 1,
          name: '跳转到医生详情页'
        }, {
          id: 2,
          name: '跳转到第三方服务页'
        }, {
          id: 3,
          name: '跳转到风险评估页'
        }],
        value: data && (data.skipType == 0 ? data.skipType : data.skipType || '')
      }),
      linkUrl: new FormText({
        key: 'linkUrl',
        label: '网页链接',
        value: data && data.linkUrl || ''
      }),
      skipId: new FormText({
        key: 'skipId',
        label: '页面序号',
        value: data && data.skipId || ''
      }),
      ranking: new FormText({
        key: 'ranking',
        label: '推荐值',
        value: data && (data.ranking == 0 ? data.ranking : data.ranking || '')
      })
    };
  }

  getValues(value) {
    value['type'] = 0;
    value['admin'] = this.auth.getAdminName();
    if (this.id > 0) {
      this.adPatientService.adEdit(this.id, value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/ad-patient']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.adPatientService.adNew(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/ad-patient']);
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
