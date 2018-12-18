import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { DoctorGroupService } from '../_service/doctor-group.service';
import { ServiceDetailTableService } from '../_service/service-detail-table.service';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html'
})
export class ServiceDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  serviceDetailTable: TableOption = new TableOption();

  id: number;

  constructor(
    private doctorGroupService: DoctorGroupService,
    private serviceDetailTableService: ServiceDetailTableService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorGroupService.serviceDetailConfig();
    this.serviceDetailTable = new TableOption({
      titles: this.serviceDetailTableService.setTitles(),
      ifPage: true
    });
    this.router.queryParams.subscribe(params => {
      this.id = +params['id'];
      if (!this.id) {
        this.serviceDetailTable.loading = false;
        this.serviceDetailTable.errorMessage = ERRMSG.nullMsg;
      } else {
        this.getIncomeDetail(this.id, 0);
      }
    });
  }

  getIncomeDetail(id: number, page: number) {
    this.serviceDetailTable.reset(page);
    this.doctorGroupService.getServiceDetails(id, page, this.serviceDetailTable.size)
      .subscribe(res => {
        this.serviceDetailTable.loading = false;
        if (res.data && res.data.content && res.data.content.length === 0 && res.code === 0) {
          this.serviceDetailTable.errorMessage = ERRMSG.nullMsg
        } else if (res.data && res.data.content && res.code === 0) {
          this.serviceDetailTable.totalPage = res.data.totalPages;
          this.serviceDetailTable.lists = res.data.content;
        } else {
          this.serviceDetailTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.serviceDetailTable.loading = false;
        console.log(err);
        this.serviceDetailTable.errorMessage = ERRMSG.netErrMsg;
      });
  }
}
