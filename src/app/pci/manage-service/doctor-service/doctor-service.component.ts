import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { DoctorServiceService } from './_service/doctor-service.service';
import { DoctorServiceTableService } from './_service/doctor-service-table.service';
import { DoctorService } from './_entity/doctor-service.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-doctor-service',
  templateUrl: './doctor-service.component.html',
})
export class DoctorServiceComponent implements OnInit {
  containerConfig: ContainerConfig;
  doctorServiceTable: TableOption;

  constructor(
    @Inject('action') private action,
    private doctorServiceService: DoctorServiceService,
    private doctorServiceTableService: DoctorServiceTableService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorServiceService.doctorServiceConfig();
    this.doctorServiceTable = new TableOption({
      titles: this.doctorServiceTableService.setTitles(),
      ifPage: false
    });
    this.getDoctorServices();
  }

  getDoctorServices() {
    this.doctorServiceService.getDoctorServices()
      .subscribe(res => {
        this.doctorServiceTable.loading = false;
        if (res.data && res.data.length === 0 && res.code === 0) {
          this.doctorServiceTable.errorMessage = ERRMSG.nullMsg
        } else if (res.data && res.code === 0) {
          this.doctorServiceTable.lists = res.data;
        } else {
          this.doctorServiceTable.errorMessage = res.msg || ERRMSG.otherMsg
        }
      }, err => {
        this.doctorServiceTable.loading = false;
        console.log(err);
        this.doctorServiceTable.errorMessage = ERRMSG.netErrMsg;
      });
  }

  gotoHandle(res) {
    const doctorService = <DoctorService>res.value;
    if (res.key === 'edit') {
      this.action.dataChange('doctorService', doctorService);
      this.router.navigate(['/doctor-service/edit']);
    }
  }
}
