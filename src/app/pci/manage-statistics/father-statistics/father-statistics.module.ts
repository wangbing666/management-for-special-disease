import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FatherStatisticsComponent } from './father-statistics.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { FatherStatisticsService } from './_service/father-statistics.service';
import { FatherStatisticsTableService } from './_service/father-statistics-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: FatherStatisticsComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
    FatherStatisticsComponent
  ],
  providers: [
    FatherStatisticsService,
    FatherStatisticsTableService
  ]
})
export class FatherStatisticsModule {
}
