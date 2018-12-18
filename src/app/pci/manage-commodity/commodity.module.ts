import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommodityComponent } from './commodity.component';
import { CommodityEditComponent } from './commodity-edit/commodity-edit.component';
import { AuthGuardService } from '../_service/auth-guard.service';
import { CommodityService } from './_service/commodity.service';
import { CommodityFormService } from './_service/commodity-form.service';
import { CommodityTableService } from './_service/commodity-table.service';
import { DTableModule } from '../../libs/dtable/dtable.module';
import { DFormModule } from '../../libs/dform/dform.module';
import { LibModule } from '../../libs/common/lib.module';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: CommodityComponent
}, {
  path: 'edit',
  canActivate: [AuthGuardService],
  component: CommodityEditComponent
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
    CommodityComponent,
    CommodityEditComponent
  ],
  providers: [
    CommodityService,
    CommodityFormService,
    CommodityTableService
  ]
})
export class CommodityModule {
}
