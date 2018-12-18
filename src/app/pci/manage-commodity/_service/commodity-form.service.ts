import { Injectable, Inject } from '@angular/core';
import { FormBase } from '../../../libs/dform/_entity/form-base';
import { FormDropdown } from '../../../libs/dform/_entity/form-dropdown';
import { FormEditor } from '../../../libs/dform/_entity/form-editor';
import { FormFile } from '../../../libs/dform/_entity/form-file';
import { FormText } from '../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../libs/dform/_entity/form-textarea';

@Injectable()
export class CommodityFormService {

  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth
  ) {
  }

  setForm(data?: any) {
    const forms: FormBase<any> [] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'id',
          label: 'ID',
          value: data && data.id || '',
          readonly: true,
          required: true,
          order: 0
        })
      );
    }

    forms.push(
      new FormFile({
        key: 'avatar',
        label: '商品小图',
        value: data && data.avatar || '',
        url: `${this.app.pci.BASE_URL}api/upload`,
        required: true,
        order: 1
      }),
      new FormFile({
        key: 'pictures',
        label: '详情图片',
        value: data && data.pictures || [],
        url: `${this.app.pci.BASE_URL}api/upload/list`,
        multiple: true,
        required: false,
        order: 2
      }),
      new FormText({
        key: 'title',
        label: '商品标题',
        value: data && data.title || '',
        required: true,
        order: 3
      }),
      new FormDropdown({
        key: 'type',
        label: '商品类型',
        value: data && (data.type === 0 ? data.type : data.type || ''),
        required: true,
        options: [{
          id: 0,
          name: '商品兑换'
        }, {
          id: 1,
          name: '现金兑换'
        }],
        order: 4
      }),
      new FormTextarea({
        key: 'introduction',
        label: '商品简介',
        value: data && data.introduction || '',
        required: true,
        order: 5
      }),
      new FormDropdown({
        key: 'status',
        label: '状态',
        value: data && (data.status === 0 ? data.status : data.status || ''),
        required: true,
        options: [{
          id: 0,
          name: '上架'
        }, {
          id: 1,
          name: '下架'
        }],
        order: 8
      }),
      new FormText({
        key: 'recommendValue',
        label: '推荐值',
        value: data && (data.recommendValue === 0 ? data.recommendValue : data.recommendValue || ''),
        type: 'number',
        required: false,
        order: 6
      }),
      new FormText({
        key: 'flower',
        label: '兑换鲜花',
        value: data && (data.flower === 0 ? data.flower : data.flower || ''),
        type: 'number',
        required: true,
        order: 7
      }),
      new FormEditor({
        key: 'description',
        label: '商品描述',
        value: data && data.description || '',
        required: true,
        order: 9
      }),
      new FormText({
        key: 'createUserId',
        label: '当前登录用户ID',
        value: this.auth.getAdminId(),
        readonly: true,
        required: false,
        order: 10
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
