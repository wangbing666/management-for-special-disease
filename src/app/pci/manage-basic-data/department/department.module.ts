import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DepartmentComponent } from './department.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { DepartmentService } from './_service/department.service';
import { DepartmentTableService } from './_service/department-table.service';

const routes: Routes = [{
  path: '',
  component: DepartmentComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    DTableModule,
    LibModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DepartmentComponent
  ],
  providers: [
    DepartmentService,
    DepartmentTableService
  ]
})
export class DepartmentModule {
}
