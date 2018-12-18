import { Navbar } from './main.state';

export let NAVBARS = [
  new Navbar({
    key: 'statistics',
    title: '数据统计',
    ifSub: true,
    subBars: [
      new Navbar({
        key: 'registerstatistics',
        title: '用户统计',
        link: '/register-statistics'
      }),
      new Navbar({
        key: 'hospitalstatistics',
        title: '医院渠道统计',
        link: '/hospital-statistics'
      }),
      new Navbar({
        key: 'activenessstatistics',
        title: '日活跃度统计',
        link: '/activeness-statistics'
      }),
      new Navbar({
        key: 'periodstatistics',
        title: '活跃度统计',
        link: '/period-statistics'
      }),
      new Navbar({
        key: 'businessstatistics',
        title: '业务数据统计',
        link: '/business-statistics'
      }),
      new Navbar({
        key: 'downloadtatistics',
        title: '渠道来源统计',
        link: '/download-statistics'
      }),
      // new Navbar({
      //   key: 'fatherstatistics',
      //   title: '父亲节统计',
      //   link: '/father-statistics'
      // })
    ]
  }),
  new Navbar({
    key: 'doctorgroup',
    title: '医生管理',
    ifSub: true,
    tag: 0,
    subBars: [
      new Navbar({
        key: 'doctor',
        title: '医生信息管理',
        link: '/doctor',
        tag: 0
      }),
      new Navbar({
        key: 'doctorgroup',
        title: '医生小组管理',
        link: '/doctor-group',
        tag: 0
      }),
      new Navbar({
        key: 'doctoraccount',
        title: '医生账户管理',
        link: '/doctor-account',
        tag: 0
      }),
      new Navbar({
        key: 'relationship',
        title: '医患关联管理',
        link: '/relationship',
        tag: 0
      })
    ]
  }),
  new Navbar({
    key: 'doctorpersonal',
    title: '医生个人服务管理',
    ifSub: true,
    subBars: [
      new Navbar({
        key: 'greenchannel',
        title: '绿色通道管理',
        link: '/green-channel'
      }),
      new Navbar({
        key: 'reservationbed',
        title: '预约床位管理',
        link: '/reservation-bed'
      })
    ]
  }),
  new Navbar({
    key: 'usergroup',
    title: '患者管理',
    ifSub: true,
    tag: 0,
    subBars: [
      new Navbar({
        key: 'user',
        title: '患者信息管理',
        link: '/user'
      }),
      new Navbar({
        key: 'userorder',
        title: '患者订单管理',
        link: '/user-order',
        tag: 0
      }),
      new Navbar({
        key: 'usercertification',
        title: '实名认证管理',
        link: '/user-certification',
        tag: 0
      }),
      new Navbar({
        key: 'healthdata',
        title: '患者体征数据管理',
        link: '/health-data',
        tag: 0
      }),
      new Navbar({
        key: 'medicationmind',
        title: '患者用药提醒管理',
        link: '/medication-remind',
        tag: 0
      }),
      new Navbar({
        key: 'insurancecertification',
        title: '医保卡认证管理',
        link: '/insurance-certification',
        tag: 0
      }),
    ]
  }),
  new Navbar({
    key: 'followUp',
    title: '随访管理',
    ifSub: true,
    subBars: [
      new Navbar({
        key: 'followUp-plan',
        title: '随访计划管理',
        link: '/followUp-plan'
      }),
      new Navbar({
        key: 'followUp-feedback',
        title: '随访反馈管理',
        link: '/followUp-feedback'
      })
    ]
  }),
  new Navbar({
    key: 'integral',
    title: '积分管理',
    ifSub: true,
    tag: 0,
    subBars: [
      new Navbar({
        key: 'integralDetail',
        title: '积分明细',
        link: '/integral-detail'
      }),
      new Navbar({
        key: 'integralOrder',
        title: '积分商品订单管理',
        link: '/integral-order',
        tag: 0
      }),
      new Navbar({
        key: 'integralCommodity',
        title: '积分商品维护',
        link: '/integral-commodity'
      }),
      new Navbar({
        key: 'integralProportion',
        title: '积分比例维护',
        link: '/integral-proportion'
      }),
      new Navbar({
        key: 'missionIntegral',
        title: '任务积分维护',
        link: '/mission-integral'
      })
    ]
  }),
  new Navbar({
    key: 'healthnews',
    title: '健康资讯',
    link: '/health-news'
  }),
  new Navbar({
    key: 'commodity',
    title: '商品维护',
    link: '/commodity'
  }),
  new Navbar({
    key: 'servicegroup',
    title: '服务维护',
    ifSub: true,
    subBars: [
      new Navbar({
        key: 'doctorservice',
        title: '医生个人服务维护',
        link: '/doctor-service'
      }),
      new Navbar({
        key: 'basicservice',
        title: '医生小组服务维护',
        link: '/basic-service'
      }),
      new Navbar({
        key: 'healthservice',
        title: '第三方服务维护',
        link: '/health-service'
      }),
      new Navbar({
        key: 'packageservice',
        title: '套餐包服务维护',
        link: '/package-service'
      }),
      new Navbar({
        key: 'servicespec',
        title: '服务规格维护',
        link: '/service-spec'
      }),
    ]
  }),
  new Navbar({
    key: 'basicgroup',
    title: '基础数据维护',
    ifSub: true,
    subBars: [
      new Navbar({
        key: 'hospital',
        title: '医院维护',
        link: '/hospital'
      }),
      new Navbar({
        key: 'community',
        title: '小区维护',
        link: '/community'
      }),
      new Navbar({
        key: 'departmant',
        title: '科室数据维护',
        link: '/department'
      }),
      new Navbar({
        key: 'doctortitle',
        title: '职称数据维护',
        link: '/doctor-title'
      }),
      new Navbar({
        key: 'doctorsort',
        title: '医生排序',
        link: '/doctor-sort'
      }),
      new Navbar({
        key: 'newsclassify',
        title: '健康资讯分类数据维护',
        link: '/news-classify'
      }),
      new Navbar({
        key: 'discomfortsymptom',
        title: '不适症状数据维护',
        link: '/discomfort-symptom'
      }),
      new Navbar({
        key: 'followupplan',
        title: '随访计划模版数据维护',
        link: '/follow-up-plan'
      }),
      new Navbar({
        key: 'flowergrade',
        title: '鲜花等级数据维护',
        link: '/flower-grade'
      }),
      new Navbar({
        key: 'drug',
        title: '药品数据维护',
        link: '/drug'
      }),
      new Navbar({
        key: 'healthorganization',
        title: '第三方机构数据维护',
        link: '/health-organization'
      }),
      new Navbar({
        key: 'inspectioncategory',
        title: '检查类目维护',
        link: '/inspection-category'
      }),
      new Navbar({
        key: 'inspectionitem',
        title: '检查子项目维护',
        link: '/inspection-item'
      }),
      new Navbar({
        key: 'pushtime',
        title: '推送时间维护',
        link: '/push-time'
      }),
      new Navbar({
        key: 'downloadorigin',
        title: '下载渠道维护',
        link: '/download-origin'
      }),
      new Navbar({
        key: 'purchaseEntrance',
        title: '购药入口维护',
        link: '/purchase-entrance'
      }),
      new Navbar({
        key: 'counselingProblem',
        title: '咨询问题引导维护',
        link: '/counseling-problem'
      }),
      new Navbar({
        key: 'recommendRadius',
        title: '定位推荐半径维护',
        link: '/recommend-radius'
      }),
    ]
  }),
  new Navbar({
    key: 'datacollection',
    title: '病史资料录入',
    link: '/data-collection'
  }),
  new Navbar({
    key: 'versioncontrol',
    title: '版本控制',
    link: '/version-control'
  }),
  new Navbar({
    key: 'subscribe',
    title: '服务号管理',
    ifSub: true,
    subBars: [
      new Navbar({
        key: 'assessmentrisk',
        title: '风险评估管理',
        link: '/assessment-risk'
      }),
      new Navbar({
        key: 'familyaccount',
        title: '家庭账号维护',
        link: '/family-account'
      }),
      new Navbar({
        key: 'lecture',
        title: '讲座管理',
        link: '/lecture'
      }),
      new Navbar({
        key: 'custommenu',
        title: '自定义菜单',
        link: '/custom-menu'
      }),
      new Navbar({
        key: 'autoreply',
        title: '自动回复维护',
        link: '/auto-reply'
      })
    ]
  }),
  new Navbar({
    key: 'adsmanagement',
    title: '广告位管理',
    ifSub: true,
    subBars: [
      new Navbar({
        key: 'ad-doctor',
        title: '广告位管理-医生端',
        link: '/ad-doctor'
      }),
      new Navbar({
        key: 'ad-patient',
        title: '广告位管理-患者端',
        link: '/ad-patient'
      })
    ]
  }),
  new Navbar({
    key: 'discountcoupon',
    title: '优惠券管理',
    ifSub: true,
    subBars: [
      new Navbar({
        key: 'dc-list',
        title: '优惠券列表',
        link: '/dc-list'
      }),
      new Navbar({
        key: 'dc-issue',
        title: '优惠券发放记录',
        link: '/dc-issue'
      })
    ]
  }),
  new Navbar({
    key: 'operationpush',
    title: '运营推送',
    link: '/operation-push'
  })
];

export const ERRMSG = {
  loginErr: '啊哦！登陆出错了～',
  nullMsg: '啊哦～你要找的数据为空哦！',
  netErrMsg: '网络出错了，请稍后再试试吧！',
  otherMsg: '呀～发生未知错误，请关闭重试',
  inputErr: '输入数据错误，请重新输入！',
  handleSuccess: '操作成功！',
  handleError: '操作失败！',
  saveSuccess: '保存数据成功！',
  saveError: '保存数据失败！',
  deleteSuccess: '删除数据成功！',
  deleteError: '删除数据失败！',
  updownSuccess: '上架成功！',
  updownError: '上架失败',
  statusSuccess: '',
  statusError: '',
};

export type AOA = Array<Array<any>>;
