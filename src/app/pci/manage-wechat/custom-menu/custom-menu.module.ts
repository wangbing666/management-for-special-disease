import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { LibInputModule } from '../../../libs/dform/lib-input.module';
import { LibDialogModule } from '../../../libs/dmodal/dialog.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { CustomMenuComponent } from './custom-menu.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { CustomMenuService } from './_service/custom-menu.service';
import { CustomMenuFormService } from './_service/custom-menu-form.service';
import { CustomMenuTableService } from './_service/custom-menu-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: CustomMenuComponent
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
    CustomMenuComponent
  ],
  providers: [
    CustomMenuService,
    CustomMenuTableService,
    CustomMenuFormService
  ]
})
export class CustomMenuModule {
}
