import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { DiscomfortSymptomService } from './_service/discomfort-symptom.service';
import { DiscomfortSymptomTableService } from './_service/discomfort-symptom-table.service';
import { ERRMSG } from '../../_store/static';
import { DiscomfortSymptom } from './_entity/discomfort-symptom.entity';

@Component({
  selector: 'app-discomfort-symptom',
  templateUrl: './discomfort-symptom.component.html'
})
export class DiscomfortSymptomComponent implements OnInit {
  containerConfig: ContainerConfig;
  discomfortSymptomTable: TableOption;
  discomfortTypes: any;

  constructor(
    @Inject('action') private action,
    private discomfortSymptomService: DiscomfortSymptomService,
    private discomfortSymptomTableService: DiscomfortSymptomTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.discomfortSymptomService.discomfortSymptomConfig();
    this.discomfortSymptomTable = new TableOption({
      titles: this.discomfortSymptomTableService.setTitles(),
      ifPage: false
    });
    this.reset();
  }

  reset() {
    this.getDiscomfortSymptomTypes()
      .subscribe(() => {
        this.getDiscomfortSymptoms();
      }, err => {
        this.discomfortSymptomTable.loading = false;
        console.log(err);
        this.discomfortSymptomTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  getDiscomfortSymptomTypes() {
    return this.discomfortSymptomService.getDiscomfortSymptomType()
      .map(res => {
        if (res.code === 0 && res.data) {
          this.discomfortTypes = res.data;
          this.action.dataChange('discomfortSymptom', new DiscomfortSymptom(this.discomfortTypes));
          this.discomfortSymptomTable.queryKey = res.data[0].id;
        }
      });
  }

  getDiscomfortSymptoms() {
    this.discomfortSymptomTable.reset();
    this.discomfortSymptomService.getDiscomfortSymptoms(this.discomfortSymptomTable.queryKey)
      .subscribe(res => {
        this.discomfortSymptomTable.loading = false;
        if (res.data && res.data.length === 0 && res.code === 0) {
          this.discomfortSymptomTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.code === 0) {
          this.formatData(res.data);
          this.discomfortSymptomTable.lists = res.data;
        } else {
          this.discomfortSymptomTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.discomfortSymptomTable.loading = false;
        console.log(err);
        this.discomfortSymptomTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  formatData(data) {
    data.forEach(obj => {
      obj.enableName = obj.enable ? '启用' : '禁用';
    });
  }

  gotoHandle(res) {
    const healthNews = <DiscomfortSymptom>res.value;
    healthNews.symptomTypeId = this.discomfortSymptomTable.queryKey;
    healthNews.typeList = this.discomfortTypes;
    if (res.key === 'edit') {
      this.action.dataChange('discomfortSymptom', healthNews);
      this.router.navigate(['/discomfort-symptom/edit']);
    }
  }

  // 新增不适症状
  newData() {
    this.action.dataChange('discomfortSymptom', new DiscomfortSymptom(this.discomfortTypes));
    this.router.navigate(['/discomfort-symptom/edit']);
  }
}
