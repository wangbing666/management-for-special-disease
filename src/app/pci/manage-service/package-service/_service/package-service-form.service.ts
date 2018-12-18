import { Inject, Injectable } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormCheckbox } from '../../../../libs/dform/_entity/form-checkbox';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormEditor } from '../../../../libs/dform/_entity/form-editor';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormText } from '../../../../libs/dform/_entity/form-text';

@Injectable()
export class PackageServiceFormService {

  constructor(
    @Inject('app') private app,
    @Inject('auth') private auth
  ) {
  }

  setForm(doctorPackages, thirdPackages, data?: any) {

    const forms: FormBase<any>[] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'combinatorialId',
          label: '用户ID',
          value: data && data.id || '',
          readonly: true,
          required: true,
          order: 0
        })
      );
    }

    forms.push(
      new FormText({
        key: 'name',
        label: '套餐名称',
        value: data && data.name || '',
        required: true,
        order: 2
      }),
      new FormFile({
        key: 'iconUrl',
        label: '套餐图片',
        value: data && data.iconUrl || '',
        url: `${this.app.pci.BASE_URL}api/upload`,
        required: false,
        order: 1
      }),
      new FormDropdown({
        key: 'doctorPackageId',
        label: '医生小组服务',
        value: data && (data.packageId === 0 ? data.packageId : data.packageId || ''),
        required: true,
        options: doctorPackages,
        order: 4
      }),
      new FormCheckbox({
        key: 'specificationIds',
        label: '第三方服务',
        value: data && data.thirdServiceIds || [],
        required: false,
        options: thirdPackages,
        order: 4
      }),
      new FormText({
        key: 'price',
        label: '套餐价格',
        value: data && (data.price === 0 ? data.price : data.price || ''),
        required: true,
        order: 5
      }),
      new FormDropdown({
        key: 'enable',
        label: '状态',
        value: data && (data.enable === 0 ? data.enable : data.enable || ''),
        required: true,
        options: [
          {id: true, name: '启用'},
          {id: false, name: '禁用'}
        ],
        order: 4
      }),
      new FormEditor({
        key: 'description',
        label: '套餐说明',
        value: data && data.description || '',
        required: false,
        order: 11
      }),
      new FormText({
        key: 'operator',
        label: '操作人',
        readonly: true,
        value: this.auth.getAdminName(),
        order: 12
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
