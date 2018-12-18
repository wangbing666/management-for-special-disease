import { Injectable } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormHidden } from '../../../../libs/dform/_entity/form-hidden';
import { FormText } from '../../../../libs/dform/_entity/form-text';

@Injectable()
export class DoctorSortFormService {

  setForm(data: any) {

    const forms: FormBase<any> [] = [];

    forms.push(
      new FormHidden({
        key: 'doctorId',
        label: '职称ID',
        value: data && data.id || '',
        required: true,
        readonly: true,
        order: 0
      }),
      new FormText({
        key: 'name',
        label: '医生姓名',
        value: data && data.name || '',
        required: true,
        disabled: true,
        order: 1
      }),
      new FormText({
        key: 'hospital',
        label: '所属医院',
        value: data && data.hospital || '',
        required: true,
        disabled: true,
        order: 2
      }),

      new FormText({
        key: 'department',
        label: '所属科室',
        value: data && data.department || '',
        required: true,
        disabled: true,
        order: 3
      }),

      new FormText({
        key: 'jobTitle',
        label: '职称',
        value: data && data.jobTitle || '',
        required: true,
        disabled: true,
        order: 4
      }),

      new FormText({
        key: 'ranking',
        label: '推荐值',
        value: data && data.ranking || '',
        required: true,
        order: 5
      }),
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
