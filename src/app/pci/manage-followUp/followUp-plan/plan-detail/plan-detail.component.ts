import { Component, OnInit, Inject } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../../libs/common/container/container.component';
import { TableOption } from '../../../../libs/dtable/dtable.entity';
import { FollowPlanService } from '../_service/followUp-plan.service';
import { FollowPlanTableService } from '../_service/followUp-plan-table.service';
import { FollowPlan } from '../_entity/followUp-plan.entity';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  containerConfig: ContainerConfig;
  planDetailTable: TableOption;
  planDetailList: any;
  data: any;
  @select(['followPlan', 'data']) followPlan: Observable<FollowPlan>;

  constructor(
    @Inject('action') private action,
    private followPlanService: FollowPlanService,
    private followPlanTableService: FollowPlanTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.followPlanService.followPlanDetailConfig();
    this.planDetailTable = new TableOption({
      titles: this.followPlanTableService.setDetailTitles(),
      ifPage: true
    });
    this.followPlan.subscribe(data => {
      console.log(typeof data);
      if (data && data.feedbacks) {
        let feedbackList = data.feedbacks;
        feedbackList.forEach(obj => {
          if (obj.isFlup == true) {
            obj.isFlup = '已反馈';
          } else {
            obj.isFlup = '';
          }
        });
        this.data = data;
        this.planDetailList = data.feedbacks
      }
    });
  }
}
