import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase } from '../_entity/form-base';

@Injectable()
export class DFormControlService {
  constructor() {
  }

  toFormGroup(forms: FormBase<any>[]) {
    const group: any = {};

    forms.forEach(form => {
      if (form.pattern) {
        group[form.key] = form.required ?
          new FormControl({
              value: form.value == 0 ? form.value : form.value || '',
              disabled: form.disabled
            },
            Validators.compose([
              Validators.required,
              Validators.pattern(form.pattern)
            ])) :
          new FormControl({
              value: form.value == 0 ? form.value : form.value || '',
              disabled: form.disabled
            },
            Validators.compose([
              Validators.pattern(form.pattern)
            ]));
      } else {
        group[form.key] = form.required ?
          new FormControl({
              value: form.value == 0 ? form.value : form.value || '',
              disabled: form.disabled
            },
            Validators.compose([
              Validators.required
            ])) :
          new FormControl({
            value: form.value == 0 ? form.value : form.value || '',
            disabled: form.disabled
          });
      }
    });
    return new FormGroup(group);
  }
}
