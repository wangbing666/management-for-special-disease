import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntegralOrderComponent } from './integral-order.component';
import { AuthGuardService } from '../../_service/auth-guard.service';
import { IntegralOrderService } from './_service/integral-order.service';
import { IntegralOrderTableService } from './_service/integral-order-table.service';
import { DTableModule } from '../../../libs/dtable/dtable.module';
import { DFormModule } from '../../../libs/dform/dform.module';
import { LibModule } from '../../../libs/common/lib.module';
import { MatChipsModule, MatTabsModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { IntegralOrderFormService } from './_service/integral-order-form.service';
import { SendMessageComponent } from './send-message/send-message.component';

const routes: Routes = [{
  path: '',
  canActivate: [AuthGuardService],
  component: IntegralOrderComponent
}, {
  path: 'send-message',
  canActivate: [AuthGuardService],
  component: SendMessageComponent
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
    IntegralOrderComponent,
    SendMessageComponent
  ],
  providers: [
    IntegralOrderService,
    IntegralOrderFormService,
    IntegralOrderTableService
  ]
})
export class IntegralOrderModule {
}
