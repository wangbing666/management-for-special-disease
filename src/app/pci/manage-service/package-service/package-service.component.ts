import { Component, Inject, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { PackageServiceService } from './_service/package-service.service';
import { PackageServiceTableService } from './_service/package-service-table.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { PackageService } from './_entity/package-service.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-package-service',
  templateUrl: './package-service.component.html'
})
export class PackageServiceComponent implements OnInit {
  containerConfig: ContainerConfig;
  packageServiceTable: TableOption;
  @select(['packageService', 'tab']) tab: Observable<number>;
  @select(['packageService', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private packageServiceService: PackageServiceService,
    private packageServiceTableService: PackageServiceTableService,
    private router: Router
  ) {
    action.dataChange('packageService', new PackageService());
  }

  ngOnInit() {
    this.containerConfig = this.packageServiceService.packageServiceConfig();
    this.packageServiceTable = new TableOption({
      titles: this.packageServiceTableService.setTitles(),
      ifPage: true
    });
    this.page.subscribe((page: Array<number>) => {
      this.getPackageService(page[0]);
    });
  }

  getPackageService(page: number) {
    this.action.pageChange('packageService', [page]);
    this.packageServiceTable.reset(page);
    this.packageServiceService.getPackageServices()
      .subscribe(res => {
        this.packageServiceTable.loading = false;
        if (res.code === 0 && res.data && res.data.length === 0) {
          this.packageServiceTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data) {
          this.packageServiceTable.totalPage = res.data.totalPages;
          this.packageServiceTable.lists = res.data;
        } else {
          this.packageServiceTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.packageServiceTable.loading = false;
        console.log(err);
        this.packageServiceTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('packageService', new PackageService());
    this.router.navigate(['/package-service/edit']);
  }

  gotoHandle(res) {
    const packageService = <PackageService>res.value;
    if (res.key === 'edit') {
      this.action.dataChange('packageService', packageService);
      this.router.navigate(['/package-service/edit']);
    }
  }
}
