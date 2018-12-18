import { FormBase, FormType } from './form-base';

export class FormRadio extends FormBase<any> {
  controlType?: FormType = FormType.radio;
  options: {
    id: string | number | boolean, // 值
    name: string, // 显示名称
    checked?: boolean // 是否选中
  }[];

  constructor(options: FormRadio) {
    super(options);
    this.options = options['options'] || [];
  }
}
