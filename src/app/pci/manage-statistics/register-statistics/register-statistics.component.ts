import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { RegisterStatisticsService } from './_service/register-statistics.service';
import { RegisterStatisticsTableService } from './_service/register-statistics-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-register-statistics',
  templateUrl: 'register-statistics.component.html'
})
export class RegisterStatisticsComponent implements OnInit, OnDestroy {
  containerConfig: ContainerConfig;
  userTable: TableOption;
  doctorTable: TableOption;

  subscribeUserTable: any;
  subscribeDoctorTable: any;

  userRegisterCount: any;
  doctorRegisterCount: any;

  constructor(
    private registerStatisticsService: RegisterStatisticsService,
    private registerStatisticsTableService: RegisterStatisticsTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.registerStatisticsService.registerStatisticsConfig();
    this.userTable = new TableOption({
      titles: this.registerStatisticsTableService.setUserTitles(),
      ifPage: true
    });
    this.doctorTable = new TableOption({
      titles: this.registerStatisticsTableService.setDoctorTitles(),
      ifPage: true
    });
    this.reset();
  }

  ngOnDestroy() {
    if (this.subscribeUserTable) {
      this.subscribeUserTable.unsubscribe();
    }
    if (this.subscribeDoctorTable) {
      this.subscribeDoctorTable.unsubscribe();
    }
  }

  reset() {
    this.reset0();
    this.reset1()
  }

  reset0() {
    this.userTable.queryKey = '';
    this.getUsers(0);
  }

  reset1() {
    this.doctorTable.queryKey = '';
    this.getDoctors(0);
  }

  getUsers(page: number) {
    if (this.userTable.queryKey && this.userTable.queryKey.indexOf('至') < 0) {
      this.userTable.queryKey += ` 至 ${this.userTable.queryKey}`;
    }
    this.userTable.reset(page);
    this.subscribeUserTable = this.registerStatisticsService.getUsers(
      page, this.userTable.size,
      this.userTable.queryKey
    ).subscribe(
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

  getDoctors(page: number) {
    if (this.doctorTable.queryKey && this.doctorTable.queryKey.indexOf('至') < 0) {
      this.doctorTable.queryKey += ` 至 ${this.doctorTable.queryKey}`;
    }
    this.doctorTable.reset(page);
    this.subscribeDoctorTable = this.registerStatisticsService.getDoctors(
      page, this.doctorTable.size,
      this.doctorTable.queryKey
    ).subscribe(
      res => {
        this.doctorTable.loading = false;
        if (res.data && res.data.doctorDtos && res.data.doctorDtos.content && res.code === 0) {
          this.doctorTable.totalPage = res.data.doctorDtos.totalPages;
          this.doctorTable.lists = res.data.doctorDtos.content;
          this.doctorRegisterCount = res.data;
        } else {
          this.doctorTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.doctorTable.loading = false;
        console.log(err);
        this.doctorTable.errorMessage = ERRMSG.netErrMsg;
      })
  }
}
