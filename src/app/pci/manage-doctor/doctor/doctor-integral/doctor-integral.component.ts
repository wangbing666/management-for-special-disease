import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { DoctorService } from '../_service/doctor.service';
import { DoctorTableService } from '../_service/doctor-table.service';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-doctor-integral',
  templateUrl: './doctor-integral.component.html'
})
export class DoctorIntegralComponent implements OnInit {
  containerConfig: ContainerConfig;
  doctorIntegralTable: TableOption;

  id: number;

  constructor(
    private doctorService: DoctorService,
    private doctorTableService: DoctorTableService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorService.doctorIntegralConfig();
    this.doctorIntegralTable = new TableOption({
      titles: this.doctorTableService.setIntegralTitles(),
      ifPage: true
    });
    this.router.queryParams.subscribe(params => {
      this.id = +params['id'];
      if (!this.id) {
        this.doctorIntegralTable.loading = false;
        this.doctorIntegralTable.errorMessage = ERRMSG.nullMsg;
      } else {
        this.getIntegralDetail(this.id, 0);
      }
    });
  }

  getIntegralDetail(id, page) {
    this.doctorIntegralTable.reset(page);
    this.doctorService.doctorIntegralDetail(id, page)
      .subscribe(res => {
        this.doctorIntegralTable.loading = false;
        if (res.code === 0 && res.data.content && res.data.content.length === 0) {
          this.doctorIntegralTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.code === 0 && res.data.content) {
          this.doctorIntegralTable.totalPage = res.data.totalPages;
          this.doctorIntegralTable.lists = res.data.content;
        } else {
          this.doctorIntegralTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.doctorIntegralTable.loading = false;
        console.log(err);
        this.doctorIntegralTable.errorMessage = ERRMSG.netErrMsg;
      });
  }
}
