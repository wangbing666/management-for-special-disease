import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { DoctorService } from '../_service/doctor.service';
import { DoctorTableService } from '../_service/doctor-table.service';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-doctor-service-list',
  templateUrl: './service-list.component.html'
})
export class ServiceListComponent implements OnInit {
  containerConfig: ContainerConfig;
  serviceList: TableOption;

  id: number;

  constructor(
    private doctorService: DoctorService,
    private doctorTableService: DoctorTableService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorService.serviceListConfig();
    this.serviceList = new TableOption({
      titles: this.doctorTableService.setServiceListTitles(),
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
    this.doctorService.getServiceList(id)
      .subscribe(res => {
        this.serviceList.loading = false;
        if (res.code === 0 && res.data.personalServices && res.data.personalServices.length === 0) {
          this.serviceList.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data.personalServices) {
          this.serviceList.lists = res.data.personalServices;
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
