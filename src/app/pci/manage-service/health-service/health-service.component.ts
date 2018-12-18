import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { HealthServiceService } from './_service/health-service.service';
import { HealthServiceTableService } from './_service/health-service-table.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-health-service',
  templateUrl: './health-service.component.html'
})
export class HealthServiceComponent implements OnInit {
  containerConfig: ContainerConfig;
  healthServiceTable: TableOption;
  @select(['healthService', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private healthServiceService: HealthServiceService,
    private healthServiceTableService: HealthServiceTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.healthServiceService.healthServiceConfig();
    this.healthServiceTable = new TableOption({
      titles: this.healthServiceTableService.setTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getHealthService(page[0]);
    });
  }

  getHealthService(page: number) {
    this.action.pageChange('healthService', [page]);
    this.healthServiceTable.reset(page);
    this.healthServiceService.getHealthServices(page, 20)
      .subscribe(res => {
        this.healthServiceTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.healthServiceTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.healthServiceTable.totalPage = res.data.totalPages;
          this.healthServiceTable.lists = res.data.content;
          for (let i = 0; i < res.data.content.length; i++) {
            res.data.content[i].enable = this.formatStatus(res.data.content[i].enable);
          }
        } else {
          this.healthServiceTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.healthServiceTable.loading = false;
        console.log(err);
        this.healthServiceTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.router.navigate(['/health-service/edit'], {queryParams: {id: 0}});
  }

  gotoHandle(res) {
    if (res.key === 'edit') {
      this.router.navigate(['/health-service/edit'], {queryParams: {id: res.value.serviceId}});
    }
  }

  // 状态信息转换
  formatStatus(statu) {
    if (statu === true) {
      return '启用';
    }
    if (statu === false) {
      return '禁用';
    }
    return null;
  }

}
