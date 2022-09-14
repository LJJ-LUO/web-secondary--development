import intl from 'react-intl-universal';
import axios from 'axios';
import { apiContextPath, loginUrl, baseUrl } from 'utils/context';
import history from 'utils/history';
import qs from 'querystringify';
import { message } from 'antd';
import { IS_UUM, SSO_TRUE } from './constant';
import cacheInterceptors from 'common/core/AxiosCache';

const instance = axios.create({
  baseURL: `${baseUrl}`,
  timeout: 60000,
  validateStatus: function(status) {
    return status >= 200 && status < 300; // default
  },
  headers:
    (location.search && qs.parse(location.search).token) || window.token
      ? { token: qs.parse(location.search).token || window.token }
      : {},
  useCache: false, // {intl.get('COMM.USE_CACHE')}
  cacheDuration: 0, // {intl.get('COMM.CACHE_DURATION')}，单位毫秒
  responseType: 'blob',
});

instance.defaults.headers.post['Content-Type'] =
  'application/json; application/octet-stream';

// noinspection JSCheckFunctionSignatures
instance.interceptors.request.use(...cacheInterceptors.request); // {intl.get('COMM.PMSTI')} request 拦截器的最后一个
// noinspection JSCheckFunctionSignatures
instance.interceptors.response.use(...cacheInterceptors.response); // {intl.get('COMM.PMSTI')} response 拦截器的第一个

instance.interceptors.response.use(
  response => {
    let { data } = response;
    return data;
  },
  error => {
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
          history.push(`/login?inviteUrl=${window.location.pathname}`);
        }
      }
      if (window.location.pathname.indexOf('inviteUser') !== -1) {
        // loginUrl = loginUrl +  `?inviteUrl=${window.location.pathname}`
        history.push(`/login?inviteUrl=${window.location.pathname}`);
      } else if (
        !search.code &&
        sso_flag?.current_value === SSO_TRUE &&
        sso_portal_auth_url?.current_value &&
        !IS_UUM
      ) {
        // {intl.get('ANAL.NOTHING')}code，子系统，开启SSO，并配置了统一鉴权页，跳转主系统鉴权
        const param = sso_portal_auth_url.current_value.includes('?');
        window.location.href =
          sso_portal_auth_url.current_value +
          qs.stringify(
            { appKey: sso_appKey?.current_value, redirect_url: location.href },
            param ? '&' : true
          );
        // window.location.href =
        //   sso_portal_login_url.current_value ||
        //   sso_portal_login_url.default_value;
      } else {
        let { href, origin, pathname, search } = window.location;
        if (pathname.includes('license/expire')) {
          pathname = '/home';
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
    }

    if (sso_type?.current_value === 'cas') {
      if (error.response && error.response.status === 302) {
        return Promise.reject(error.response);
      }
    }

    return Promise.reject(error.response);
  }
);

export default instance;
