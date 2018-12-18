import { Component, OnInit, Inject } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';

import { DownloadStatisticsService } from './_service/download-statistics.service';
import { DownloadStatisticsTableService } from './_service/download-statistics-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-download-statistics',
  templateUrl: 'download-statistics.component.html'
})
export class DownloadStatisticsComponent implements OnInit {
  containerConfig: ContainerConfig;
  mainTable: TableOption;
  userTable: TableOption;
  doctorTable: TableOption;
  queryMainDate: any;
  queryUserDate: any;
  queryDoctorDate: any;

  constructor(
    @Inject('search') private search,
    private service: DownloadStatisticsService,
    private tableService: DownloadStatisticsTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.service.downloadConfig();
    this.mainTable = new TableOption({
      titles: this.tableService.setMainTitles(),
      ifPage: true
    });
    this.userTable = new TableOption({
      titles: this.tableService.setTitles(),
      ifPage: true
    });
    this.doctorTable = new TableOption({
      titles: this.tableService.setTitles(),
      ifPage: true
    });
    this.queryMainDate = this.search.setDefaultRange();
    this.queryUserDate = this.search.setDefaultRange();
    this.queryDoctorDate = this.search.setDefaultRange();
    this.getMainQueryResult();
    this.getUserQueryResult();
    this.getDoctorQueryResult();
  }

  getMainQueryResult() {
    if (this.queryMainDate && this.queryMainDate.indexOf('至') < 0) {
      this.queryMainDate += ` 至 ${this.queryMainDate}`;
    }
    this.mainTable.reset();
    const option = this.search.getStartAndEnd(this.queryMainDate);
    this.service.getDownloadStatistics(option.start, option.end, 2)
      .subscribe(data => {
        this.mainTable.loading = false;
        if (data.data && data.code === 0) {
          this.mainTable.lists = data.data;
        } else {
          this.mainTable.errorMessage = data.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.mainTable.loading = false;
        console.log(err);
        this.mainTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  getUserQueryResult() {
    if (this.queryUserDate && this.queryUserDate.indexOf('至') < 0) {
      this.queryUserDate += ` 至 ${this.queryUserDate}`;
    }
    this.userTable.reset();
    const option = this.search.getStartAndEnd(this.queryUserDate);
    this.service.getDownloadStatistics(option.start, option.end, 0)
      .subscribe(data => {
        this.userTable.loading = false;
        if (data.data && data.code === 0) {
          this.userTable.lists = data.data;
          this.format(this.userTable.lists);
        } else {
          this.userTable.errorMessage = data.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.userTable.loading = false;
        console.log(err);
        this.userTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  getDoctorQueryResult() {
    if (this.queryDoctorDate && this.queryDoctorDate.indexOf('至') < 0) {
      this.queryDoctorDate += ` 至 ${this.queryDoctorDate}`;
    }
    this.doctorTable.reset();
    const option = this.search.getStartAndEnd(this.queryDoctorDate);
    this.service.getDownloadStatistics(option.start, option.end, 1)
      .subscribe(data => {
        this.doctorTable.loading = false;
        if (data.data && data.code === 0) {
          this.doctorTable.lists = data.data;
          this.format(this.doctorTable.lists);
        } else {
          this.doctorTable.errorMessage = data.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.doctorTable.loading = false;
        console.log(err);
        this.doctorTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  format(data) {
    if (typeof data === 'object') {
      data.forEach(obj => {
        obj.ios = `${obj.ios}/${obj.ios_u}`;
        obj.android = `${obj.android}/${obj.android_u}`;
      })
    }
  }
}
