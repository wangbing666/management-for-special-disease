import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DownloadOriginComponent } from './download-origin.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { DownloadOriginService } from './_service/download-origin.service';
import { DownloadOriginTableService } from './_service/download-origin-table.service';
import { DownloadOriginFormService } from './_service/download-origin-form.service';

const routes: Routes = [{
  path: '',
  component: DownloadOriginComponent,
  canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [
    FormsModule,
    MatTabsModule,
    DTableModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DownloadOriginComponent
  ],
  providers: [
    DownloadOriginService,
    DownloadOriginTableService,
    DownloadOriginFormService
  ]
})
export class DownloadOriginModule {
}
