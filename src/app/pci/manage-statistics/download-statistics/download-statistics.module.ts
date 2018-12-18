import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DownloadStatisticsComponent } from './download-statistics.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { DownloadStatisticsService } from './_service/download-statistics.service';
import { DownloadStatisticsTableService } from './_service/download-statistics-table.service';

const routes: Routes = [
  {
    path: '',
    component: DownloadStatisticsComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    MatTabsModule,
    DTableModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DownloadStatisticsComponent
  ],
  providers: [
    DownloadStatisticsService,
    DownloadStatisticsTableService
  ]
})
export class DownloadStatisticsModule {
}
