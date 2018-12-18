import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { HealthDataService } from './_service/health-data.service';
import { HealthDataTableService } from './_service/health-data-table.service';
import { ERRMSG } from '../../_store/static';

import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-health-data',
  templateUrl: './health-data.component.html',
  styleUrls: ['./health-data.component.css']
})
export class HealthDataComponent implements OnInit {

  containerConfig: ContainerConfig;
  pressureTable: TableOption;
  sugarTable: TableOption;
  rateTable: TableOption;
  weightTable: TableOption;

  @select(['healthData', 'tab']) tab: Observable<number>;
  @select(['healthData', 'page']) page: Observable<Array<number>>;

  queryBind: any = '';

  constructor(
    @Inject('action') private action,
    @Inject('common') private common,
    private healthDataService: HealthDataService,
    private healthDataTableService: HealthDataTableService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.healthDataService.UserHealthDataConfig();
    this.pressureTable = new TableOption({
      titles: this.healthDataTableService.setTitles(),
      ifPage: true
    });
    this.sugarTable = new TableOption({
      titles: this.healthDataTableService.setTitles(),
      ifPage: true
    });
    this.rateTable = new TableOption({
      titles: this.healthDataTableService.setTitles(),
      ifPage: true
    });
    this.weightTable = new TableOption({
      titles: this.healthDataTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
    this.reset2();
    this.reset3();
  }

  reset0() {
    this.queryBind = '';
    this.pressureTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.PressureData(page[0]);
    });
  }

  reset1() {
    this.queryBind = '';
    this.sugarTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getSugarData(page[1]);
    });
  }

  reset2() {
    this.queryBind = '';
    this.rateTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getRateData(page[2]);
    });
  }

  reset3() {
    this.queryBind = '';
    this.weightTable.queryKey = '';
    this.page.subscribe((page: Array<number>) => {
      this.getWeightData(page[3]);
    });
  }

  PressureData(page: number) {
    this.action.pageChange('healthData', [page, this.sugarTable.currentPage, this.rateTable.currentPage, this.weightTable.currentPage]);
    this.pressureTable.reset(page);
    this.healthDataService.getData(page, 20, this.pressureTable.queryKey, this.queryBind)
      .subscribe(
        res => {
          this.pressureTable.loading = false;
          if (res.data && res.data.pressure && res.data.pressure.totalElements === 0 && res.code === 0) {
            this.pressureTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.pressure && res.code === 0) {
            this.pressureTable.totalPage = res.data.pressure.totalPages;
            this.pressureTable.lists = res.data.pressure.content;
          } else {
            this.pressureTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.pressureTable.errorMessage = ERRMSG.nullMsg;
        });
  }

  getSugarData(page: number) {
    this.action.pageChange('healthData', [this.pressureTable.currentPage, page, this.rateTable.currentPage, this.weightTable.currentPage]);
    this.sugarTable.reset(page);
    this.healthDataService.getData(page, 20, this.sugarTable.queryKey, this.queryBind)
      .subscribe(
        res => {
          this.sugarTable.loading = false;
          if (res.data && res.data.sugar && res.data.sugar.totalElements === 0 && res.code === 0) {
            this.sugarTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.sugar && res.code === 0) {
            this.sugarTable.totalPage = res.data.sugar.totalPages;
            this.sugarTable.lists = res.data.sugar.content;
          } else {
            this.sugarTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.sugarTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  getRateData(page: number) {
    this.action.pageChange('healthData', [this.pressureTable.currentPage, this.sugarTable.currentPage, page, this.weightTable.currentPage]);
    this.rateTable.reset(page);
    this.healthDataService.getData(page, 20, this.rateTable.queryKey, this.queryBind)
      .subscribe(
        res => {
          this.rateTable.loading = false;
          if (res.data && res.data.sugar && res.data.heartRate.totalElements === 0 && res.code === 0) {
            this.rateTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.heartRate && res.code === 0) {
            this.rateTable.totalPage = res.data.sugar.totalPages;
            this.rateTable.lists = res.data.heartRate.content;
          } else {
            this.rateTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.rateTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  getWeightData(page: number) {
    this.action.pageChange('healthData', [this.pressureTable.currentPage, this.rateTable.currentPage, this.sugarTable.currentPage, page]);
    this.weightTable.reset(page);
    this.healthDataService.getData(page, 20, this.weightTable.queryKey, this.queryBind)
      .subscribe(
        res => {
          this.weightTable.loading = false;
          if (res.data && res.data.weight && res.data.weight.totalElements === 0 && res.code === 0) {
            this.weightTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.heartRate && res.code === 0) {
            this.weightTable.totalPage = res.data.weight.totalPages;
            this.weightTable.lists = res.data.weight.content;
          } else {
            this.weightTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.weightTable.loading = false;
          this.weightTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  change(index) {
    this.action.tabChange('healthData', index);
  }

  exportBlutdruck() {
    let exportList;
    this.healthDataService.getData(0, 9999, this.pressureTable.queryKey, this.queryBind)
      .subscribe(res => {
        if (res.data && res.data.heartRate && res.code === 0) {
          exportList = this.common.toArray(res.data.heartRate.content);
          /* generate worksheet */
          const ws = XLSX.utils.aoa_to_sheet(exportList);
          /* generate workbook and add the worksheet */
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
          /* save to file */
          const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
          const fileName = `全程心管家患者体征数据列表--血压--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
          saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
        } else {
          HintDialog('导出数据错误，请重新尝试', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('导出数据错误，请重新尝试', this.dialog);
      });
  }

  exportMmol() {
    let exportList;
    this.healthDataService.getData(0, 9999, this.pressureTable.queryKey, this.queryBind)
      .subscribe(res => {
        if (res.data && res.data.sugar && res.code === 0) {
          exportList = this.common.toArray(res.data.sugar.content);
          /* generate worksheet */
          const ws = XLSX.utils.aoa_to_sheet(exportList);
          /* generate workbook and add the worksheet */
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
          /* save to file */
          const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
          const fileName = `全程心管家患者体征数据列表--血糖--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
          saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
        } else {
          HintDialog('导出数据错误，请重新尝试', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('导出数据错误，请重新尝试', this.dialog);
      });
  }

  exportHrrest() {
    let exportList;
    this.healthDataService.getData(0, 9999, this.pressureTable.queryKey, this.queryBind)
      .subscribe(res => {
        if (res.data && res.data.sugar && res.code === 0) {
          exportList = this.common.toArray(res.data.sugar.content);
          /* generate worksheet */
          const ws = XLSX.utils.aoa_to_sheet(exportList);
          /* generate workbook and add the worksheet */
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
          /* save to file */
          const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
          const fileName = `全程心管家患者体征数据列表--心率--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
          saveAs(new Blob([this.common.s2ab(wbout)]), fileName);
        } else {
          HintDialog('导出数据错误，请重新尝试', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('导出数据错误，请重新尝试', this.dialog);
      });
  }

  exportWeight() {
    let exportList;
    this.healthDataService.getData(0, 9999, this.pressureTable.queryKey, this.queryBind)
      .subscribe(res => {
        if (res.data && res.data.weight && res.code === 0) {
          exportList = this.common.toArray(res.data.weight.content);
          /* generate worksheet */
          const ws = XLSX.utils.aoa_to_sheet(exportList);
          /* generate workbook and add the worksheet */
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, moment(new Date).format('YYYY-MM-DD'));
          /* save to file */
          const wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'});
          const fileName = `全程心管家患者体征数据列表--体重--${moment(new Date).format('YYYY-MM-DD')}.xlsx`;
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
