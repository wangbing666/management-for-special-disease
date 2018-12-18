import { Injectable, Inject } from '@angular/core';
import { FormBase } from '../../../libs/dform/_entity/form-base';
import { FormDropdown } from '../../../libs/dform/_entity/form-dropdown';
import { FormFile } from '../../../libs/dform/_entity/form-file';
import { FormText } from '../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../libs/dform/_entity/form-textarea';

@Injectable()
export class HealthNewsFormService {

  constructor(
    @Inject('app') private app,
    @Inject('auth') private admin
  ) {
  }

  setForm(
    typeList: Array<any>,
    data?: any
  ) {
    const forms: FormBase<any> [] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'id',
          label: '',
          value: data && data.id || '',
          required: true,
          readonly: true,
          order: 1
        }),
        new FormDropdown({
          key: 'articleTypeId',
          label: '健康资讯分类',
          value: data && data.articleType || '',
          required: true,
          options: typeList,
          order: 2
        }))
    } else {
      forms.push(
        new FormDropdown({
          key: 'articleTypeId',
          label: '健康资讯分类',
          value: data && data.articleType || '',
          required: true,
          options: typeList,
          order: 2
        }))
    }

    forms.push(
      new FormFile({
        key: 'imageUrl',
        label: '资讯图片',
        value: data && data.imageUrl || '',
        url: `${this.app.pci.BASE_URL}api/upload`,
        required: true,
        order: 3
      }),
      new FormText({
        key: 'title',
        label: '资讯标题',
        value: data && data.title || '',
        required: true,
        order: 4
      }),
      new FormTextarea({
        key: 'content',
        label: '资讯简介',
        value: data && data.content || '',
        required: true,
        order: 5
      }),
      new FormText({
        key: 'link',
        label: '资讯链接',
        value: data && data.link || '',
        required: true,
        order: 6
      }),
      new FormText({
        key: 'ranking',
        label: '推荐值',
        value: data && (data.ranking == 0 ? data.ranking : data.ranking || ''),
        required: true,
        order: 7
      }),
      new FormText({
        key: 'adminId',
        label: '上传者',
        value: this.admin.getAdminId(),
        readonly: true,
        required: false,
        order: 8
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
