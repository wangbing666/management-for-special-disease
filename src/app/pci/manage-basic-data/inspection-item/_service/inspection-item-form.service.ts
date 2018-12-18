import { Injectable } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormText } from '../../../../libs/dform/_entity/form-text';

@Injectable()
export class InspectionItemFormService {

  setForm(data?: any) {
    const forms: FormBase<any>[] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'id',
          label: 'ID',
          value: data && data.id || '',
          required: true,
          type: 'hidden',
          order: 0
        })
      );
    }

    forms.push(
      new FormText({
        key: 'type',
        label: '所属大类',
        value: data && data.type || '',
        required: true,
        order: 1
      }),
      new FormText({
        key: 'name',
        label: '项目名称',
        value: data && data.name || '',
        required: true,
        order: 2
      }),
      new FormText({
        key: 'alias',
        label: '别名',
        value: data && data.alias || '',
        required: true,
        order: 3
      }),
      new FormText({
        key: 'recordExaminationTypeId',
        label: '类型',
        value: data && data.recordExaminationTypeId || '',
        required: true,
        order: 4
      }),
      new FormText({
        key: 'unit',
        label: '单位',
        value: data && data.unit || '',
        required: true,
        order: 1
      }),
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
