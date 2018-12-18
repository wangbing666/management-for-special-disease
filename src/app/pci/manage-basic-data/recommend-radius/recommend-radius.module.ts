/**
 * Created by zhanglin on 2017/8/1.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { RecommendRadiusComponent } from './recommend-radius.component';
import { RecommendRadiusService } from './_service/recommend-radius.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: RecommendRadiusComponent
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
    RecommendRadiusComponent
  ],
  providers: [
    RecommendRadiusService
  ]
})
export class RecommendRadiusModule {
}
