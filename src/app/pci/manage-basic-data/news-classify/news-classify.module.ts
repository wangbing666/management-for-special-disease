import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibModule } from '../../../libs/common/lib.module';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { NewsClassifyComponent } from './news-classify.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { NewsClassifyService } from './_service/news-classify.service';
import { NewsClassifyTableService } from './_service/news-classify-table.service';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: NewsClassifyComponent
}];

@NgModule({
  imports: [
    DTableModule,
    LibModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    NewsClassifyComponent
  ],
  providers: [
    NewsClassifyService,
    NewsClassifyTableService
  ]
})
export class NewsClassifyModule {
}
