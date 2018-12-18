import { FormBase, FormType } from './form-base';

export class FormTime extends FormBase<Date | string> {
  controlType?: FormType = FormType.time;

  constructor(options: FormTime) {
    super(options);
  }
}
