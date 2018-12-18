import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceSpecComponent } from './service-spec.component';
import { ServiceSpecEditComponent } from './service-spec-edit/service-spec-edit.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { ServiceSpecService } from './_service/service-spec.service';
import { ServiceSpecTableService } from './_service/service-spec-table.service';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { LibModule } from '../../../libs/common/lib.module';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: ServiceSpecComponent
},
  {
    path: 'edit',
    canActivate: [AuthGuardService],
    component: ServiceSpecEditComponent
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
    ServiceSpecComponent,
    ServiceSpecEditComponent
  ],
  providers: [
    ServiceSpecService,
    ServiceSpecTableService
  ]
})
export class ServiceSpecModule {
}
