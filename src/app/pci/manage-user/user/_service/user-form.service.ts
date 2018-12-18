import { Inject, Injectable } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormDate } from '../../../../libs/dform/_entity/form-date';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';
import { User } from '../_entity/user.entity';

@Injectable()
export class UserFormService {

  constructor(
    @Inject('app') private app
  ) {
  }

  setForm(hospitalList, data?: User) {

    const forms: FormBase<any> [] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'userId',
          label: '用户ID',
          value: data && data.id || '',
          readonly: true,
          required: true,
          order: 0
        }),
        new FormText({
          key: 'tel',
          label: '手机号',
          value: data && data.tel || '',
          readonly: true,
          required: true,
          order: 1
        })
      );
    } else {
      forms.push(
        new FormText({
          key: 'tel',
          label: '手机号',
          value: data && data.tel || '',
          required: true,
          order: 1
        }),
      );
    }

    forms.push(
      new FormText({
        key: 'name',
        label: '用户姓名',
        value: data && data.name || '',
        required: true,
        order: 2
      }),
      new FormFile({
        key: 'avatarUrl',
        label: '头像',
        value: data && data.avatarUrl || '',
        url: `${this.app.pci.BASE_URL}api/upload`,
        required: false,
        order: 3
      }),
      new FormText({
        key: 'age',
        label: '年龄',
        value: data && data.age || '',
        required: true,
        order: 5
      }),
      new FormDropdown({
        key: 'sex',
        label: '性别',
        value: data && data.sex || 0,
        required: true,
        options: [
          {id: '0', name: '男'},
          {id: '1', name: '女'}
        ],
        order: 4
      }),
      new FormDropdown({
        key: 'hospitalId',
        label: '手术医院',
        value: data && data.hospitalId || 0,
        required: false,
        options: hospitalList,
        order: 6
      }),
      new FormText({
        key: 'surgeon',
        label: '手术医生',
        value: data && (data.surgeon || ''),
        required: false,
        order: 7
      }),
      new FormDate({
        key: 'lastOperationDate',
        label: '最后手术时间',
        value: data && (data.lastOperationDate || ''),
        required: false,
        order: 7
      }),
      new FormText({
        key: 'bracketNum',
        label: '支架个数',
        value: data && data.bracketNum || '',
        required: false,
        order: 8
      }),
      new FormText({
        key: 'caseHistory',
        label: '病史',
        value: data && data.caseHistory || '',
        required: false,
        order: 9
      }),
      new FormTextarea({
        key: 'address',
        label: '地址',
        value: data && data.address || '',
        required: false,
        order: 10
      }),
      new FormTextarea({
        key: 'remark',
        label: '备注',
        value: data && data.remark || '',
        required: false,
        order: 11
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
