import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { MedicationRemindService } from './_service/medication-remind.service';
import { MedicationRemindTableService } from './_service/medication-remind-table.service';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { ERRMSG } from '../../_store/static';

import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-medication-remind',
  templateUrl: './medication-remind.component.html'
})
export class MedicationRemindComponent implements OnInit {

  containerConfig: ContainerConfig;
  medicationRemindTable: TableOption;

  deleted: any;
  remind: any;
  constructor(
    @Inject('common') private common,
    private dialog: MatDialog,
    private medicationRemindService: MedicationRemindService,
    private medicationRemindTableService: MedicationRemindTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.medicationRemindService.MedicationRemindConfig();
    this.medicationRemindTable = new TableOption({
      titles: this.medicationRemindTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.medicationRemindTable.queryKey = '';
    this.deleted = '';
    this.remind = '';
    this.getmedicationRemind(0);
  }

  getmedicationRemind(page: number) {
    this.medicationRemindTable.reset(page);
    this.medicationRemindService.getData(page, this.medicationRemindTable.size, this.medicationRemindTable.queryKey, this.deleted, this.remind)
      .subscribe(
        res => {
          this.medicationRemindTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.medicationRemindTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.medicationRemindTable.totalPage = res.data.totalPages;
            res.data.content.forEach(obj => {
              if (obj.deleted == true) {
                obj.deleted = '已删除'
              } else {
                obj.deleted = '未删除'
              }
              if (obj.remind == false) {
                obj.remind = '关闭'
              } else {
                obj.remind = '打开'
              }
            })
            this.medicationRemindTable.lists = res.data.content;
          } else {
            this.medicationRemindTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.medicationRemindTable.loading = false;
          console.log(err);
          this.medicationRemindTable.errorMessage = ERRMSG.netErrMsg;
        });
  }
  export() {
    let exportList;
    this.medicationRemindService.getData(0, 99999, this.medicationRemindTable.queryKey, this.deleted, this.remind)
      .subscribe(res => {
        if (res.code === 0 && res.data && res.data.content && res.data.content.length !== 0) {
          exportList = this.common.toArray(res.data.content);
          /* generate worksheet */
          const ws = XLSX.utils.aoa_to_sheet(exportList);
          /* generate workbook and add the worksheet */
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
          /* save to file */
          const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
          const fileName = `患者用药提醒列表--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
          saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
        } else {
          HintDialog('导出数据错误，请重新尝试', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('导出数据错误，请重新尝试', this.dialog);
      });
  }
}
