export class Medicine {
  id: number;
  name: string; // 药品名称
  take: string; // 用量
  dose: string; // 药量
  frequency: string; // 频率
  method: string; // 用法
  remind: boolean; // 提醒开关
  spec: string; // 规格
  startTime: any; // 开始时间
  time: string; // 服药时间
  deleted: boolean; // 删除
  unit: string; // 单位
}

export class Inspection {
  id: number;
  name: string;
  itemId: number; // 父id
  max: string; // 上限值
  min: string; // 下限值
  reference: string; // 参考值
  standard: string; // 标准
  unit: string; // 单位
  type: string | number; // 参考值类型 0无 1范围
  value: string; // 数值
  deleted: boolean; // 删除
  examinationItemCheckDate: string; // 检查时间
}

export class Image {
  clinicalDiagnosis: string; // 临床诊断
  deleted: boolean; // 删除
  description: string; // 影像描述
  id: number; // id
  name: string; // 检查名称
  orderNo: string; // 报告单号
  suggestion: string; // 诊断意见
  technique: string; // 检查技术
  time: string; // 报告日期
}

export class InspectionFormList {
  itemId;
  list: Inspection[];
  deleted: boolean;

  constructor(obj?: { itemId?, list?: Inspection[] }) {
    this.itemId = obj && obj.itemId || '';
    this.list = obj && obj.list || new Array(new Inspection());
  }
}

export class Collection {
  id: number;
  recordHistoryType: number; // 数据类型
  checkDate: string; // 检查时间
  hospitalName: string; // 医院
  officeName: string; // 科室
  medicalRecordPhotoList: Array<number>; // 关联照片
  InspectionFormList: InspectionFormList[]; // 检验报告
  recordExaminationItemList: Inspection[]; // 检验报告
  recordPrescriptionMedicineList: Medicine[]; // 用药清单
  recordImagingReportList: Image[]; // 用药清单
  content: string; // 就诊记录-诊断
  reason: string; // 影像资料-诊断
  title: string; // 其他-标题名
  remark: string; // 其他-备注

  hospitalNo: string; // 住院号
  pathobiologyNo: string; // 病理号
  xrayNo: string; // X光号
  bedNo: string; // 床号
  sectionOffice: string; // 科别
  inTime: string; // 入院时间
  outTime: string; // 出院时间
  cause: string; // 入院诊断
  diagnosis: string; // 出院诊断
  briefHistoryName: string; // 患者
  briefHistoryChief: string; // 主诉
  briefHistoryPresent: string; // 现病史
  briefHistoryPast: string; // 既往史
  physicalTemperature: string; // 体检T
  physicalPulse: string; // 体检P
  physicalRespiration: string; // 体检R
  physicalBloodPressureDiastolic: number; // 体检BP 低
  physicalBloodPressureSystolic: number; // 体检BP 高
  physicalExamination: string; // 体检摘要
  treatmentCondition: string; // 病理与治疗情况
  treatmentResult: string; // 治疗结果
  leaveCondition: string; // 出院时情况
  leaveSuggestion: string; // 出院后用药建议
  physicianChief: string; // 副主任／主任医师
  physicianAttending: string; // 主治医师
  physicianResident: string; // 住院医师
  physicianIntern: string; // 实习医师
  writeTime: string; // 填写时间
  deleted: boolean; // 删除
}
