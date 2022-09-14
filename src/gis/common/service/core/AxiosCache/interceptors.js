import intl from 'react-intl-universal';
/*
 * @Author: Wang Shaobing
 * @Email: wangshaobing@njsdata.com
 * @Date: 2021-07-31 17:15:01
 * @LastEditTime: 2021-07-31 17:38:22
 * @LastEditors: Wang Shaobing
 * @Description: {intl.get('COMM.RARI')}
 */
import axios from 'axios';
import clonedeep from 'lodash.clonedeep';
import axiosCache from 'core/AxiosCache/Cache';

/**
 * intl.get('COMM.CACHE_PROCESSING')
 * ======
 * 当使用 useCache {intl.get('ANAL.TIME')}：
 * 1. intl.get('COMM.CFAVC')
 * 1.1 {intl.get('COMM.IF_SO')}，则返回缓存
 * 1.2 {intl.get('COMM.WITHOUT')}？
 *    2. {intl.get('COMM.ATOSRATST')}
 *    2.1 {intl.get('COMM.IF_SO')}，则等待其他请求返回值
 *    2.2 {intl.get('COMM.WITHOUT')}，则发送请求
 */
export const onRequestFulfilled = config => {
  if (config.useCache) {
    const source = axios.CancelToken.source();
    const cached = axiosCache.getCache(config);
    if (cached) {
      const cachedData = { type: 'cache', response: cached };
      config.cancelToken = source.token;
      source.cancel(JSON.stringify(cachedData));
      return config;
    }
    if (axiosCache.checkPending(config)) {
      const message = { type: 'pending', config };
      config.cancelToken = source.token;
      source.cancel(JSON.stringify(message));
      return config;
    }
  }
  return config;
};

export const onRequestRejected = error => {
  return Promise.reject(error);
};

export const onResponseFulfilled = response => {
  if (response.config.useCache) {
    axiosCache.onResponse(response);
  }
  return response;
};

export const onResponseRejected = error => {
  if (axios.isCancel(error)) {
    const message = JSON.parse(error.message);
    switch (message.type) {
      case 'cache':
        return Promise.resolve(message.response);
      case 'pending':
        const { config } = message;
        const subject = axiosCache.getPending(config);
        return new Promise(resolve => {
          subject.subscribe(response => {
            console.log(intl.get('COMM.HCDR'), response.config.url);
            resolve(clonedeep(response));
          });
        });
    }
  }
  return Promise.reject(error);
};
