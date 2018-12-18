import { Injectable } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormText } from '../../../../libs/dform/_entity/form-text';

@Injectable()
export class DrugFormService {

  setForm(
    data?: any
  ) {
    const forms: FormBase<any> [] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'id',
          label: 'id',
          value: data && data.id || '',
          required: true,
          readonly: true,
          order: 0
        }));
    }

    forms.push(
      new FormText({
        key: 'name',
        label: '药名',
        value: data && data.name || '',
        required: true,
        order: 1
      }),
      new FormText({
        key: 'company',
        label: '品牌',
        value: data && data.company || '',
        required: true,
        order: 2
      }),
      new FormText({
        key: 'method',
        label: '建议用法',
        value: data && data.method || '',
        required: true,
        order: 3
      }),
      new FormText({
        key: 'take',
        label: '服用剂量',
        value: data && data.take || '',
        required: true,
        order: 4
      }),
      new FormText({
        key: 'dosageForm',
        label: '单位',
        value: data && data.dosageForm || '',
        required: true,
        order: 5
      }),
      new FormText({
        key: 'doseSpecification',
        label: '药量',
        value: data && data.doseSpecification || '',
        required: true,
        order: 6
      }),
      new FormDropdown({
        key: 'enable',
        label: '状态',
        value: data && (data.enable === false ? data.enable : data.enable || ''),
        required: true,
        options: [
          {id: true, name: '启用'},
          {id: false, name: '禁用'}
        ],
        order: 7
      }));

    return forms.sort((a, b) => a.order - b.order);
  }
}
