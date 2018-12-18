import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogOptions } from '../../../libs/dmodal/dialog.entity';
import { TableOption } from '../../../libs/dtable/dtable.entity';

import { ERRMSG } from '../../_store/static';
import { AdPatientService } from './_service/ad-patient.service';
import { AdPatientTableService } from './_service/ad-patient-table.service';
import { AdPatient } from './_entity/ad-patient.entity';

@Component({
  selector: 'app-ad-patient',
  templateUrl: './ad-patient.component.html'
})
export class AdPatientComponent implements OnInit {
  containerConfig: ContainerConfig;
  adPatientTable: TableOption;
  @select(['adPatient', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private adPatientService: AdPatientService,
    private adPatientTableService: AdPatientTableService,
    private dialog: MatDialog,
    private router: Router,
    @Inject('auth') private auth
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.adPatientService.adPatientConfig();
    this.adPatientTable = new TableOption({
      titles: this.adPatientTableService.setAdPatientTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getAdPatient(page[0]);
    });
  }

  getAdPatient(page: number) {
    this.action.pageChange('adPatient', [page]);
    this.adPatientTable.reset(page);
    this.adPatientService.getAdList(page)
      .subscribe(res => {
        this.adPatientTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.length === 0) {
          this.adPatientTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.adPatientTable.totalPage = res.data.totalPages;
          this.adPatientTable.lists = res.data.content;
        } else {
          this.adPatientTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.adPatientTable.loading = false;
        console.log(err);
        this.adPatientTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('adPatient', new AdPatient());
    this.router.navigate(['/ad-patient/edit']);
  }

  gotoHandle(res) {
    const adPatient = <AdPatient>res.value;
    if (res.key === 'edit') {
      this.action.dataChange('adPatient', adPatient);
      this.router.navigate(['/ad-patient/edit']);
    }
    if (res.key === 'del') {
      const config = new DialogOptions({
        title: `您确定要删除广告：${adPatient.title}？`,
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
          this.delete(res.value.id);
        }
      });
    }
    if (res.key === 'updown') {
      if (!res.value.status) {
        const config = new DialogOptions({
          title: `您确定要上架广告：${adPatient.title}？`,
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

      } else {
        const config = new DialogOptions({
          title: `您确定要下架${adPatient.title}？`,
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
    this.adPatientService.adDelete(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.deleteSuccess, this.dialog).afterClosed().subscribe(() => {
            this.page.subscribe((page: Array<number>) => {
              this.getAdPatient(page[0]);
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
    this.adPatientService.adStatus(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.handleSuccess, this.dialog).afterClosed().subscribe(() => {
            this.page.subscribe((page: Array<number>) => {
              this.getAdPatient(page[0]);
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
