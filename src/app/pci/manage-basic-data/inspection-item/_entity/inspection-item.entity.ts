export class InspectionItem {
  id: number;
  recordExaminationTypeId: any;
  type: any;
  name: string;
  alias: string;
  unit: any;
  max: any;
  min: any;
  reference: any;
  chart: any;
  minY: any;
  maxY: any;
  intervalY: any;
  color: any;
  typeList: any;

  constructor(typeList?, obj?: InspectionItem) {
    this.id = obj && obj.id || 0;
    this.recordExaminationTypeId = obj && obj.recordExaminationTypeId || '';
    this.type = obj && obj.type || '';
    this.name = obj && obj.name || '';
    this.alias = obj && obj.alias || '';
    this.unit = obj && obj.unit || '';
    this.max = obj && obj.max || '';
    this.min = obj && obj.min || '';
    this.reference = obj && obj.reference || '';
    this.chart = obj && obj.chart || '';
    this.minY = obj && obj.minY || '';
    this.maxY = obj && obj.maxY || '';
    this.intervalY = obj && obj.intervalY || '';
    this.color = obj && obj.color || '';
    this.typeList = typeList || '';
  }
}
