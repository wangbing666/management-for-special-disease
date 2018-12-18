import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { PushTimeComponent } from './push-time.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { PushTimeService } from './_service/push-time-service.service';
import { PushTimeTableService } from './_service/push-time-service-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: PushTimeComponent
}];

@NgModule({
  imports: [
    FormsModule,
    MatChipsModule,
    MatTabsModule,
    DTableModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PushTimeComponent
  ],
  providers: [
    PushTimeService,
    PushTimeTableService
  ]
})
export class PushTimeModule {
}
