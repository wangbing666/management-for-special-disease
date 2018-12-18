import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatChipsModule, MatGridListModule, MatListModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { UserCertificationComponent } from './user-certification.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { UserCertificationService } from './_service/user-certification.service';
import { UserCertificationTableService } from './_service/user-certification-table.service';
import { DFormModule } from '../../../libs/dform/dform.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: UserCertificationComponent
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
    UserCertificationComponent
  ],
  providers: [
    UserCertificationService,
    UserCertificationTableService
  ]
})
export class UserCertificationModule {
}
