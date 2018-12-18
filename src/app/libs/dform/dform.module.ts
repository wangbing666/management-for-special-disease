import { NgModule } from '@angular/core';

import { LibInputModule } from './lib-input.module';
import { DynamicFormComponent } from './component/form.component';
import { DynamicFormSetComponent } from './component/form-set.component';
import { DFormControlService } from './_service/form-control.service';

@NgModule({
  imports: [
    LibInputModule
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFormSetComponent
  ],
  providers: [
    DFormControlService
  ],
  exports: [
    LibInputModule,
    DynamicFormComponent,
    DynamicFormSetComponent
  ]
})
export class DFormModule {
}
