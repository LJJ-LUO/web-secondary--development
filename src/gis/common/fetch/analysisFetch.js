import intl from 'react-intl-universal';
/**
 * Created by wangming 2017/7/31.
 */
import { FetchApi } from '../Transform';
import PopupTips from '../PopupTips';

// intl.get('COMM.IFCFDWTADAFOCTSOTF')
export const getaAnalysisFieldData = function(assetId, fieldData, callback) {
  let param = {
    url: `analysis/data?id=${assetId}&count=-1`,
    method: {
      method: 'POST',
      cache: 'reload',
      body: JSON.stringify(fieldData),
    },
  };
  FetchApi(param, function(data) {
    if (data.status === 200) {
      callback(data.result);
    } else {
      PopupTips('error', intl.get('COMM.FTGFD'), data.message);
    }
  });
};

export const getaAnalysisFieldListData = function(
  assetId,
  analyzerId,
  fieldDataList,
  callback,
  errorCallback
) {
  let param = {
    url: `analysis/datas?id=${assetId}&analysis_id=${analyzerId}`,
    method: {
      method: 'POST',
      cache: 'reload',
      body: JSON.stringify(fieldDataList),
    },
  };
  FetchApi(param, function(data) {
    if (data.status === 200) {
      callback(data.result);
    } else {
      PopupTips('error', intl.get('COMM.FTGFD'), data.message);
      if (errorCallback) {
        errorCallback(data.message);
      }
    }
  });
};
export const getaAnalysisFieldListDataByToken = function(
  assetId,
  token,
  fieldDataList,
  id,
  callback,
  errorCallback
) {
  let param = {
    url: `analysis/datas/queryByToken?id=${assetId}&token=${token}&analysis_id=${id}`,
    method: {
      method: 'POST',
      cache: 'reload',
      body: JSON.stringify(fieldDataList),
    },
  };
  FetchApi(param, function(data) {
    if (data.status === 200) {
      callback(data.result);
    } else {
      PopupTips('error', intl.get('COMM.FTGFD'), data.message);
      if (errorCallback) {
        errorCallback(data.message);
      }
    }
  });
};
// intl.get('COMM.NIOA')
export const AnalysisSave = function(data, callback) {
  let param = {
    url: `analysis/insert`,
    method: {
      method: 'POST',
      cache: 'reload',
      body: JSON.stringify(data),
    },
  };
  FetchApi(param, function(data) {
    if (data.status === 200) {
      callback(data.message);
    } else {
      PopupTips('error', intl.get('COMM.FTA'), data.message);
    }
  });
};
// intl.get('COMM.AUI')
export const AnalysisUpdate = function(data, callback) {
  let param = {
    url: `analysis/update`,
    method: {
      method: 'POST',
      cache: 'reload',
      body: JSON.stringify(data),
    },
  };
  FetchApi(param, function(data) {
    if (data.status === 200) {
      callback(data.message);
    } else {
      PopupTips('error', intl.get('COMM.UPDATE_FAILED'), data.message);
    }
  });
};
// intl.get('COMM.QSADI')
export const AnalysisQuerySingle = function(analysisId, callback, errCallback) {
  let param = {
    url: `analysis/query?analysis_id=${analysisId}`,
    method: {
      method: 'Get',
      cache: 'reload',
    },
  };
  FetchApi(param, function(data) {
    if (data.status === 200) {
      callback(data.result);
    } else {
      PopupTips('error', intl.get('COMM.QUERY_FAILED'), data.message);
      errCallback();
    }
  });
};
export const AnalysisSingleById = function(analysisId, callback) {
  let param = {
    url: `analysis/query?analysis_id=${analysisId}`,
    method: {
      method: 'Get',
      cache: 'reload',
    },
  };
  FetchApi(param, function(data) {
    callback(data);
  });
};

// intl.get('COMM.QADOA')
export const AnalysisQueryAll = function(callback) {
  let param = {
    url: `analysis/all`,
    method: {
      method: 'POST',
      cache: 'reload',
      body: JSON.stringify({}),
    },
  };
  FetchApi(param, function(data) {
    if (data.status === 200) {
      callback(data.result.results);
    } else {
      PopupTips('error', intl.get('COMM.QUERY_FAILED'), data.message);
    }
  });
};

// intl.get('COMM.ADI')
export const AnalysisDeleteById = function(analysisId, callback) {
  let param = {
    url: 'analysis/delete',
    method: {
      method: 'POST',
      cache: 'reload',
      body: analysisId,
    },
  };
  FetchApi(param, function(data) {
    if (data.status === 200) {
      callback(data);
    } else {
      PopupTips('error', intl.get('COMM.DELETION_FAILED'), data.message);
    }
  });
};

/**
 * intl.get('COMM.SLSWAACSAI')
 * @param {*} analysisId
 * @param {*} callback
 */
export const AnalysisQuerySingleShare = function(analysisId, token, callback) {
  let param = {
    url: `analysis/queryByToken?analysis_id=${analysisId}&token=${token}`,
    method: {
      method: 'Get',
      cache: 'reload',
    },
  };
  FetchApi(param, function(data) {
    if (data.status === 200) {
      callback(data.result);
    } else {
      // PopupTips('error',intl.get('COMM.QUERY_FAILED'),data.message)
    }
  });
};

/**
 * intl.get('COMM.STLSWATCTDIOASA')
 * @param {*} analysisId
 * @param {*} callback
 */
export const getaAnalysisFieldListDataShare = function(
  assetId,
  fieldDataList,
  token,
  callback
) {
  let param = {
    url: `analysis/datas/queryByToken?id=${assetId}&token=${token}`,
    method: {
      method: 'POST',
      cache: 'reload',
      body: JSON.stringify(fieldDataList),
    },
  };
  FetchApi(param, function(data) {
    if (data.status === 200) {
      callback(data.result);
    } else {
      PopupTips('error', intl.get('COMM.FTGFD'), data.message);
    }
  });
};

/**
 * intl.get('COMM.GFVAFD')
 * @param {string} asset_id {intl.get('COMM.MAIN_ASSETS')}id
 * @param {string} column {intl.get('ANAL.FIELD_NAME')}
 * @param {JSON} data {intl.get('COMM.SATDAIOA')}
 */
export const getFilterValue = function(
  assetId,
  column,
  timeGranularity,
  data,
  callback,
  analysisId
) {
  const timeParam =
    timeGranularity !== null && timeGranularity !== undefined
      ? `timeGranularity=${timeGranularity}`
      : '';
  const analysis_id =
    analysisId !== null && analysisId !== undefined
      ? `analysis_id=${analysisId}`
      : '';
  column = column.replace('#', '%23');
  let param = {
    url: `analysis/data/filterValue?asset_id=${assetId}&column=${column}&${timeParam}&${analysis_id}`,
    method: {
      method: 'POST',
      cache: 'reload',
      body: JSON.stringify(data),
    },
  };
  FetchApi(param, function(data) {
    if (data.status === 200) {
      callback(data.result);
    } else {
      PopupTips('error', intl.get('COMM.FTGFVAFD'), data.message);
    }
  });
};

/**
 * intl.get('COMM.DAI')
 * @param {{intl.get('ANAL.ASSETS')}id} assetId
 * @param {{intl.get('COMM.QUERY_CRITERIA')}} fieldDataList
 * @param {{intl.get('COMM.RETURN_VALUE')}} callback
 * @param {{intl.get('COMM.FAILURE_RETURN')}} errorCallback
 */
export const getDataextractorData = function(
  assetId,
  fieldDataList,
  callback,
  errorCallback
) {
  let param = {
    url: `dataextractor/data?assetId=${assetId}&count=10`,
    method: {
      method: 'POST',
      cache: 'reload',
      body: JSON.stringify(fieldDataList),
    },
  };
  FetchApi(param, function(data) {
    if (data.status === 200) {
      callback(data.result);
    } else {
      PopupTips('error', intl.get('COMM.FTGFD'), data.message);
      if (errorCallback) {
        errorCallback(data.message);
      }
    }
  });
};
