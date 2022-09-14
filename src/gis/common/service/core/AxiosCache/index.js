/*
 * @Author: Wang Shaobing
 * @Email: wangshaobing@njsdata.com
 * @Date: 2021-07-31 17:12:59
 * @LastEditTime: 2021-07-31 17:38:50
 * @LastEditors: Wang Shaobing
 * @Description: {intl.get('COMM.INTERCEPTOR')}
 */
/**
 * intl.get('COMM.INTERFACE_CACHE')
 * 对于频繁请求的接口，可以设置 useCache {intl.get('OMLO.AND')} cacheDuration，通过使用缓存{intl.get('OMLO.AND')}控制并发来减少请求次数。
 *
 * intl.get('COMM.USAGE_EXAMPLE')：
 * intl.get('COMM.IAIIDA')：
 *     ```
 *     export const getColumnByAssetId = id =>
 *         request.get(`assetForDataReport/getColumnByAssetId?asset_id=${id}`);
 *     ```
 * intl.get('COMM.INTBCT')：
 *     ```
 *     export const getColumnByAssetId = (id, config) =>
 *         request.get(`assetForDataReport/getColumnByAssetId?asset_id=${id}`, config);
 *     ```
 * 在组件中调用时，{intl.get('SERV.USE')}：
 *     ```
 *     const { data } = await getColumnByAssetId(assetId, {useCache: true, cacheDuration: 500});
 *     ```
 */
import {
  onRequestFulfilled,
  onRequestRejected,
  onResponseFulfilled,
  onResponseRejected,
} from 'core/AxiosCache/interceptors';

const cacheInterceptors = {
  request: [onRequestFulfilled, onRequestRejected],
  response: [onResponseFulfilled, onResponseRejected],
};

export default cacheInterceptors;
