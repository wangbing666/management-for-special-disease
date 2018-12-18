import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';

import { AdPatientComponent } from './ad-patient.component';
import { AdPatientEditComponent } from './ad-patient-edit/ad-patient-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { AdPatientService } from './_service/ad-patient.service';
import { AdPatientTableService } from './_service/ad-patient-table.service';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  component: AdPatientComponent,
  canActivate: [AuthGuardService],
}, {
  path: 'edit',
  component: AdPatientEditComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MatTabsModule,
    MatChipsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AdPatientComponent,
    AdPatientEditComponent
  ],
  providers: [
    AdPatientService,
    AdPatientTableService
  ]
})
export class AdPatientModule {
}
