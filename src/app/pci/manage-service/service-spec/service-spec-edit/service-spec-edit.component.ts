import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { ServiceSpecService } from '../_service/service-spec.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ERRMSG } from '../../../_store/static';
import { Subject } from 'rxjs/Subject';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ServiceSpec } from '../_entity/service-spec.entity';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { enable } from 'quill';

@Component({
  selector: 'app-service-spec-edit',
  templateUrl: 'service-spec-edit.component.html'
})
export class ServiceSpecEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['serviceSpec', 'data']) serviceSpec: Observable<ServiceSpec>;
  form: FormGroup;
  config: any;
  errMsg = '';
  serviceSpecId: number;
  serviceId: number;
  serviceName: string;
  thirdServiceList: any;
  searchStream: Subject<string> = new Subject<string>();
  thirdList: Array<string>;

  errorMessage: string;

  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth,
    private serviceSpecService: ServiceSpecService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.serviceSpecService.serviceSpecEditConfig(true);
    this.serviceSpec.subscribe(data => {
      if (data && data.id > 0) {
        this.serviceSpecId = data.id;
        this.serviceId = data.serviceId;
        this.serviceName = data.serviceName;
        this.createForm(data);
        this.containerConfig = this.serviceSpecService.serviceSpecEditConfig(false);
      } else {
        this.createForm(data);
      }
    });
    this.cdr.detectChanges();
  }

  createForm(data) {
    this.form = this.fb.group({
      name: new FormControl({value: ''}, Validators.required),
      specificationIdx: new FormControl({value: ''}, Validators.required),
      price: new FormControl({value: ''}, Validators.required),
      originalPrice: new FormControl({value: ''}, Validators.required),
      count: new FormControl({value: ''}, Validators.required),
      serviceId: new FormControl({value: ''}, Validators.required),
      serviceName: new FormControl({value: ''}, Validators.required),
      enable: new FormControl({value: ''}),
    });
    this.config = {
      name: new FormText({
        type: 'text',
        label: '规格名称',
        key: 'name',
        value: data.name || ''
      }),
      specificationIdx: new FormDropdown({
        label: '所属类型',
        key: 'specificationIdx',
        options: [{
          id: 0,
          name: '供第三方服务'
        }, {
          id: 1,
          name: '供组合服务'
        }],
        value: data.specificationIdx === 0 ? data.specificationIdx : data.specificationIdx || ''
      }),
      price: new FormText({
        label: '价格',
        key: 'price',
        value: data.price || ''
      }),
      originalPrice: new FormText({
        label: '原价',
        key: 'originalPrice',
        value: data.originalPrice || ''
      }),
      count: new FormText({
        type: 'text',
        label: '库存数量',
        key: 'count',
        value: data.count || ''
      }),
      serviceId: new FormText({
        label: '所属第三方服务',
        key: 'serviceId',
        value: data.serviceId || 1,
        // options: [],
      }),
      enable: new FormDropdown({
        label: '状态',
        key: 'enable',
        options: [{
          id: true,
          name: '启用'
        }, {
          id: false,
          name: '禁用'
        }],
        value: data.enable === false ? data.enable : data.enable || ''
      })
    }
    this.searchStream.debounceTime(500).distinctUntilChanged().subscribe(searchText => {
      this.loadData(this.serviceName);
    });
  }

  loadData(key) {
    if (key) {
      this.serviceSpecService.searchThird(key)
        .subscribe(res => {
          if (res.code === 0 && res.data && res.data.length !== 0) {
            this.thirdList = res.data;
          }
        });
    }
  }

  getValues(value) {
    delete value.serviceName;
    value.serviceId = this.serviceId;
    value.operator = this.auth.getAdminName();
    if (this.serviceSpec) {
      value.id = this.serviceSpecId;
    } else {
      delete value.id;
    }
    this.serviceSpecService.serviceSpecUpdate(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.router.navigate(['/service-spec']);
          });
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }

  search($event) {
    this.searchStream.next(this.serviceName);
  }

  selected(data) {
    this.serviceName = data.name;
    this.serviceId = data.id;
    this.thirdList = [];
  }
}
