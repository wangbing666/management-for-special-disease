import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { RelationshipService } from './_service/relationship.service';
import { RelationshipTableService } from './_service/relationship-table.service';
import { ERRMSG } from '../../_store/static';

import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-relationship',
  templateUrl: './relationship.component.html'
})
export class RelationshipComponent implements OnInit {
  containerConfig: ContainerConfig;
  relationshipTable: TableOption = new TableOption();
  queryStatus: any;
  queryChannel: any;

  constructor(
    @Inject('common') private common,
    private dialog: MatDialog,
    private relationshipService: RelationshipService,
    private relationshipTableService: RelationshipTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.relationshipService.relationshipConfig();
    this.relationshipTable = new TableOption({
      titles: this.relationshipTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.relationshipTable.queryKey = '';
    this.queryStatus = '';
    this.queryChannel = '';
    this.getRelationships(0);
  }

  getRelationships(page) {
    this.relationshipTable.reset(page);
    this.relationshipService.getRelationships(
      page, this.relationshipTable.size,
      this.relationshipTable.queryKey,
      this.queryStatus,
      this.queryChannel
    )
      .subscribe(
        res => {
          this.relationshipTable.loading = false;
          if (res.data && res.data.content && res.data.content.length === 0 && res.code === 0) {
            this.relationshipTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.content && res.code === 0) {
            this.relationshipTable.totalPage = res.data.totalPages;
            this.relationshipTable.lists = res.data.content;
          } else {
            this.relationshipTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.relationshipTable.loading = false;
          console.log(err);
          this.relationshipTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  export() {
    let exportList;
    this.relationshipService.getRelationships(0, 2000, this.relationshipTable.queryKey, this.queryStatus, this.queryChannel)
      .subscribe(res => {
        if (res.code === 0 && res.data && res.data.content && res.data.content.length !== 0) {
          if (res.data.totalPages == 1) {
            exportList = this.common.toArray(res.data.content);
            /* generate worksheet */
            const ws = XLSX.utils.aoa_to_sheet(exportList);
            /* generate workbook and add the worksheet */
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
            /* save to file */
            const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
            const fileName = `医患关联列表--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
            saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
          } else {
            const getList = [];
            let dataList = res.data.content;
            for (let i = 1; i < res.data.totalPages; i++) {
              getList.push(this.relationshipService.getRelationships(i, 2000, this.relationshipTable.queryKey, this.queryStatus, this.queryChannel))
            }
            Observable.forkJoin(getList).subscribe((resList: Array<any>) => {
              for (let i = 0; i < getList.length; i++) {
                if (resList[i].code == 0 && resList[i].data && resList[i].data.content) {
                  dataList = [...dataList, ...resList[i].data.content]
                }
              }
              exportList = this.common.toArray(dataList);
              /* generate worksheet */
              const ws = XLSX.utils.aoa_to_sheet(exportList);
              /* generate workbook and add the worksheet */
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
              /* save to file */
              const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
              const fileName = `全程心管家医患关联列表--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
              saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
            });
          }
        } else {
          HintDialog('导出数据错误，请重新尝试', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('导出数据错误，请重新尝试', this.dialog);
      });
  }
}
