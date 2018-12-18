import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { AssessmentRiskComponent } from './assessment-risk.component';
import { RiskDetailComponent } from './risk-detail/risk-detail.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { AssessmentRiskService } from './_service/assessment-risk.service';
import { AssessmentRiskTableService } from './_service/assessment-risk-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: AssessmentRiskComponent
}];

@NgModule({
  imports: [
    LibModule,
    DTableModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AssessmentRiskComponent,
    RiskDetailComponent
  ],
  providers: [
    AssessmentRiskService,
    AssessmentRiskTableService
  ],
  entryComponents: [RiskDetailComponent]
})
export class AssessmentRiskModule {
}
