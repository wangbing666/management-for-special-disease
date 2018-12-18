import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerConfig } from '../../../libs/common/container/container.component';
import { HintDialog } from '../../../libs/dmodal/dialog.component';
import { TableOption } from '../../../libs/dtable/dtable.entity';
import { FollowUpPlanService } from './_service/follow-up-plan.service';
import { FollowUpPlanTableService } from './_service/follow-up-plan-table.service';
import { FollowUpPlan } from './_entity/follow-up-plan.entity';
import { ERRMSG } from '../../_store/static';

@Component({
  selector: 'app-follow-up-plan',
  templateUrl: './follow-up-plan.component.html'
})
export class FollowUpPlanComponent implements OnInit {
  containerConfig: ContainerConfig;
  followUpPlanTable: TableOption;
  @select(['followUpPlan', 'tab']) tab: Observable<number>;

  discomfortTypes = [{
    id: 1,
    name: '一个月'
  }, {
    id: 3,
    name: '三个月'
  }, {
    id: 6,
    name: '六个月'
  }, {
    id: 9,
    name: '九个月'
  }, {
    id: 12,
    name: '十二个月'
  }];

  constructor(
    @Inject('action') private action,
    private followUpPlanService: FollowUpPlanService,
    private followUpPlanTableService: FollowUpPlanTableService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.containerConfig = this.followUpPlanService.followUpPlanConfig();
    this.followUpPlanTable = new TableOption({
      titles: this.followUpPlanTableService.setTitles(),
      ifPage: false
    });
    this.reset();

  }

  reset() {
    this.tab.subscribe(key => {
      key = key || 1;
      this.followUpPlanTable.queryKey = key;
      this.getFollowUpPlans();
    })
  }

  getFollowUpPlans() {
    this.followUpPlanService.getFollowUpPlans(this.followUpPlanTable.queryKey)
      .subscribe(res => {
        this.followUpPlanTable.loading = false;
        if (res.data && res.data.length === 0 && res.code === 0) {
          this.followUpPlanTable.errorMessage = ERRMSG.nullMsg;
        } else if (res.data && res.code === 0) {
          this.followUpPlanFormat(res.data);
          this.followUpPlanTable.lists = res.data;
        } else {
          this.followUpPlanTable.errorMessage = res.msg || ERRMSG.otherMsg;
        }
      }, err => {
        this.followUpPlanTable.loading = false;
        console.log(err);
        this.followUpPlanTable.errorMessage = ERRMSG.netErrMsg;
      })
  }

  gotoHandle(res) {
    const followUpPlan = <FollowUpPlan>res.value;
    if (res.key === 'edit') {
      this.action.dataChange('followUpPlan', followUpPlan);
      this.router.navigate(['/follow-up-plan/edit']);
    }
    if (res.key === 'del') {
      HintDialog('您确定要删除该信息？', this.dialog).afterClosed().subscribe(result => {
        if (result && result.key === 'confirm') {
          this.process(followUpPlan.id);
        }
      });
    }
  }

  followUpPlanFormat(data) {
    data.forEach(obj => {
      if (obj.custom === true) {
        obj.customName = obj.name;
        obj.name = '自定义';
      }
    });
  }

  // 新增随访项
  newData() {
    this.action.dataChange('followUpPlan', new FollowUpPlan());
    this.router.navigate(['/follow-up-plan/edit']);
  }

  // 确定删除
  process(id) {
    this.followUpPlanService.followUpPlanDelete(id)
      .subscribe(res => {
        if (res.code === 0) {
          HintDialog('操作成功', this.dialog);
          this.reset();
        } else {
          HintDialog(res.msg || '操作失败', this.dialog);
        }
      }, err => {
        console.log(err);
        HintDialog('操作失败', this.dialog);
      });
  }

  setQuery() {
    this.action.tabChange('followUpPlan', this.followUpPlanTable.queryKey);
  }
}
