import { Inject, Injectable } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormText } from '../../../../libs/dform/_entity/form-text';

@Injectable()
export class DiscomfortSymptomFormService {

  constructor(@Inject('app') private app) {
  }

  setForm(
    symptomTypes: Array<any>,
    data?: any
  ) {

    const forms: FormBase<any> [] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'symptomId',
          label: '不适症状ID',
          value: data && data.id || '',
          readonly: true,
          required: true,
          order: 0
        }));
    }

    forms.push(
      new FormDropdown({
        key: 'symptomTypeId',
        label: '请选择类型',
        value: data && data.symptomTypeId || '',
        required: true,
        options: symptomTypes,
        order: 1
      }),
      new FormFile({
        key: 'symptomUrl',
        label: '说明图片（可选）',
        value: data && data.symptomUrl || '',
        url: `${this.app.pci.BASE_URL}api/upload`,
        required: false,
        order: 2
      }),
      new FormText({
        key: 'name',
        label: '名称',
        value: data && data.name || '',
        required: true,
        order: 4
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
        order: 5
      }));

    return forms.sort((a, b) => a.order - b.order);
  }
}
