import { Inject, Injectable } from '@angular/core';
import { FormBase } from '../../../../libs/dform/_entity/form-base';
import { FormFile } from '../../../../libs/dform/_entity/form-file';
import { FormText } from '../../../../libs/dform/_entity/form-text';

@Injectable()
export class HealthOrganizationFormService {
  constructor(
    @Inject('app') private app,
    @Inject('http') private http
  ) {
  }

  setForm(thirdParty?: any) {

    const thirdPartyforms: FormBase<any> [] = [];

    if (thirdParty) {
      thirdPartyforms.push(
        new FormText({
          key: 'id',
          label: '机构ID',
          value: thirdParty && thirdParty.id || '',
          required: true,
          readonly: true,
          order: 0
        })
      );
    }

    thirdPartyforms.push(
      new FormFile({
        key: 'imageUrl',
        label: '机构图片',
        value: thirdParty && thirdParty.imageUrl || '',
        url: `${this.app.pci.BASE_URL}api/upload`,
        required: true,
        order: 1
      })
    );

    thirdPartyforms.push(
      new FormText({
        key: 'name',
        label: '机构名称',
        value: thirdParty && thirdParty.name || '',
        required: true,
        order: 2
      })
    );

    return thirdPartyforms.sort((a, b) => a.order - b.order);
  }
}
