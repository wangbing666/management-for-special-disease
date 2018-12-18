import { Injectable } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';

@Injectable()
export class ServiceRecordFormService {

  setForm(serviceList: any) {

    const forms: FormBase < any > [] = [
      new FormDropdown({
        key: 'serviceId',
        label: '选择服务',
        value: '',
        required: true,
        options: serviceList,
        order: 1
      }),
    ];

    return forms.sort((a, b) => a.order - b.order);
  }
}
