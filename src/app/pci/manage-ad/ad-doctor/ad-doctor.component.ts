import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { MatDialog } from '@angular/material';

import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogOptions } from '../../../libs/dmodal/dialog.entity';
import { TableOption } from '../../../libs/dtable/dtable.entity';

import { AdDoctorService } from './_service/ad-doctor.service';
import { AdDoctorTableService } from './_service/ad-doctor-table.service';
import { AdDoctor } from './_entity/ad-doctor.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-ad-doctor',
  templateUrl: './ad-doctor.component.html'
})
export class AdDoctorComponent implements OnInit {
  containerConfig: ContainerConfig;
  adDoctorTable: TableOption;
  @select(['adDoctor', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    @Inject('auth') private auth,
    private adDoctorService: AdDoctorService,
    private adDoctorTableService: AdDoctorTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
    action.dataChange('adDoctor', new AdDoctor());
  }

  ngOnInit() {
    this.containerConfig = this.adDoctorService.adDoctorConfig();
    this.adDoctorTable = new TableOption({
      titles: this.adDoctorTableService.setAdDoctorTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getAdDoctor(page[0]);
    });
  }

  getAdDoctor(page: number) {
    this.action.pageChange('adDoctor', [page]);
    this.adDoctorService.getAdList(page)
      .subscribe(res => {
        this.adDoctorTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.length === 0) {
          this.adDoctorTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.adDoctorTable.totalPage = res.data.totalPages;
          this.adDoctorTable.lists = res.data.content;
        } else {
          this.adDoctorTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.adDoctorTable.loading = false;
        console.log(err);
        this.adDoctorTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('adDoctor', new AdDoctor());
    this.router.navigate(['/ad-doctor/edit']);
  }

  gotoHandle(res) {
    const adDoctor = <AdDoctor>res.value;
    if (res.key === 'edit') {
      this.action.dataChange('adDoctor', adDoctor);
      this.router.navigate(['/ad-doctor/edit']);
    }
    if (res.key === 'del') {
      const config = new DialogOptions({
        title: `您确定要删除${adDoctor.title}？`,
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
          this.delete(res.value.id);
        }
      });
    } else if (res.key === 'updown') {
      if (!res.value.status) {
        const config = new DialogOptions({
          title: `您确定要上架广告：${adDoctor.title}？`,
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
            this.updown(res.value.id);
          }
        });
      } else {
        const config = new DialogOptions({
          title: `您确定要下架广告：${adDoctor.title}？`,
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
            this.updown(res.value.id);
          }
        });
      }
    }
  }

  delete(id: number) {
    this.adDoctorService.adDelete(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(res.msg || ERRMSG.deleteSuccess, this.dialog).afterClosed().subscribe(() => {
            this.page.subscribe((page: Array<number>) => {
              this.getAdDoctor(page[0]);
            });
          });
        } else {
          HintDialog(res.msg || ERRMSG.deleteError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }

  updown(id: number) {
    this.adDoctorService.adStatus(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(res.msg || ERRMSG.handleSuccess, this.dialog).afterClosed().subscribe(() => {
            this.page.subscribe((page: Array<number>) => {
              this.getAdDoctor(page[0]);
            });
          });
        } else {
          HintDialog(res.msg || ERRMSG.handleError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }
}
