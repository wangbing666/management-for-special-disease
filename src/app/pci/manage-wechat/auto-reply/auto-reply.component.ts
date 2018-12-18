import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { AutoReplyService } from './_service/auto-reply.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-auto-reply',
  templateUrl: './auto-reply.component.html'
})
export class AutoReplyComponent implements OnInit {
  containerConfig: ContainerConfig;
  autoReply: string;
  ifEdit = false;
  errorMessage = '';

  constructor(
    private autoReplyService: AutoReplyService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.autoReplyService.autoReplyConfig();
    this.getAutoReply();
  }

  getAutoReply() {
    this.autoReplyService.getAutoReply()
      .subscribe(res => {
        if (res.code === 0 && res.data) {
          this.autoReply = res.data;
        } else {
          this.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        console.log(err);
        this.errorMessage = ERRMSG.netErrMsg;
      })
  }

  toUpdate() {
    this.ifEdit = true;
  }

  updateReply(value) {
    this.autoReplyService.autoReplyUpdate(value.name)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.getAutoReply();
          this.ifEdit = false;
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }
}
