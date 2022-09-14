import intl from 'react-intl-universal';
import request from '../core/request';
import { cloneDeep } from 'lodash';
/**
 * intl.get('COMM.QAM')
 */
export const getAssetMetaData = (assetId, analyzerId) =>
  request.get(
    `analysis/queryAsset?analysis_id=${analyzerId}&asset_id=${assetId}`
  );

/**
 * intl.get('COMM.GAFI')
 */
export const getAssetColumns = params =>
  request.post(`analysis/getColumns2`, params);

/**
 * intl.get('COMM.QAD')
 */
export const getAssetData = (assetId, createMember) => {
  const cmParam =
    createMember !== null && createMember !== undefined
      ? `analysis_create_member=${createMember}`
      : '';
  return request.post(`asset/data?id=${assetId}&${cmParam}`);
};

/**
 * intl.get('COMM.GFOV')
 */
export const getValues = (
  assetId,
  column,
  timeGranularity,
  analysisId,
  params
) => {
  const timeParam =
    timeGranularity !== null && timeGranularity !== undefined
      ? `&timeGranularity=${timeGranularity}`
      : '';
  const analysis_id =
    analysisId !== null && analysisId !== undefined
      ? `&analysis_id=${analysisId}`
      : '';
  column = column.replace('#', '%23');
  return request.post(
    `analysis/data/filterValue?asset_id=${assetId}&column=${column}${timeParam}${analysis_id}`,
    params
  );
};

/**
 * intl.get('COMM.GFOV')
 */
export const getValues2 = (
  assetId,
  column,
  timeGranularity,
  analysisId,
  params
) => {
  // 过滤后筛选，所有筛选字段变为inchart
  const target = cloneDeep(params);
  target.columns = target.columns.map(col => {
    if (col.col_name === column) {
      col.inChart = true;
    }
    return col;
  });

  const timeParam =
    timeGranularity !== null && timeGranularity !== undefined
      ? `&timeGranularity=${timeGranularity}`
      : '';
  const analysis_id =
    analysisId !== null && analysisId !== undefined
      ? `&analysis_id=${analysisId}`
      : '';
  column = column.replace('#', '%23');
  return request.post(
    `analysis/data/filterValueV2?asset_id=${assetId}&column=${column}${timeParam}${analysis_id}`,
    target
  );
};

/**
 * intl.get('COMM.GOVOFWA')
 */
export const getValuesByToken = (
  assetId,
  column,
  timeGranularity,
  analysisId,
  params,
  token
) => {
  const timeParam =
    timeGranularity !== null && timeGranularity !== undefined
      ? `timeGranularity=${timeGranularity}`
      : '';
  const analysis_id =
    analysisId !== null && analysisId !== undefined
      ? `analysis_id=${analysisId}`
      : '';
  token = token !== null && token !== undefined ? `token=${token}` : '';
  column = column.replace('#', '%23');
  return request.post(
    `analysis/data/filterValueByToken?asset_id=${assetId}&column=${column}&${timeParam}&${analysis_id}&${token}`,
    params
  );
};

/**
 * intl.get('COMM.GOVOFWA')
 */
export const getValues2ByToken = (
  assetId,
  column,
  timeGranularity,
  analysisId,
  params,
  token
) => {
  const target = cloneDeep(params);
  // 过滤后筛选，所有筛选字段变为inChart
  target.columns = target.columns.map(col => {
    if (col.col_name === column) {
      col.inChart = true;
    }
    return col;
  });

  const timeParam =
    timeGranularity !== null && timeGranularity !== undefined
      ? `timeGranularity=${timeGranularity}`
      : '';
  const analysis_id =
    analysisId !== null && analysisId !== undefined
      ? `analysis_id=${analysisId}`
      : '';
  token = token !== null && token !== undefined ? `token=${token}` : '';
  column = column.replace('#', '%23');
  return request.post(
    `analysis/data/filterValueV2ByToken?asset_id=${assetId}&column=${column}&${timeParam}&${analysis_id}&${token}`,
    target
  );
};

/**
 * intl.get('COMM.ACCESS_INTERFACE')
 */
export const getConditionData = (assetId, analysisId, params, options) =>
  request.post(
    `analysis/datasV2?id=${assetId}&analysis_id=${analysisId}`,
    params,
    options
  );

export const getConditionDataByToken = (assetId, token, analysisId, params) =>
  request.post(
    `analysis/datas/queryByTokenV2?id=${assetId}&token=${token}&analysis_id=${analysisId}`,
    params
  );

/**
 * intl.get('COMM.QUERY_ANALYZER')
 */
export const getAnalysisById = (analysisId, options) =>
  request.get(`analysis/query?analysis_id=${analysisId}`, {
    ...options,
    useCache: true,
    cacheDuration: 3000,
  });

export const getAnalysisShareById = (analysisId, token) =>
  request.get(`analysis/queryByToken?analysis_id=${analysisId}&token=${token}`);

export const getDetailData = (assetId, params, analysisId) =>
  request.post(
    `analysis/detail-data?id=${assetId}${
      analysisId ? `&analysisId=${analysisId}` : ''
    }`,
    params
  );

export const getDetailDataByToken = (assetId, token, params, id) =>
  request.post(
    `analysis/detail-data-by-token?id=${assetId}&token=${token}&analysis_id=${id}`,
    params
  );

export const queryLngLatsByAddress = (assetId, column, analysisId) => {
  column = column.replace(/&/g, '%26');
  return request.get(
    `analysis/datas/queryLngLats?assetId=${assetId}&column=${column}&analysis_id=${analysisId}`
  );
};

export const queryLngLatsByToken = (assetId, column, analysisId, token) => {
  column = column.replace(/&/g, '%26');
  return request.get(
    `analysis/datas/queryLngLatsByToken?assetId=${assetId}&column=${column}&analysisId=${analysisId}&token=${token}`
  );
};

/**
 * intl.get('COMM.ASSET_QUERY')
 */
export const queryAssetById = assetId =>
  request.get(`asset?asset_id=${assetId}`);

/**
 * intl.get('COMM.DPAF')
 */
export const getData = params =>
  request.post(`analysis/prepare/getData?count=100`, params);

/**
 * intl.get('COMM.ASDQ')
 */
export const queryShareAnalisys = token =>
  request.get(`analysis/queryShareAnalisys?token=${token}`);

/**
 * intl.get('COMM.TQOAKMITSATODSA')
 */
export const queryAssetsBySource = (assetId, params) =>
  request.post(`asset/queryAssetsBySource?assetId=${assetId}`, params);

/**
 * intl.get('COMM.TQOAKMITSATODSA')
 */
export const queryAssetsBySourceToken = (assetId, params) =>
  request.post(`analysis/queryAssetsByShareToken?assetId=${assetId}`, params);

/**
 * intl.get('COMM.KAAEL')
 */
export const queryAssetNode = (assetId, params) =>
  request.post(`analysis/graph/getNode?asset_id=${assetId}`, params);

/**
 * intl.get('COMM.KNOWLEDGE_MAP')
 */
export const queryGraph = (analysisId, assetId, params) =>
  request.post(
    `analysis/graph/getGraph?analysis_id=${analysisId}&asset_id=${assetId}`,
    params
  );

/**
 * intl.get('COMM.GAEL')
 */
export const queryGraphModel = assetId =>
  request.get(`asset/queryModel?assetId=${assetId}`);

/**
 * intl.get('COMM.KMQNC')
 */
export const queryLabelsByAsset = assetId =>
  request.get(`asset/graph/getLabels?assetId=${assetId}`);

export const queryLabelsNew = (assetId, params) =>
  request.post(
    `analysis/graph/getSelectedRelationLabels?asset_id=${assetId}`,
    params
  );

/**
 * intl.get('COMM.KMQNR')
 */
export const queryRelationByAsset = assetId =>
  request.get(`asset/graph/getRelation?assetId=${assetId}`);

export const queryRelationNew = (assetId, params) =>
  request.post(
    `analysis/graph/getSelectedRelations?asset_id=${assetId}`,
    params
  );

/**
 * intl.get('COMM.KMS')
 */
export const queryGraphSearch = (assetId, keyword) =>
  request.get(`asset/graph/search?assetId=${assetId}&keyword=${keyword}`);

/**
 * intl.get('COMM.KMCR')
 */
export const createRelation = (assetId, params) =>
  request.post(`analysis/graph/createRelation?assetId=${assetId}`, params);

/**
 * intl.get('COMM.VNDOKM')
 */
export const queryNodeDetail = (assetId, nodeId, params) =>
  request.post(
    `analysis/graph/getNodeDetail?assetId=${assetId}&nodeId=${nodeId}`,
    params
  );

/**
 * intl.get('COMM.KMAND')
 */
export const getNodeShortPath = (
  assetId,
  mainConcept,
  nodeConcept,
  mainLabel,
  nodeLabel
) =>
  request.post(
    `analysis/graph/getNodeShortPath?asset_id=${assetId}&main_concept=${mainConcept}&node_concept=${nodeConcept}&main_label=${mainLabel}&node_label=${nodeLabel}`,
    {}
  );

const searchCache = new Map();
/**
 * intl.get('COMM.ACCESS_INTERFACE')
 */
export const getAIData = (assetId, analysisId, params) => {
  const key = JSON.stringify({ assetId, analysisId, params });
  if (!searchCache.get(key)) {
    const data = request.post(
      `analysis/intelligentAnalytics?id=${assetId}&analysis_id=${analysisId}`,
      params
    );
    searchCache.set(key, data);
    return data;
  }
  return new Promise(resolve => {
    resolve(searchCache.get(key));
  });
};

export const getAIDataByToken = (assetId, token, analysisId, params) =>
  request.post(
    `analysis/datas/queryByTokenV2?id=${assetId}&token=${token}&analysis_id=${analysisId}`,
    params
  );

/**
 * @description {intl.get('COMM.QASF')}
 * @param {{masterAssetId:string,slaveIds:string[]}} data {intl.get('REPO.QUERY_PARAMETERS')}
 */
export const getAssetsRelationships = data =>
  request.post('analysis/relationships', data).then(({ status, data }) => {
    if (status === 200) {
      return JSON.parse(data);
    }
    throw new Error(intl.get('APP.FTGD'));
  });

/**
 * @description {intl.get('COMM.GDRVD')}(用三个接口拼接的)
 * @param {{ master_id:string, slave_id:string}} param0
 */
export const getAssetsReationshipsViewData = ({ master_id, slave_id }) => {
  return Promise.all([
    request
      .post('asset/data', undefined, {
        params: { id: master_id, count: 100 },
      })
      .then(({ status, data }) => {
        if (status === 200) {
          return data;
        }
        throw new Error(intl.get('APP.FTGD'));
      }),
    request
      .post('asset/data', undefined, {
        params: { id: slave_id, count: 100 },
      })
      .then(({ status, data }) => {
        if (status === 200) {
          return data;
        }
        throw new Error(intl.get('APP.FTGD'));
      }),
  ]);
};

/**
 * @description {intl.get('COMM.ATA')}id获取同文件夹下兄弟资产
 * @param {{assetId:string}} params {intl.get('REPO.QUERY_PARAMETERS')}
 * */
export const queryRalationsInCata = params => {
  return request.post('asset/queryRalationsInCata', undefined, { params });
};

// 获取表格描述
export const getTableDescription = (assetId, analysisId, params) => {
  const data = request.post(
    `analysis/generaDescription?id=${assetId}&analysis_id=${analysisId}`,
    params
  );
  return data;
};

// 主因子分析接口
export const getMainAna = params => {
  const data = request.post(`analysis/mainAna`, params);
  return data;
};

// 根因定位
export const getRootAna = params => {
  const data = request.post(`analysis/rootAna`, params);
  return data;
};

// 趋势分析
export const getTrendAnalysisData = params => {
  return request.post(`analysis/trendAnalysis`, params);
};

// 单点解释
export const getPointDesc = params =>
  request.post(`analysis/onePointDescAnalysis`, params);
