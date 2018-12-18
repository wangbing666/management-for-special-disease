import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { RegisterStatisticsComponent } from './register-statistics.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { RegisterStatisticsService } from './_service/register-statistics.service';
import { RegisterStatisticsTableService } from './_service/register-statistics-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: RegisterStatisticsComponent
}];

@NgModule({
  imports: [
    MatTabsModule,
    DTableModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RegisterStatisticsComponent
  ],
  providers: [
    RegisterStatisticsService,
    RegisterStatisticsTableService
  ]
})
export class RegisterStatisticsModule {
}
