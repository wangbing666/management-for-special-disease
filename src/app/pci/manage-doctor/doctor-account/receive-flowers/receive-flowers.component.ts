import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { DoctorAccountService } from '../_service/doctor-account.service';
import { DoctorAccountTableService } from '../_service/doctor-account-table.service';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-receive-flowers',
  templateUrl: './receive-flowers.component.html'
})
export class ReceiveFlowersComponent implements OnInit {
  containerConfig: ContainerConfig;
  receiveFlowersTable: TableOption;

  id: number;

  constructor(
    private doctorAccountService: DoctorAccountService,
    private doctorAccountTableService: DoctorAccountTableService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorAccountService.receiveFlowersConfig();
    this.receiveFlowersTable = new TableOption({
      titles: this.doctorAccountTableService.setIncomeDetailTitles(),
      ifPage: true
    });
    this.router.queryParams.subscribe(params => {
      this.id = +params['id'];
      if (!this.id) {
        this.receiveFlowersTable.loading = false;
        this.receiveFlowersTable.errorMessage = ERRMSG.nullMsg;
      } else {
        this.getReceiveFlowers(this.id, 0);
      }
    });
  }

  getReceiveFlowers(id, page: number) {
    this.receiveFlowersTable.reset(page);
    this.doctorAccountService.getDetailList(id, this.receiveFlowersTable.size, page)
      .subscribe(
        res => {
          this.receiveFlowersTable.loading = false;
          if (res.data && res.data.content && res.data.content.length === 0 && res.code === 0) {
            this.receiveFlowersTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.content && res.code === 0) {
            this.receiveFlowersTable.totalPage = res.data.totalPages;
            this.receiveFlowersTable.lists = res.data.content;
          } else {
            this.receiveFlowersTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.receiveFlowersTable.loading = false;
          console.log(err);
          this.receiveFlowersTable.errorMessage = ERRMSG.netErrMsg;
        });
  }
}
