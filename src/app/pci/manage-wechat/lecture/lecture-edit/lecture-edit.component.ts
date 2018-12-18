import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormDatetime } from '../../../../libs/dform/_entity/form-datetime';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormHidden } from '../../../../libs/dform/_entity/form-hidden';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { LectureService } from '../_service/lecture.service';
import { Lecture } from '../_entity/lecture.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-lecture-edit',
  templateUrl: './lecture-edit.component.html'
})
export class LectureEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['lecture', 'data']) lecture: Observable<Lecture>;
  errMsg = '';
  form: FormGroup;
  config: any;
  charge: boolean;
  limit: boolean;
  onlineDate: boolean;

  constructor(
    @Inject('app') private app,
    private fb: FormBuilder,
    private lectureService: LectureService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.lecture.subscribe(data => {
      if (data.id === '0') {
        this.containerConfig = this.lectureService.lectureEditConfig(true);
        this.createForm();
      } else {
        this.containerConfig = this.lectureService.lectureEditConfig(false);
        this.getEditstatus(data);
        this.createForm(data);
      }
    });
    this.cdr.detectChanges();
  }

  // 进入编辑页面显示
  getEditstatus(data) {
    if (data.charge === 0) {
      this.charge = false;
      data.isCharge = 0;
    } else {
      this.charge = true;
      data.isCharge = 1;
    }
    ;
    if (data.joinLimit === true) {
      this.limit = true;
    }
    if (data.onlineDate === 0) {
      this.onlineDate = false;
      data.isOnlineDate = 0;
    } else {
      this.onlineDate = true;
      data.isOnlineDate = 1;
    }
  }

  createForm(data?) {
    this.form = this.fb.group({
      id: new FormControl(Validators.required),
      contentImgUrl: new FormControl(Validators.required),
      imgUrl: new FormControl(Validators.required),
      name: new FormControl({value: ''}, Validators.required),
      date: new FormControl({value: ''}, Validators.required),
      address: new FormControl({value: ''}, Validators.required),
      joinLimitDate: new FormControl(Validators.required),
      url: new FormControl({value: ''}, Validators.required),
      isCharge: new FormControl(Validators.required),
      charge: new FormControl(Validators.required),
      joinLimit: new FormControl(Validators.required),
      joinLimitCount: new FormControl(Validators.required),
      isOnlineDate: new FormControl(Validators.required),
      onlineDate: new FormControl(Validators.required),
    });
    this.config = {
      id: new FormHidden({
        key: 'id',
        label: '医院ID',
        value: data && data.id || '',
      }),
      contentImgUrl: new FormFile({
        label: '讲座大图',
        key: 'contentImgUrl',
        value: data && data.contentImgUrl || '',
        url: `${this.app.pci.BASE_URL}api/upload`,
      }),
      imgUrl: new FormFile({
        key: 'imgUrl',
        label: '讲座小图',
        value: data && data.imgUrl || '',
        url: `${this.app.pci.BASE_URL}api/upload`,
        required: false,
      }),
      name: new FormText({
        key: 'name',
        label: '讲座名称',
        value: data && data.name || '',
        required: true,
        maxlength: 16,
      }),
      date: new FormDatetime({
        key: 'date',
        label: '讲座时间',
        value: data && data.date || '',
        required: true,
      }),
      address: new FormText({
        key: 'address',
        label: '讲座地点',
        value: data && data.address || '',
        required: true,
        maxlength: 16,
      }),
      joinLimitDate: new FormDatetime({
        key: 'joinLimitDate',
        label: '报名截止时间',
        value: data && data.joinLimitDate || '',
        required: true,
      }),
      url: new FormText({
        key: 'url',
        label: '讲座链接',
        value: data && data.url || '',
      }),
      isCharge: new FormRadio({
        key: 'isCharge',
        label: '是否收费',
        value: data && data.isCharge || 0,
        options: [
          {id: 0, name: '否'},
          {id: 1, name: '是'}
        ],
      }),
      charge: new FormText({
        key: 'charge',
        label: '请填写费用',
        value: data && data.charge || '',
        required: true,
        type: 'number',
        maxlength: 6,
      }),
      joinLimit: new FormRadio({
        key: 'joinLimit',
        label: '人数上限',
        value: data && data.joinLimit || false,
        options: [
          {id: false, name: '无'},
          {id: true, name: '上限'}
        ],
      }),
      joinLimitCount: new FormText({
        key: 'joinLimitCount',
        label: '请填写人数上限',
        value: data && data.joinLimitCount || '',
        required: true,
        type: 'number',
        maxlength: 5,
      }),
      isOnlineDate: new FormRadio({
        key: 'isOnlineDate',
        label: '讲座上线时间',
        value: data && data.isOnlineDate || 0,
        options: [
          {id: 0, name: '保存即上线'},
          {id: 1, name: '设定上线时间'}
        ],
      }),
      onlineDate: new FormDatetime({
        key: 'onlineDate',
        label: '请选择上线时间',
        value: data && data.onlineDate || '',
      }),
    }
  }

  isCharge(value) {
    if (value === 0) {
      this.charge = false;
    }
    if (value === 1) {
      this.charge = true;
    }
  }

  joinLimit(value) {
    if (value === false) {
      this.limit = false;
    }
    if (value === true) {
      this.limit = true;
    }
  }

  isOnlineDate(value) {
    if (value === 0) {
      this.onlineDate = false;
    }
    if (value === 1) {
      this.onlineDate = true;
    }
  }

  // 提交时间转换
  getlectureTime(data) {
    if (data !== 0 && typeof(data) === 'string') {
      const newstr = data.replace(/-/g, '/');
      const date = new Date(newstr);
      const time_str = date.getTime();
      return time_str;
    } else if (data === 0) {
      return 0;
    } else {
      return data;
    }
  }

  getStatus(data) {
    if (data.isCharge === 0) {
      data.charge = 0;
      delete data.isCharge;
    } else {
      delete data.isCharge;
    }
    if (data.joinLimit === false) {
      data.joinLimitCount = 0;
    }
    if (data.isOnlineDate === 0) {
      data.onlineDate = 0;
      delete data.isOnlineDate;
    } else {
      delete data.isOnlineDate;
    }
  }

  // 提交保存信息
  getValues(data) {
    this.getStatus(data);
    data.date = this.getlectureTime(data.date);
    data.joinLimitDate = this.getlectureTime(data.joinLimitDate);
    data.onlineDate = this.getlectureTime(data.onlineDate);
    console.log(data);
    if (data.id) {
      this.lectureService.lectureEdit(data)
        .subscribe(
          res => {
            if (res.code === 0) {
              HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
                this.router.navigate(['/lecture']);
              });
            } else {
              HintDialog(res.msg || ERRMSG.saveError, this.dialog);
            }
          }, err => {
            console.log(err);
            HintDialog(ERRMSG.saveError, this.dialog);
          });
    } else {
      this.lectureService.lectureCreate(data)
        .subscribe(
          res => {
            if (res.code === 0) {
              HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
                this.router.navigate(['/lecture']);
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
