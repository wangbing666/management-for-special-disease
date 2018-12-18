import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { FamilyAccountComponent } from './family-account.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { FamilyAccountService } from './_service/family-account.service';
import { FamilyAccountTableService } from './_service/family-account-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: FamilyAccountComponent
}];

@NgModule({
  imports: [
    FormsModule,
    MatChipsModule,
    MatTabsModule,
    DTableModule,
    DFormModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FamilyAccountComponent
  ],
  providers: [
    FamilyAccountService,
    FamilyAccountTableService
  ]
})
export class FamilyAccountModule {
}
