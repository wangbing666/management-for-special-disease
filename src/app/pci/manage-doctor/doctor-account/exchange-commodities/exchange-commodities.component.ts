import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { DoctorAccountService } from '../_service/doctor-account.service';
import { DoctorAccountTableService } from '../_service/doctor-account-table.service';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-exchange-commodities',
  templateUrl: './exchange-commodities.component.html'
})
export class ExchangeCommoditiesComponent implements OnInit {
  containerConfig: ContainerConfig;
  exchangeCommoditiesTable: TableOption = new TableOption();

  id: number;

  constructor(
    private doctorAccountService: DoctorAccountService,
    private doctorAccountTableService: DoctorAccountTableService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.doctorAccountService.exchangeCommoditiesConfig();
    this.exchangeCommoditiesTable = new TableOption({
      titles: this.doctorAccountTableService.setExchangeDetailTitles(),
      ifPage: true
    });
    this.router.queryParams.subscribe(params => {
      this.id = +params['id'];
      if (!this.id) {
        this.exchangeCommoditiesTable.loading = false;
        this.exchangeCommoditiesTable.errorMessage = ERRMSG.nullMsg;
      } else {
        this.getExchangeCommodities(this.id, 0);
      }
    });
  }

  getExchangeCommodities(id, page: number) {
    this.exchangeCommoditiesTable.reset(page);
    this.doctorAccountService.getExchangeList(id, this.exchangeCommoditiesTable.size, page)
      .subscribe(
        res => {
          this.exchangeCommoditiesTable.loading = false;
          if (res.data && res.data.content && res.data.content.length === 0 && res.code === 0) {
            this.exchangeCommoditiesTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.content && res.code === 0) {
            this.exchangeCommoditiesTable.totalPage = res.data.totalPages;
            this.exchangeCommoditiesTable.lists = res.data.content;
          } else {
            this.exchangeCommoditiesTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.exchangeCommoditiesTable.loading = false;
          console.log(err);
          this.exchangeCommoditiesTable.errorMessage = ERRMSG.netErrMsg;
        });
  }
}
