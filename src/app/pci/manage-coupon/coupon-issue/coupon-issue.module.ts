import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { CouponIssueComponent } from './coupon-issue.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { CouponIssueService } from './_service/coupon-issue.service';
import { CouponIssueTableService } from './_service/coupon-issue-table.service';

const routes: Routes = [{
  path: '',
  component: CouponIssueComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    DTableModule,
    MatTabsModule,
    DFormModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CouponIssueComponent
  ],
  providers: [
    CouponIssueService,
    CouponIssueTableService,
  ]
})
export class CouponIssueModule {
}
