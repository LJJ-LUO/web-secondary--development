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
 * 添加资产
 */
 export const addAsset = params => request.post('asset', params);

/**
 * 查询数据源
 */
 export const getDatasources = params => {
  return request.get(
    `dataSource/queryByType${params?.type ? '?type=' + params.type : ''}`
  );
};

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

  /**
   * 查询权限
   */
  export const identifyPermission = identifyCode =>
  request.get(`system/user/identifyPermission?identifyCode=${identifyCode}`);

  /**
 * 查询资产配置信息接口
 */
export const assetConfById = id => request.get(`asset/conf?asset_id=${id}`);

/**
 * 新建资产 预览数据
 */
 export const assetPreview = params => request.post(`asset/previewData`, params);
 /**
 * 资产库数据源数据模式查询
 */
export const dataSourceDbschemas = id =>request.get(`dataSource/dbschemas?id=${id}`);
/**
 * 数据源数据表信息查询
 */
 export const sourceMetaById = (id, schema) =>request.get(`dataSource/dbmeta?id=${id}&schema=${schema}`);

 /**
 * 更新资产配置
 */
export const updateAssetConf = params =>request.post(`asset/updateAssetConf`, params);

/**
 * 校验自定义sql的语法
 */
 export const checkSqlSyntax = params =>request.post('asset/checkSqlSyntax', params);