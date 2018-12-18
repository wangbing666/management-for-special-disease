export enum ControlType { text, image, button, date, index, textButton }

export class TableTitle {
  name: string; // 表头标题
  key: string; // 取值key
  minwidth: number; // 最小宽度
  maxwidth: number; // 最大宽度
  controlType: ControlType; // 类型
  option: any; // 附加选项

  constructor(obj: {
    name: string,
    key: string,
    minwidth?: number,
    maxwidth?: number,
    controlType?: ControlType,
    option?: any
  }) {
    this.name = obj && obj.name;
    this.key = obj && obj.key;
    this.minwidth = obj && obj.minwidth || null;
    this.maxwidth = obj && obj.maxwidth || null;
    this.controlType = obj && obj.controlType || ControlType.text;
    this.option = obj && obj.option || null;
  }
}

export class TableOption {
  private _titles: TableTitle[]; // 表头列表
  private _lists: Array<any>; // 数据列表
  private _totalPage: number; // 总页数
  private _currentPage: number; // 当前页
  private _size: number; // 查询每页显示个数
  private _errorMessage: string; // 错误信息
  private _loading: boolean; // 是否加载中
  private _queryKey: any; // 查询键
  private _queryBind: boolean; // 下拉框查询
  private _ifPage: boolean; // 是否分页

  constructor(obj?: {
    titles: TableTitle[],
    size?: number,
    ifPage?: boolean,
    queryKey?: any
  }) {
    this._titles = obj && obj.titles || null;
    this._size = obj && obj.size || 20;
    this._ifPage = obj && obj.ifPage || false;
    this._lists = null;
    this._totalPage = 0;
    this._currentPage = 0;
    this._errorMessage = '';
    this._queryKey = obj && obj.queryKey || '';
    this._queryBind = false;
  }

  reset(page?): void {
    this._lists = null;
    this._loading = true;
    this._errorMessage = '';
    this._currentPage = page || 0;
  }

  get titles(): TableTitle[] {
    return this._titles;
  }

  set titles(value: TableTitle[]) {
    this._titles = value;
  }

  get lists(): Array<any> {
    return this._lists;
  }

  set lists(value: Array<any>) {
    this._lists = value;
  }

  get totalPage(): number {
    return this._totalPage;
  }

  set totalPage(value: number) {
    this._totalPage = value;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(value: number) {
    this._currentPage = value;
  }

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  set errorMessage(value: string) {
    this._errorMessage = value;
  }

  get loading(): boolean {
    return this._loading;
  }

  set loading(value: boolean) {
    this._loading = value;
  }

  get queryKey(): any {
    return this._queryKey;
  }

  set queryKey(value: any) {
    this._queryKey = value;
  }

  get queryBind(): any {
    return this._queryBind;
  }

  set queryBind(value: any) {
    this._queryBind = value;
  }

  get ifPage(): boolean {
    return this._ifPage;
  }

  set ifPage(value: boolean) {
    this._ifPage = value;
  }
}
