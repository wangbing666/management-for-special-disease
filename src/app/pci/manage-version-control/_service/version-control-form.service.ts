import { Injectable, Inject } from '@angular/core';
import { FormBase } from '../../../libs/dform/_entity/form-base';
import { FormText } from '../../../libs/dform/_entity/form-text';
import { FormDropdown } from '../../../libs/dform/_entity/form-dropdown';

@Injectable()
export class VersionControlFormService {

  constructor(@Inject('auth') private auth) {}

  setForm(data ?: any) {

    const forms: FormBase < any > [] = [];

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
        key: 'version',
        label: '版本号',
        value: data && data.version || '',
        required: true,
        order: 1
      }),
      new FormText({
        key: 'title',
        label: '更新标题',
        value: data && data.title || '',
        required: true,
        order: 2
      }),
      new FormText({
        key: 'content',
        label: '更新详情',
        value: data && data.content || '',
        required: true,
        order: 3
      }),
      new FormText({
        key: 'url',
        label: '下载地址',
        value: data && data.url || '',
        required: true,
        order: 4
      }),
      new FormDropdown({
        key: 'hard',
        label: '是否强制更新',
        value: data && (data.hard === false ? data.hard : data.hard || ''),
        required: true,
        options: [{
          id: true,
          name: '是'
        }, {
          id: false,
          name: '否'
        }],
        order: 5
      }),
      new FormDropdown({
        key: 'platform',
        label: '平台',
        value: data && (data.platform === 0 ? data.platform : data.platform || ''),
        required: true,
        options: [{
          id: 0,
          name: 'IOS'
        }, {
          id: 1,
          name: '安卓'
        }],
        order: 6
      }),
      new FormDropdown({
        key: 'product',
        label: '产品',
        value: data && (data.product === 0 ? data.product : data.product || ''),
        required: true,
        options: [{
          id: 0,
          name: '医生端'
        }, {
          id: 1,
          name: '用户端'
        }],
        order: 7
      }),
      new FormText({
        key: 'adminId',
        label: '操作人',
        value: this.auth.getAdminId(),
        required: false,
        readonly: true,
        order: 8
      }));

    return forms.sort((a, b) => a.order - b.order);
  }
}
