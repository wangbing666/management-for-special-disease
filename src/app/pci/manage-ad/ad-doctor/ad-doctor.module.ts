import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';

import { AdDoctorComponent } from './ad-doctor.component';
import { AdDoctorEditComponent } from './ad-doctor-edit/ad-doctor-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { AdDoctorService } from './_service/ad-doctor.service';
import { AdDoctorTableService } from './_service/ad-doctor-table.service';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  component: AdDoctorComponent,
  canActivate: [AuthGuardService]
},
  {
    path: 'edit',
    component: AdDoctorEditComponent,
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
    AdDoctorComponent,
    AdDoctorEditComponent
  ],
  providers: [
    AdDoctorService,
    AdDoctorTableService
  ]
})
export class AdDoctorModule {
}
