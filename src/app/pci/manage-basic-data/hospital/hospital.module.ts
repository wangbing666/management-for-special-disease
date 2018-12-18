import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaiduMapModule } from 'angular2-baidu-map';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatTabsModule, MatDialogModule, MatListModule } from '@angular/material';
import { HospitalComponent, DialogComponent } from './hospital.component';
import { HospitalEditComponent } from './hospital-edit/hospital-edit.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { HospitalService } from './_service/hospital.service';
import { HospitalTableService } from './_service/hospital-table.service';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { LibModule } from '../../../libs/common/lib.module';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: HospitalComponent
}, {
  path: 'edit',
  canActivate: [AuthGuardService],
  component: HospitalEditComponent
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    BaiduMapModule,
    MatTabsModule,
    MatChipsModule,
    MatDialogModule,
    MatListModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HospitalComponent,
    HospitalEditComponent,
    DialogComponent
  ],
  providers: [
    HospitalService,
    HospitalTableService
  ],
  entryComponents: [DialogComponent]
})
export class HospitalModule {
}
