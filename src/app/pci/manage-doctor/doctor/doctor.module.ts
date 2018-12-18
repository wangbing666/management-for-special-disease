import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatTabsModule, MatGridListModule, MatListModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DoctorComponent } from './doctor.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { DoctorIntegralComponent } from './doctor-integral/doctor-integral.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { DoctorService } from './_service/doctor.service';
import { DoctorFormService } from './_service/doctor-form.service';
import { DoctorTableService } from './_service/doctor-table.service';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';

const routes: Routes = [{
  path: '',
  component: DoctorComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'edit',
  component: DoctorEditComponent,
  canActivate: [AuthGuardService],
}, {
  path: 'message',
  component: SendMessageComponent,
  canActivate: [AuthGuardService],
}, {
  path: 'integral',
  component: DoctorIntegralComponent,
  canActivate: [AuthGuardService],
}, {
  path: 'service-list',
  component: ServiceListComponent,
  canActivate: [AuthGuardService],
}, {
  path: 'service-detail',
  component: ServiceDetailComponent,
  canActivate: [AuthGuardService],
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
    DoctorComponent,
    DoctorEditComponent,
    SendMessageComponent,
    DoctorIntegralComponent,
    ServiceListComponent,
    ServiceDetailComponent
  ],
  providers: [
    DoctorService,
    DoctorTableService,
    DoctorFormService
  ]
})
export class DoctorModule {
}
