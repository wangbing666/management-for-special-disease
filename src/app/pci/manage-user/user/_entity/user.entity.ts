export class User {
  userid: number;
  id: string;
  tel: string;
  name: string;
  sex: number;
  age: string;
  hospitalId: number;
  surgeon: string;
  avatarUrl: string;
  lastOperationDate: string;
  bracketNum: string;
  caseHistory: string;
  address: string;
  remark: string;
  state: boolean;
  failureReason: string;

  constructor(obj?: User) {
    this.userid = obj && obj.userid || 0;
    this.id = obj && obj.id || '';
    this.tel = obj && obj.tel || '';
    this.name = obj && obj.name || '';
    this.sex = obj && obj.sex || 0;
    this.age = obj && obj.age || '';
    this.hospitalId = obj && obj.hospitalId || 1;
    this.surgeon = obj && obj.surgeon || '';
    this.avatarUrl = obj && obj.avatarUrl || '';
    this.lastOperationDate = obj  && obj.lastOperationDate || '';
    this.bracketNum = obj && obj.bracketNum || '';
    this.caseHistory = obj && obj.caseHistory || '';
    this.address = obj && obj.address || '';
    this.remark = obj && obj.remark || '';
    this.state = obj && obj.state || null;
  }
}
