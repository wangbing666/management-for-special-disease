import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { PeriodStatisticsService } from './_service/period-statistics.service';
import { PeriodStatisticsTableService } from './_service/period-statistics-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-period-statistics',
  templateUrl: 'period-statistics.component.html'
})
export class PeriodStatisticsComponent implements OnInit {
  containerConfig: ContainerConfig;
  userPeriodTable: TableOption;
  doctorPeriodTable: TableOption;
  @select(['periodStatistics', 'tab']) tab: Observable<number>;
  queryUserDate: any;
  queryDoctorDate: any;

  constructor(
    @Inject('search') private search,
    private periodStatisticsservice: PeriodStatisticsService,
    private periodStatisticsTableService: PeriodStatisticsTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.periodStatisticsservice.activenessConfig();
    this.userPeriodTable = new TableOption({
      titles: this.periodStatisticsTableService.setTitles(),
      ifPage: false
    });
    this.doctorPeriodTable = new TableOption({
      titles: this.periodStatisticsTableService.setTitles(),
      ifPage: false
    });
    this.queryUserDate = this.search.setDefaultRange();
    this.queryDoctorDate = this.search.setDefaultRange();
    this.getUserQueryResult();
    this.getDoctorQueryResult();
  }

  getUserQueryResult() {
    if (this.queryUserDate && this.queryUserDate.indexOf('至') < 0) {
      this.queryUserDate += ` 至 ${this.queryUserDate}`;
    }
    this.userPeriodTable.reset();
    const option = this.search.getStartAndEnd(this.queryUserDate);
    this.periodStatisticsservice.getUserResult(option.start, option.end)
      .subscribe(res => {
        this.userPeriodTable.loading = false;
        if (res.data && res.code === 0) {
          this.userPeriodTable.lists = Array(res.data);
        } else {
          this.userPeriodTable.errorMessage = ERRMSG.otherMsg;
        }
      }, err => {
        this.userPeriodTable.loading = false;
        console.log(err);
        this.userPeriodTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  getDoctorQueryResult() {
    if (this.queryDoctorDate && this.queryDoctorDate.indexOf('至') < 0) {
      this.queryDoctorDate += ` 至 ${this.queryDoctorDate}`;
    }
    this.doctorPeriodTable.reset();
    const option = this.search.getStartAndEnd(this.queryDoctorDate);
    this.periodStatisticsservice.getDoctorResult(option.start, option.end)
      .subscribe(res => {
        this.doctorPeriodTable.loading = false;
        if (res.data && res.code === 0) {
          this.doctorPeriodTable.lists = Array(res.data);
        } else {
          this.doctorPeriodTable.errorMessage = ERRMSG.otherMsg;
        }
      }, err => {
        this.doctorPeriodTable.loading = false;
        console.log(err);
        this.doctorPeriodTable.errorMessage = ERRMSG.netErrMsg;
      });
  }
}
