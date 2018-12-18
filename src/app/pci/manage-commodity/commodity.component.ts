import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../libs/common/container/container.component';
import { ActionDialog, HintDialog } from '../../libs/dmodal/dialog.component';
import { DialogOptions } from '../../libs/dmodal/dialog.entity';
import { TableOption } from '../../libs/dtable/dtable.entity';
import { CommodityService } from './_service/commodity.service';
import { CommodityTableService } from './_service/commodity-table.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Commodity } from './_entity/commodity.entity';
import { ERRMSG } from '../_store/static';

@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html'
})
export class CommodityComponent implements OnInit {
  containerConfig: ContainerConfig;
  commodityTable: TableOption;
  @select(['commodity', 'tab']) tab: Observable<number>;
  @select(['commodity', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private commodityService: CommodityService,
    private commodityTableService: CommodityTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
    action.dataChange('commodity', new Commodity());
  }

  ngOnInit() {
    this.containerConfig = this.commodityService.commodityConfig();
    this.commodityTable = new TableOption({
      titles: this.commodityTableService.setTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getCommodity(page[0]);
    });
  }

  getCommodity(page: number) {
    this.action.pageChange('commodity', [page]);
    this.commodityTable.reset(page);
    this.commodityService.getCommodities()
      .subscribe(res => {
        this.commodityTable.loading = false;
        if (res.code === 0 && res.data && res.data.length === 0) {
          this.commodityTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data) {
          this.commodityTable.totalPage = res.data.totalPages;
          this.formatCommodity(res.data);
          this.commodityTable.lists = res.data;
        } else {
          this.commodityTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.commodityTable.loading = false;
        console.log(err);
        this.commodityTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  formatCommodity(list: Array<any>) {
    list.forEach(data => {
      data.typeName = data.type ? '现金兑换' : '商品兑换';
      data.statusName = data.status ? '下架' : '上架';
      data.updown = data.status ? '上架' : '下架';
      data.createUserName = data.createUser && data.createUser.name || '';

      data.pictures = [];
      if (data.pictureList) {
        data.pictureList.forEach(picture => {
          data.pictures.push(picture.url);
        });
      }
    });
  }

  newData() {
    this.action.dataChange('commodity', new Commodity());
    this.router.navigate(['/commodity/edit']);
  }

  gotoHandle(data) {
    const commodity = <Commodity>data.value;
    if (data.key === 'edit') {
      this.action.dataChange('commodity', commodity);
      this.router.navigate(['/commodity/edit']);
    } else if (data.key === 'updown') {
      if (data.value.status === 1) {
        const config = new DialogOptions({
          title: `您确定要上架${commodity.title}？`,
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
            this.status(data.value.id, 0);
          }
        });
      } else if (data.value.status === 0) {
        const config = new DialogOptions({
          title: `您确定要下架${commodity.title}？`,
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
            this.status(data.value.id, 1);
          }
        });
      }
    } else if (data.key === 'del') {
      const config = new DialogOptions({
        title: `您确定要删除${commodity.title}？`,
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
          this.status(data.value.id, 2);
          ERRMSG.statusSuccess = '删除成功！';
          ERRMSG.statusError = '删除失败！';
        }
      });
    }
  }

  status(id: number, status: number) {
    this.commodityService.commodityStatus(id, status)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.statusSuccess, this.dialog).afterClosed().subscribe(() => {
            this.page.subscribe((page: Array<number>) => {
              this.getCommodity(0);
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
