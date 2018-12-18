/**
 * Created by zhanglin on 2017/7/31.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatChipsModule, MatGridListModule, MatListModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { ReservationBedComponent } from './reservation-bed.component';
import { ReservationBedService } from './_service/reservation-bed.service';
import { ReservationBedTableService } from './_service/reservation-bed-table.service';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  component: ReservationBedComponent,
  canActivate: [AuthGuardService]
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
    ReservationBedComponent
  ],
  providers: [
    ReservationBedService,
    ReservationBedTableService
  ]
})
export class ReservationBedModule {
}
