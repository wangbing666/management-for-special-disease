import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntegralCommodityComponent } from './integral-commodity.component';
import { IntegralCommodityEditComponent } from './integral-commodity-edit/integral-commodity-edit.component';

import { AuthGuardService } from '../../_service/auth-guard.service';
import { IntegralCommodityService } from './_service/integral-commodity.service';
import { IntegralCommodityTableService } from './_service/integral-commodity-table.service';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { LibModule } from '../../../libs/common/lib.module';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: IntegralCommodityComponent
}, {
  path: 'edit',
  canActivate: [AuthGuardService],
  component: IntegralCommodityEditComponent
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
    IntegralCommodityComponent,
    IntegralCommodityEditComponent
  ],
  providers: [
    IntegralCommodityService,
    IntegralCommodityTableService
  ]
})
export class IntegralCommodityModule {
}
