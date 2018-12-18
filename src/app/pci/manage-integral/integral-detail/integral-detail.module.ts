import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatChipsModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { IntegralDetailComponent } from './integral-detail.component';
import { IntegralDetailEditComponent } from './integral-detail-edit/integral-detail-edit.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { IntegralDetailService } from './_service/integral-detail.service';
import { IntegralDetailTableService } from './_service/integral-detail-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: IntegralDetailComponent
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    MatDialogModule,
    LibModule,
    MatTabsModule,
    MatChipsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    IntegralDetailComponent,
    IntegralDetailEditComponent
  ],
  providers: [
    IntegralDetailService,
    IntegralDetailTableService
  ],
  entryComponents: [IntegralDetailEditComponent]
})
export class IntegralDetailModule {
}
