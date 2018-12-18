import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { MissionIntegralComponent } from './mission-Integral.component';
import { IntegralSigninComponent } from './mission-Integral-edit/integral-signin-edit.component'
import { IntegralRecordComponent } from './mission-Integral-edit/integral-record-edit.component';
import { IntegralElseComponent } from './mission-Integral-edit/integral-else-edit.component'
import { AuthGuardService } from '../../_service/auth-guard.service';
import { MissionIntegralService } from './_service/mission-Integral.service';
import { MissionIntegralTableService } from './_service/mission-Integral-table.service';

const routes: Routes = [{
  path: '',
  component: MissionIntegralComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    MatDialogModule,
    LibModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MissionIntegralComponent,
    IntegralSigninComponent,
    IntegralRecordComponent,
    IntegralElseComponent,
  ],
  providers: [
    MissionIntegralService,
    MissionIntegralTableService
  ],
  entryComponents: [IntegralSigninComponent, IntegralRecordComponent, IntegralElseComponent]
})
export class MissionIntegralModule {
}
