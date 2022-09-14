import request from './core/request';
import formRequest from './core/FormRequest';

/**
 *
 * intl.get('COMM.NLS')
 */
export const addBigScreen = params =>
  formRequest.post('bigscreen/meta/insert', params);
/**
 *
 * intl.get('COMM.ULS')
 */
export const updateBigScreen = params =>
  formRequest.post('bigscreen/meta/update', params);
/**
 * intl.get('COMM.QLSL')
 * @param {*} params
 */
export const queryBigScreens = (catalog, params, judgeCatalog = true, type) =>
  request.post(
    catalog
      ? `bigscreen/meta/queryAll?catalog_id=${catalog}&judgeCatalog=${judgeCatalog}${type ? '&queryType=' + type : ''
      }`
      : 'bigscreen/meta/queryAll',
    params
  );

/**
 * intl.get('COMM.DACOTLS')
 *
 * @param {*} id
 */
export const deleteBigScreenById = id =>
  request.post('bigscreen/deleteBybigscreenId', id);

/**
 * intl.get('COMM.DLS')Meta
 */
export const deleteBigScreenMetaById = id =>
  request.post('bigscreen/meta/deleteById', id);

/**
 * intl.get('COMM.QSLSI')
 *
 * @param {*} id
 */
export const queryBigScreenById = params =>
  request.get('bigscreen/meta/queryById', { params });

/**
 * intl.get('COMM.ASQOSLSI')
 * @param {*} params
 * @returns
 */
export const queryBigScreenByIdForApp = params =>
  request.get('bigscreen/meta/queryBigScreenForApp', { params });

/**
 * intl.get('COMM.SLSQSLSI')p
 *
 * @param {*} id
 */
export const queryBigScreenByToken = params =>
  request.get('bigscreen/meta/queryByToken', { params });

/**
 * intl.get('COMM.SLSA')token
 */
export const getGenerateToken = params =>
  request.get('urltoken/sharedUrlToken', { params });

/**
 * intl.get('COMM.QLSUP')
 */
export const queryImages = params => request.post('image/queryList', params);

/**
 * intl.get('COMM.ALSC')
 */
export const insertBigscreen = params =>
  request.post('bigscreen/batchInsert', params);

/**
 * intl.get('COMM.CLS')
 */
export const copyBigscreen = params =>
  request.post('bigscreen/meta/copyBigscreen', params);

/**
 * intl.get('COMM.QAT')
 *
 * @param {*} params
 */
export const getBigScreenTemplates = params =>
  request.post('bigscreen/template/queryAll', params);

/**
 * intl.get('COMM.SET_TEMPLATE')
 */
export const setBigScreenTemplate = (params, writeType) => {
  const type = writeType ? `?writeType=${writeType}` : '';
  return request.post(`bigscreen/template/addTemplate${type}`, params);
};

/**
 * intl.get('COMM.DELETE_TEMPLATE')
 */
export const deleteTemplateById = id =>
  request.get(`bigscreen/template/deleteById?id=${id}`);

/**
 * 根据id{intl.get('COMM.QUERY_TEMPLATE')}
 */
export const queryTemplateById = id =>
  request.get(`bigscreen/template/queryByTemplateId?id=${id}`);

export const queryDataByReportViewId = (id, params) =>
  request.post(`/form/queryApplyTableForBigScreen?view_id=${id}`, params);

export const queryApplyInfoForBigScreen = (id, params, token) =>
  request.post(
    `/bigscreen/meta/queryApplyInfoForBigScreen?view_id=${id}&token=${token}`,
    params
  );

export const queryNoticeBarData = ({ id, colName, supplement }) =>
  request.get(
    `/formView/queryNoticeBarData?viewId=${id}&colName=${colName}${supplement ? `&count=${supplement}` : ''
    }`
  );

export const queryNoticeBarDataForBigScreen = ({
  id,
  colName,
  supplement,
  token,
}) =>
  request.get(
    `/bigscreen/meta/queryNoticeBarDataForBigScreen?viewId=${id}&colName=${colName}${supplement ? `&count=${supplement}` : ''
    }&token=${token}`
  );

export const queryNewNoticeBarData = ({ id, colName, date }) =>
  request.get(
    `/formView/queryNewNoticeBarData?viewId=${id}&colName=${colName}&date=${date}`
  );

export const queryNewNoticeBarDataForBigScreen = ({
  id,
  colName,
  date,
  token,
}) =>
  request.get(
    `/bigscreen/meta/queryNewNoticeBarDataForBigScreen?viewId=${id}&colName=${colName}&date=${date}&token=${token}`
  );

export const queryAssetDataDistinct = (asset_id, form_id, params) =>
  request.post(
    `/form/queryAssetDataDistinct?asset_id=${asset_id}&form_id=${form_id}`,
    params
  );
export const queryAssetDataDistinctForBigScreen = (
  asset_id,
  form_id,
  params,
  token
) =>
  request.post(
    `/bigscreen/meta/queryAssetDataDistinctForBigScreen?asset_id=${asset_id}&form_id=${form_id}&token=${token}`,
    params
  );
export const queryChildTable = id =>
  request.get(`/form/data4BigScreen/queryFormColumns?form_id=${id}`);

export const queryChildTableData = (view_id, params) =>
  request.post(
    `/form/data4BigScreen/queryDataListWithChildren?view_id=${view_id}&show_value=false`,
    params
  );

export const getAssetDataByCondition = (asset_id, params) =>
  request.post(`/asset/getAssetDataByCondition?asset_id=${asset_id}`, params);

export const getAssetDataByConditionForBigScreen = (asset_id, params, token) =>
  request.post(
    `/bigscreen/meta/getAssetDataByConditionForBigScreen?asset_id=${asset_id}&token=${token}`,
    params
  );

export const queryDisplay = view_id =>
  request.get(`/form/data4BigScreen/queryDisplayByViewId?viewId=${view_id}`);

export const queryDisplayByViewIdForBigScreen = (view_id, token) =>
  request.get(
    `/bigscreen/meta/queryDisplayByViewIdForBigScreen?viewId=${view_id}&token=${token}`
  );

export const queryButton = view_id =>
  request.get(`/form/data4BigScreen/queryButtonByViewId?viewId=${view_id}`);

export const queryLicenseLimit = () =>
  request.get('/bigscreen/meta/queryLicenseLimit');

export const sketchRecognition = params =>
  request.post('/bigscreen/meta/sketchRecognition', params);

// 获取新填报数据
export const queryDataByReportModelId = (id, params) =>
  request.post(`/bigscreen/meta/queryData?modelId=${id}`, params);

export const queryDataByReportModelIdForToken = (id, params) =>
  request.post(`/bigscreen/meta/queryDataWithoutToken?modelId=${id}`, params);

// 获取资产数据
export const queryDataByAssetId = (id, params) =>
  request.post(
    `/asset/getAssetData?asset_id=${id}&pageNum=${params.pageNum}&pageSize=${params.pageSize
    }&count=${params.pageSize}`,
    params.queryParams
  );

export const queryDataByAssetIdForToken = (id, params) =>
  request.post(
    `/asset/dataList/queryDataByAssetIdWithoutToken?assetId=${id}`,
    params
  );

// 查询大屏模板列表
export const queryCombinationList = params =>
  request.post(
    `/bigscreen/template/queryList?type=${params.type}${params.subType ? `&subType=${params.subType}` : ''
    }`,
    {
      pageNum: 1,

      pageSize: 100,

      orderBy: 'last_modify_time',

      orderSort: 'DESC',

      queryParams: [],

      shared: '',
      ...params,
    }
  );

// 根据id查询模板详情
export const queryCombinationDetail = params =>
  request.get(`/bigscreen/template/queryById?id=${params.id}`);

// 查询大屏素材目录列表
export const queryMaterialCatalogList = params =>
  request.post('/bigscreen/template/queryMaterialCatalogList', params);

// 查询大屏素材列表
export const queryMaterialListById = (parentId, catalogId, params) =>
  request.post(
    `/bigscreen/template/queryMaterialList?parentId=${parentId}&catalogId=${catalogId}`,
    params
  );

// 查询大屏素材详情
export const queryMaterialById = id =>
  request.get(`/bigscreen/template/queryMaterialById?id=${id}`);

// 查询大屏主题列表
export const queryThemeList = () =>
  request.get(`/bigscreen/template/queryThemeList`);
// 查询大屏主题列表
export const queryThemeById = () =>
  request.get(`/bigscreen/template/queryThemeList`);
// 查询大屏分享的主题列表
export const queryThemeListByToken = token =>
  request.get(`/bigscreen/template/queryThemeListByToken?token=${token}`);
// 查询大屏样式包列表
export const queryStylePackList = params =>
  request.post(`/bigscreen/template/queryStyleList`, {
    pageNum: 1,
    pageSize: 999,
    orderBy: 'sort',
    orderSort: 'asc',
    queryParams: [],
    shared: '',
    ...params,
  });

// 查询大屏样式包详情
export const queryStylePackById = id =>
  request.post(`/bigscreen/template/queryStyleById?id=${id}`);

export const getAssetDataForBigScreen = (id, params) =>
  request.post(
    `/bigscreen/meta/getAssetDataForBigScreen?asset_id=${id}&pageNum=${params.pageNum
    }&pageSize=${params.pageSize}&count=${params.pageSize}&bigscreenId=${params.bigscreenId
    }&token=${params.token}`,
    params.queryParams
  );

// 获取天气信息
export const queryWeatherInfo = cityCode =>
  request.get(`analysis/datas/queryWeatherInfo?city=${cityCode}`);

// 获取天气信息
export const queryWeatherInfoByToken = cityCode =>
  request.get(`analysis/datas/queryWeatherInfoByToken?city=${cityCode}`);

// 获取城市列表信息
export const queryCityList = ({ keywords, subdistrict }) =>
  request.get(
    `analysis/datas/queryCitys?keywords=${keywords}&subdistrict=${subdistrict}`
  );

// 获取城市列表信息
export const queryCityListByToken = ({ keywords, subdistrict }) =>
  request.get(
    `analysis/datas/queryCitys?keywords=${keywords}&subdistrict=${subdistrict}`
  );

// 大屏画布显示条件新增接口
export const insertCondition = (componentId, params) =>
  request.post(
    `/bigscreen/meta/insertCondition?componentId=${componentId}`,
    params
  );

// 大屏画布显示条件查询接口
export const queryDisplayCondition = componentId =>
  request.get(
    `/bigscreen/meta/queryDisplayCondition?componentId=${componentId}`
  );

// 大屏画布显示条件查询过滤资产接口
export const queryAssetDataByConditon = params =>
  request.get(
    `/bigscreen/meta/queryAssetDataByConditon?componentId=${params.componentId
    }&assetId=${params.assetId}&count=${params.count}`
  );
