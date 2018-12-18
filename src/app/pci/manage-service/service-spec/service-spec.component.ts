import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { ServiceSpecService } from './_service/service-spec.service';
import { ServiceSpecTableService } from './_service/service-spec-table.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ERRMSG } from '../../_store/static';
import { ServiceSpec } from './_entity/service-spec.entity';

@Component({
  selector: 'app-service-apec',
  templateUrl: 'service-spec.component.html'
})
export class ServiceSpecComponent implements OnInit {
  containerConfig: ContainerConfig;
  serviceSpecTable: TableOption;
  @select(['serviceSpec', 'tab']) tab: Observable<number>;
  @select(['serviceSpec', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private serviceSpecService: ServiceSpecService,
    private serviceSpecTableService: ServiceSpecTableService,
    private router: Router
  ) {
    action.dataChange('serviceSpecService', new ServiceSpec());
  }

  ngOnInit() {
    this.containerConfig = this.serviceSpecService.serviceSpecConfig();
    this.serviceSpecTable = new TableOption({
      titles: this.serviceSpecTableService.setTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getServiceSpec(page[0]);
    });
  }

  getServiceSpec(page: number) {
    this.action.pageChange('packageService', [page]);
    this.serviceSpecTable.reset(page);
    this.serviceSpecService.getServiceSpec(page, 20)
      .subscribe(res => {
        this.serviceSpecTable.loading = false;
        if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
          this.serviceSpecTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data && res.data.content) {
          this.serviceSpecTable.totalPage = res.data.totalPages;
          this.serviceSpecTable.lists = res.data.content;
        } else {
          this.serviceSpecTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.serviceSpecTable.loading = false;
        console.log(err);
        this.serviceSpecTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('serviceSpec', new ServiceSpec());
    this.router.navigate(['/service-spec/edit']);
  }

  gotoHandle(res) {
    const serviceSpec = <ServiceSpec>res.value;
    if (res.key === 'edit') {
      this.action.dataChange('serviceSpec', serviceSpec);
      this.router.navigate(['/service-spec/edit']);
    }
  }

}
