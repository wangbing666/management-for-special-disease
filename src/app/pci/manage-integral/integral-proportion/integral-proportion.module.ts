/**
 * Created by zhanglin on 2017/8/2.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { IntegralProportionService } from './_service/integral-proportion.service';
import { IntegralProportionComponent } from './integral-proportion.component';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: IntegralProportionComponent
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
    IntegralProportionComponent
  ],
  providers: [
    IntegralProportionService
  ]
})
export class IntegralProportionModule {
}
