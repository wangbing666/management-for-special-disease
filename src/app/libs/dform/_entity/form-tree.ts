import { FormBase, FormType } from './form-base';

export class FormTree extends FormBase<Array<any>> {
  controlType?: FormType = FormType.tree;
  options: any;

  constructor(options: FormTree) {
    super(options);
    this.options = options['options'] || [];
  }
}
