import request from "./request";

export const getAssetJSONForProduct = id =>
  request.get(`iot/product/getAssetJSONForProduct?productId=${id}`);

export const downloadAssetJSONForProduct = id =>
  request.get(`iot/product/downloadAssetJSONForProduct?productId=${id}`);

    /* 
  * 告警事件图片接口
  * @param deviceId：设备ID
  * @param eventId：事件ID
  */
export const queryWarnPicture = params =>
request.get(`iot/video/queryWarnPicture?deviceId=${params.devId}&eventId=${params.eveId}`);