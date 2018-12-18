import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { HospitalStatisticsService } from './_service/hospital-statistics.service';
import { HospitalStatisticsComponent } from './hospital-statistics.component';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: HospitalStatisticsComponent
}];

@NgModule({
  imports: [
    DTableModule,
    LibModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HospitalStatisticsComponent
  ],
  providers: [
    HospitalStatisticsService
  ]
})
export class HospitalStatisticsModule {
}
