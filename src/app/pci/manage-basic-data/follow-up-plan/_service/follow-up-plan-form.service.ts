import { Injectable } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormText } from '../../../../libs/dform/_entity/form-text';

@Injectable()
export class FollowUpPlanFormService {

  setForm(
    followTypeId?: number,
    followId?: number,
    follow?: any
  ) {
    const forms: FormBase<any> [] = [];

    forms.push(
      new FormDropdown({
        key: 'type',
        label: '随访时间',
        value: followTypeId || '',
        options: [{
          id: 1,
          name: '一个月'
        }, {
          id: 3,
          name: '三个月'
        }, {
          id: 6,
          name: '六个月'
        }, {
          id: 9,
          name: '九个月'
        }, {
          id: 12,
          name: '十二个月'
        }],
        required: true,
        order: 1
      }),
      new FormDropdown({
        key: 'custom',
        label: '随访项',
        value: followId || '',
        options: [{
          id: 1,
          name: '复查血一套'
        }, {
          id: 2,
          name: '心电图'
        }, {
          id: 3,
          name: '心超和彩超'
        }, {
          id: 4,
          name: '24小时心电图'
        }, {
          id: 5,
          name: '颈动脉多普勒超声'
        }, {
          id: 6,
          name: '复查冠脉造影'
        }, {
          id: 7,
          name: '自定义'
        }],
        required: false,
        order: 2
      }),
      new FormText({
        key: 'name',
        label: '自定义内容',
        value: follow && follow.name || '',
        required: false,
        order: 3
      }));

    return forms.sort((a, b) => a.order - b.order);
  }
}
