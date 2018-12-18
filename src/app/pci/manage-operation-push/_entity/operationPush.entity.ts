export class OperationPush {
  id: number;
  content: string;
  operator: string;
  pushTime: string;
  pushUrl: string;
  skip: boolean;
  send: boolean;
  type: number; // 患者或者医生端


  constructor(obj?: OperationPush) {
    this.id = obj && obj.id || 0;
    this.content = obj && obj.content || '';
    this.pushTime = obj && obj.pushTime || '';
    this.operator = obj && obj.operator || '';
    this.pushUrl = obj && obj.pushUrl || '';
    this.skip = obj && obj.skip || true;
    this.send = obj && obj.send || true;
    this.type = obj && obj.type || 0;
  }
}
