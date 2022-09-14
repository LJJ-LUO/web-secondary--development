/*
 * @Author: Wang Shaobing
 * @Email: wangshaobing@njsdata.com
 * @Date: 2021-07-31 17:16:00
 * @LastEditTime: 2021-07-31 17:38:36
 * @LastEditors: Wang Shaobing
 * @Description: {intl.get('COMM.CRLE')}
 */
import clonedeep from 'lodash.clonedeep';
import { makeKey, cachePrefix } from './helpers';
import Subject from './Subject';

class AxiosCache {
  constructor() {
    this.pendingRequests = new Map();
  }

  getCache(config) {
    const key = makeKey(config);
    const data = sessionStorage.getItem(key);
    if (data) {
      const { response, expireAt } = JSON.parse(data);
      if (Date.now() < expireAt) {
        response.fromCache = true;
        console.log(
          `🎯🎯🎯 {intl.get('COMM.CACHE_HIT')} ${config.url}\n`,
          response
        );
        return clonedeep(response);
      } else {
        sessionStorage.removeItem(key);
      }
    }
    return null;
  }

  setCache(response) {
    const { config } = response;
    const key = makeKey(config);
    const cached = {
      response,
      expireAt: Date.now() + config.cacheDuration,
    };
    sessionStorage.setItem(key, JSON.stringify(cached));
  }

  checkPending(config) {
    const key = makeKey(config);
    if (!this.pendingRequests[key]) {
      this.pendingRequests[key] = new Subject();
      return false;
    } else {
      return true;
    }
  }

  getPending(config) {
    const key = makeKey(config);
    return this.pendingRequests[key];
  }

  endPending(response) {
    const { config } = response;
    const key = makeKey(config);
    const subject = this.getPending(config);
    if (subject) {
      subject.next(response);
      delete this.pendingRequests[key];
    }
  }

  onResponse(response) {
    this.setCache(response);
    this.endPending(response);
  }

  clearCache() {
    for (const key in sessionStorage) {
      if (key.startsWith(cachePrefix)) {
        sessionStorage.removeItem(key);
        if (this.pendingRequests[key]) {
          delete this.pendingRequests[key];
        }
      }
    }
  }
}

export default new AxiosCache();
