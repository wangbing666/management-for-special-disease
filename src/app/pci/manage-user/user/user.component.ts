import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { UserService } from './_service/user.service';
import { UserTableService } from './_service/user-table.service';
import { User } from './_entity/user.entity';
import { ERRMSG, AOA } from '../../_store/static';

import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  containerConfig: ContainerConfig;
  userTable: TableOption;
  queryBind: any;
  RegisterDate: any;
  hospitalList: any;
  sourceList: any;
  hospital: any;
  source: any;
  @select(['user', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    @Inject('common') private common,
    @Inject('search') private search,
    private userService: UserService,
    private userTableService: UserTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
    action.dataChange('user', new User());
  }

  ngOnInit() {
    this.containerConfig = this.userService.userConfig();
    this.userTable = new TableOption({
      titles: this.userTableService.setUserTitles(),
      ifPage: true
    });
    // this.RegisterDate = this.search.setDefaultRange();
    this.reset();
    this.getHospital();
    this.getQrType();
  }

  reset() {
    this.userTable.queryKey = '';
    this.queryBind = '';
    this.RegisterDate = '';
    this.hospital = '';
    this.source = '';
    this.page.subscribe((page: Array<number>) => {
      this.getUsers(page[0]);
    });
  }

  getUsers(page: number) {
    // const option = this.search.getStartAndEnd(this.RegisterDate);
    this.action.pageChange('user', [page]);
    this.userTable.reset(page);
    this.userService.getUsers(
      this.userTable.queryKey, this.queryBind, this.RegisterDate, page, this.userTable.size, this.hospital, this.source)
      .subscribe(res => {
        this.userTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.userTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.userTable.totalPage = res.data.totalPages;
          // this.userTable.totalElements = data.data.totalElements;
          this.formatUser(res.data.content);
          this.userTable.lists = res.data.content;
        } else {
          this.userTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.userTable.loading = false;
        this.userTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  getHospital() {
    this.userService.getOptions().subscribe(res => {
      if (res.code == 0 && res.data) {
        this.hospitalList = res.data.hospitalList
      } else {
        console.log(res)
      }
    }, err => {
      console.log(err)
    })
  }

  getQrType() {
    this.userService.getQrType().subscribe(res => {
      console.log(res)
      if (res.code == 0 && res.data) {
        this.sourceList = res.data
      }
    }, err => {
      console.log(err)
    })
  }

  // 转换
  formatUser(list: Array<any>) {
    list.forEach(data => {
      // data.hospitalId = data.hospital && data.hospital.id || '';
      // data.hospitalName = data.hospital && data.hospital.name || '';
      if (data.sex === '0') {
        data.sexName = '男';
      }
      if (data.sex === '1') {
        data.sexName = '女';
      }
    })
  }

  newData() {
    this.action.dataChange('user', new User());
    this.router.navigate(['/user/edit']);
  }

  toSendMessage() {
    this.router.navigate(['/user/message']);
  }

  gotoHandle(res) {
    const user = <User>res.value;
    if (res.key === 'integral') {
      this.action.dataChange('user', user);
      this.router.navigate(['/user/integral']);
    }
    if (res.key === 'edit') {
      this.action.dataChange('user', user);
      this.router.navigate(['/user/edit']);
    }
    if (res.key === 'upload') {
      this.action.dataChange('user', user);
      this.router.navigate(['/user/upload']);
    }
  }

  batchRegisterUser(files) {
    const myForm = new FormData();
    const fileList = files.target.files[0];
    myForm.append('file', fileList);
    console.log(fileList)
    this.userService.batchRegisterUser(myForm)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(res.msg || '注册成功！', this.dialog);
        } else {
          HintDialog(res.msg || '注册失败！', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('注册失败！', this.dialog);
      });
  }

  export() {
    let exportList;
    this.userService.getUsers(this.userTable.queryKey, this.queryBind, this.RegisterDate, 0, 2000)
      .subscribe(res => {
        if (res.code === 0 && res.data && res.data.content && res.data.content.length !== 0) {
          if (res.data.totalPages == 1) {
            exportList = this.common.toArray(res.data.content);
            /* generate worksheet */
            const ws = XLSX.utils.aoa_to_sheet(exportList);
            /* generate workbook and add the worksheet */
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
            /* save to file */
            const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
            const fileName = `全程心管家患者信息列表--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
            saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
          } else {
            const getUserList = [];
            let dataList = res.data.content;
            for (let i = 1; i < res.data.totalPages; i++) {
              getUserList.push(this.userService.getUsers(this.userTable.queryKey, this.queryBind, this.RegisterDate, i, 2000))
            }
            Observable.forkJoin(getUserList).subscribe((resList: Array<any>) => {
              for (let i = 0; i < getUserList.length; i++) {
                if (resList[i].code == 0 && resList[i].data && resList[i].data.content) {
                  dataList = [...dataList, ...resList[i].data.content]
                }
              }
              exportList = this.common.toArray(dataList);
              /* generate worksheet */
              const ws = XLSX.utils.aoa_to_sheet(exportList);
              /* generate workbook and add the worksheet */
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
              /* save to file */
              const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
              const fileName = `全程心管家患者信息列表--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
              saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
            });
          }
        } else {
          HintDialog('导出数据错误，请重新尝试', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('导出数据错误，请重新尝试', this.dialog);
      });
  }
}
