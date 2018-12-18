import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { HintDialog } from '../../../../libs/dmodal/dialog.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { UserService } from '../_service/user.service';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {
  containerConfig: ContainerConfig;
  UserTable: TableOption;
  selectedItems: Array<any> = [];
  queryKey = '';
  userAllList: any;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.userService.userMessageConfig();
    this.UserTable = new TableOption();
    this.getUsers(0);
    this.getusersAll(0);
  }

  reset() {
    this.queryKey = '';
    this.getUsers(0);
    this.getusersAll(0);
  }

  getUsers(page: number) {
    this.UserTable.reset(page);
    this.userService.getUsers(
      this.queryKey, '', '', page, 12)
      .subscribe(res => {
        this.UserTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.UserTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.UserTable.totalPage = res.data.totalPages;
          this.UserTable.lists = res.data.content;
        } else {
          this.UserTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.UserTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  getusersAll(page: number) {
    this.userService.getUsers(
      this.queryKey, '', '', page, 999999)
      .subscribe(res => {
        this.UserTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          console.log('数据为空')
        } else if (res.code === 0 && res.data && res.data.content) {
          this.userAllList = res.data.content;
        } else {
          console.log('未知错误')
        }
      }, err => {
        console.log(err);
      });
  }

  selectItem(item) {
    let target = true;
    this.selectedItems.forEach(obj => {
      if (item.id === obj.id) {
        target = false;
      }
    });
    if (target) {
      this.selectedItems.unshift(item);
    }
  }

  selectAll() {
    const ids = [];
    this.selectedItems.forEach(obj => {
      ids.push(obj.id);
    });
    this.userAllList.forEach(obj => {
      if (ids.indexOf(obj.id) < 0) {
        this.selectedItems.unshift(obj);
      }
    })
  }

  removeItem(item) {
    let index;
    this.selectedItems.forEach((obj, i) => {
      if (item.id === obj.id) {
        index = i;
      }
    });
    this.selectedItems.splice(index, 1);
  }

  onSubmit(value) {
    if (this.selectedItems.length !== 0) {
      const ids = [];
      this.selectedItems.forEach(obj => {
        ids.push(obj.id);
      });
      this.userService.sendMessage({
        content: value.message,
        userIds: ids
      }).subscribe(
        res => {
          if (res.code === 0) {
            HintDialog('短信发送成功', this.dialog);
          } else {
            HintDialog(res.msg || '操作失败', this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.netErrMsg, this.dialog);
        });
    }
  }
}
