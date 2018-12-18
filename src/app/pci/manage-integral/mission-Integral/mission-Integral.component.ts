import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogOptions } from '../../../libs/dmodal/dialog.entity';
import { ControlType, TableOption } from '../../../libs/dtable/dtable.entity';

import { IntegralSigninComponent } from './mission-Integral-edit/integral-signin-edit.component';
import { IntegralRecordComponent } from './mission-Integral-edit/integral-record-edit.component';
import { IntegralElseComponent } from './mission-Integral-edit/integral-else-edit.component'
import { MissionIntegralService } from './_service/mission-Integral.service';
import { MissionIntegralTableService } from './_service/mission-Integral-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-mission-integral',
  templateUrl: './mission-Integral.component.html',
  styleUrls: ['./mission-Integral.component.scss']
})
export class MissionIntegralComponent implements OnInit {
  containerConfig: ContainerConfig;
  missionIntegralTable: TableOption;
  controlType = ControlType;

  constructor(
    @Inject('action') private action,
    private missionIntegralService: MissionIntegralService,
    private missionIntegralTableService: MissionIntegralTableService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.missionIntegralService.missionIntegralConfig();
    this.missionIntegralTable = new TableOption({
      titles: this.missionIntegralTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.getCouponList();
  }

  getCouponList() {
    this.missionIntegralService.getIntegralTask()
      .subscribe(res => {
        this.missionIntegralTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.missionIntegralTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.missionIntegralTable.totalPage = res.data.totalPages;
          this.getStatus(res.data.content);
          this.missionIntegralTable.lists = res.data.content;
        } else {
          this.missionIntegralTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.missionIntegralTable.loading = false;
        console.log(err);
        this.missionIntegralTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  // 状态装换
  getStatus(list) {
    list.forEach(data => {
      if (data.status === 'online') {
        data.statusName = '下架'
      }
      if (data.status === 'offline') {
        data.statusName = '上架';
      }
    })
  }

  gotoHandle(res, value, list) {
    //  上架 下架
    if (value === 'statusName') {
      const config = new DialogOptions({
        title: `您确定要${res}${list.name}？`,
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
          this.toPassOperation(list.id);
        }
      });
    }

    // 签到编辑
    if (res === 'signin') {
      const config = new MatDialogConfig();
      config.data = list;
      const signin = this.dialog.open(IntegralSigninComponent, config);
      signin.afterClosed().subscribe(result => {
        if (result) {
          this.toSignin(result);
        }
        ;
      });
    }

    // 记录数据编辑
    if (res === 'record') {
      const config = new MatDialogConfig();
      config.data = list;
      const record = this.dialog.open(IntegralRecordComponent, config);
      record.afterClosed().subscribe(result => {
        if (result) {
          this.toRecord(result);
        }
      });
    }

    // 其他任务编辑
    if (value === 'tag' && res !== 'signin' && res !== 'record') {
      const config = new MatDialogConfig();
      config.data = list;
      const other = this.dialog.open(IntegralElseComponent, config);
      other.afterClosed().subscribe(result => {
        if (result) {
          this.toOther(result);
        }
      });
    }
  }

// 上架 下架
  toPassOperation(id) {
    this.missionIntegralService.OperationIntegralTask(id)
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

  // 签到编辑请求
  toSignin(value) {
    this.missionIntegralService.IntegralTaskEdit(value)
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

  // 记录数据编辑请求
  toRecord(value) {
    if (value.doubleUpper === false) {
      value.toplimit = 0;
      delete value.doubleUpper;
    } else {
      delete value.doubleUpper;
    }
    this.missionIntegralService.IntegralTaskEdit(value)
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

  // 其他编辑请求
  toOther(value) {
    delete value.name;
    this.missionIntegralService.IntegralTaskEdit(value)
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
