import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatTabsModule, MatGridListModule, MatListModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { FollowFeedbackComponent } from './followUp-feedback.component';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { FollowFeedbackService } from './_service/followUp-feedback.service';
import { FollowFeedbackTableService } from './_service/followUp-feedback-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: FollowFeedbackComponent
}, {
  path: 'detail',
  component: FeedbackDetailComponent,
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
    FollowFeedbackComponent,
    FeedbackDetailComponent
  ],
  providers: [
    FollowFeedbackService,
    FollowFeedbackTableService
  ]
})
export class FollowFeedbackModule {
}
