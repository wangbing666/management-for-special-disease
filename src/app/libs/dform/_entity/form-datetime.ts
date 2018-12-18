import { FormBase, FormType } from './form-base';

export class FormDatetime extends FormBase<Date | string> {
  controlType?: FormType = FormType.datetime;
  options?: any;

  constructor(options: FormDatetime) {
    super(options);
    this.options = options['options'] || 'datetime';
  }
}
