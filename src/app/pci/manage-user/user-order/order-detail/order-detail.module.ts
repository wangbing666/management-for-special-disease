import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatListModule } from '@angular/material';

import { OrderDetailComponent } from './order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule
  ],
  declarations: [
    OrderDetailComponent
  ],
  entryComponents: [
    OrderDetailComponent
  ],
  exports: [
    OrderDetailComponent
  ]
})
export class OrderDetailModule {
}
