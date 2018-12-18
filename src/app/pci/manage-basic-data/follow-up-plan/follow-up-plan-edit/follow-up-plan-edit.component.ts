import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { FollowUpPlanService } from '../_service/follow-up-plan.service';
import { FollowUpPlan } from '../_entity/follow-up-plan.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-follow-p-edit',
  templateUrl: './follow-up-plan-edit.component.html'
})
export class FollowUpPlanEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['followUpPlan', 'data']) followUpPlan: Observable<FollowUpPlan>;
  form: FormGroup;
  config: any;
  custom: any;
  id: number;

  followTypeList = [{
    id: 1,
    name: '一个月'
  }, {
    id: 3,
    name: '三个月'
  }, {
    id: 6,
    name: '六个月'
  }, {
    id: 9,
    name: '九个月'
  }, {
    id: 12,
    name: '十二个月'
  }];

  customList = [{
    id: 1,
    name: '复查血一套'
  }, {
    id: 2,
    name: '心电图'
  }, {
    id: 3,
    name: '心超和彩超'
  }, {
    id: 4,
    name: '24小时心电图'
  }, {
    id: 5,
    name: '颈动脉多普勒超声'
  }, {
    id: 6,
    name: '复查冠脉造影'
  }, {
    id: 7,
    name: '自定义'
  }];

  constructor(
    private followUpPlanService: FollowUpPlanService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.followUpPlan.subscribe(data => {
      if (data && data.id > 0) {
        this.id = data.id;
        this.containerConfig = this.followUpPlanService.followUpPlanEditConfig(true);
        this.customList.forEach(obj => {
          if (data.custom) {
            this.custom = 7;
          } else if (!data.custom && obj.name == data.name) {
            this.custom = obj.id;
          }
        });
        this.createForm(data);
      } else {
        this.containerConfig = this.followUpPlanService.followUpPlanEditConfig(false);
        this.createForm();
      }
    });
    this.cdr.detectChanges();
  }

  createForm(data?) {
    this.form = this.fb.group({
      type: new FormControl({value: ''}, Validators.required),
      custom: new FormControl({value: ''}, Validators.required),
      name: new FormControl({value: ''}, Validators.required)
    });
    this.config = {
      type: new FormDropdown({
        label: '随访时间',
        key: 'type',
        options: this.followTypeList,
        value: data && data.type || ''
      }),
      custom: new FormDropdown({
        label: '随访项',
        key: 'custom',
        options: this.customList,
        value: data && data.custom || ''
      }),
      name: new FormText({
        type: 'text',
        label: '自定义内容',
        key: 'name',
        value: data && data.name || ''
      })
    }
  }

  setCustom(data) {
    this.custom = data;
    if (this.custom == 7) {
      this.config.name.value = '';
    }
    this.cdr.detectChanges();
  }

  // 提交保存信息
  getValues(value) {
    value.custom = value.custom == 7 ? true : false;
    if (!value.custom) {
      this.customList.forEach(obj => {
        if (obj.id == this.custom) {
          console.log(obj.name);
          value.name = obj.name;
        }
      });
    }
    if (this.id) {
      value.id = this.id;
      this.followUpPlanService.followUpPlanEdit(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/follow-up-plan']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.followUpPlanService.followUpPlanCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/follow-up-plan']);
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
