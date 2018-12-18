import { Injectable } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';

@Injectable()
export class DoctorGroupFormService {

  setForm(data?: any) {
    const forms: FormBase<any>[] = [];

    forms.push(
      new FormText({
        key: 'id',
        label: '#',
        value: data && data.id || '',
        readonly: true,
        order: 0
      }),
      new FormText({
        key: 'groupName',
        label: '医生小组名称',
        value: data && data.groupName || '',
        readonly: true,
        order: 1
      }),
      new FormText({
        key: 'name',
        label: '组长',
        value: data && data.name || '',
        readonly: true,
        order: 2
      }),
      new FormText({
        key: 'managerNames',
        label: '管理员',
        value: data && data.managerNames || '',
        readonly: true,
        order: 3
      }),
      new FormText({
        key: 'memberNames',
        label: '小组成员',
        value: data && data.memberNames || '',
        readonly: true,
        order: 4
      }),
      new FormTextarea({
        key: 'description',
        label: '小组简介',
        value: data && data.description || '',
        required: true,
        order: 5
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
