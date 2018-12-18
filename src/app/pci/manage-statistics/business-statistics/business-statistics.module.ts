import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { BusinessStatisticsComponent } from './business-statistics.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { BusinessStatisticsService } from './_service/business-statistics.service';
import { BusinessStatisticsTableService } from './_service/business-statistics-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: BusinessStatisticsComponent
}];

@NgModule({
  imports: [
    MatTabsModule,
    DTableModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BusinessStatisticsComponent
  ],
  providers: [
    BusinessStatisticsService,
    BusinessStatisticsTableService
  ]
})
export class BusinessStatisticsModule {
}
