import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionItemComponent } from './inspection-item.component';
import { InspectionItemEditComponent } from './inspection-item-edit/inspection-item-edit.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { InspectionItemService } from './_service/inspection-item.service';
import { InspectionItemTableService } from './_service/inspection-item-table.service';
import { InspectionItemFormService } from './_service/inspection-item-form.service';
import { LibModule } from '../../../libs/common/lib.module';
import { LibDialogModule } from '../../../libs/dmodal/dialog.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';

const routes: Routes = [{
  path: '',
  component: InspectionItemComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'edit',
  component: InspectionItemEditComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    LibModule,
    LibDialogModule,
    DTableModule,
    DFormModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    InspectionItemComponent,
    InspectionItemEditComponent
  ],
  providers: [
    InspectionItemService,
    InspectionItemTableService,
    InspectionItemFormService
  ]
})
export class InspectionItemModule {
}
