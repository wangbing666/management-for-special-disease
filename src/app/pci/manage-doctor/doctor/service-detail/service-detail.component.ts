import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { DoctorService } from '../_service/doctor.service';
import { DoctorTableService } from '../_service/doctor-table.service';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-doctor-service-detail',
  templateUrl: './service-detail.component.html'
})
export class ServiceDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  serviceDetail: TableOption;

  id: number;

  constructor(
    private doctorService: DoctorService,
    private doctorTableService: DoctorTableService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorService.serviceDetailConfig();
    this.serviceDetail = new TableOption({
      titles: this.doctorTableService.setServiceDetailTitles(),
      ifPage: true
    });
    this.router.queryParams.subscribe(params => {
      this.id = +params['id'];
      if (!this.id) {
        this.serviceDetail.loading = false;
        this.serviceDetail.errorMessage = ERRMSG.nullMsg;
      } else {
        this.getList(this.id, 0);
      }
    });
  }

  getList(id, page) {
    this.serviceDetail.reset(page);
    this.doctorService.getServiceDetail(id, page, this.serviceDetail.size)
      .subscribe(res => {
        this.serviceDetail.loading = false;
        if (res.code === 0 && res.data.content && res.data.content.length === 0) {
          this.serviceDetail.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data.content) {
          this.serviceDetail.totalPage = res.data.totalPages;
          this.serviceDetail.lists = res.data.content;
        } else {
          this.serviceDetail.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.serviceDetail.loading = false;
        console.log(err);
        this.serviceDetail.errorMessage = ERRMSG.netErrMsg;
      });
  }
}
