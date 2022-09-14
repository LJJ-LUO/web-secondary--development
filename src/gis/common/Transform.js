import intl from 'react-intl-universal';
import PopupTips from './PopupTips';
import hashHistory from '../utils/history';
import numeral from 'numeral';
import $ from 'jquery';
import qs from 'querystringify';
import { apiContextPath, loginUrl, isMeetingApp, baseUrl } from '../utils/context';
import { IS_UUM, SSO_TRUE } from './core/constant';

export const List2String = (listInfo, delimiter) => {
  let result = '';
  for (let index in listInfo) {
    result = result + listInfo[index] + delimiter;
  }
  return result.substr(0, result.length - 1);
};
/**
 * intl.get('CONT.UWCA')
 * @param e
 * @param callback
 * @constructor
 */
export const FetchApis = (e, callback) => {
  let url = e.url;
  if (!url) {
    return console.log(intl.get('COMM.UDNE').d('url 不存在'));
  }
  let method = e.method;
  method['headers'] = {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-XSRF-TOKEN': getXSRFToken(),
  };
  method['credentials'] = 'include';
  if ((location.search && qs.parse(location.search).token) || window.token) {
    method['headers']['token'] =
      qs.parse(location.search).token || window.token;
  }
  return fetch(url, method)
    .then(function (response) {
      const status = response.status;
      if (status === 401 && !isMeetingApp()) {
        hashHistory.push(loginUrl);
        return false;
      }
      try {
        let responseInfo = response.json();
        return responseInfo;
      } catch (e) {
        PopupTips(
          'error',
          intl.get('WF.INCORRECT_OPERATION'),
          intl.get('WF.INCORRECT_OPERATION')
        );
      }
    })
    .then(function (data) {
      // eslint-disable-next-line
      const status = data.status;
      if (status === 500) {
        PopupTips('error', intl.get(`ERROR.${data.code}`) || data.message);
      } else {
        // eslint-disable-next-line
        if (data != null) {
          callback(data);
        }
      }
    });
};

/**
 * intl.get('CONT.UWCA')
 * @param e
 * @param callback
 * @constructor
 */
export const FetchApi = (e, callback) => {
  let urlArg = `${baseUrl}/` + e.url;
  if (!urlArg) {
    return console.log(intl.get('COMM.UDNE').d('url 不存在'));
  }
  let url = urlArg;
  let method = e.method;
  method['headers'] = {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-XSRF-TOKEN': getXSRFToken(),
  };
  method['credentials'] = 'include';
  if ((location.search && qs.parse(location.search).token) || window.token) {
    method['headers']['token'] =
      qs.parse(location.search).token || window.token;
  }
  return fetch(url, method)
    .then(function (response) {
      const status = response.status;
      if (status === 401 && !isMeetingApp()) {
        const {
          configuration: { sso_flag, sso_portal_auth_url, sso_appKey } = {},
        } = window || {};
        const search = qs.parse(location.search);
        // {intl.get('COMM.APPLY_PREVIEW')}-SSO
        if (
          !search.code &&
          sso_flag?.current_value === SSO_TRUE &&
          sso_portal_auth_url &&
          !IS_UUM
        ) {
          // {intl.get('ANAL.NOTHING')}code，子系统，开启SSO，并配置了统一鉴权页，跳转主系统鉴权
          const param = sso_portal_auth_url.includes('?');
          window.location.href =
            sso_portal_auth_url +
            qs.stringify(
              {
                appKey: sso_appKey,
                redirect_url: location.href,
              },
              param ? '&' : true
            );
        } else {
          hashHistory.push(loginUrl);
          return false;
        }
      }
      try {
        let responseInfo = response.json();
        return responseInfo;
      } catch (e) {
        PopupTips(
          'error',
          intl.get('WF.INCORRECT_OPERATION'),
          intl.get('WF.INCORRECT_OPERATION')
        );
      }
    })
    .then(function (data) {
      // eslint-disable-next-line
      const status = data.status;
      if (status === 500) {
        PopupTips('error', intl.get(`ERROR.${data.code}`) || data.message);
      } else {
        // eslint-disable-next-line
        if (data != null) {
          callback(data);
        }
      }
    });
};

/**
 * intl.get('COMM.IUMI')，为了解决跨域的问题，所以使用ajax
 * @param method：{intl.get('COMM.TRPOTCS')}
 * @param inputData：{intl.get('COMM.PICTURE_INFORMATION')}
 * @param sucCallback：{intl.get('COMM.COS')}
 * @param errCallback：{intl.get('COMM.COF')}
 * @param updateType：{intl.get('COMM.IUM')}，默认使用POST，如果其他方式请配置参数
 */
export const uploadImage = (
  method,
  inputData,
  sucCallback,
  errCallback,
  updateType
) => {
  updateType = updateType === undefined ? 'POST' : updateType;
  $.ajax({
    url: `${baseUrl}/` + method,
    type: updateType,
    data: inputData,
    async: true,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      sucCallback(data);
    },
    error: function (data) {
      errCallback(data);
    },
  });
};

/**
 * intl.get('COMM.SCOBN')
 *
 * @param method:{intl.get('COMM.TRPOTCS')}
 * @param inputData：{intl.get('COMM.IDI')}
 * @param sucCallback：{intl.get('COMM.CAS')}
 * @param errCallback：{intl.get('COMM.CAF')}
 * @constructor
 */
export const SynAjax = (method, inputData, sucCallback, errCallback) => {
  $.ajax({
    async: false, // 就是设置这个最为关键的ajax{intl.get('EVEN.SYNCHRONIZATION')}
    type: 'POST',
    url: apiContextPath + `${baseUrl}/` + method,
    data: inputData,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      sucCallback(data);
    },
    error: function (data) {
      errCallback(data);
    },
  });
};
/**
 * intl.get('COMM.SCPA')
 * @param sucCallback:{intl.get('COMM.CAS')}
 */
export const handleAuth = sucCallback => {
  $.ajax({
    url: apiContextPath + `${baseUrl}/system/platform/getAuth`,
    dataType: 'json',
    async: false,
    success: function (data) {
      sucCallback(data);
    },
    error: function ({ status }) {
      if (status === 401 && !isMeetingApp()) {
        hashHistory.push(loginUrl);
      }
    },
  });
};

export const getAjax = (method, sucCallback, errCallback) => {
  $.ajax({
    async: false, // 就是设置这个最为关键的ajax同步
    url: apiContextPath + `${baseUrl}/` + method,
    cache: false,
    contentType: false,
    processData: false,
    success: function (data) {
      sucCallback(data);
    },
    error: function (data) {
      errCallback(data);
    },
  });
};

export const S4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

export const guid = () => {
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};

export const uids = () => {
  return S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4();
};

export const addCommas = function (money) {
  if (money && money != null) {
    money = String(money);
    let left = money.split('.')[0];

    let right = money.split('.')[1];
    right = right ? (right.length >= 1 ? '.' + right : '.' + right + '0') : '';
    // right = right ? '.'+right : '';
    let temp = left
      .split('')
      .reverse()
      .join('')
      .match(/(\d{1,3})/g);
    return (
      (Number(money) < 0 ? '-' : '') +
      temp
        .join(',')
        .split('')
        .reverse()
        .join('') +
      right
    );
  } else if (money === 0) {
    return '0';
  } else {
    return '';
  }
};

export const TransformTime = date => {
  let connect = '-';

  let colon = ':';
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (day >= 0 && day <= 9) {
    day = '0' + day;
  }
  if (hours >= 0 && hours <= 9) {
    hours = '0' + hours;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds;
  }
  return (
    date.getFullYear() +
    connect +
    month +
    connect +
    day +
    ' ' +
    hours +
    colon +
    minutes +
    colon +
    seconds
  );
};

// intl.get('CONT.ASRC')
export const qualityDetailTransform = (qualityType, qualityDetail) => {
  if (qualityType === 4 || qualityType === 5) {
    let data = JSON.parse(qualityDetail);
    return `${data.min}-${data.max}`;
  } else if (qualityType === 6) {
    let data = JSON.parse(qualityDetail);
    let unit = data.max === '0' ? intl.get('COMM.STRIP') : '%';
    return `${data.min}${unit}`;
  } else {
    return qualityDetail;
  }
};
// intl.get('COMM.RANDOM')
export const RandomId = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};

// intl.get('CONT.TFC')
export const CurrentTime = () => {
  let date = new Date();
  let connect = '-';

  let colon = ':';
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }

  return (
    date.getFullYear() +
    connect +
    month +
    connect +
    strDate +
    ' ' +
    date.getHours() +
    colon +
    date.getMinutes() +
    colon +
    date.getSeconds()
  );
};
// intl.get('COMM.FORMAT_PRICE')
export const formatCurrency = num => {
  return numeral(num).format('0,0.00');
};
// intl.get('CONT.TIMESTAMP_CONVERSION')yyyy/mm/dd hh:mm:ss
export const formatDate = e => {
  let time = '';
  if (e || e === 0) {
    let now = new Date(e);
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    if (second < 10) {
      second = '0' + second;
    }
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (date < 10) {
      date = '0' + date;
    }
    if (month < 10) {
      month = '0' + month;
    }
    time =
      year +
      '-' +
      month +
      '-' +
      date +
      ' ' +
      hour +
      ':' +
      minute +
      ':' +
      second;
    return time;
  }
};
// intl.get('CONT.TIMESTAMP_CONVERSION')yyyy/mm/dd hh:mm:ss
export const formatDateHHMM = e => {
  let time = '';
  if (e) {
    let now = new Date(e);
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let seconds = now.getSeconds();

    if (minute < 10) {
      minute = '0' + minute;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (date < 10) {
      date = '0' + date;
    }
    if (month < 10) {
      month = '0' + month;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    time =
      year +
      '-' +
      month +
      '-' +
      date +
      ' ' +
      hour +
      ':' +
      minute +
      ':' +
      seconds;
    return time;
  }
};
// intl.get('CONT.TIMESTAMP_CONVERSION')yyyy/mm/dd
export const formatDates = e => {
  let time = '';
  if (e || e === 0) {
    let now = new Date(e);
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    if (date < 10) {
      date = '0' + date;
    }
    if (month < 10) {
      month = '0' + month;
    }
    time = year + '-' + month + '-' + date;
    return time;
  }
};
// intl.get('CONT.TIMESTAMP_CONVERSION')yyyy/mm
export const formatDateNoDay = e => {
  let time = '';
  if (e) {
    let now = new Date(e);
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    time = year + '-' + month;
    return time;
  }
};
// intl.get('CONT.TIMESTAMP_CONVERSION')  hh:mm
export const formatHHMM = e => {
  let time = '';
  if (e) {
    let now = new Date(e);
    let hour = now.getHours();
    let minute = now.getMinutes();
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (hour < 10) {
      hour = '0' + hour;
    }
    time = hour + ':' + minute;
    return time;
  }
};

// intl.get('CONT.TTAFMHDAMA')
export const timeAgo = e => {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  if (e === undefined) {
    return intl.get('COMM.NEVER_UPDATED');
  } else {
    const now = new Date().getTime(); // {intl.get('CONT.GTTOTCT')}

    const diffValue = now - e;

    if (diffValue < 0) {
      return intl.get('COMM.NEVER_UPDATED');
    }

    const monthC = diffValue / month;
    const weekC = diffValue / (7 * day);
    const dayC = diffValue / day;
    const hourC = diffValue / hour;
    const minC = diffValue / minute;

    if (monthC >= 1) {
      return parseInt(monthC) + intl.get('COMM.UMA');
    } else if (weekC >= 1) {
      return parseInt(weekC) + intl.get('COMM.UWA');
    } else if (dayC >= 1) {
      return parseInt(dayC) + intl.get('COMM.UDA');
    } else if (hourC >= 1) {
      return parseInt(hourC) + intl.get('COMM.UHA');
    } else if (minC >= 1) {
      return parseInt(minC) + intl.get('COMM.UMA');
    } else {
      return intl.get('COMM.JUST_UPDATED');
    }
  }
};

// intl.get('CONT.CWTAATS')
export const compareArrayEquals = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0, l = arr1.length; i < l; i++) {
    // Check if we have nested arrays
    if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
      // recurse into the nested arrays
      if (!arr1[i].equals(arr2[i])) return false;
    } else if (arr1[i] instanceof Object && arr2[i] instanceof Object) {
      if (!Objectequals(arr1[i], arr2[i])) {
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};

export const delCookie = $name => {
  let myDate = new Date();
  myDate.setTime(-1000); // {intl.get('CONT.SET_TIME')}
  document.cookie = $name + "=''; expires=" + myDate.toGMTString();
};

// eslint-disable-next-line
export const setCookie = (name, value, expiredays) => {
  // intl.get('CONT.SAVE_TO')cookie
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie =
    name +
    '=' +
    escape(value) +
    (expiredays ? '' : ';expires=' + exdate.toGMTString());
};

export const getCookie = name => {
  // intl.get('EVEN.OBTAIN')cookie
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + '=');
    if (start !== -1) {
      start = start + name.length + 1;
      let end = document.cookie.indexOf(';', start);
      if (end === -1) end = document.cookie.length;
      return unescape(document.cookie.substring(start, end));
    }
  }
  return '';
};

// intl.get('CONT.ATCOTS')
export const Objectequals = (object1, object2) => {
  // For the first loop, we only check for types
  for (let propName in object1) {
    // Check for inherited methods and properties - like .equals itself
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
    // Return false if the return value is different
    if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
      return false;
    }
    // Check instance type
    else if (typeof object1[propName] !== typeof object2[propName]) {
      // Different types => not equal
      return false;
    }
  }
  // Now a deeper check using other objects property names
  for (let propName in object2) {
    // We must check instances anyway, there may be a property that only exists in object2
    // I wonder, if remembering the checked values from the first loop would be faster or not
    if (object1.hasOwnProperty(propName) !== object2.hasOwnProperty(propName)) {
      return false;
    } else if (typeof object1[propName] !== typeof object2[propName]) {
      return false;
    }
    // If the property is inherited, do not check any more (it must be equa if both objects inherit it)
    if (!object1.hasOwnProperty(propName)) continue;

    // Now the detail check and recursion

    // This returns the script back to the array comparing
    /** REQUIRES Array.equals**/
    if (
      object1[propName] instanceof Array &&
      object2[propName] instanceof Array
    ) {
      // recurse into the nested arrays
      if (!object1[propName].equals(object2[propName])) return false;
    } else if (
      object1[propName] instanceof Object &&
      object2[propName] instanceof Object
    ) {
      // recurse into another objects
      // console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
      if (!object1[propName].equals(object2[propName])) return false;
    }
    // Normal value comparison for strings and numbers
    else if (object1[propName] !== object2[propName]) {
      return false;
    }
  }
  // If everything passed, let's say YES
  return true;
};
// intl.get('COMM.THUMBNAIL')
export const resizeImage = (dom, height, callback) => {
  import('html2canvas').then(({ default: html2canvas }) => {
    html2canvas(dom, {
      background: '#fff', // 保存时候添加背景
      height: height,
      useCORS: true,
    }).then(function (canvas) {
      let imgData = canvas.toDataURL('image/png', 1.0);
      callback(imgData);
    });
  });
};

// intl.get('CONT.DCOOA')
export const objDeepCopy = function (source) {
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] =
      typeof source[item] === 'object' && source[item] !== null
        ? objDeepCopy(source[item])
        : source[item];
  }
  return sourceCopy;
};
// intl.get('CONT.DCOMA')
export const deepcopyArray = obj => {
  var out = [];

  var i = 0;

  var len = obj.length;
  for (; i < len; i++) {
    if (obj[i] instanceof Array) {
      out[i] = deepcopyArray(obj[i]);
    } else out[i] = obj[i];
  }
  return out;
};

// intl.get('COMM.JWII')pc端还是移动端
export const IsPC = () => {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod',
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};
// base64{intl.get('REPO.FORMAT')}转化为blob{intl.get('REPO.FORMAT')}
export const convertBase64UrlToBlob = base64Data => {
  var byteString;
  if (base64Data.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(base64Data.split(',')[1]);
  } else {
    byteString = unescape(base64Data.split(',')[1]);
  }
  var mimeString = base64Data
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
};

// intl.get('COMM.JWII')meeting官网
export const isMeeting = () => {
  if (document.URL.indexOf('meeting1010.com') === -1) {
    return false;
  } else {
    return true;
  }
};

// intl.get('COMM.JWII')oneMind官网
export const isOneMind = () => {
  if (document.URL.indexOf('s3.sdata1010.cn') === -1) {
    return false;
  } else {
    return true;
  }
};

export function getCSS(url) {
  return new Promise(function (resolve, reject) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';

    if (link.readyState) {
      // IE
      link.onreadystatechange = function () {
        if (link.readyState === 'loaded' || link.readyState === 'complete') {
          link.onreadystatechange = null;
          resolve('success: ' + url);
        }
      };
    } else {
      // Others
      link.onload = function () {
        resolve('success: ' + url);
      };
    }

    link.onerror = function () {
      reject(Error(url + 'load error!'));
    };

    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
  });
}

export const getXSRFToken = () => {
  return getCookie('XSRF-TOKEN');
};
