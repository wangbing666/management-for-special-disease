import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { InspectionItemService } from './_service/inspection-item.service';
import { InspectionItemTableService } from './_service/inspection-item-table.service';
import { ERRMSG } from '../../_store/static';
import { InspectionItem } from './_entity/inspection-item.entity';

@Component({
  selector: 'app-inspection-item',
  templateUrl: 'inspection-item.component.html'
})
export class InspectionItemComponent implements OnInit {
  containerConfig: ContainerConfig;
  inspectionItemTable: TableOption;
  inspectionType: any;

  constructor(
    @Inject('action') private action,
    private inspectionItemService: InspectionItemService,
    private inspectionItemTableService: InspectionItemTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.inspectionItemService.inspectionItemConfig();
    this.inspectionItemTable = new TableOption({
      titles: this.inspectionItemTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.getInspectionCategories().subscribe(() => {
      this.getInspectionItems(0);
    }, err => {
      this.inspectionItemTable.loading = false;
      console.log(err);
      this.inspectionItemTable.errorMessage = ERRMSG.netErrMsg;
    })
  }

  getInspectionItems(page) {
    this.inspectionItemTable.reset(page);
    this.inspectionItemService.getInspectionItems(page, this.inspectionItemTable.size, this.inspectionItemTable.queryKey)
      .subscribe(res => {
        this.inspectionItemTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.inspectionItemTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.inspectionItemTable.lists = res.data.content;
          this.inspectionItemTable.totalPage = res.data.totalPages;
        } else {
          this.inspectionItemTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.inspectionItemTable.loading = false;
        console.log(err);
        this.inspectionItemTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  getInspectionCategories() {
    return this.inspectionItemService.getInspectionCategories()
      .map(res => {
        if (res.code === 0 && res.data) {
          this.inspectionType = res.data;
          this.inspectionItemTable.queryKey = this.inspectionType[0].id;
        } else {
          this.inspectionItemTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      })
  }

  gotoHandle(res) {
    const data = <InspectionItem>res.value;
    data.typeList = this.inspectionType;
    console.log(res);
    if (res.key === 'edit') {
      this.action.dataChange('inspectionItem', data);
      this.router.navigate(['/inspection-item/edit']);
    }

    if (res.key === 'delete') {
      HintDialog('您确定要删除该信息？', this.dialog).afterClosed().subscribe(result => {
        if (result && result.key === 'confirm') {
          this.delData(data.id);
        }
      });
    }
  }

  newData() {
    this.action.dataChange('inspectionItem', new InspectionItem(this.inspectionType));
    this.router.navigate(['/inspection-item/edit']);
  }

  delData(id) {
    this.inspectionItemService.inspectionItemDelete(id)
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
}
