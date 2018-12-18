import { Injectable } from '@angular/core';

class DataOption {
  key: string;
  title: string;

  constructor(key, title) {
    this.key = key;
    this.title = title;
  }
}

@Injectable()
export class DataCollectionDetailService {
  setCommonList() {
    return [
      new DataOption('checkDate', '检查时间'),
      new DataOption('recordHistoryTypeName', '数据类型'),
      new DataOption('hospitalName', '医院'),
      new DataOption('officeName', '科室')
    ];
  }

  setBasicList() {
    return [
      new DataOption('hospitalNo', '住院号'),
      new DataOption('pathobiologyNo', '病理号'),
      new DataOption('xrayNo', 'x光号'),
      new DataOption('bedNo', '床号'),
      new DataOption('sectionOffice', '科别'),
      new DataOption('inTime', '入院时间'),
      new DataOption('outTime', '出院时间'),
      new DataOption('cause', '入院诊断'),
      new DataOption('diagnosis', '出院诊断')
    ];
  }

  setBriefList() {
    return [
      new DataOption('briefHistoryName', '患者'),
      new DataOption('briefHistoryChief', '主诉'),
      new DataOption('briefHistoryPresent', '现病史'),
      new DataOption('briefHistoryPast', '既往史')
    ];
  }

  setPhysicalList() {
    return [
      new DataOption('physicalTemperature', 'T'),
      new DataOption('physicalPulse', 'P'),
      new DataOption('physicalRespiration', 'R'),
      new DataOption('physicalBloodPressure', 'BP'),
      new DataOption('physicalExamination', '摘要'),
    ];
  }

  setExtraList() {
    return [
      new DataOption('treatmentCondition', '病程与治疗情况'),
      new DataOption('treatmentResult', '治疗结果'),
      new DataOption('leaveCondition', '出院时情况'),
      new DataOption('leaveSuggestion', '出院用药及建议')
    ];
  }

  setDoctorList() {
    return [
      new DataOption('physicianChief', '副主任／主任医师'),
      new DataOption('physicianAttending', '主治医师'),
      new DataOption('physicianResident', '住院医师'),
      new DataOption('physicianIntern', '实习医师'),
      new DataOption('writeTime', '填写时间'),
    ];
  }

  setImageList() {
    return [
      new DataOption('name', '检查名称'),
      new DataOption('time', '报告日期'),
      new DataOption('orderNo', '报告单号'),
      new DataOption('clinicalDiagnosis', '临床诊断'),
      new DataOption('technique', '检查技术'),
      new DataOption('description', '影像描述'),
      new DataOption('suggestion', '诊断意见'),
    ];
  }

  setMedicalList() {
    return [
      new DataOption('name', '药品名称'),
      new DataOption('method', '建议用法'),
      new DataOption('take', '服用剂量'),
      new DataOption('unit', '剂量单位'),
      new DataOption('dose', '药量'),
      new DataOption('frequency', '频率'),
      new DataOption('spec', '规格'),
      new DataOption('time', '服用时间'),
      new DataOption('startTime', '开始时间'),
      new DataOption('remind', '提醒开关')
    ];
  }

  setRecordList() {
    return [
      new DataOption('content', '诊断')
    ];
  }

  setOtherList() {
    return [
      new DataOption('title', '标题名'),
      new DataOption('remark', '备注'),
    ];
  }

  setInspectionList() {
    return [
      new DataOption('name', '检查指标'),
      new DataOption('reference', '参考值'),
      new DataOption('max', '上限值'),
      new DataOption('min', '下限制'),
      new DataOption('unit', '单位'),
      new DataOption('value', '数值')
    ];
  }

}
