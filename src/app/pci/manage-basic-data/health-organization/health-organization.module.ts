import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthOrganizationComponent } from './health-organization.component';
import { HealthOrganizationEditComponent } from './health-organization-edit/health-organization-edit.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { HealthOrganizationService } from './_service/health-organization.service';
import { HealthOrganizationFormService } from './_service/health-organization-form.service';
import { HealthOrganizationTableService } from './_service/health-organization-table.service';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { LibModule } from '../../../libs/common/lib.module';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: HealthOrganizationComponent
}, {
  path: 'edit',
  canActivate: [AuthGuardService],
  component: HealthOrganizationEditComponent
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
    HealthOrganizationComponent,
    HealthOrganizationEditComponent
  ],
  providers: [
    HealthOrganizationService,
    HealthOrganizationFormService,
    HealthOrganizationTableService
  ]
})
export class HealthOrganizationModule {
}
