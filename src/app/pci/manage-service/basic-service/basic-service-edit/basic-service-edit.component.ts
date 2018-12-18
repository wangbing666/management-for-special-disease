import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { BasicServiceService } from '../_service/basic-service.service';
import { BasicService } from '../_entity/basic-service.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-basic-service-edit',
  templateUrl: './basic-service-edit.component.html'
})
export class BasicServiceEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['basicService', 'data']) basicService: Observable<BasicService>;
  form: FormGroup;
  config: any;
  numbers: Array<any> = [];
  id: number;

  constructor(
    @Inject('app') private app,
    private basicServiceService: BasicServiceService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.basicService.subscribe(data => {
      if (data && data.serviceNumbers && data.id > 0) {
        this.containerConfig = this.basicServiceService.basicServiceEditConfig(true);
        this.id = data.id;
        this.numbers = data.serviceNumbers;
        this.createForm(data);
      } else {
        this.containerConfig = this.basicServiceService.basicServiceEditConfig(false);
        this.createForm();
      }
    });
    this.cdr.detectChanges();
  }

  createForm(data?) {
    this.form = this.fb.group({
      iconUrl: new FormControl({value: ''}, Validators.required),
      name: new FormControl({value: ''}, Validators.required),
      times: new FormControl({value: ''}, Validators.required),
      enable: new FormControl({value: ''}, Validators.required),
      unitId: new FormControl({value: ''}, Validators.required),
      numbers: new FormControl({value: ''}),
      content: new FormControl({value: ''}),
      operationalRemark: new FormControl({value: ''}),
    });
    this.config = {
      iconUrl: new FormFile({
        label: '服务图片',
        key: 'iconUrl',
        url: this.app.pci.UPLOAD_URL,
        value: data && data.iconUrl || ''
      }),
      name: new FormText({
        type: 'text',
        label: '服务名称',
        key: 'name',
        value: data && data.name || ''
      }),
      times: new FormText({
        type: 'number',
        label: '咨询次数',
        key: 'times',
        value: data && data.times || ''
      }),
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
        value: data && (data.enable == false ? data.enable : data.enable || '')
      }),
      unitId: new FormRadio({
        label: '单位',
        key: 'unitId',
        options: [{
          id: 1,
          name: '朵花／月'
        }, {
          id: 5,
          name: '朵花／天'
        }, {
          id: 6,
          name: '朵花／年'
        }, {
          id: 2,
          name: '天'
        }, {
          id: 4,
          name: '年'
        }, {
          id: 3,
          name: '朵花／次'
        }],
        value: data && data.unitId || ''
      }),
      numbers: new FormText({
        type: 'text',
        label: '服务时长/价格',
        key: 'numbers',
        value: data && data.numbers || ''
      }),
      content: new FormTextarea({
        label: '服务描述',
        key: 'content',
        value: data && data.content || ''
      }),
      operationalRemark: new FormTextarea({
        label: '运营说明',
        key: 'operationalRemark',
        value: data && data.operationalRemark || ''
      }),
    }
  }

  addNumber(number) {
    if (this.numbers.indexOf(number) < 0) {
      this.numbers.push(number);
      this.numbers.sort((a, b) => a - b);
      this.cdr.detectChanges();
    }
  }

  delNumber(number) {
    const i = this.numbers.indexOf(number);
    this.numbers.splice(i, 1);
    this.cdr.detectChanges();
  }

  getValues(value) {
    if (typeof value.numbers === 'object') {
      value.numbers = value.numbers.join(',');
    }
    if (this.id) {
      value.servicePackageId = this.id;
      this.basicServiceService.basicServiceUpdate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/basic-service']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      value.serviceType = 1;
      this.basicServiceService.basicServiceCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/basic-service']);
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
