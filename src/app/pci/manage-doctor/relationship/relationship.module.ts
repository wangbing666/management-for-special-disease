import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { RelationshipComponent } from './relationship.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { RelationshipService } from './_service/relationship.service';
import { RelationshipTableService } from './_service/relationship-table.service';

const routes: Routes = [{
  path: '',
  component: RelationshipComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    DTableModule,
    LibModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RelationshipComponent
  ],
  providers: [
    RelationshipService,
    RelationshipTableService
  ]
})
export class RelationshipModule {
}
