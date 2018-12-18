import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { IntegralOrderTableService } from './_service/integral-order-table.service';
import { IntegralOrderService } from './_service/integral-order.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { IntegralOrder } from './_entity/integralOrder.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-integral-order',
  templateUrl: './integral-order.component.html',
  styles: [`
    .content {
      position: relative;
    }

    .count {
      position: absolute;
      top: 10px;
      left: 135px;
    }

    @media (max-width: 600px) {
      .count {
        left: 100px;
      }
    }
  `]
})
export class IntegralOrderComponent implements OnInit {
  containerConfig: ContainerConfig;
  integralOrderTable: TableOption;
  integralOrderedTable: TableOption;
  @select(['integralOrder', 'tab']) tab: Observable<number>;
  @select(['integralOrder', 'page']) page: Observable<Array<number>>;
  processStatus: number;
  count: number;

  constructor(
    @Inject('action') private action,
    @Inject('nav') private navService,
    private integralOrderService: IntegralOrderService,
    private integralOrderTableService: IntegralOrderTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
    action.dataChange('integralOrderService', new IntegralOrder());
  }

  ngOnInit() {
    this.containerConfig = this.integralOrderService.integralOrderConfig();
    this.integralOrderTable = new TableOption({
      titles: this.integralOrderTableService.setDealTitles(),
      ifPage: true
    });
    this.integralOrderedTable = new TableOption({
      titles: this.integralOrderTableService.setDealedTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.reset0();
    this.reset1();
  }

  reset0() {
    this.page.subscribe((page: Array<number>) => {
      this.getIntegralOrder(page[0]);
    });
  }

  reset1() {
    this.page.subscribe((page: Array<number>) => {
      this.getIntegralOrdered(page[0]);
    });
  }

  getIntegralOrder(page: number) {
    this.action.pageChange('integralOrder', [page, this.integralOrderTable.currentPage]);
    this.integralOrderTable.reset(page);
    this.integralOrderService.getIntegralOrder(0, page)
      .subscribe(res => {
        this.integralOrderTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.integralOrderTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.count = res.data.totalElements;
          this.navService.setCount(this.count, 'integral', 'integralOrder');
          this.integralOrderTable.totalPage = res.data.totalPages;
          this.integralOrderTable.lists = res.data.content;
        } else {
          this.integralOrderTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.integralOrderTable.loading = false;
        console.log(err);
        this.integralOrderTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  getIntegralOrdered(page: number) {
    this.action.pageChange('integralOrder', [this.integralOrderedTable.currentPage, page]);
    this.integralOrderedTable.reset(page);
    this.integralOrderService.getIntegralOrder(1, page)
      .subscribe(res => {
        this.integralOrderedTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.integralOrderedTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.integralOrderedTable.totalPage = res.data.totalPages;
          this.integralOrderedTable.lists = res.data.content;
        } else {
          this.integralOrderedTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.integralOrderTable.loading = false;
        console.log(err);
        this.integralOrderedTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  change(index) {
    this.action.tabChange('integralOrder', index);
  }

  gotoHandle(data) {
    const integralOrder = <IntegralOrder>data.value;
    integralOrder.key = data.key;
    this.action.dataChange('integralOrder', integralOrder);
    this.router.navigate(['/integral-order/send-message']);
  }
}

