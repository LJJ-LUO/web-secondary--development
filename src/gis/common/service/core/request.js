import intl from 'react-intl-universal';
import { apiContextPath, loginUrl } from '../../../utils/context';
import history from '../../../utils/history';
import qs from 'querystringify';
import { message } from 'antd';
import { IS_UUM, SSO_TRUE } from './constant';
import { setErrorMessage } from './utils';
// import { ErrorMessage } from 'common/errorMessage';

import instance from '@sd/core-instance';
import axiosCache from './AxiosCache/Cache';
import Pako from 'pako';

/**
 * 解决中文乱码
 * @param {Array} array pako解压后形成的数据
 * @returns
 */
function Utf8ArrayToStr(array) {
  let out, i, len;
  let char2, char3;

  let c;

  out = ' ';
  len = array.length;
  i = 0;
  while (i < len) {
    c = array[i++];
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(
          ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
        );
        break;
    }
  }
  return out;
}

/**
 * 解压nodeList压缩
 * @param {String} key 后端返回的流
 * @returns 解压之后的对象
 */
function unzip(key) {
  let charData = key.split('').map(function (x) {
    return x.charCodeAt(0);
  });

  const data = Pako.inflate(charData);
  return Utf8ArrayToStr(data);
}

instance.defaults.baseURL = `${apiContextPath}/sdata/rest`;

instance.interceptors.response.use(
  response => {
    let { data } = response;
    if (
      !['/', '/home', '/intro', '/license/expire', '/login'].includes(
        history?.location?.pathname
      ) &&
      data?.code === 10000235
    ) {
      history.push('/home');
    }
    if (
      response.config.url.indexOf('logic/queryByObjectId') !== -1 &&
      data?.result?.content
    ) {
      data.result.content = unzip(data.result.content);
    }

    if (
      response.config.url === '/system/authority/user' &&
      response.status !== 200
    ) {
      window.sessionStorage.user_type = '';
    }

    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    if (data && data.status !== 200 && !(data instanceof Blob)) {
      setErrorMessage(data);
      return Promise.reject(response);
    }
    if (data instanceof Blob) {
      response.data = data;
      return response;
    }

    response.data = data && data.result;
    response.responseMessage = data;
    return response;
  },
  error => {
    axiosCache.clearCache();
    if (!window.configuration) window.configuration = {};
    const {
      configuration: {
        sso_flag,
        sso_type,
        sso_portal_auth_url,
        // deploy_mode,
        sso_appKey,
      } = {},
    } = window || {};
    const search = qs.parse(location.search);

    try {
      setErrorMessage(error?.response?.data);
    } catch (e) {
      console.log(e);
    }

    if (error.response && error.response.status === 401) {
      const {
        data: { code },
      } = error.response;
      if (code === 100000014) {
        const isMobile = /android|iphone|phone|micromessenger/i.test(
          navigator.userAgent.toLowerCase()
        );
        if (!isMobile) {
          message.error(intl.get('COMM.AFPCWYHLI'));
        }
        if (
          window.location.pathname !== '/' &&
          window.location.pathname !== '/login'
        ) {
          history.push(
            `/login?inviteUrl=${encodeURIComponent(
              window.location.pathname + window.location.search
            )}`
          );
        }
      }
      if (window.location.pathname.indexOf('inviteUser') !== -1) {
        // loginUrl = loginUrl +  `?inviteUrl=${window.location.pathname}`
        history.push(`/login?inviteUrl=${window.location.pathname}`);
      } else if (
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
            { appKey: sso_appKey, redirect_url: location.href },
            param ? '&' : true
          );
        // window.location.href =
        //   sso_portal_login_url ||
        //   sso_portal_login_url.default_value;
      } else {
        let { href, origin, pathname, search } = window.location;
        if (pathname.includes('license/expire')) {
          pathname = `${apiContextPath}/home`;
        }

        // 判断起始路由, 如果不是首页地址, 把目标url放进returnUrl, 传入login{intl.get('APP.PAGE')}
        let newSearch = '';
        if (href.indexOf('returnUrl') === -1) {
          newSearch =
            href !== `${origin}/` && href !== `${origin}${loginUrl}`
              ? `?returnUrl=${pathname}${search}`
              : '';
        } else {
          newSearch = search;
        }

        if (pathname !== loginUrl) {
          window.location.href = `${origin}${loginUrl}${newSearch}`;
        }
        // history.replace({
        //   pathname: loginUrl,
        //   search: newSearch,
        // });
      }
      return;
    } else if (error?.response?.status === 500) {
      const {
        data: { code },
      } = error.response;
      if (code === 100000021) {
        window.location.href = `${apiContextPath}/license/expire`;
      }
      if (code === 10000229) {
        console.log({ error: error?.response || {} });
      }
    } else if (error?.response?.status === 403) {
      const {
        data: { code },
      } = error.response;
      if (code === 10019023) {
        console.log({ error: error?.response || {} });
      }
    }

    if (sso_type === 'cas') {
      if (error.response && error.response.status === 302) {
        return Promise.reject(error.response);
      }
    }

    return Promise.reject(error.response);
  }
);

export default instance;
