import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ImageDialog } from '../../../libs/dmodal/dialog-img.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { UserCertificationService } from './_service/user-certification.service';
import { UserCertificationTableService } from './_service/user-certification-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-user-certification',
  templateUrl: './user-certification.component.html',
  styles: [`
    .content {
      position: relative;
    }

    .count {
      position: absolute;
      top: 10px;
      left: 620px;
    }

    @media (max-width: 600px) {
      .count {
        left: 900px;
      }
    }
  `]
})
export class UserCertificationComponent implements OnInit {

  containerConfig: ContainerConfig;
  userCertificationTable: TableOption;
  userUnCertificationTable: TableOption;
  userCertificatingTable: TableOption;
  userCertificationFailureTable: TableOption;

  @select(['userCertification', 'tab']) tab: Observable<number>;
  @select(['userCertification', 'page']) page: Observable<Array<number>>;

  count: number;

  constructor(
    @Inject('action') private action,
    @Inject('nav') private navService,
    private dialog: MatDialog,
    private userCertificationService: UserCertificationService,
    private userCertificationTableService: UserCertificationTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.userCertificationService.UserCertificationConfig();
    this.userCertificationTable = new TableOption({
      titles: this.userCertificationTableService.setCertificationTitles(),
      ifPage: true
    });
    this.userUnCertificationTable = new TableOption({
      titles: this.userCertificationTableService.setUncertificationTitles(),
      ifPage: true
    });
    this.userCertificatingTable = new TableOption({
      titles: this.userCertificationTableService.setCertificatingTitles(),
      ifPage: true
    });
    this.userCertificationFailureTable = new TableOption({
      titles: this.userCertificationTableService.setCertificationFailureTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
    this.reset2();
    this.reset3();
  }

  reset0() {
    this.userCertificationTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getUserCertifications(page[0]);
    });
  }

  reset1() {
    this.userUnCertificationTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getUserUncertifications(page[1]);
    });
  }

  reset2() {
    this.userCertificatingTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getUserCertificatings(page[2]);
    });
  }

  reset3() {
    this.userCertificationFailureTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getUserCertificationFailures(page[3]);
    });
  }

  getUserCertifications(page: number) {
    this.action.pageChange('userCertification',
      [page, this.userUnCertificationTable.currentPage, this.userCertificatingTable.currentPage, this.userCertificationFailureTable.currentPage]);
    this.userCertificationTable.reset(page);
    this.userCertificationService.getUserCertifications(page, this.userCertificationTable.size, this.userCertificationTable.queryKey)
      .subscribe(
        res => {
          this.userCertificationTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.userCertificationTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.userCertificationTable.totalPage = res.data.totalPages;
            this.userCertificationTable.lists = res.data.content;
          } else {
            this.userCertificationTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userCertificationTable.loading = false;
          console.log(err);
          this.userCertificationTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  getUserUncertifications(page: number) {
    this.action.pageChange('userCertification',
      [this.userCertificationTable.currentPage, page, this.userCertificatingTable.currentPage, this.userCertificationFailureTable.currentPage]);
    this.userUnCertificationTable.reset(page);
    this.userCertificationService.getUserUncertifications(page, this.userUnCertificationTable.size, this.userUnCertificationTable.queryKey)
      .subscribe(
        res => {
          this.userUnCertificationTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.userUnCertificationTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.userUnCertificationTable.totalPage = res.data.totalPages;
            this.userUnCertificationTable.lists = res.data.content;
          } else {
            this.userUnCertificationTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userCertificationTable.loading = false;
          console.log(err);
          this.userUnCertificationTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  getUserCertificatings(page: number) {
    this.action.pageChange('userCertification',
      [this.userCertificationTable.currentPage, this.userUnCertificationTable.currentPage, page, this.userCertificationFailureTable.currentPage]);
    this.userCertificatingTable.reset(page);
    this.userCertificationService.getUserCertificatings(page, this.userCertificatingTable.size, this.userCertificatingTable.queryKey)
      .subscribe(
        res => {
          this.userCertificatingTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.userCertificatingTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.userCertificatingTable.totalPage = res.data.totalPages;
            this.userCertificatingTable.lists = res.data.content;
          } else {
            this.userCertificatingTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userCertificationTable.loading = false;
          console.log(err);
          this.userCertificatingTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  getUserCertificationFailures(page: number) {
    this.action.pageChange('userCertification',
      [this.userCertificationTable.currentPage, this.userUnCertificationTable.currentPage, page, this.userCertificatingTable.currentPage]);
    this.userCertificationFailureTable.reset(page);
    this.userCertificationService.getUserCertificationFailures(page, this.userCertificationFailureTable.size, this.userCertificationFailureTable.queryKey)
      .subscribe(
        res => {
          this.userCertificationFailureTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.userCertificationFailureTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.count = res.data.totalElements;
            this.navService.setCount(this.count, 'user', 'usercertification');
            this.userCertificationFailureTable.totalPage = res.data.totalPages;
            this.userCertificationFailureTable.lists = res.data.content;
          } else {
            this.userCertificationFailureTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.userCertificationTable.loading = false;
          console.log(err);
          this.userCertificationFailureTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  gotoHandle(res) {
    if (res.key === 'idCardImageUrl') {
      console.log(res)
      ImageDialog(
        '实名认证照片', res.value.idCardImageUrl + `?imageView2/2/w/500/h/500/q/75|imageslim`, this.dialog,
        `${res.value.name || ''} ${res.value.tel || ''} ${res.value.idCardNumber || ''}`
      );
    }
  }

  change(index) {
    this.action.tabChange('userCertification', index);
  }
}
