import { FormBase, FormType } from './form-base';

export class FormEditor extends FormBase<string> {
  controlType?: FormType = FormType.editor;
  size?: string; // 富文本大小

  constructor(options: FormEditor) {
    super(options);
    this.size = options['size'] || '30';
  }
}
