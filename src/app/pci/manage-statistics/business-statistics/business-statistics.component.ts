import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { BusinessStatisticsService } from './_service/business-statistics.service';
import { BusinessStatisticsTableService } from './_service/business-statistics-table.service';
import { ERRMSG } from '../../_store/static';
import { MatAnchor } from '@angular/material';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

type AOA = Array<Array<any>>;

@Component({
  selector: 'app-business-statistics',
  templateUrl: 'business-statistics.component.html'
})
export class BusinessStatisticsComponent implements OnInit {
  containerConfig: ContainerConfig;
  businessUserTable: TableOption;
  businessUserExport: AOA;
  businessDoctorTable: TableOption;
  businessDoctorExport: AOA;
  queryUserDate: any;
  queryDoctorDate: any;
  @ViewChild('userExport') userExport: MatAnchor;

  constructor(
    @Inject('search') private search,
    @Inject('common') private common,
    private businessservice: BusinessStatisticsService,
    private businesstableService: BusinessStatisticsTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.businessservice.businessConfig();
    this.businessUserTable = new TableOption({
      titles: this.businesstableService.setTitles(),
      ifPage: false
    });
    this.businessDoctorTable = new TableOption({
      titles: this.businesstableService.setTitles(),
      ifPage: false
    });
    this.queryUserDate = this.search.setDefaultRange();
    this.queryDoctorDate = this.search.setDefaultRange();
    this.getUserData();
    this.getDoctorData();
  }

  getUserData() {
    if (this.queryUserDate && this.queryUserDate.indexOf('至') < 0) {
      this.queryUserDate += ` 至 ${this.queryUserDate}`;
    }
    const option = this.search.getStartAndEnd(this.queryUserDate);
    this.businessUserTable.reset();
    this.businessservice.getData(option.start, option.end)
      .subscribe(
        res => {
          this.businessUserTable.loading = false;
          if (res.data && res.code === 0) {
            this.businessUserTable.lists = res.data.userData;
            this.businessUserExport = this.common.toArray(<Array<Object>>this.businessUserTable.lists);
          } else {
            this.businessUserTable.errorMessage = ERRMSG.otherMsg;
          }
        }, err => {
          this.businessUserTable.loading = false;
          console.log(err);
          this.businessUserTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getDoctorData() {
    if (this.queryDoctorDate && this.queryDoctorDate.indexOf('至') < 0) {
      this.queryDoctorDate += ` 至 ${this.queryDoctorDate}`;
    }
    const option = this.search.getStartAndEnd(this.queryDoctorDate);
    this.businessDoctorTable.reset();
    this.businessservice.getData(option.start, option.end)
      .subscribe(
        res => {
          this.businessDoctorTable.loading = false;
          if (res.data && res.code === 0) {
            this.businessDoctorTable.lists = res.data.doctorData;
            this.businessDoctorExport = this.common.toArray(<Array<Object>>this.businessDoctorTable.lists);
          } else {
            this.businessDoctorTable.errorMessage = ERRMSG.otherMsg;
          }
        }, err => {
          this.businessDoctorTable.loading = false;
          console.log(err);
          this.businessDoctorTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  export(data: AOA, type) {
    if (data) {
      /* generate worksheet */
      const ws = XLSX.utils.aoa_to_sheet(data);
      /* generate workbook and add the worksheet */
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, this.queryUserDate);
      /* save to file */
      const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
      const fileName = type ? `心血管家业务数据统计-患者端-${this.queryUserDate}.xlsx`
        : `心血管家业务数据统计-医生端-${this.queryDoctorDate}.xlsx`;
      saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
    }
  }
}
