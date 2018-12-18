import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageServiceComponent } from './package-service.component';
import { PackageServiceEditComponent } from './package-service-edit/package-service-edit.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { PackageServiceService } from './_service/package-service.service';
import { PackageServiceFormService } from './_service/package-service-form.service';
import { PackageServiceTableService } from './_service/package-service-table.service';
import { ServiceSpecService } from '../service-spec/_service/service-spec.service';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { LibModule } from '../../../libs/common/lib.module';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: PackageServiceComponent
}, {
  path: 'edit',
  canActivate: [AuthGuardService],
  component: PackageServiceEditComponent
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
    PackageServiceComponent,
    PackageServiceEditComponent,
  ],
  providers: [
    PackageServiceService,
    PackageServiceFormService,
    PackageServiceTableService,
    ServiceSpecService
  ]
})
export class PackageServiceModule {
}
