import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { FormDate } from '../../../libs/dform/_entity/form-date';
import { FormDropdown } from '../../../libs/dform/_entity/form-dropdown';
import { EditDialog } from '../../../libs/dmodal/dialog-edit.component';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogEdit, DialogOptions } from '../../../libs/dmodal/dialog.entity';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ERRMSG } from '../../_store/static';
import { GreenChannelService } from './_service/green-channel.service';
import { GreenChannelTableService } from './_service/green-channel-table.service';
import { GreenChannel } from './_entity/green-channel.entity';

import * as moment from 'moment';

@Component({
  selector: 'app-green-channel',
  templateUrl: './green-channel.component.html'
})
export class GreenChannelComponent implements OnInit {
  containerConfig: ContainerConfig;
  agreeTable: TableOption;
  pendingTable: TableOption;
  rejectedTable: TableOption;
  @select(['greenChannel', 'tab']) tab: Observable<number>;
  @select(['greenChannel', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private greenChannelService: GreenChannelService,
    private greenChannelTableService: GreenChannelTableService,
    private dialog: MatDialog
  ) {
    action.dataChange('greenChannel', new GreenChannel());
  }

  ngOnInit() {
    this.containerConfig = this.greenChannelService.greenChannelConfig();
    this.agreeTable = new TableOption({
      titles: this.greenChannelTableService.setAgreeTitles(),
      ifPage: true
    });
    this.pendingTable = new TableOption({
      titles: this.greenChannelTableService.setPendingTitles(),
      ifPage: true
    });
    this.rejectedTable = new TableOption({
      titles: this.greenChannelTableService.setRejectedTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
    this.reset2();
  }

  reset0() {
    this.agreeTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getAgreeGreenChannel(page[0]);
    });
  }

  reset1() {
    this.pendingTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getPendingGreenChannel(page[1]);
    });
  }

  reset2() {
    this.rejectedTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getRejectedGreenChannel(page[2]);
    });
  }

  getAgreeGreenChannel(page: number) {
    this.action.pageChange('greenChannel', [page, this.pendingTable.currentPage, this.rejectedTable.currentPage]);
    this.agreeTable.reset(page);
    this.greenChannelService.agree(page, 20, 2, this.agreeTable.queryKey)
      .subscribe(res => {
        this.agreeTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.agreeTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.agreeTable.totalPage = res.data.totalPages;
          this.formatAgree(res.data.content);
          this.agreeTable.lists = res.data.content;
        } else {
          this.agreeTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.agreeTable.loading = false;
        console.log(err);
        this.agreeTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  formatAgree(list: Array<any>) {
    list.forEach(data => {
      if (data.status == 0) {
        data.status = '已就诊';
      } else if (data.status == 1) {
        data.status = '未就诊';
      } else if (data.status == 2) {
        data.status = '已入院';
      } else if (data.status == 3) {
        data.status = '未入院';
      }
    });
  }

  getPendingGreenChannel(page: number) {
    this.action.pageChange('greenChannel', [this.agreeTable.currentPage, page, this.rejectedTable.currentPage]);
    this.pendingTable.reset(page);
    this.greenChannelService.pending(page, 20, 2, this.pendingTable.queryKey)
      .subscribe(res => {
        this.pendingTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.pendingTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.pendingTable.totalPage = res.data.totalPages;
          this.pendingTable.lists = res.data.content;
        } else {
          this.pendingTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.pendingTable.loading = false;
        console.log(err);
        this.pendingTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  getRejectedGreenChannel(page: number) {
    this.action.pageChange('greenChannel', [this.agreeTable.currentPage, this.pendingTable.currentPage, page]);
    this.rejectedTable.reset(page);
    this.greenChannelService.rejected(page, 20, 2, this.rejectedTable.queryKey)
      .subscribe(res => {
        this.rejectedTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.rejectedTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.rejectedTable.totalPage = res.data.totalPages;
          this.rejectedTable.lists = res.data.content;
        } else {
          this.rejectedTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.rejectedTable.loading = false;
        console.log(err);
        this.rejectedTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  gotoHandle(res) {
    if (res.key === 'edit') {
      let mindate = new Date(res.value.applicationTime).valueOf();
      let maxdate = mindate + 24 * 60 * 60 * 30 * 1000;
      const config: DialogEdit = new DialogEdit({
        title: `编辑`,
        form: [
          new FormDate({
            key: 'date',
            label: '可就诊时间',
            value: res && res.value && res.value.TreatmentTime || '',
            options: {
              minDate: moment(mindate).format('YYYY-MM-DD'),
              maxDate: moment(maxdate).format('YYYY-MM-DD')
            },
            required: true,
            order: 0
          }),
          new FormDropdown({
            key: 'status',
            label: '状态',
            value: '',
            required: true,
            options: [{
              id: 0,
              name: '已就诊'
            }, {
              id: 1,
              name: '未就诊'
            }],
            order: 1
          })]
      });
      EditDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result) {
          this.editInfo(result.status, res.value.orderId, result.date);
        }
      });
    }
    if (res.key === 'agree') {
      let mindate = new Date(res.value.applicationTime).valueOf();
      let maxdate = mindate + 24 * 60 * 60 * 30 * 1000;
      const config: DialogEdit = new DialogEdit({
        title: `选择就诊时间`,
        form: [
          new FormDate({
            key: 'date',
            label: '',
            value: '',
            options:
              {
                minDate: moment(mindate).format('YYYY-MM-DD'),
                maxDate: moment(maxdate).format('YYYY-MM-DD')
              },
            required: true,
            validated: true,
          })]
      });
      EditDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result) {
          this.toAgree(res.value.orderId, result.date);
        }
      });
    }
    if (res.key === 'disagree') {
      const config = new DialogOptions({
        title: `确认拒绝么？`,
        message: '',
        buttons: [{
          key: 'torefuse',
          value: '确认',
          color: 'primary'
        }, {
          key: 'tocancel',
          value: '取消',
          color: ''
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result && result.key === 'torefuse') {
          this.toDisagree(res.value.orderId);
        }
      });
    }
  }

  editInfo(status, id, date) {
    this.greenChannelService.editInfo(status, id, date)
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

  toAgree(id, date) {
    this.greenChannelService.agreeOrDisagreeApply(1, id, 2, date)
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

  toDisagree(id) {
    this.greenChannelService.agreeOrDisagreeApply(2, id, 2)
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

  change(index) {
    this.action.tabChange('greenChannel', index);
  }
}
