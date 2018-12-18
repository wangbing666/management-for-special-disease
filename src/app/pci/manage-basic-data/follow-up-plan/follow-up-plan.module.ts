import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { LibDialogModule } from '../../../libs/dmodal/dialog.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { FollowUpPlanComponent } from './follow-up-plan.component';
import { FollowUpPlanEditComponent } from './follow-up-plan-edit/follow-up-plan-edit.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { FollowUpPlanService } from './_service/follow-up-plan.service';
import { FollowUpPlanTableService } from './_service/follow-up-plan-table.service';

const routes: Routes = [{
  path: '',
  component: FollowUpPlanComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'edit',
  component: FollowUpPlanEditComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    LibModule,
    LibDialogModule,
    DFormModule,
    DTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FollowUpPlanComponent,
    FollowUpPlanEditComponent
  ],
  providers: [
    FollowUpPlanService,
    FollowUpPlanTableService
  ]
})
export class FollowUpPlanModule {
}
