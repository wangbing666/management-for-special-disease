import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { HealthDataComponent } from './health-data.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { HealthDataService } from './_service/health-data.service';
import { HealthDataTableService } from './_service/health-data-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: HealthDataComponent
}];

@NgModule({
  imports: [
    MatChipsModule,
    MatTabsModule,
    FormsModule,
    DTableModule,
    DFormModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HealthDataComponent
  ],
  providers: [
    HealthDataService,
    HealthDataTableService
  ]
})
export class HealthDataModule {
}
