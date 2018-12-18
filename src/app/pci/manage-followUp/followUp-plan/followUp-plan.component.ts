import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { FollowPlanService } from './_service/followUp-plan.service';
import { FollowPlanTableService } from './_service/followUp-plan-table.service';
import { FollowPlan } from './_entity/followUp-plan.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-follow-plan',
  templateUrl: './followUp-plan.component.html'
})
export class FollowPlanComponent implements OnInit {

  containerConfig: ContainerConfig;
  followPlanTable: TableOption;
  createdDate: any;
  option = {
    start: 0,
    end: 0
  };

  @select(['followPlan', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    @Inject('search') private search,
    private router: Router,
    private followPlanService: FollowPlanService,
    private followPlanTableService: FollowPlanTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.followPlanService.followPlanConfig();
    this.followPlanTable = new TableOption({
      titles: this.followPlanTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.followPlanTable.queryKey = '';
    this.createdDate = '';
    this.page.subscribe((page: Array<number>) => {
      this.getFollowList(page[0]);
    });
  }

  getFollowList(page: number) {
    if (this.createdDate) {
      const option = this.search.getStartAndEnd(this.createdDate);
      this.option = option;
    } else {
      this.option = {
        start: 0,
        end: 0
      };
    }
    this.action.pageChange('followPlan',
      [page]);
    this.followPlanTable.reset(page);
    this.followPlanService.getData(page, this.followPlanTable.size, this.followPlanTable.queryKey, this.option.start, this.option.end)
      .subscribe(
        res => {
          this.followPlanTable.loading = false;
          if (res.code === 0 && res.data && res.data.content && res.data.content.length === 0) {
            this.followPlanTable.errorMessage = ERRMSG.nullMsg;
          } else if (res.code === 0 && res.data && res.data.content) {
            this.followPlanTable.totalPage = res.data.totalPages;
            res.data.content.forEach(obj => {
              obj.firstFlupTime = this.formatTime(obj.firstFlupTime)
            })
            this.followPlanTable.lists = res.data.content;
          } else {
            this.followPlanTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.followPlanTable.loading = false;
          console.log(err);
          this.followPlanTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  gotoHandle(res) {
    const followPlan = <FollowPlan>res.value;
    this.action.dataChange('followPlan', followPlan);
    this.router.navigate(['/followUp-plan/detail']);
  }

  formatTime(time) {
    let date = new Date(time),
    Y = date.getFullYear() + '-',
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
    D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return Y + M + D;
  }
}
