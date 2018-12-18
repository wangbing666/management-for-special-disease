import { Component, OnInit } from '@angular/core';
import { FatherStatisticsService } from './_service/father-statistics.service';
import { FatherStatisticsTableService } from './_service/father-statistics-table.service';

@Component({
  selector: 'app-father-statistics',
  templateUrl: 'father-statistics.component.html'
})
export class FatherStatisticsComponent implements OnInit {
  // title = '数据统计';
  // subTitle = '父亲节数据量统计';
  //
  // queryfatherDate:any;
  // faherTable: TableOption = new TableOption();

  constructor(
    private _fatherStatisticsService: FatherStatisticsService,
    private _fatherStatisticsTableService: FatherStatisticsTableService
  ) {
  }

  ngOnInit() {
    // this.refresh();
    // this.defaultData();
    // this.initFlatpickr();
  }

  //  //分解faltpickr形成的日期范围字符串并调用接口更新数据
  // clickfatherSearch(queryDate){
  //   let date: string[] = (<string>queryDate).split(/[ ]/);
  //   var start = this.toDateValue(new Date(date[0]), 0, 0, 0);
  //   var end = this.toDateValue(new Date(date[2]), 24, 0, 0);
  //   this.getfathers(start, end);
  // }
  //
  // //计算当前时间前一周作为默认时间段调用接口并更新数据
  // defaultData() {
  //   //计算今天前一天日期
  //   let date1 = new Date();
  //   date1.setDate(date1.getDate() - 1);
  //   let oneDayBeforeToday = this.toDateString(date1);
  //   let oneDayBeforeTodayValue = this.toDateValue(date1, 24, 0, 0);
  //
  //   //计算今天前第七天日期
  //   let date2 = new Date();
  //   date2.setDate(date2.getDate()-7);
  //   let sevenDaysBeforeToday = this.toDateString(date2);
  //   let sevenDaysBeforeTodayValue = this.toDateValue(date2, 0, 0, 0);
  //
  //   //设置日期框默认日期
  //   this.queryfatherDate = `${sevenDaysBeforeToday} to ${oneDayBeforeToday}`;
  //
  //   //调用接口更新默认数据，默认今天前第七天到今天前一天
  //   this.getfathers(sevenDaysBeforeTodayValue, oneDayBeforeTodayValue);
  // }
  //
  // toDateString(date) {
  //   let Y = date.getFullYear().toString();
  //   let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
  //   let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString();
  //   return `${Y}-${M}-${D}`;
  // }
  //
  // toDateValue(date, h, m, s) {
  //   let Y = date.getFullYear();
  //   let M = date.getMonth();
  //   let D = date.getDate();
  //   return new Date(Y, M, D, h, m, s).valueOf();
  // }
  //
  // //初始化日期选择器Flatpickr
  // initFlatpickr(){
  //   $("#main").flatpickr({
  //     "locale": "zh",
  //     "mode": "range",
  //   });
  // }
  //
  // getFatherTitles() {
  //   this.faherTable.titles = this._fatherStatisticsTableService.setfatherTitles();
  // }
  //
  // refresh(){
  //   this.defaultData();
  //   this.getFatherTitles();
  // }
  // getfathers(start,end) {
  //   this._fatherStatisticsService.getfather(start, end)
  //     .subscribe(
  //       data => {
  //         this.faherTable.loading = false;
  //         if (data.data && data.code === 0) {
  //           this.faherTable.lists = [];
  //           this.faherTable.lists.push(data.data);
  //         }else {
  //           this.faherTable.errorMessage = "空空如也～";
  //         }
  //       }, err => {
  //         this.faherTable.loading = false;
  //         this.faherTable.errorMessage = "啊哦！接口访问出错啦～";
  //       })
  // }
}
