import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { DoctorGroupService } from '../_service/doctor-group.service';
import { DoctorGroupTableService } from '../_service/doctor-group-table.service';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-doctor-group-service-list',
  templateUrl: './service-list.component.html'
})
export class ServiceListComponent implements OnInit {
  containerConfig: ContainerConfig;
  serviceList: TableOption;

  id: number;

  constructor(
    private doctorGroupService: DoctorGroupService,
    private doctorGroupTableService: DoctorGroupTableService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorGroupService.serviceListConfig();
    this.serviceList = new TableOption({
      titles: this.doctorGroupTableService.setServiceListTitles(),
      ifPage: false
    });
    this.router.queryParams.subscribe(params => {
      this.id = +params['id'];
      if (!this.id) {
        this.serviceList.loading = false;
        this.serviceList.errorMessage = ERRMSG.nullMsg;
      } else {
        this.getList(this.id);
      }
    });
  }

  getList(id) {
    this.serviceList.reset();
    this.doctorGroupService.getServiceList(id)
      .subscribe(res => {
        this.serviceList.loading = false;
        if (res.code === 0 && res.data && res.data.length === 0) {
          this.serviceList.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data) {
          this.serviceList.lists = res.data;
        } else {
          this.serviceList.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.serviceList.loading = false;
        console.log(err);
        this.serviceList.errorMessage = ERRMSG.netErrMsg;
      });
  }
}
