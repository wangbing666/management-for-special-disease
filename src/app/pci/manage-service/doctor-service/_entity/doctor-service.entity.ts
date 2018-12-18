export class DoctorService {
  id: number;
  name: string;
  iconUrl: string;
  enable: boolean;
  times: string;
  unitId: number;
  serviceNumbers: Array<any>;
  numbers: string | Array<string>;
  content: string;
  operationalRemark: string;

  constructor(obj?: DoctorService) {
    this.id = obj && obj.id || 0;
    this.name = obj && obj.name || '';
    this.iconUrl = obj && obj.iconUrl || '';
    this.enable = obj && obj.enable || true;
    this.times = obj && obj.times || null;
    this.unitId = obj && obj.unitId || 1;
    this.serviceNumbers = obj && obj.serviceNumbers || [];
    this.numbers = obj && obj.numbers || '';
    this.content = obj && obj.content || '';
    this.operationalRemark = obj && obj.operationalRemark || '';
  }
}

