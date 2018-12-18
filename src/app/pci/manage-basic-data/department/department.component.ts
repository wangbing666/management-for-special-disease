import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogOptions } from '../../../libs/dmodal/dialog.entity';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { DepartmentService } from './_service/department.service';
import { DepartmentTableService } from './_service/department-table.service';
import { Department } from './_entity/department.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html'
})
export class DepartmentComponent implements OnInit {
  containerConfig: ContainerConfig;
  departmentTable: TableOption;
  departmentId: number;

  constructor(
    private departmentService: DepartmentService,
    private departmentTableService: DepartmentTableService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.departmentService.departmentConfig();
    this.departmentTable = new TableOption({
      titles: this.departmentTableService.setTitles(),
      ifPage: false
    });
    this.getDepartment();
  }

  getDepartment() {
    this.departmentTable.reset();
    this.departmentService.getDepartments()
      .subscribe(res => {
        this.departmentTable.loading = false;
        if (res.code === 0 && res.data && res.data.length === 0) {
          this.departmentTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data) {
          this.departmentTable.totalPage = res.data.totalPages;
          this.departmentTable.lists = res.data;
        } else {
          this.departmentTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.departmentTable.loading = false;
        console.log(err);
        this.departmentTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    const config = new DialogOptions({
      title: `新增科室`,
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
        label: '科室名称',
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
    const department = <Department>res.value;
    this.departmentId = department.id;
    if (res.key === 'editDepartment') {
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
          label: '科室名称',
          value: department.name
        }]
      });
      ActionDialog(config, this.dialog).afterClosed().subscribe(result => {
        if (result && result.key === 'confirm' && result.value[0]) {
          const obj: any = {id: department.id, name: result.value[0].value};
          this.editForm(obj);
        }
      });
    }
  }

  editForm(value) {
    this.departmentService.departmentEdit(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.getDepartment();
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
    this.departmentService.departmentCreate(value)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog).afterClosed().subscribe(() => {
            this.getDepartment();
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
