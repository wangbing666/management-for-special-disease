import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthServiceComponent } from './health-service.component';
import { HealthServiceEditComponent } from './health-service-edit/health-service-edit.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { HealthServiceService } from './_service/health-service.service';
import { HealthServiceFormService } from './_service/health-service-form.service';
import { HealthServiceTableService } from './_service/health-service-table.service';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { LibModule } from '../../../libs/common/lib.module';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: HealthServiceComponent
}, {
  path: 'edit',
  canActivate: [AuthGuardService],
  component: HealthServiceEditComponent
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
    HealthServiceComponent,
    HealthServiceEditComponent
  ],
  providers: [
    HealthServiceService,
    HealthServiceFormService,
    HealthServiceTableService
  ]
})
export class HealthServiceModule {
}
