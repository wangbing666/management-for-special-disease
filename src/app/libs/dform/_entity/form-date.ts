import { FormBase, FormType } from './form-base';

export class FormDate extends FormBase<Date | string> {
  controlType?: FormType = FormType.date;
  options?: {
    minDate?: any;
    maxDate?: any;
  };

  constructor(options: FormDate) {
    super(options);
    this.options = options['options'] || null;
  }
}
