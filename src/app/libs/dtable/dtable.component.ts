import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { TableOption, ControlType } from './dtable.entity';

@Component({
  selector: 'app-lib-table',
  templateUrl: './dtable.component.html',
  styleUrls: ['./dtable.component.scss']
})
export class DTableComponent implements OnChanges {
  @Input() table: TableOption;
  @Output() handleEmmit = new EventEmitter();
  @Output() pageEmitter = new EventEmitter();

  pageList: Array<any> = [];
  controlType = ControlType;

  constructor() {
  }

  ngOnChanges() {
    if (this.table.ifPage) {
      this.getPageList(this.table.totalPage, this.table.currentPage);
    }
  }

  gotoHandle(key, value) {
    this.handleEmmit.emit({key: key, value: value});
  }

  getPageList(total, current) {
    this.pageList = [];
    if (total <= 6) {
      for (let i = 0; i < total; i++) {
        this.pageList.push(i + 1);
      }
    } else if (total > 6) {
      if (current + 1 === 1) {
        this.pageList.push(1, current + 2, '...', total);
      } else if (current + 1 === 2) {
        this.pageList.push(1, current + 1, current + 2, '...', total);
      } else if (current + 1 === total - 1) {
        this.pageList.push(1, '...', current, current + 1, total);
      } else if (current + 1 === total) {
        this.pageList.push(1, '...', current, total);
      } else {
        this.pageList.push(1, '...', current, current + 1, current + 2, '...', total);
      }
    }
  }

  // 获取指定页
  getCurrentPage(page) {
    if (page !== '...') {
      this.pageEmitter.emit(page - 1);
      this.getPageList(this.table.totalPage, page - 1);
    }
  }

  // 获取前一页
  getPrePage() {
    if (this.table.currentPage > 0) {
      this.pageEmitter.emit(this.table.currentPage - 1);
      this.getPageList(this.table.totalPage, this.table.currentPage - 1);
    }
  }

  // 获取下一页
  getNextPage() {
    if (this.table.currentPage < this.table.totalPage - 1) {
      this.pageEmitter.emit(this.table.currentPage + 1);
      this.getPageList(this.table.totalPage, this.table.currentPage + 1);
    }
  }

  // 获取第一页
  getFirstPage() {
    this.pageEmitter.emit(0);
    this.getPageList(this.table.totalPage, 0);
  }

  // 获取最后一页
  getLastPage() {
    this.pageEmitter.emit(this.table.totalPage - 1);
    this.getPageList(this.table.totalPage, this.table.totalPage - 1);
  }
}
