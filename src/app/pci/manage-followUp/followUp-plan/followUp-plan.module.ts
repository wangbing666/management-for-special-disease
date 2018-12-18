import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatTabsModule, MatGridListModule, MatListModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { FollowPlanComponent } from './followUp-plan.component';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { FollowPlanService } from './_service/followUp-plan.service';
import { FollowPlanTableService } from './_service/followUp-plan-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: FollowPlanComponent
}, {
  path: 'detail',
  component: PlanDetailComponent,
  canActivate: [AuthGuardService],
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MatTabsModule,
    MatChipsModule,
    FormsModule,
    MatGridListModule,
    MatListModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FollowPlanComponent,
    PlanDetailComponent
  ],
  providers: [
    FollowPlanService,
    FollowPlanTableService
  ]
})
export class FollowPlanModule {
}
