import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { FormEditor } from '../../../libs/dform/_entity/form-editor';
import { FormText } from '../../../libs/dform/_entity/form-text';
import { EditDialog } from '../../../libs/dmodal/dialog-edit.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogEdit } from '../../../libs/dmodal/dialog.entity';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { IntegralDetailService } from './_service/integral-detail.service';
import { IntegralDetailTableService } from './_service/integral-detail-table.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { IntegralDetail } from './_entity/integralDetail.entity';
import { ERRMSG } from '../../_store/static';
import { IntegralDetailEditComponent } from './integral-detail-edit/integral-detail-edit.component';

@Component({
  selector: 'app-integral-detail',
  templateUrl: './integral-detail.component.html'
})
export class IntegralDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  integralDetailUserTable: TableOption;
  integralDetailDoctorTable: TableOption;
  @select(['integralDetail', 'tab']) tab: Observable<number>;
  @select(['integralDetail', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private integralDetailService: IntegralDetailService,
    private integralDetailTableService: IntegralDetailTableService,
    private dialog: MatDialog,
    @Inject('app') private app,
  ) {
    action.dataChange('integralDetail', new IntegralDetail());
  }

  ngOnInit() {
    this.containerConfig = this.integralDetailService.integralDetailConfig();
    this.integralDetailUserTable = new TableOption({
      titles: this.integralDetailTableService.setTitles(),
      ifPage: true
    });
    this.integralDetailDoctorTable = new TableOption({
      titles: this.integralDetailTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
  }

  reset0() {
    this.integralDetailUserTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getIntegralDetailUsers(page[0]);
    });
  }

  reset1() {
    this.integralDetailDoctorTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getIntegralDetailDoctors(page[0]);
    });
  }

  getIntegralDetailUsers(page: number) {
    this.action.pageChange('integralDetail', [page, this.integralDetailDoctorTable.currentPage]);
    this.integralDetailUserTable.reset(page);
    const option: any = {flag: page, type: 0};
    if (this.integralDetailUserTable.queryKey) {
      option.param = this.integralDetailUserTable.queryKey;
    }
    this.integralDetailService.getIntegralDetail(option)
      .subscribe(res => {
        this.integralDetailUserTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.integralDetailUserTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.integralDetailUserTable.totalPage = res.data.totalPages;
          this.integralDetailUserTable.lists = res.data.content;
        } else {
          this.integralDetailUserTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.integralDetailUserTable.loading = false;
        console.log(err);
        this.integralDetailUserTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  getIntegralDetailDoctors(page: number) {
    this.action.pageChange('integralDetail', [this.integralDetailUserTable.currentPage, page]);
    this.integralDetailDoctorTable.reset(page);
    const option: any = {flag: page, type: 1};
    if (this.integralDetailDoctorTable.queryKey) {
      option.param = this.integralDetailDoctorTable.queryKey;
    }
    this.integralDetailService.getIntegralDetail(option)
      .subscribe(res => {
        this.integralDetailDoctorTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.integralDetailDoctorTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.integralDetailDoctorTable.totalPage = res.data.totalPages;
          this.integralDetailDoctorTable.lists = res.data.content;
        } else {
          this.integralDetailDoctorTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.integralDetailDoctorTable.loading = false;
        console.log(err);
        this.integralDetailDoctorTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  integralManage() {
    this.integralDetailService.getIntegralRule()
      .subscribe(res => {
        if (res.code === 0) {
          this.IntegralRule(res.data);
        }
      }, err => {
        alert(err);
      })
  }

  integralDiscription() {
    this.integralDetailService.getIntegralDiscription()
      .subscribe(res => {
        if (res.code === 0) {
          this.IntegralExplain(res.data)
          console.log(res);
        }
      }, err => {
        alert(err);
      })
  }

  IntegralRule(data) {
    const config: DialogEdit = new DialogEdit({
      title: `积分规则维护`,
      form: [
        new FormText({
          key: 'id',
          label: 'id',
          value: data.id || '',
          required: true
        }),
        new FormEditor({
          key: 'rule',
          label: '积分规则说明',
          value: data.rule || '',
          required: true
        })
      ]
    });
    EditDialog(config, this.dialog).afterClosed().subscribe(result => {
      if (result) {
        this.toIntegralRule(result);
      }
    });
  }

  IntegralExplain(data) {
    const config: DialogEdit = new DialogEdit({
      title: `积分说明`,
      form: [
        new FormText({
          key: 'id',
          label: 'id',
          value: data.id || '',
          required: true
        }),
        new FormEditor({
          key: 'description',
          label: '积分说明',
          value: data.description || '',
          required: true
        })
      ]
    });
    EditDialog(config, this.dialog).afterClosed().subscribe(result => {
      if (result) {
        this.toIntegralExplain(result);
        console.log(result);
      }
    });
  }

  sendIntegral() {
    const config = new MatDialogConfig();
    const other = this.dialog.open(IntegralDetailEditComponent, config);
    other.afterClosed().subscribe(result => {
      if (result) {
        this.toPresentExp(result);
      }
    });
  }

  toIntegralExplain(data) {
    this.integralDetailService.integralExplainUpdate(data.id, data.description)
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

  toPresentExp(data) {
    this.integralDetailService.PresentExp(data)
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

  toIntegralRule(data) {
    this.integralDetailService.integralRuleUpdate(data.id, data.rule)
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
    this.action.tabChange('integralDetail', index);
  }
}
