import { Injectable } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';

@Injectable()
export class DoctorAccountFormService {

  setForm(data?: any) {
    const forms: FormBase<any>[] = [];

    forms.push(
      new FormText({
        key: 'expressName',
        label: '快递公司',
        value: data && data.expressCompany || '',
        disabled: true,
        required: true,
        order: 1
      }),
      new FormTextarea({
        key: 'expressNo',
        label: '快递单号',
        value: data && data.expressNo || '',
        disabled: true,
        required: true,
        order: 2
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
