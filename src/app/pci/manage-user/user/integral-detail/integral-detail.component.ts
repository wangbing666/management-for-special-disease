import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { UserService } from '../_service/user.service';
import { UserIntegralDetailTableService } from '../_service/user-integral-detail-table.service';
import { User } from '../_entity/user.entity';
import { ERRMSG } from '../../../_store/static';

@Component({
  selector: 'app-integral-detail',
  templateUrl: './integral-detail.component.html',
})
export class IntegralDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  userIntegralTable: TableOption;
  @select(['user', 'tab']) tab: Observable<number>;
  @select(['user', 'data']) user: Observable<User>;
  @select(['user', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    private integraldetailTableService: UserIntegralDetailTableService,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.userService.userIntegralConfig();
    this.userIntegralTable = new TableOption({
      titles: this.integraldetailTableService.setUserTitles(),
      ifPage: true
    });
    this.getIntegralDetailTable(0)
  }

  getIntegralDetailTable(page: number) {
    this.user.subscribe(res => {
      this.userService.userIntegralDetail(Number(res.id), page).subscribe(
        data => {
          this.userIntegralTable.loading = false;
          if (data.data && data.data.content && data.data.content.length === 0 && data.code === 0) {
            this.userIntegralTable.errorMessage = ERRMSG.nullMsg;
          } else if (data.data && data.data.content && data.code === 0) {
            this.userIntegralTable.totalPage = data.data.totalPages;
            this.userIntegralTable.lists = data.data.content;
          } else {
            this.userIntegralTable.errorMessage = ERRMSG.nullMsg;
          }
        }, err => {
          this.userIntegralTable.errorMessage = ERRMSG.nullMsg;
        })
    });
  }
}
