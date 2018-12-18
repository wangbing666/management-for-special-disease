/**
 * Created by zhanglin on 2017/7/18.
 */
export class Drug {
  id: number;
  name: string;
  company: string;
  method: string;
  take: string;
  dosageForm: string;
  doseSpecification: string;
  enableName: string
  constructor(obj?: Drug) {
    this.id = obj && obj.id || 0;
    this.name = obj && obj.name || '';
    this.company = obj && obj.company || '';
    this.method = obj && obj.method || '';
    this.take = obj && obj.take || '';
    this.dosageForm = obj && obj.dosageForm || '';
    this.doseSpecification = obj && obj.doseSpecification || '';
    this.enableName = obj && obj.enableName || '';
  }
}
