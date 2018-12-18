import { Injectable, Inject } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormEditor } from '../../../../libs/dform/_entity/form-editor';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormHidden } from '../../../../libs/dform/_entity/form-hidden';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormRadio } from 'app/libs/dform/_entity/form-radio';

@Injectable()
export class HealthServiceFormService {

  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth
  ) {
  }

  setForm(organizationList, data?: any) {

    const forms: FormBase<any> [] = [];

    if (data) {
      forms.push(
        new FormHidden({
          key: 'serviceId',
          label: '',
          value: data && data.serviceId || '',
          order: 0
        })
      );
    }

    forms.push(
      new FormFile({
        key: 'imageUrl',
        label: '服务小图',
        value: data && data.imageUrl || '',
        url: this.app.pci.UPLOAD_URL,
        required: false,
        order: 1
      }),
      new FormFile({
        key: 'pictures',
        label: '详情图片',
        value: data && data.pictures || [],
        url: this.app.pci.UPLOAD_URL,
        multiple: true,
        required: false,
        order: 2
      }),
      new FormText({
        key: 'title',
        label: '服务名称',
        value: data && data.title || '',
        required: false,
        order: 3
      }),
      new FormDropdown({
        key: 'organId',
        label: '服务机构',
        value: data && data.organId || '',
        required: false,
        options: organizationList,
        order: 4
      }),
      new FormRadio({
        key: 'preference',
        label: '是否特惠',
        value: data && (data.preference === false ? data.preference : data.preference || ''),
        required: true,
        options: [
          {id: true, name: '是'},
          {id: false, name: '否'}
        ],
        order: 5
      }),
      new FormRadio({
        key: 'restr',
        label: '是否限购',
        value: data && (data.restr === false ? data.restr : data.restr || ''),
        required: true,
        options: [
          {id: true, name: '是'},
          {id: false, name: '否'}
        ],
        order: 6
      }),
      new FormText({
        key: 'restrictNum',
        label: '限购数量（是否限购为【是】时填写）',
        value: data && (data.restrictNum || ''),
        required: false,
        order: 7
      }),
      new FormRadio({
        key: 'usePoint',
        label: '是否使用积分抵扣',
        value: data && (data.usePoint === false ? data.usePoint : data.usePoint || ''),
        required: true,
        options: [
          {id: true, name: '是'},
          {id: false, name: '否'}
        ],
        order: 8
      }),
      new FormRadio({
        key: 'settingAddress',
        label: '是否需要地址信息',
        value: data && (data.settingAddress === false ? data.settingAddress : data.settingAddress || ''),
        required: true,
        options: [
          {id: true, name: '是'},
          {id: false, name: '否'}
        ],
        order: 9
      }),
      new FormRadio({
        key: 'settingUserInfo',
        label: '是否需要用户资料',
        value: data && (data.settingUserInfo === false ? data.settingUserInfo : data.settingUserInfo || ''),
        required: true,
        options: [
          {id: true, name: '是'},
          {id: false, name: '否'}
        ],
        order: 10
      }),
      new FormRadio({
        key: 'enable',
        label: '状态',
        value: data && (data.enable === false ? data.enable : data.enable || ''),
        required: false,
        options: [
          {id: true, name: '启用'},
          {id: false, name: '禁用'}
        ],
        order: 11
      }),
      new FormText({
        key: 'validPeriod',
        label: '有效期',
        value: data && (data.validPeriod || ''),
        required: false,
        order: 12
      }),
      new FormEditor({
        key: 'details',
        label: '商品参数',
        value: data && (data.details || ''),
        required: false,
        order: 15
      }),
      new FormText({
        key: 'forPeople',
        label: '适用人群',
        value: data && (data.forPeople || ''),
        required: false,
        order: 13
      }),
      new FormText({
        key: 'description',
        label: '服务简介',
        value: data && (data.description || ''),
        required: false,
        order: 14
      }),
      new FormEditor({
        key: 'content',
        label: '商品描述',
        value: data && data.content || '',
        required: false,
        order: 16
      }),
      new FormHidden({
        key: 'createdBy',
        label: '',
        value: this.auth.getAdminName(),
        required: false,
        order: 17
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
