import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatChipsModule, MatGridListModule, MatListModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { InsuranceCertificationComponent } from './insurance-certification.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { InsuranceCertificationService } from './_service/insurance-certification.service';
import { InsuranceCertificationTableService } from './_service/insurance-certification-table.service';
import { DFormModule } from '../../../libs/dform/dform.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: InsuranceCertificationComponent
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MatTabsModule,
    MatChipsModule,
    MatGridListModule,
    MatListModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    InsuranceCertificationComponent
  ],
  providers: [
    InsuranceCertificationService,
    InsuranceCertificationTableService
  ]
})
export class InsuranceCertificationModule {
}
