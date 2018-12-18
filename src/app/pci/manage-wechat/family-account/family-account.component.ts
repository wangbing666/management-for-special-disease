import { Component, OnInit } from '@angular/core';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { FamilyAccountService } from './_service/family-account.service';
import { FamilyAccountTableService } from './_service/family-account-table.service';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-family-account',
  templateUrl: './family-account.component.html'
})
export class FamilyAccountComponent implements OnInit {
  containerConfig: ContainerConfig;
  familyAccountTable: TableOption;

  constructor(
    private familyAccountService: FamilyAccountService,
    private familyAccountTableService: FamilyAccountTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.familyAccountService.familyAccountConfig();
    this.familyAccountTable = new TableOption({
      titles: this.familyAccountTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.familyAccountTable.queryKey = '';
    this.getFamilyAccounts(0);
  }

  getFamilyAccounts(page: number) {
    this.familyAccountTable.reset(page);
    this.familyAccountService.getFamilyAccounts(this.familyAccountTable.queryKey, page, this.familyAccountTable.size)
      .subscribe(
        res => {
          this.familyAccountTable.loading = false;
          if (res.data && res.data.content && res.data.content.length === 0 && res.code === 0) {
            this.familyAccountTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.data && res.data.content && res.code === 0) {
            this.familyAccountTable.totalPage = res.data.totalPages;
            this.familyAccountTable.lists = res.data.content;
          } else {
            this.familyAccountTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.familyAccountTable.loading = false;
          console.log(err);
          this.familyAccountTable.errorMessage = ERRMSG.netErrMsg;
        });
  }
}
