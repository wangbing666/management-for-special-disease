import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { LibDialogModule } from '../../../libs/dmodal/dialog.module';
import { AutoReplyComponent } from './auto-reply.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { AutoReplyService } from './_service/auto-reply.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: AutoReplyComponent
}];

@NgModule({
  imports: [
    LibModule,
    LibDialogModule,
    FormsModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AutoReplyComponent
  ],
  providers: [
    AutoReplyService
  ]
})
export class AutoReplyModule {
}
