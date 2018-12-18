import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VersionControlComponent } from './version-control.component';
import { VersionControlEditComponent } from './version-control-edit/version-control-edit.component';
import { AuthGuardService } from '../_service/auth-guard.service';
import { VersionControlService } from './_service/version-control.service';
import { VersionControlFormService } from './_service/version-control-form.service';
import { VersionControlTableService } from './_service/version-control-table.service';
import { DTableModule } from '../../libs/dtable/dtable.module';
import { DFormModule } from '../../libs/dform/dform.module';
import { LibModule } from '../../libs/common/lib.module';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: VersionControlComponent
}, {
  path: 'edit',
  canActivate: [AuthGuardService],
  component: VersionControlEditComponent
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
    VersionControlComponent,
    VersionControlEditComponent
  ],
  providers: [
    VersionControlService,
    VersionControlFormService,
    VersionControlTableService
  ]
})
export class VersionControlModule {
}
