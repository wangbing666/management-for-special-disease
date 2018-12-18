import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { DoctorServiceService } from '../_service/doctor-service.service';
import { DoctorService } from '../_entity/doctor-service.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-doctor-service-edit',
  templateUrl: './doctor-service-edit.component.html'
})
export class DoctorServiceEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['doctorService', 'data']) doctorService: Observable<DoctorService>;
  form: FormGroup;
  config: any;
  numbers: Array<any> = [];
  id: number;

  constructor(
    @Inject('app') private app,
    private doctorServiceService: DoctorServiceService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorServiceService.doctorServiceEditConfig(true);
    this.doctorService.subscribe(data => {
      if (data && data.id > 0) {
        this.id = data.id;
        this.numbers = data.serviceNumbers;
        this.createForm(data);
      }
    });
    this.cdr.detectChanges();
  }

  createForm(data) {
    this.form = this.fb.group({
      iconUrl: new FormControl({value: ''}, Validators.required),
      name: new FormControl({value: ''}, Validators.required),
      // times: new FormControl({value: ''}, Validators.required),
      enable: new FormControl({value: ''}, Validators.required),
      unitId: new FormControl({value: ''}, Validators.required),
      numbers: new FormControl({value: ''}),
      content: new FormControl({value: ''}, Validators.required),
      operationalRemark: new FormControl({value: ''}, Validators.required),
    });
    this.config = {
      iconUrl: new FormFile({
        label: '服务图片',
        key: 'iconUrl',
        url: this.app.pci.UPLOAD_URL,
        value: data.iconUrl || ''
      }),
      name: new FormText({
        type: 'text',
        label: '服务名称',
        key: 'name',
        value: data.name || ''
      }),
      // times: new FormText({
      //   type: 'number',
      //   label: '咨询次数',
      //   key: 'times',
      //   value: data.times || ''
      // }),
      enable: new FormRadio({
        label: '状态',
        key: 'enable',
        options: [{
          id: true,
          name: '启用'
        }, {
          id: false,
          name: '禁用'
        }],
        value: data.enable
      }),
      unitId: new FormRadio({
        label: '单位',
        key: 'unitId',
        options: [{
          id: 1,
          name: '鲜花／月'
        }, {
          id: 2,
          name: '天'
        }, {
          id: 3,
          name: '朵花／次'
        }, {
          id: 4,
          name: '年'
        }],
        value: data.unitId || ''
      }),
      numbers: new FormText({
        type: 'text',
        label: '服务价钱',
        key: 'numbers',
        value: data.numbers || ''
      }),
      content: new FormTextarea({
        label: '服务简介',
        key: 'content',
        value: data.content || '',
        maxlength: 42
      }),
      operationalRemark: new FormTextarea({
        label: '服务说明',
        key: 'operationalRemark',
        value: data.operationalRemark || ''
      }),
    }
  }

  addNumber(number) {
    if (this.numbers.indexOf(number) < 0) {
      this.numbers.push(number);
      this.numbers.sort((a, b) => a - b);
    }
  }

  delNumber(number) {
    const i = this.numbers.indexOf(number);
    this.numbers.splice(i, 1);
  }

  getStatus(value) {
    value.serviceType = 0;
    value.servicePackageId = this.id;
    if (value.name === '绿色通道') {
      value.dataType = 2;
    } else if (value.name === '预约床位') {
      value.dataType = 1;
    } else {
      value.dataType = 0;
    }
  }

  getValues(value) {
    if (typeof value.numbers === 'object') {
      value.numbers = value.numbers.join(',');
    }
    this.getStatus(value);
    this.doctorServiceService.doctorServiceUpdate(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/doctor-service']);
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
