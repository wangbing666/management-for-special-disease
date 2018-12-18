import { Component, Inject, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { Drug } from '../drug/_entity/drug.entity';
import { HealthOrganizationService } from './_service/health-organization.service';
import { HealthOrganizationTableService } from './_service/health-organization-table.service';
import { ERRMSG } from '../../_store/static';
import { HealthOrganization } from './_entity/health-organization.entity';

@Component({
  selector: 'app-health-organization',
  templateUrl: './health-organization.component.html'
})
export class HealthOrganizationComponent implements OnInit {
  containerConfig: ContainerConfig;
  healthOrganizationTable: TableOption;
  @select(['drug', 'tab']) tab: Observable<number>;
  @select(['drug', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private healthOrganizationService: HealthOrganizationService,
    private healthOrganizationTableService: HealthOrganizationTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
    action.dataChange('healthOrganizationService', new Drug());
  }

  ngOnInit() {
    this.containerConfig = this.healthOrganizationService.healthOrganizationConfig();
    this.healthOrganizationTable = new TableOption({
      titles: this.healthOrganizationTableService.setTitles(),
      ifPage: true
    });
    this.getHealthOrganization();
  }

  getHealthOrganization() {
    this.healthOrganizationService.getHealthOrganizations()
      .subscribe(res => {
        this.healthOrganizationTable.loading = false;
        if (res.code === 0 && res.data && res.data.length === 0) {
          this.healthOrganizationTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data) {
          this.healthOrganizationTable.totalPage = res.data.totalPages;
          this.healthOrganizationTable.lists = res.data;
        } else {
          this.healthOrganizationTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.healthOrganizationTable.loading = false;
        console.log(err);
        this.healthOrganizationTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  newData() {
    this.action.dataChange('healthOrganization', new HealthOrganization());
    this.router.navigate(['/health-organization/edit']);
  }

  gotoHandle(res) {
    const healthOrganization = <Drug>res.value;
    if (res.key === 'editThirdParty') {
      this.action.dataChange('healthOrganization', healthOrganization);
      this.router.navigate(['/health-organization/edit']);
    }
  }
}
