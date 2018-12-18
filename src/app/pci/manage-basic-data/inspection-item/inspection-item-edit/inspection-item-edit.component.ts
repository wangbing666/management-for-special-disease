import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormRadio } from '../../../../libs/dform/_entity/form-radio';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { InspectionItemService } from '../_service/inspection-item.service';
import { InspectionItem } from '../_entity/inspection-item.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-inspection-item-edit',
  templateUrl: './inspection-item-edit.component.html'
})
export class InspectionItemEditComponent implements OnInit {
  containerConfig: ContainerConfig;
  @select(['inspectionItem', 'data']) inspectionItem: Observable<InspectionItem>;
  form: FormGroup;
  config: any;
  id: any;

  typeOption = [
    {
      id: 0,
      name: '无'
    },
    {
      id: 1,
      name: '范围'
    }
  ];
  chartOption = [
    {
      id: true,
      name: '可显示图表'
    },
    {
      id: false,
      name: '无图表'
    }
  ];

  constructor(
    private inspectionItemService: InspectionItemService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.inspectionItem.subscribe(data => {
      if (data.typeList && data.id > 0) {
        this.containerConfig = this.inspectionItemService.inspectionItemEditConfig(true);
        this.createForm(data.typeList, data);
      } else if (data.typeList) {
        this.containerConfig = this.inspectionItemService.inspectionItemEditConfig(false);
        this.createForm(data.typeList);
      }
    });
    this.cdr.detectChanges();
  }

  createForm(list, data?) {
    this.form = this.fb.group({
      recordExaminationTypeId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      alias: new FormControl(''),
      unit: new FormControl(''),
      type: new FormControl('', Validators.required),
      reference: new FormControl(''),
      max: new FormControl(''),
      min: new FormControl(''),
      chart: new FormControl('', Validators.required),
      maxY: new FormControl(''),
      minY: new FormControl(''),
      intervalY: new FormControl(''),
      color: new FormControl(''),
    });
    this.config = {
      recordExaminationTypeId: new FormDropdown({
        label: '所属大类',
        key: 'recordExaminationTypeId',
        options: list,
        value: data && data.recordExaminationTypeId || ''
      }),
      name: new FormText({
        type: 'text',
        label: '项目名称',
        key: 'name',
        value: data && data.name || ''
      }),
      alias: new FormText({
        type: 'text',
        label: '别名',
        key: 'alias',
        value: data && data.alias || ''
      }),
      type: new FormRadio({
        label: '类型',
        key: 'type',
        options: this.typeOption,
        value: data && (data.type == 0 ? data.type : data.type || '')
      }),
      max: new FormText({
        type: 'text',
        label: '上限值',
        key: 'max',
        value: data && (data.max == 0 ? data.max : data.max || '')
      }),
      min: new FormText({
        type: 'text',
        label: '下限值',
        key: 'min',
        value: data && (data.min == 0 ? data.min : data.min || '')
      }),
      reference: new FormText({
        type: 'text',
        label: '参考值',
        key: 'reference',
        value: data && (data.reference == 0 ? data.reference : data.reference || '')
      }),
      unit: new FormText({
        type: 'text',
        label: '单位',
        key: 'unit',
        value: data && data.unit || ''
      }),
      chart: new FormRadio({
        label: '图标选项',
        key: 'chart',
        options: this.chartOption,
        value: data && data.chart
      }),
      maxY: new FormText({
        type: 'text',
        label: '图表纵坐标最大值',
        key: 'maxY',
        value: data && (data.maxY == 0 ? data.maxY : data.maxY || '')
      }),
      minY: new FormText({
        type: 'text',
        label: '图表纵坐标最小值',
        key: 'minY',
        value: data && (data.minY == 0 ? data.minY : data.minY || '')
      }),
      intervalY: new FormText({
        type: 'text',
        label: '纵坐标间隔',
        key: 'intervalY',
        value: data && (data.intervalY == 0 ? data.intervalY : data.intervalY || '')
      }),
      color: new FormText({
        type: 'text',
        label: '图表线条颜色',
        key: 'color',
        value: data && data.color || '#35B2F2'
      }),
    }
  }

  getValues(value) {
    console.log(value);
    if (this.id) {
      value.id = this.id;
      this.inspectionItemService.inspectionItemEdit(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/inspection-item']);
            });
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.saveError, this.dialog);
        });
    } else {
      this.inspectionItemService.inspectionItemCreate(value)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
              this.router.navigate(['/inspection-item']);
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
