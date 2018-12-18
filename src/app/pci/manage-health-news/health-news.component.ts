import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../libs/common/container/container.component';
import { ActionDialog, HintDialog } from '../../libs/dmodal/dialog.component';
import { DialogOptions } from '../../libs/dmodal/dialog.entity';
import { TableOption } from '../../libs/dtable/dtable.entity';
import { HealthNewsService } from './_service/health-news.service';
import { HealthNewsTableService } from './_service/health-news-table.service';
import { HealthNews } from './_entity/health-news.entity';
import { ERRMSG } from '../_store/static';

@Component({
  selector: 'app-health-news',
  templateUrl: './health-news.component.html'
})
export class HealthNewsComponent implements OnInit {
  containerConfig: ContainerConfig;
  healthNewsTable: TableOption;
  healthNewsType: any;
  readingQuantity: string;

  constructor(
    @Inject('action') private action,
    private healthNewsService: HealthNewsService,
    private healthNewsTableService: HealthNewsTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.healthNewsService.healthNewsConfig();
    this.healthNewsTable = new TableOption({
      titles: this.healthNewsTableService.setTitles(),
      ifPage: true
    });
    this.getReadCoefficient();
    this.reset();
  }

  reset() {
    this.getHealthNewsType()
      .subscribe(() => {
        this.getHealthNews(0);
      }, err => {
        this.healthNewsTable.loading = false;
        console.log(err);
        this.healthNewsTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  getHealthNewsType() {
    return this.healthNewsService.getHealthNewsType()
      .map(res => {
        if (res.data && res.code === 0) {
          this.healthNewsType = res.data;
          this.action.dataChange('healthNews', new HealthNews(this.healthNewsType));
          this.healthNewsTable.queryKey = res.data[0].id;
        }
      });
  }

  getHealthNews(page: number) {
    this.healthNewsTable.reset(page);
    this.healthNewsService.getHealthNews(this.healthNewsTable.queryKey, page, this.healthNewsTable.size)
      .subscribe(
        res => {
          this.healthNewsTable.loading = false;
          if (res.data && res.data.content && res.data.content.length === 0 && res.code === 0) {
            this.healthNewsTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.content && res.code === 0) {
            this.healthNewsTable.totalPage = res.data.totalPages;
            this.healthNewsTable.lists = res.data.content;
          } else {
            this.healthNewsTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.healthNewsTable.loading = false;
          console.log(err);
          this.healthNewsTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  newData() {
    this.action.dataChange('healthNews', new HealthNews(this.healthNewsType));
    this.router.navigate(['/health-news/edit']);
  }

  gotoHandle(res) {
    const healthNews = <HealthNews>res.value;
    healthNews.typeList = this.healthNewsType;
    if (res.key === 'edit') {
      this.action.dataChange('healthNews', healthNews);
      this.router.navigate(['/health-news/edit']);
    }
    if (res.key === 'del') {
      const config = new DialogOptions({
        title: `确定要删除健康资讯：${healthNews.title}？`,
        message: '',
        buttons: [{
          key: 'confirm',
          value: '确定',
          color: 'primary'
        }, {
          key: 'cancel',
          value: '取消',
          color: ''
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result && result.key === 'confirm') {
          this.delHealthNews(healthNews.id);
        }
      });
    }
  }

  delHealthNews(id) {
    this.healthNewsService.healthNewsDelete(id)
      .subscribe(
        res => {
          if (res.code === 0) {
            HintDialog('操作成功', this.dialog);
            this.getHealthNews(0);
          } else {
            HintDialog(res.msg || '删除失败', this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog('删除失败', this.dialog);
        })
  }

  getReadCoefficient() {
    this.healthNewsService.healthNewsFetch()
      .subscribe(
        data => {
          if (data.data && data.code === 0) {
            this.readingQuantity = data.data;
          } else {
            this.readingQuantity = null;
          }
        }, err => {
          console.log(err);
          this.readingQuantity = null;
        })
  }

  newReadingQuantity() {
    const config = new DialogOptions({
      title: '配置阅读系数',
      message: '',
      buttons: [{
        key: 'confirm',
        value: '确定',
        color: 'primary'
      }],
      forms: [{
        key: 'value',
        label: '阅读系数',
        value: this.readingQuantity
      }]
    });
    ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
      if (result && result.key === 'confirm' && result.value[0] && result.value[0].value) {
        this.updateReadingQuantity({value: result.value[0].value});
      }
    });
  }

  updateReadingQuantity(data) {
    this.healthNewsService.healthNewsEdit(data)
      .subscribe(res => {
        if (res.code === 0) {
          this.getReadCoefficient();
          HintDialog(ERRMSG.saveSuccess, this.dialog);
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }
}
