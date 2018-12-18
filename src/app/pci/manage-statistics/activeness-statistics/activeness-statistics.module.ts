import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { ActivenessStatisticsComponent } from './activeness-statistics.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { ActivenessStatisticsService } from './_service/activeness-statistics.service';
import { ActivenessStatisticsTableService } from './_service/activeness-statistics-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: ActivenessStatisticsComponent
}];

@NgModule({
  imports: [
    MatInputModule,
    MatTabsModule,
    DTableModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ActivenessStatisticsComponent
  ],
  providers: [
    ActivenessStatisticsService,
    ActivenessStatisticsTableService
  ]
})
export class ActivenessStatisticsModule {
}
