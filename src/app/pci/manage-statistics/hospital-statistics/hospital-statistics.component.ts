import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';
import { HospitalStatisticsService } from './_service/hospital-statistics.service';

@Component({
  selector: 'app-hospital-statistics',
  templateUrl: 'hospital-statistics.component.html'
})
export class HospitalStatisticsComponent implements OnInit, OnDestroy {
  containerConfig: ContainerConfig;
  userTable: TableOption;
  userRegisterCount: any;
  hospitalList: any;

  subscribeUserTable: any;

  constructor(
    private hospitalStatisticsService: HospitalStatisticsService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.hospitalStatisticsService.hospitalStatisticsConfig();
    this.userTable = new TableOption({
      titles: this.hospitalStatisticsService.setTitles(),
      ifPage: true,
      queryKey: {date: '', channel: ''}
    });
    this.reset();
    this.getHospitals();
  }

  ngOnDestroy() {
    if (this.subscribeUserTable) {
      this.subscribeUserTable.unsubscribe();
    }
  }

  reset() {
    this.userTable.queryKey = {date: '', channel: ''};
    this.getUsers(0);
  }

  getUsers(page: number) {
    if (this.userTable.queryKey && this.userTable.queryKey.date && this.userTable.queryKey.date.indexOf('至') < 0) {
      this.userTable.queryKey.date += ` 至 ${this.userTable.queryKey.date}`;
    }
    this.userTable.reset(page);
    this.subscribeUserTable = this.hospitalStatisticsService.getUsers(
      page, this.userTable.size,
      this.userTable.queryKey.date,
      this.userTable.queryKey.channel
    )
      .subscribe(
        res => {
          this.userTable.loading = false;
          if (res.data && res.data.userDtos && res.data.userDtos.content && res.code === 0) {
            this.userTable.totalPage = res.data.userDtos.totalPages;
            this.userTable.lists = res.data.userDtos.content;
            this.userRegisterCount = res.data;
          } else {
            this.userTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userTable.loading = false;
          console.log(err);
          this.userTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  getHospitals() {
    this.hospitalStatisticsService.getHospitals()
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.hospitalList = res.data;
        }
      })
  }

}
