export class BasicService {
  id: number;
  name: string;
  iconUrl: string;
  enable: boolean;
  times: string;
  unitId: number;
  serviceNumbers: Array<any>;
  numbers: string | Array<string>;
  description: string;

  constructor(obj?: BasicService) {
    this.id = obj && obj.id || 0;
    this.name = obj && obj.name || '';
    this.iconUrl = obj && obj.iconUrl || '';
    this.enable = obj && obj.enable || true;
    this.times = obj && obj.times || null;
    this.unitId = obj && obj.unitId || 1;
    this.serviceNumbers = obj && obj.serviceNumbers || [];
    this.numbers = obj && obj.numbers || '';
    this.description = obj && obj.description || '';
  }
}
