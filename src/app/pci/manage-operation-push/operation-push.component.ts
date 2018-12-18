import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../libs/common/container/container.component';
import { ActionDialog, HintDialog } from '../../libs/dmodal/dialog.component';
import { DialogOptions } from '../../libs/dmodal/dialog.entity';
import { ControlType, TableOption } from '../../libs/dtable/dtable.entity';
import { OperationPushService } from './_service/operation-push-service.service';
import { OperationPushTableService } from './_service/operation-push-service-table.service';
import { OperationPush } from './_entity/operationPush.entity';
import { ERRMSG } from '../_store/static';

@Component({
  selector: 'app-operation-push',
  templateUrl: './operation-push.component.html',
  styleUrls: ['./operation-push.component.scss']
})
export class OperationPushComponent implements OnInit {
  containerConfig: ContainerConfig;
  operationPushTable: TableOption;
  operationPushDoctorTable: TableOption;
  @select(['operationPush', 'tab']) tab: Observable<number>;
  @select(['operationPush', 'page']) page: Observable<Array<number>>;

  controlType = ControlType;

  constructor(
    @Inject('action') private action,
    private operationpushservice: OperationPushService,
    private operationpushtableservice: OperationPushTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
    action.dataChange('operationPush', new OperationPush());
  }

  ngOnInit() {
    this.containerConfig = this.operationpushservice.operationPushConfig();
    this.operationPushTable = new TableOption({
      titles: this.operationpushtableservice.setTitles(),
      ifPage: true
    });
    this.operationPushDoctorTable = new TableOption({
      titles: this.operationpushtableservice.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
  }

  reset0() {
    this.page.subscribe((page: Array<number>) => {
      this.getOperationPushUser(page[0]);
    });
  }

  reset1() {
    this.page.subscribe((page: Array<number>) => {
      this.getOperationPushDoctor(page[1]);
    });
  }

  getOperationPushUser(page: number) {
    this.operationPushTable.errorMessage = '';
    this.operationPushTable.loading = true;
    this.operationPushTable.lists = null;
    this.operationPushTable.currentPage = page;
    this.operationpushservice.getOperationPush(0, page).subscribe(
      res => {
        this.operationPushTable.loading = false;
        if (res.data && res.data.length === 0 && res.code === 0) {
          this.operationPushTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.code === 0) {
          this.operationPushTable.totalPage = res.data.totalPages;
          this.operationPushTable.lists = res.data.content;
          for (let i = 0; i < this.operationPushTable.lists.length; ++i) {
            this.operationPushTable.lists[i].state = this.getStatus(this.operationPushTable.lists[i].status);
            this.operationPushTable.lists[i].send = this.getSend(this.operationPushTable.lists[i].status);
            this.operationPushTable.lists[i].edit = this.getEdit(this.operationPushTable.lists[i].status);
          }
        } else {
          this.operationPushTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.operationPushTable.loading = false;
        this.operationPushTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  getOperationPushDoctor(page: number) {
    this.operationpushservice.getOperationPush(1, page).subscribe(
      res => {
        this.operationPushDoctorTable.loading = false;
        if (res.data && res.data.length === 0 && res.code === 0) {
          this.operationPushDoctorTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.code === 0) {
          this.operationPushDoctorTable.lists = res.data.content;
          for (let i = 0; i < this.operationPushDoctorTable.lists.length; ++i) {
            this.operationPushDoctorTable.lists[i].state = this.getStatus(this.operationPushDoctorTable.lists[i].status);
            this.operationPushDoctorTable.lists[i].send = this.getSend(this.operationPushDoctorTable.lists[i].status);
            this.operationPushDoctorTable.lists[i].edit = this.getEdit(this.operationPushDoctorTable.lists[i].status);
          }
        } else {
          this.operationPushDoctorTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.operationPushDoctorTable.loading = false;
        this.operationPushDoctorTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('operationPush', new OperationPush());
    this.router.navigate(['/operation-push/edit']);
  }

  gotoHandle(res, list) {
    const operationPush = <OperationPush>list;
    if (res === 'edit') {
      this.action.dataChange('operationPush', operationPush);
      this.router.navigate(['/operation-push/edit']);
    }
    if (res === 'send') {
      const config = new DialogOptions({
        title: `您确定要发送${operationPush.content}？`,
        message: '',
        buttons: [{
          key: 'topass',
          value: '确定',
          color: 'primary'
        }, {
          key: 'tocancel',
          value: '取消',
          color: ''
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result && result.key === 'topass') {
          this.process(operationPush.id, res);
        }
      });
    }
    if (res === 'del') {
      const config = new DialogOptions({
        title: `您确定要删除${operationPush.content}？`,
        message: '',
        buttons: [{
          key: 'topass',
          value: '确定',
          color: 'primary'
        }, {
          key: 'tocancel',
          value: '取消',
          color: ''
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result && result.key === 'topass') {
          this.process(operationPush.id, res);
        }
      });
    }
  }

  getStatus(status) {
    if (status === 1) {
      return '已发送';
    } else {
      return '待发送';
    }
  }

  getSend(status) {
    if (status === 1) {
      return ' ';
    } else {
      return '发送';
    }
  }

  getEdit(status) {
    if (status === 1) {
      return ' ';
    } else {
      return '编辑';
    }
  }

  change(index) {
    this.action.tabChange('operationPush', index);
  }

  // 确定发送,删除
  process(id, key) {
    if (key === 'send') {
      this.operationpushservice.OperationPushSend(id)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog('操作成功', this.dialog);
            this.reset();
          } else {
            HintDialog(res.msg || '操作失败', this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog('操作失败', this.dialog);
        });
    } else {
      this.operationpushservice.OperationPushDelete(id)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog('操作成功', this.dialog);
            this.reset();
          } else {
            HintDialog(res.msg || '操作失败', this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog('操作失败', this.dialog);
        });
    }

  }

  // //取消发送、删除
  // processCancel() {
  //   this.processData = null;
  //   this.processMessage = '';
  //   this.enableProcess = false;
  // }
  //
  // handleSuccess(data){
  //   this.titleShow = '提示信息';
  //   this.message = data;
  //   this.enableShow = true;
  //   this.refresh();
  // }
}
