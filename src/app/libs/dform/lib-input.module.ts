import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatIconModule,
  MatInputModule, MatRadioModule,
  MatCheckboxModule, MatSelectModule,
  MatGridListModule, MatDatepickerModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS
} from '@angular/material';

import { HttpService } from '../_service/http.service';
import { DFormControlService } from './_service/form-control.service';
import { LibInputTextComponent } from './component/lib-input/lib-input-text';
import { LibInputCheckboxComponent } from './component/lib-input/lib-input-checkbox';
import { LibInputDateComponent } from './component/lib-input/lib-input-date';
import { LibInputDatetimeComponent } from './component/lib-input/lib-input-datetime';
import { LibInputDropdownComponent } from './component/lib-input/lib-input-dropdown';
import { LibInputEditorComponent } from './component/lib-input/lib-input-editor';
import { LibInputFileComponent } from './component/lib-input/lib-input-file';
import { LibInputRadioComponent } from './component/lib-input/lib-input-radio';
import { LibInputTimeComponent } from './component/lib-input/lib-input-time';
import { LibInputTextareaComponent } from './component/lib-input/lib-input-textarea';
import { LibInputHiddenComponent } from './component/lib-input/lib-input-hidden';
import { LibInputTreeComponent } from './component/lib-input/lib-input-tree';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
  ],
  declarations: [
    LibInputTextComponent,
    LibInputCheckboxComponent,
    LibInputDateComponent,
    LibInputDatetimeComponent,
    LibInputDropdownComponent,
    LibInputEditorComponent,
    LibInputFileComponent,
    LibInputRadioComponent,
    LibInputTimeComponent,
    LibInputTextareaComponent,
    LibInputHiddenComponent,
    LibInputTreeComponent
  ],
  providers: [
    DFormControlService,
    HttpService,
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'zh-CN'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule,
    LibInputTextComponent,
    LibInputCheckboxComponent,
    LibInputDateComponent,
    LibInputDatetimeComponent,
    LibInputDropdownComponent,
    LibInputEditorComponent,
    LibInputFileComponent,
    LibInputRadioComponent,
    LibInputTimeComponent,
    LibInputTextareaComponent,
    LibInputHiddenComponent,
    LibInputTreeComponent
  ]
})
export class LibInputModule {
}
