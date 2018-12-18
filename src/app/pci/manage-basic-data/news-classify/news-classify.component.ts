import { Component, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogOptions } from '../../../libs/dmodal/dialog.entity';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { NewsClassifyService } from './_service/news-classify.service';
import { NewsClassifyTableService } from './_service/news-classify-table.service';
import { ERRMSG } from '../../_store/static';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-news-classify',
  templateUrl: './news-classify.component.html'
})
export class NewsClassifyComponent implements OnInit {
  containerConfig: ContainerConfig;
  newsClassifyTable: TableOption;

  constructor(
    private newsClassifyService: NewsClassifyService,
    private newsClassifyTableService: NewsClassifyTableService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.newsClassifyService.newsClassifyConfig();
    this.newsClassifyTable = new TableOption({
      titles: this.newsClassifyTableService.setTitles(),
      ifPage: false
    });
    this.getNewsClassifies();
  }

  getNewsClassifies() {
    this.newsClassifyService.getNewsClassifies()
      .subscribe(res => {
        this.newsClassifyTable.loading = false;
        if (res.data && res.data && res.data.length === 0 && res.code === 0) {
          this.newsClassifyTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.code === 0) {
          this.newsClassifyTable.lists = res.data;
        } else {
          this.newsClassifyTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.newsClassifyTable.loading = false;
        console.log(err);
        this.newsClassifyTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  gotoHandle(res) {
    console.log(res);
    const newsClassify = res.value;
    if (res.key === 'edit') {
      this.newsClassifyUpdate(newsClassify);
    }
  }

  newData() {
    this.newsClassifyUpdate();
  }

  newsClassifyUpdate(data?) {
    const config = new DialogOptions({
      title: `${data ? '编辑' : '新增'}健康资讯分类`,
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
        label: '健康资讯分类',
        value: data && data.name || ''
      }]
    });
    ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
      if (result && result.key === 'confirm' && result.value[0] && data) {
        this.getValue({id: data.id, name: result.value[0].value}, true);
      } else if (result && result.key === 'confirm' && result.value[0] && !data) {
        this.getValue({name: result.value[0].value}, false);
      }
    });
  }

  getValue(data, state) {
    if (state) {
      this.newsClassifyService.newsClassifyUpdate(data.id, data.name)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog);
            this.getNewsClassifies();
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.netErrMsg, this.dialog);
        });
    } else {
      this.newsClassifyService.newsClassifyCreate(data.name)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog);
            this.getNewsClassifies();
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.netErrMsg, this.dialog);
        });
    }
  }
}
