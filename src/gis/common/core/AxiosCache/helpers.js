/*
 * @Author: Wang Shaobing
 * @Email: wangshaobing@njsdata.com
 * @Date: 2021-07-31 17:13:26
 * @LastEditTime: 2021-07-31 17:38:59
 * @LastEditors: Wang Shaobing
 * @Description: {intl.get('COMM.STF')}
 */
import Qs from 'qs';
export const cachePrefix = 'Smartdata::Request::';

export const makeKey = config => {
  if (config && config.data && isJsonStr(config.data)) {
    config.data = JSON.parse(config.data);
  }
  const { method, url, params, data } = config;
  return (
    cachePrefix +
    [method, url, Qs.stringify(params), Qs.stringify(data)].join('&')
  );
};

export const isJsonStr = str => {
  if (typeof str === 'string') {
    try {
      let obj = JSON.parse(str);
      return !!(typeof obj === 'object' && obj);
    } catch (e) {
      return false;
    }
  }
};
