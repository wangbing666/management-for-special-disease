import { Inject, Injectable } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormDropdown } from '../../../../libs/dform/_entity/form-dropdown';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormText } from '../../../../libs/dform/_entity/form-text';
import { FormTextarea } from '../../../../libs/dform/_entity/form-textarea';
import { Doctor } from '../_entity/doctor.entity';

@Injectable()
export class DoctorFormService {

  constructor(
    @Inject('app') private app,
    @Inject('auth') private authService
  ) {
  }

  setForm(
    hospitals: Array<any>,
    departments: Array<any>,
    doctorTitles: Array<any>,
    data?: Doctor
  ) {
    const forms: FormBase<any>[] = [];

    if (data) {
      forms.push(
        new FormText({
          key: 'tel',
          label: '手机号',
          value: data && data.tel || '',
          readonly: true,
          required: true,
          order: 0
        })
      )
    } else {
      forms.push(
        new FormText({
          key: 'tel',
          label: '手机号',
          value: data && data.tel || '',
          required: true,
          order: 0
        }),
        new FormText({
          key: 'auditor',
          label: '添加人',
          value: this.authService.getAdminName(),
          required: true,
          order: 8
        })
      );
    }

    forms.push(
      new FormText({
        key: 'name',
        label: '医生姓名',
        value: data && data.name || '',
        required: true,
        validated: true,
        order: 1
      }),
      new FormDropdown({
        key: 'hospitalId',
        label: '所属医院',
        value: data && data.hospitalId || '',
        required: true,
        options: hospitals,
        order: 3
      }),
      new FormDropdown({
        key: 'departmentId',
        label: '所属科室',
        value: data && data.departmentId || '',
        required: true,
        options: departments,
        order: 4
      }),
      new FormDropdown({
        key: 'titleId',
        label: '职称',
        value: data && data.doctorTitleId || '',
        required: true,
        options: doctorTitles,
        order: 5
      }),
      new FormFile({
        key: 'avatarUrl',
        label: '头像',
        value: data && data.avatarUrl || '',
        required: false,
        url: this.app.pci.UPLOAD_URL,
        order: 2
      }),
      new FormFile({
        key: 'certificationUrl',
        label: '职称证明或医院工牌',
        value: data && data.certificationUrl || '',
        required: true,
        url: `${this.app.pci.BASE_URL}api/upload`,
        order: 6
      }),
      new FormTextarea({
        key: 'description',
        label: '医生简介',
        value: data && data.description || '',
        required: false,
        order: 7
      })
    );

    return forms.sort((a, b) => a.order - b.order);
  }
}
