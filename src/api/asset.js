import request from "./request.js";

/**
 * 查询资产
 * @param id 资产ID
 */
export const queryAssetById = id =>
    request.post(`/asset/getAssetData?asset_id=${id}`, []);

/**
 * 无鉴权查询资产
 * @param id 资产ID
 */
export const queryFAssetById = id =>
    request.post(`/form/getAssetData?asset_id=${id}`, []);


export const queryDataDetail = (id, val) =>
    request.post(`form/data/v2/queryDataDetail?formId=${id}&pkValue=${val}`,);

export const queryData = (id, val) =>
    request.post(`form/v2/detail/data/queryData?modelId=${id}&dataId=${val}`,);