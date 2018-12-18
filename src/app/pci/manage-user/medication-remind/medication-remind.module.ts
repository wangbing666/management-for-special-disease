import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatChipsModule, MatGridListModule, MatListModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { MedicationRemindComponent } from './medication-remind.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { MedicationRemindService } from './_service/medication-remind.service';
import { MedicationRemindTableService } from './_service/medication-remind-table.service';
import { DFormModule } from '../../../libs/dform/dform.module';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: MedicationRemindComponent
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
    MedicationRemindComponent
  ],
  providers: [
    MedicationRemindService,
    MedicationRemindTableService
  ]
})
export class MedicationRemindModule {
}
