import { FormBase, FormType } from './form-base';

export class FormCheckbox extends FormBase<Array<any>> {
  controlType?: FormType = FormType.checkbox;
  options: {
    id: any, // 值
    name: string,  // 显示名称
    checked: boolean  // 是否选中
  }[];

  constructor(options: FormCheckbox) {
    super(options);
    this.options = options['options'] || [];
  }
}
