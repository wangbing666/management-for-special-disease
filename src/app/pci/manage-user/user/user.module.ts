import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatTabsModule, MatGridListModule, MatListModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { UserComponent } from './user.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserUploadComponent } from './user-upload/user-upload.component';
import { IntegralDetailComponent } from './integral-detail/integral-detail.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { UserService } from './_service/user.service';
import { UserFormService } from './_service/user-form.service';
import { UserTableService } from './_service/user-table.service';
import { UserIntegralDetailTableService } from './_service/user-integral-detail-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: UserComponent
}, {
  path: 'message',
  component: SendMessageComponent,
  canActivate: [AuthGuardService],
}, {
  path: 'edit',
  component: UserEditComponent,
  canActivate: [AuthGuardService],
}, {
  path: 'integral',
  component: IntegralDetailComponent,
  canActivate: [AuthGuardService],
}, {
  path: 'upload',
  component: UserUploadComponent,
  canActivate: [AuthGuardService],
}];

@NgModule({
  imports: [
    DTableModule,
    DFormModule,
    LibModule,
    MatTabsModule,
    MatChipsModule,
    FormsModule,
    MatGridListModule,
    MatListModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserComponent,
    UserEditComponent,
    SendMessageComponent,
    IntegralDetailComponent,
    UserUploadComponent
  ],
  providers: [
    UserService,
    UserFormService,
    UserTableService,
    UserIntegralDetailTableService
  ]
})
export class UserModule {
}
