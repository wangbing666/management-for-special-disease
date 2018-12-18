import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogOptions } from '../../../libs/dmodal/dialog.entity';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { DownloadOriginService } from './_service/download-origin.service';
import { DownloadOriginTableService } from './_service/download-origin-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-download-origin',
  templateUrl: './download-origin.component.html'
})
export class DownloadOriginComponent implements OnInit {
  containerConfig: ContainerConfig;
  downloadOriginTable: TableOption;

  constructor(
    @Inject('action') private action,
    private downloadOriginService: DownloadOriginService,
    private downloadOriginTableService: DownloadOriginTableService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.downloadOriginService.downloadOriginConfig();
    this.downloadOriginTable = new TableOption({
      titles: this.downloadOriginTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.getDownloadOrigins();
  }

  getDownloadOrigins() {
    this.downloadOriginTable.reset();
    this.downloadOriginService.getDownloadOrigin()
      .subscribe(
        res => {
          this.downloadOriginTable.loading = false;
          if (res.data && res.data.length === 0 && res.code === 0) {
            this.downloadOriginTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.code === 0) {
            this.downloadOriginTable.lists = res.data;
          } else {
            this.downloadOriginTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.downloadOriginTable.loading = false;
          console.log(err);
          this.downloadOriginTable.errorMessage = ERRMSG.netErrMsg;
        })
  }

  newData() {
    this.downloadOrigin();
  }

  gotoHandle(data) {
    const download = data.value;
    if (data.key === 'edit') {
      this.downloadOrigin(download);
    }
    if (data.key === 'del') {
      const config = new DialogOptions({
        title: `您确定要删除渠道名称为${download.name}？`,
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
          this.toDelDownload(download.id);
        }
      });
    }
  }

  downloadOrigin(data?) {
    const config = new DialogOptions({
      title: `${data ? '编辑' : '新增'}渠道来源`,
      message: '',
      buttons: [{
        key: 'confirm',
        value: '确定',
        color: 'primary'
      }, {
        key: 'cancel',
        value: '取消',
        color: ''
      }],
      forms: [{
        key: 'name',
        label: '渠道名称',
        value: data && data.name || ''
      }, {
        key: 'alias',
        label: '渠道别名',
        value: data && data.alias || ''
      }]
    });
    ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
      if (result && result.key === 'confirm' && result.value && data) {
        this.getValue({name: result.value[0].value, alias: result.value[1].value}, true, data.id);
      } else if (result && result.key === 'confirm' && result.value && !data) {
        this.getValue({name: result.value[0].value, alias: result.value[1].value}, false);
      }
    });
  }

  getValue(data, state, id?) {
    if (state) {
      this.downloadOriginService.downloadOriginUpdate(id, data)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog);
            this.reset();
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.netErrMsg, this.dialog);
        });
    } else {
      this.downloadOriginService.downloadOriginCreate(data)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog);
            this.reset();
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.netErrMsg, this.dialog);
        });
    }
  }

  toDelDownload(id) {
    this.downloadOriginService.downloadOriginDel(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('删除成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '删除失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('删除失败', this.dialog);
      });
  }
}
