import { FormBase, FormType } from './form-base';

export class FormHidden extends FormBase<any> {
  controlType?: FormType = FormType.hidden;
  type?: string; // 文本框类型（超级不推荐使用date等浏览器支持有限的type类型，慎用！！！）

  constructor(options: FormHidden) {
    super(options);
    this.type = options['type'] || 'hidden';
  }
}
