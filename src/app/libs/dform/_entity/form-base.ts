/**
 * Form 表单类型
 * text - input 文本
 * date - input 日期
 * time - input 时间
 * datetime - input 日期和时间
 * textarea - 多行文本输入
 * editor - 富文本编辑器
 * radio - 单选按钮
 * checkbox - 多选按钮
 * dropdown - 文本下拉框
 * file - 文件上传
 */

export enum FormType { text, date, time, datetime, textarea, editor, radio, checkbox, dropdown, file, hidden, tree }

export class FormBase<T> {
  value: T; // 默认值
  key: string; // 键值key
  label: string; // label显示名称
  maxlength?: number; // 限制最大可输入长度
  required?: boolean; // 是否必须
  validated?: boolean; // 暂未使用（文本验证）
  disabled?: boolean; // 是否可用
  readonly?: boolean; // 是否只读
  placeholder?: string; // 默认值
  controlType?: FormType; // Form类型
  errMsg?: string; // 错误提示
  order?: number; // 排序
  pattern?: string;

  constructor(options: FormBase<T>) {
    this.value = options.value;
    this.key = options.key;
    this.label = options.label;
    this.maxlength = options.maxlength || null;
    this.required = !!options.required;
    this.validated = !!options.validated;
    this.disabled = !!options.disabled;
    this.readonly = !!options.readonly;
    this.placeholder = options.placeholder || '';
    this.controlType = options.controlType || FormType.text;
    this.errMsg = options.errMsg || '';
    this.order = options.order || 1;
    this.pattern = options.pattern || null;
  }
}
