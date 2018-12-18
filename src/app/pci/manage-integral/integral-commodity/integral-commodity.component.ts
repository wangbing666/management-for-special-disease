import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogOptions } from '../../../libs/dmodal/dialog.entity';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { IntegralCommodityService } from './_service/integral-commodity.service';
import { IntegralCommodityTableService } from './_service/integral-commodity-table.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { IntegralCommodity } from './_entity/integralCommodity.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-integral-commodity',
  templateUrl: './integral-commodity.component.html'
})
export class IntegralCommodityComponent implements OnInit {
  containerConfig: ContainerConfig;
  integralCommodityTable: TableOption;
  @select(['integralCommodity', 'tab']) tab: Observable<number>;
  @select(['integralCommodity', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private integralCommodityService: IntegralCommodityService,
    private integralCommodityTableService: IntegralCommodityTableService,
    private dialog: MatDialog,
    private router: Router,
  ) {
    action.dataChange('integralCommodity', new IntegralCommodity());
  }

  ngOnInit() {
    this.containerConfig = this.integralCommodityService.integralCommodityConfig();
    this.integralCommodityTable = new TableOption({
      titles: this.integralCommodityTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.integralCommodityTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getIntegralCommodity(page[0]);
    });
  }

  getIntegralCommodity(page: number) {
    this.action.pageChange('integralCommodity', [page]);
    this.integralCommodityTable.reset(page);
    this.integralCommodityService.getIntegralCommodity(page)
      .subscribe(res => {
        this.integralCommodityTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.integralCommodityTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.integralCommodityTable.totalPage = res.data.totalPages;
          this.formatCommodity(res.data.content);
          this.integralCommodityTable.lists = res.data.content;
        } else {
          this.integralCommodityTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.integralCommodityTable.loading = false;
        console.log(err);
        this.integralCommodityTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  formatCommodity(list: Array<any>) {
    list.forEach(data => {
      if (data.goodsType === 0) {
        data.goodsTypeName = '患者端';
      } else if (data.goodsType === 1) {
        data.goodsTypeName = '医生端';
      } else if (data.goodsType === 2) {
        data.goodsTypeName = '全部';
      }
      data.goodsStatusName = data.goodsStatus ? '下架' : '上架';
      data.updown = data.goodsStatus ? '上架' : '下架';
    });
  }

  change(index) {
    this.action.tabChange('integralCommodity', index);
  }

  newData() {
    this.action.dataChange('integralCommodity', new IntegralCommodity());
    this.router.navigate(['/integral-commodity/edit']);
  }

  gotoHandle(res) {
    const integralCommodity = <IntegralCommodity>res.value;

    if (res.key === 'edit') {
      this.action.dataChange('integralCommodity', integralCommodity);
      this.router.navigate(['/integral-commodity/edit']);
    } else if (res.key === 'updown') {
      if (res.value.goodsStatus === 1) {
        const config = new DialogOptions({
          title: `您确定要上架${integralCommodity.title}？`,
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
          if (result.key === 'topass') {
            ERRMSG.statusSuccess = '上架成功!';
            ERRMSG.statusError = '上架失败!';
            this.status(res.value.id, 0);
          }
        });
      } else if (res.value.goodsStatus === 0) {
        const config = new DialogOptions({
          title: `您确定要下架${integralCommodity.title}？`,
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
          if (result.key === 'topass') {
            ERRMSG.statusSuccess = '下架成功!';
            ERRMSG.statusError = '下架失败!';
            this.status(res.value.id, 1);
          }
        });
      }
    } else if (res.key === 'del') {
      const config = new DialogOptions({
        title: `您确定要删除${integralCommodity.title}？`,
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
        if (result.key === 'topass') {
          this.status(res.value.id, 2);
          ERRMSG.statusSuccess = '删除成功！';
          ERRMSG.statusError = '删除失败！';
        }
      });
    }
  }

  status(id: number, status: number) {
    this.integralCommodityService.updateIntegralStatus(id, status)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.statusSuccess, this.dialog).afterClosed().subscribe(() => {
            this.page.subscribe((page: Array<number>) => {
              this.getIntegralCommodity(0);
            });
          });
        } else {
          HintDialog(res.msg || ERRMSG.statusError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.statusError, this.dialog);
      });
  }
}
