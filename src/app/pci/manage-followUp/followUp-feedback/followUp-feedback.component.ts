import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { FollowFeedbackService } from './_service/followUp-feedback.service';
import { FollowFeedbackTableService } from './_service/followUp-feedback-table.service';
import { FollowFeedback } from './_entity/followUp-feedback.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-follow-feedback',
  templateUrl: './followUp-feedback.component.html'
})
export class FollowFeedbackComponent implements OnInit {

  containerConfig: ContainerConfig;
  followFeedbackTable: TableOption;
  createdDate: any;
  followRate: any;
  newDate: any;
  option = {
    start: 0,
    end: 0
  };

  @select(['followFeedback', 'page']) page: Observable<Array<number>>;

  constructor(
    @Inject('action') private action,
    @Inject('search') private search,
    private router: Router,
    private followFeedbackService: FollowFeedbackService,
    private followFeedbackTableService: FollowFeedbackTableService
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.followFeedbackService.followFeedbackConfig();
    this.newDate = this.search.setDefaultDate();
    console.log(this.newDate);
    this.followFeedbackTable = new TableOption({
      titles: this.followFeedbackTableService.setTitles(),
      ifPage: true
    });
    this.reset();
  }

  reset() {
    this.followFeedbackTable.queryKey = '';
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
    this.action.pageChange('followFeedback',
      [page]);
    this.followFeedbackTable.reset(page);
    this.followFeedbackService.getData(page, this.followFeedbackTable.size, this.followFeedbackTable.queryKey, this.option.start, this.option.end)
      .subscribe(
        res => {
          this.followFeedbackTable.loading = false;
          if (res.code === 0 && res.data && res.data.flupFeedbackDto && res.data.flupFeedbackDto.content && res.data.flupFeedbackDto.content.length === 0) {
            this.followFeedbackTable.errorMessage = ERRMSG.nullMsg;
            this.followRate = res.data.feedBackRate;
          } else if (res.code === 0 && res.data && res.data.flupFeedbackDto && res.data.flupFeedbackDto.content) {
            this.followFeedbackTable.totalPage = res.data.flupFeedbackDto.totalPages;
            this.followRate = res.data.feedBackRate;
            res.data.flupFeedbackDto.content.forEach(obj => {
              obj.firstFlupTime = this.formatTime(obj.firstFlupTime);
              if (obj.feedBackStatus == true) {
                obj.feedBackStatus = '已反馈'
              } else {
                obj.feedBackStatus = '未反馈'
              }
            });
            this.followFeedbackTable.lists = res.data.flupFeedbackDto.content;
          } else {
            this.followFeedbackTable.errorMessage = res.msg || ERRMSG.otherMsg;
          }
        }, err => {
          this.followFeedbackTable.loading = false;
          console.log(err);
          this.followFeedbackTable.errorMessage = ERRMSG.netErrMsg;
        });
  }

  gotoHandle(res) {
    const followFeedback = <FollowFeedback>res.value;
    this.action.dataChange('followFeedback', followFeedback);
    this.router.navigate(['/followUp-feedback/detail']);
  }

  formatTime(time) {
    let date = new Date(time),
      Y = date.getFullYear() + '-',
      M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
      D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return Y + M + D;
  }
}
