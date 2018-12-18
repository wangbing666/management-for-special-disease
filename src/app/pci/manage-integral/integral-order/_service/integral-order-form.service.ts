import { Injectable, Inject } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormEditor } from '../../../../libs/dform/_entity/form-editor';
import { FormText } from '../../../../libs/dform/_entity/form-text';

@Injectable()
export class IntegralOrderFormService {
  constructor(@Inject('auth') private auth) {
  }

  setSendMessageForm(expressList, data?: any) {
    const forms: FormBase<any>[] = [];

    forms.push(
      new FormDropdown({
        key: 'expressId',
        label: '快递公司',
        value: data && data.id || '',
        required: true,
        options: expressList,
        order: 1
      }),
      new FormText({
        key: 'expressNo',
        label: '快递单号',
        value: data && data.trackingNum || '',
        required: true,
        order: 2
      }),
      new FormEditor({
        key: 'message',
        label: '短信内容',
        value: data && data.message || '',
        required: true,
        order: 3
      }),
    );

    return forms.sort((a, b) => a.order - b.order);
  }

  setEditNumberForm(expressList, data?: any) {
    const forms: FormBase<any>[] = [];

    forms.push(
      new FormDropdown({
        key: 'expressId',
        label: '快递公司',
        value: data && data.id || '',
        required: true,
        options: expressList,
        order: 1
      }),
      new FormText({
        key: 'expressNo',
        label: '快递单号',
        value: data && data.trackingNum || '',
        required: true,
        order: 2
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
