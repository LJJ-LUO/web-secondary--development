import request from "./request";

export const getAssetJSONForProduct = id =>
  request.get(`iot/product/getAssetJSONForProduct?productId=${id}`);

export const downloadAssetJSONForProduct = id =>
  request.get(`iot/product/downloadAssetJSONForProduct?productId=${id}`);

/**
 * 查询资产
 * @param id 资产ID
 */
export const queryAssetById = (id,params) => {
  return request.post(`/asset/getAssetData?asset_id=${id}&count=99999&pageNum=1&pageSize=10`, params);
}

  /* 
  * @param deviceId：设备ID
  * @param eventId：事件ID
  */
export const queryWarnPicture = params =>
request.get(`iot/video/queryWarnPicture?deviceId=${params.devId}&eventId=${params.eveId}`);