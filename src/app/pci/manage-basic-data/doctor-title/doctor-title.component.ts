import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogOptions } from '../../../libs/dmodal/dialog.entity';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { DoctorTitleService } from './_service/doctor-title.service';
import { DoctorTitleTableService } from './_service/doctor-title-table.service';
import { DoctorTitle } from './_entity/doctor-title.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-doctor-title',
  templateUrl: './doctor-title.component.html'
})
export class DoctorTitleComponent implements OnInit {
  containerConfig: ContainerConfig;
  doctorTitleTable: TableOption;
  doctorTitleId: number;

  constructor(
    private doctorTitleService: DoctorTitleService,
    private doctorTitleTableService: DoctorTitleTableService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorTitleService.doctorTitleConfig();
    this.doctorTitleTable = new TableOption({
      titles: this.doctorTitleTableService.setTitles(),
      ifPage: false
    });
    this.getDoctorTitle();
  }

  getDoctorTitle() {
    this.doctorTitleTable.reset();
    this.doctorTitleService.getDoctorTitles()
      .subscribe(res => {
        this.doctorTitleTable.loading = false;
        if (res.code === 0 && res.data && res.data.length === 0) {
          this.doctorTitleTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data) {
          this.doctorTitleTable.totalPage = res.data.totalPages;
          this.doctorTitleTable.lists = res.data;
        } else {
          this.doctorTitleTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.doctorTitleTable.loading = false;
        console.log(err);
        this.doctorTitleTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    const config = new DialogOptions({
      title: `新增职称`,
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
        label: '职称名称',
        value: ''
      }]
    });
    ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
      if (result && result.key === 'confirm' && result.value[0]) {
        const obj: any = {name: result.value[0].value};
        this.newForm(obj);
      }
    });
  }

  gotoHandle(res) {
    const doctorTitle = <DoctorTitle>res.value;
    this.doctorTitleId = doctorTitle.id;
    if (res.key === 'editPositionalTitle') {
      const config = new DialogOptions({
        title: `编辑科室`,
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
          label: '职称名称',
          value: doctorTitle.name
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result && result.key === 'confirm' && result.value[0]) {
          const obj: any = {id: doctorTitle.id, name: result.value[0].value};
          this.editForm(obj);
        }
      });
    }
  }

  editForm(value) {
    this.doctorTitleService.doctorTitleEdit(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.getDoctorTitle();
          });
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }

  newForm(value) {
    this.doctorTitleService.doctorTitleCreate(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.getDoctorTitle();
          });
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.saveError, this.dialog);
      });
  }
}
