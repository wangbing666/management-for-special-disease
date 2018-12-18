import { Component, OnInit, Inject } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ActivenessStatisticsService } from './_service/activeness-statistics.service';
import { ActivenessStatisticsTableService } from './_service/activeness-statistics-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-activeness-statistics',
  templateUrl: 'activeness-statistics.component.html'
})
export class ActivenessStatisticsComponent implements OnInit {
  containerConfig: ContainerConfig;
  userActivenessTable: TableOption;
  doctorActivenessTable: TableOption;
  userStatistics: any;
  doctorStatistics: any;
  queryUserDate: any;
  queryDoctorDate: any;

  constructor(
    @Inject('search') private search,
    private activenessStatisticsService: ActivenessStatisticsService,
    private activenessStatisticsTableService: ActivenessStatisticsTableService
  ) {
  }

  ngOnInit() {
    this.search.setDefaultRange(7);
    this.containerConfig = this.activenessStatisticsService.activenessConfig();
    this.userActivenessTable = new TableOption({
      titles: this.activenessStatisticsTableService.setUserTitles(),
      ifPage: true
    });
    this.doctorActivenessTable = new TableOption({
      titles: this.activenessStatisticsTableService.setDoctorTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
  }

  reset0() {
    this.queryUserDate = this.search.setDefaultDate();
    this.userActivenessTable.queryKey = '';
    this.getUserActivenessStatistics(0);
  }

  reset1() {
    this.queryDoctorDate = this.search.setDefaultDate();
    this.doctorActivenessTable.queryKey = '';
    this.getDoctorActivenessStatistics(0);
  }

  all0() {
    this.queryUserDate = '';
    this.userActivenessTable.queryKey = '';
    this.getUserActivenessStatistics(0);
  }

  all1() {
    this.queryDoctorDate = '';
    this.doctorActivenessTable.queryKey = '';
    this.getDoctorActivenessStatistics(0);
  }

  getUserActivenessStatistics(page: number) {
    this.userActivenessTable.reset(page);
    this.userStatistics = null;
    this.activenessStatisticsService.getUserActiveness(
      page,
      this.userActivenessTable.size,
      this.userActivenessTable.queryKey,
      this.queryUserDate
    ).subscribe(res => {
      this.userActivenessTable.loading = false;
      if (res.data && res.data.list && res.data.list.content && res.data.list.content.length === 0 && res.code === 0) {
        this.userActivenessTable.errorMessage = ERRMSG.nullMsg;
      } else if (res.data && res.data.list && res.data.list.content && res.code === 0) {
        this.userActivenessTable.totalPage = res.data.list.totalPages;
        this.userActivenessTable.lists = res.data.list.content;
        if (res.data.statistics) {
          this.userStatistics = {};
          this.userStatistics.loginTotal = res.data.statistics.loginTotal;
          this.userStatistics.loginCount = res.data.statistics.loginCount;
          this.userStatistics.loginRate = res.data.statistics.loginRate;
          this.userStatistics.loginAverage = res.data.statistics.loginAverage;
        }
      } else {
        this.userActivenessTable.errorMessage = ERRMSG.otherMsg;
      }
    }, err => {
      this.userActivenessTable.loading = false;
      console.log(err);
      this.userActivenessTable.errorMessage = ERRMSG.netErrMsg;
    })
  }

  getDoctorActivenessStatistics(page: number) {
    this.doctorActivenessTable.reset(page);
    this.doctorStatistics = null;
    this.activenessStatisticsService.getDoctorActiveness(
      page,
      this.doctorActivenessTable.size,
      this.doctorActivenessTable.queryKey,
      this.queryDoctorDate
    ).subscribe(res => {
      this.doctorActivenessTable.loading = false;
      if (res.data && res.data.list && res.data.list.content && res.data.list.content.length === 0 && res.code === 0) {
        this.doctorActivenessTable.errorMessage = ERRMSG.nullMsg;
      } else if (res.data && res.data.list && res.data.list.content && res.code === 0) {
        this.doctorActivenessTable.totalPage = res.data.list.totalPages;
        this.doctorActivenessTable.lists = res.data.list.content;
        if (res.data.statistics) {
          this.doctorStatistics = {};
          this.doctorStatistics.loginTotal = res.data.statistics.loginTotal;
          this.doctorStatistics.loginCount = res.data.statistics.loginCount;
          this.doctorStatistics.loginRate = res.data.statistics.loginRate;
          this.doctorStatistics.loginAverage = res.data.statistics.loginAverage;
        }
      } else {
        this.doctorActivenessTable.errorMessage = res.msg || ERRMSG.otherMsg;
      }
    }, err => {
      this.doctorActivenessTable.loading = false;
      console.log(err);
      this.doctorActivenessTable.errorMessage = ERRMSG.netErrMsg;
    })
  }
}
