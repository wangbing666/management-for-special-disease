import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { InspectionCategoryComponent } from './inspection-category.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { InspectionCategoryService } from './_service/inspection-category.service';
import { InspectionCategoryTableService } from './_service/inspection-category-table.service';

const routes: Routes = [{
  path: '',
  component: InspectionCategoryComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    DTableModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    InspectionCategoryComponent
  ],
  providers: [
    InspectionCategoryService,
    InspectionCategoryTableService
  ]
})
export class InspectionCategoryModule {
}
