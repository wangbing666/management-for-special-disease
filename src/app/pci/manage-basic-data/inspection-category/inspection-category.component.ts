import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { ActionDialog, HintDialog } from '../../../libs/dmodal/dialog.component';
import { DialogOptions } from '../../../libs/dmodal/dialog.entity';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { InspectionCategoryService } from './_service/inspection-category.service';
import { InspectionCategoryTableService } from './_service/inspection-category-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-inspection-category',
  templateUrl: './inspection-category.component.html'
})
export class InspectionCategoryComponent implements OnInit {
  containerConfig: ContainerConfig;
  inspectionCategoryTable: TableOption;

  constructor(
    private inspectionCategoryService: InspectionCategoryService,
    private inspectionCategoryTableService: InspectionCategoryTableService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.inspectionCategoryService.inspectionCategoryConfig();
    this.inspectionCategoryTable = new TableOption({
      titles: this.inspectionCategoryTableService.setTitles(),
      ifPage: false
    });
    this.getInspectionCategories();
  }

  getInspectionCategories() {
    this.inspectionCategoryService.getInspectionCategories()
      .subscribe(res => {
        this.inspectionCategoryTable.loading = false;
        if (res.code === 0 && res.data && res.data.length === 0) {
          this.inspectionCategoryTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data) {
          this.inspectionCategoryTable.lists = res.data;
        } else {
          this.inspectionCategoryTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.inspectionCategoryTable.loading = false;
        console.log(err);
        this.inspectionCategoryTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  gotoHandle(res) {
    console.log(res);
    const inspectionCategory = res.value;
    if (res.key === 'edit') {
      this.inspectionCategoryUpdate(inspectionCategory);
    }
    if (res.key === 'delete') {
      HintDialog(`你确定要删除检查类目: ${inspectionCategory.name}？`, this.dialog)
        .afterClosed().subscribe(
        result => {
          if (result && result.key === 'confirm') {
            this.delData(inspectionCategory.id);
          }
        });
    }
  }

  newData() {
    this.inspectionCategoryUpdate();
  }

  inspectionCategoryUpdate(data?) {
    const config = new DialogOptions({
      title: `${data ? '编辑' : '新增'}检查类目`,
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
        label: '检查类目名称',
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
      this.inspectionCategoryService.inspectionCategoryEdit(data)
        .subscribe(res => {
          if (res.code === 0) {
            HintDialog(ERRMSG.saveSuccess, this.dialog);
            this.getInspectionCategories();
          } else {
            HintDialog(res.msg || ERRMSG.saveError, this.dialog);
          }
        }, err => {
          console.log(err);
          HintDialog(ERRMSG.netErrMsg, this.dialog);
        })

    } else {
      this.inspectionCategoryService.inspectionCategoryCreate(data)
        .subscribe(
          res => {
            if (res.code === 0) {
              HintDialog(ERRMSG.saveSuccess, this.dialog);
              this.getInspectionCategories()
            } else {
              if (res.msg) {
              } else {
                HintDialog(res.msg || ERRMSG.saveError, this.dialog);
              }
            }
          }, err => {
            console.log(err);
            HintDialog(ERRMSG.netErrMsg, this.dialog);
          })
    }
  }

  delData(id) {
    this.inspectionCategoryService.inspectionCategoryDelete(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog(ERRMSG.saveSuccess, this.dialog);
          this.getInspectionCategories();
        } else {
          HintDialog(res.msg || ERRMSG.saveError, this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog(ERRMSG.netErrMsg, this.dialog);
      });
  }

}
