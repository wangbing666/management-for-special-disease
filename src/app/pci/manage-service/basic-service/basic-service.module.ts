import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { LibInputModule } from '../../../libs/dform/lib-input.module';
import { LibDialogModule } from '../../../libs/dmodal/dialog.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { BasicServiceComponent } from './basic-service.component';
import { BasicServiceEditComponent } from './basic-service-edit/basic-service-edit.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { BasicServiceService } from './_service/basic-service.service';
import { BasicServiceTableService } from './_service/basic-service-table.service';

const routes: Routes = [{
  path: '',
  component: BasicServiceComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'edit',
  component: BasicServiceEditComponent
}];

@NgModule({
  imports: [
    LibModule,
    LibDialogModule,
    LibInputModule,
    DFormModule,
    DTableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    BasicServiceComponent,
    BasicServiceEditComponent
  ],
  providers: [
    BasicServiceService,
    BasicServiceTableService
  ]
})
export class BasicServiceModule {
}
