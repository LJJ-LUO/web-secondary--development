import request from "./request";

/**
 * 查询资产(新的)
 * @param {*} params
 */
export const getAssets = (cata, type, params2) =>
  request.post(`asset/queryList?cata=${cata}&type=${type}`, params2);

/**
 * 查询资产
 */
export const queryAssetById = (id) =>
  request.get("asset", { params: { asset_id: id } });

/**
 * 测试数据源
 */
export const testDatasource = (params) =>
  request.post("dataSource/test", params);

/**
 * 提交数据源
 */
export const addDatasource = (params) => request.post("dataSource", params);

/**
 *更新数据源信息
 */
export const updateDatasource = (params) =>
  request.post("dataSource/update", params);

/**
 * 重名判断
 */
export const duplicateCheck = (name) =>
  request.get(`/dataSource/duplicateCheck?dataSource_name=` + name);
