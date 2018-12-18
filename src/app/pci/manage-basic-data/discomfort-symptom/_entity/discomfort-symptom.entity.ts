export class DiscomfortSymptom {
  id: number;
  symptomTypeId: number;
  symptomUrl: string;
  name: string;
  enable: boolean;
  typeList: any;

  constructor(typeList, obj?: DiscomfortSymptom) {
    this.id = obj && obj.id || 0;
    this.symptomTypeId = obj && obj.symptomTypeId || null;
    this.symptomUrl = obj && obj.symptomUrl || '';
    this.name = obj && obj.name || '';
    this.enable = obj && obj.enable || null;
    this.typeList = typeList;
  }
}
