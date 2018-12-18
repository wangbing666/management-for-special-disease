import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DrugComponent } from './drug.component';
import { DrugEditComponent } from './drug-edit/drug-edit.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { DrugService } from './_service/drug.service';
import { DrugFormService } from './_service/drug-form.service';
import { DrugTableService } from './_service/drug-table.service';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [{
  path: '',
  component: DrugComponent,
  canActivate: [AuthGuardService]
},
  {
    path: 'edit',
    component: DrugEditComponent,
    canActivate: [AuthGuardService]
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
    DrugComponent,
    DrugEditComponent
  ],
  providers: [
    DrugService,
    DrugFormService,
    DrugTableService
  ]
})
export class DrugModule {
}
