var statisticsUrl = 'http://www.qcxin.com/pci-operation/api/operational/pv'; //统计接口
var tel = GetQueryString("tel") || ""; //获取电话号码
var type = GetQueryString("type") || ""; // 获取用户类型
var qd = GetQueryString("qd") || ""; // 获取渠道
var downloadUrl = 'http://www.qcxin.com/pci-operation/api/version/download'; //下载包地址
var dlUrl = {
  iosDoctor: "https://itunes.apple.com/cn/app/quan-cheng-xin-guan-jia-yi/id1180453072?mt=8",
  iosUser: "https://itunes.apple.com/cn/app/quan-cheng-xin-guan-jia-guan/id1180450870?mt=8",
  androidDoctor: "http://qn.qcxin.com/app/pci_doctor_1.3.1.apk",
  androidUser: "http://qn.qcxin.com/app/pci_patient_1.3.2.apk"
}

statistics(2, 0);
//请求下载安装包地址
$.get(downloadUrl, function(data) {
  if (data.code === 0) {
    dlUrl.iosDoctor = data.data.iosDoctor;
    dlUrl.iosUser = data.data.iosUser;
    dlUrl.androidDoctor = data.data.androidDoctor;
    dlUrl.androidUser = data.data.androidUser;
  }
});

$(document).ready(function() {
  if (isPhone()) {
    //跳转到用户端下载
    $("#user").on("click", function() {
      if (isWeixinBrowser()) {
        $('.cover').css('display', 'block');
      } else {
        jump("user", 0);
      }
    });
    //跳转到医生端下载
    $("#doctor").on("click", function() {
      if (isWeixinBrowser()) {
        $('.cover').css('display', 'block');
      } else {
        jump("doctor", 1);
      }
    });
    //关闭信息提示
    $('.cover').on('click', function() {
      $('.cover').css('display', 'none');
    });
  } else {
    $('#phone').css('display', 'none');
    $('#pc').css('display', 'block');
    $('#userAndroid').on('click', function() {
      statistics(0, 2)
      window.location.href = dlUrl.androidUser;
    });
    $('#userIOS').on('click', function() {
      statistics(0, 1)
      window.location.href = dlUrl.iosUser;
    });
    $('#doctorAndroid').on('click', function() {
      statistics(1, 2)
      window.location.href = dlUrl.androidDoctor;
    });
    $('#doctorIOS').on('click', function() {
      statistics(1, 1)
      window.location.href = dlUrl.iosDoctor;
    });
  }
});

//跳转页面
function jump(src, typeId) {
  if (isAndroid() && typeId == 0) {
    statistics(0, 2)
    window.location.href = dlUrl.androidUser;
  }
  if (isIOS() && typeId == 0) {
    statistics(0, 1)
    window.location.href = dlUrl.iosUser;
  }
  if (isAndroid() && typeId == 1) {
    statistics(1, 2)
    window.location.href = dlUrl.androidDoctor;
  }
  if (isIOS() && typeId == 1) {
    statistics(1, 1)
    window.location.href = dlUrl.iosDoctor;
  }
}

//统计访问量
function statistics(product, type) {
  var data = {
    product: product,
    type: type,
    qd: qd
  };
  $.ajax({
    url: statisticsUrl,
    data: JSON.stringify(data),
    contentType: 'application/json',
    type: 'POST',
    success: function(result) {
      if (result.code == 0) {
        console.log('请求统计成功');
      } else {
        console.log('请求统计失败');
      }
    },
    error: function() {
      console.log("请求统计服务器错误");
    }
  });
}

/**
 * 获取链接地址后的参数
 * @param name
 * @returns {*}
 * @constructor
 */
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return (r[2]);
  return null;
}

//判断是否微信浏览器
function isWeixinBrowser() {
  var ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false;
}

//判断安卓客户端
function isAndroid() {
  var u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
}

//判断IOS客户端
function isIOS() {
  var u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}

function isPhone() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return true;
  } else {
    return false;
  }
  return true;
}
