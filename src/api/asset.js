import request from "./request";

/**
 * 查询资产
 * @param id 资产ID
 */
export const queryAssetById = (id) => request.post(`/asset/getAssetData?asset_id=${id}`, []);

/**
 * 查询用户信息接口
 * 
 */
export const user = () => request.get(`/system/authority/user`);
