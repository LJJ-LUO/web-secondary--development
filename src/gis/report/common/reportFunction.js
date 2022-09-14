import intl from 'react-intl-universal';
import {
  AnalysisQuerySingle,
  AnalysisQuerySingleShare,
  getaAnalysisFieldListData,
  getaAnalysisFieldListDataByToken,
} from '../../common/fetch/analysisFetch';
import {
  getConditionData,
  getValues,
  getValues2,
  getAnalysisById,
  getAnalysisShareById,
} from '../../common/service/new-analyzer';
import { queryDataByReportViewId } from '../../common/service/bigscreen';
import { getTransData } from '../../analyzer_2/util';
import { CONDITION_LIST } from '../../config/bigScreen';
import { message } from 'antd';
import axios from 'axios';
import qs from 'querystringify';
const DATATYPE = {
  0: 'string',
  5: 'date',
  6: 'timestamp',
  8: 'number',
  10: 'image',
  string: 0,
  date: 5,
  timestamp: 6,
  number: 8,
  image: 10,
};

const CUSTOM_DATE_OPTION = 20;
const AnalysisMap = {};

function conditionWrapper(cal_condition) {
  (cal_condition || []).forEach(con => {
    const filterExpression = con.filterExpression;
    con.filterExpression =
      typeof filterExpression === 'object'
        ? filterExpression.expression || filterExpression.filterExpression
        : filterExpression;
  });
  return cal_condition;
}

/**
 * 根据分析仪id{intl.get('COMM.GET_DATA')}
 * @param {*} id {intl.get('APP.ANALYZER')}id
 * @param {*} callback 返回加载图形需要的data{intl.get('APIT.OBJECT')}
 */
export const returnData = ({ id, callback, variable, sheetIndex = 0 }) => {
  AnalysisQuerySingle(
    id,
    async analysisData => {
      const cal_condition = JSON.parse(analysisData.cal_condition);
      sheetIndex =
        sheetIndex > cal_condition.length - 1
          ? cal_condition.length - 1
          : sheetIndex;
      const { prepare_condition } = analysisData;

      let sheetName = [intl.get('COMM.WORKSPACE_1').d('工作区1')];
      if (prepare_condition) {
        const { sheetsName } = JSON.parse(prepare_condition);
        sheetsName && (sheetName = sheetsName);
      }

      const condition = cal_condition[sheetIndex];
      if (condition.dimensions || condition.values) {
        // {intl.get('COMM.OTRF')}filter数据结构变化为数组
        if (condition.values && condition.values.length > 0) {
          condition.values.forEach(value => {
            if (
              value.filter &&
              !Array.isArray(value.filter) &&
              typeof value.filter === 'object'
            ) {
              value.filter = [value.filter];
            }
          });
        }
        getaAnalysisFieldListData(
          analysisData.asset_id,
          id,
          cal_condition,
          function (chartData) {
            let temObj = {};
            const {
              timer,
              asset_id,
              asset_type,
              chart_type,
              custom_settings,
              analysis_name,
              chart_type_enhancer,
              custom_settings_enhancer,
              analysis_type,
            } = analysisData;

            let _chart_type =
              chart_type || JSON.parse(chart_type_enhancer || '[]')[sheetIndex];
            let _custom_settings = custom_settings
              ? JSON.parse(custom_settings)
              : JSON.parse(custom_settings_enhancer || '[]')[sheetIndex];

            temObj.timer = timer;
            temObj.assetId = asset_id;
            temObj.assetType = asset_type;
            temObj.rawData = chartData[0] ? chartData[0].data : null;
            temObj.condition = cal_condition;
            temObj.chartType = _chart_type;
            temObj.id = id;
            temObj.options = _custom_settings;
            temObj.analysis_name = analysis_name;
            temObj.sheetNames = sheetName;
            temObj.analysis_type = analysis_type || 0;
            callback(temObj);
          }
        );
      } else {
        // {intl.get('COMM.NDAI')}
        let temObj = {};
        const {
          timer,
          asset_id,
          asset_type,
          chart_type,
          custom_settings,
          analysis_name,
          category,
          chart_type_enhancer,
          custom_settings_enhancer,
          analysis_type,
        } = analysisData;

        let _chart_type =
          chart_type || JSON.parse(chart_type_enhancer || '[]')[sheetIndex];
        let _custom_settings = custom_settings
          ? JSON.parse(custom_settings)
          : JSON.parse(custom_settings_enhancer || '[]')[sheetIndex];

        temObj.timer = timer;
        temObj.assetId = asset_id;
        temObj.assetType = asset_type;
        temObj.conditionData = [];
        temObj.rawData = { dims: {} };
        temObj.condition = conditionWrapper(cal_condition);
        temObj.chartType = _chart_type;
        temObj.id = id;
        temObj.options = _custom_settings;
        temObj.analysis_name = analysis_name;
        temObj.category = category;
        temObj.sheetNames = sheetName;
        temObj.analysis_type = analysis_type || 0;

        if (
          condition.tableCondition ||
          !condition.columns ||
          condition.columns.length === 0
        ) {
          // {intl.get('COMM.TVONFDNADD')}
          callback(temObj);
        } else {
          try {
            const { data } = await getConditionData(asset_id, id, {
              ...condition,
              variable,
            });
            const chartColumns = condition.columns.filter(col => {
              return col.inChart;
            });
            const transformData = getTransData(
              chartColumns,
              data.chartData || [],
              _chart_type,
              condition
            );
            temObj.conditionData = data.chartData || [];
            temObj.rawData = transformData;
            callback(temObj);
          } catch (error) {
            console.error(error);
          }
        }
      }
    },
    () => {
      callback();
    }
  );
};

function getTimeGranularity(item) {
  let type = item.col_datatype || item.datatype;
  if (DATATYPE[type] === 'date' || DATATYPE[type] === 'timestamp') {
    return item.timeGranularity === null || item.timeGranularity === undefined
      ? CUSTOM_DATE_OPTION
      : item.timeGranularity;
  } else {
    return null;
  }
}

export const returnNewSeriesData = (id, callback) => {
  AnalysisQuerySingle(
    id,
    async analysisData => {
      const cal_condition = JSON.parse(analysisData.cal_condition);
      const condition = cal_condition[0];
      if (condition.series && condition.series.length > 0) {
        const length = condition.series.length;
        let count = 0;
        const post =
          condition && (condition.dimensions || condition.values)
            ? getValues
            : getValues2;
        const con = condition ? { ...condition } : {};
        condition.series.forEach(async ser => {
          const common = {
            series: [
              {
                alias: ser.col_alias,
                column: ser.col_name,
                datatype: ser.col_datatype,
              },
            ],
            filters: condition ? condition.filters : [],
            associations: condition.associations,
          };
          const params =
            condition && (condition.dimensions || condition.values)
              ? [common]
              : {
                ...con,
                ...common,
              };
          let { data: dataSource } = await post(
            analysisData.asset_id,
            ser.col_name,
            getTimeGranularity(ser),
            getTimeGranularity(ser) !== CUSTOM_DATE_OPTION ? null : id,
            params
          );
          dataSource = dataSource.map((item, index) => {
            if (Object.prototype.toString.call(item) === '[object Object]') {
              return {
                ...item,
                key: `d-${index}`,
                custom: item.filters,
              };
            } else {
              return {
                value: item,
                key: `d-${index}`,
              };
            }
          });
          if (
            DATATYPE[ser.col_datatype] === 'date' ||
            DATATYPE[ser.col_datatype] === 'timestamp'
          ) {
            if (
              ser.timeGranularity === CUSTOM_DATE_OPTION ||
              ser.timeGranularity === null ||
              ser.timeGranularity === undefined
            ) {
              dataSource.forEach(it => {
                if (it.value && it.value.value) {
                  it.filters = it.value.filters;
                  delete it.value.filters;
                  it.value = it.value.value;
                }
              });
            }
          }
          ser.customLabels = dataSource;
          count = count + 1;
          if (count !== length) {
            return;
          }

          if (condition.dimensions || condition.values) {
            getaAnalysisFieldListData(
              analysisData.asset_id,
              id,
              cal_condition,
              function (chartData) {
                let temObj = {};
                temObj.timer = analysisData.timer;
                temObj.assetId = analysisData.asset_id;
                temObj.assetType = analysisData.asset_type;
                temObj.rawData = chartData[0].data;
                temObj.condition = cal_condition;
                temObj.chartType = analysisData.chart_type;
                temObj.id = id;
                temObj.options = JSON.parse(analysisData.custom_settings);
                temObj.analysis_name = analysisData.analysis_name;
                callback(temObj);
              }
            );
          } else {
            // {intl.get('COMM.NDAI')}
            const {
              timer,
              asset_id,
              asset_type,
              chart_type,
              custom_settings,
              analysis_name,
              category,
              chart_type_enhancer,
              custom_settings_enhancer,
              analysis_type,
            } = analysisData;

            let _chart_type =
              chart_type || JSON.parse(chart_type_enhancer || '[]')[0];
            let _custom_settings = custom_settings
              ? JSON.parse(custom_settings)
              : JSON.parse(custom_settings_enhancer || '[]')[0];

            try {
              const { data } = await getConditionData(
                analysisData.asset_id,
                id,
                condition
              );
              const chartColumns = condition.columns.filter(col => {
                return col.inChart;
              });
              const transformData = getTransData(
                chartColumns,
                data.chartData || [],
                _chart_type,
                condition
              );
              let temObj = {};
              temObj.timer = timer;
              temObj.assetId = asset_id;
              temObj.assetType = asset_type;
              temObj.conditionData = data.chartData || [];
              temObj.rawData = transformData;
              temObj.condition = conditionWrapper(cal_condition);
              temObj.chartType = _chart_type;
              temObj.id = id;
              temObj.options = _custom_settings;
              temObj.analysis_name = analysis_name;
              temObj.analysis_type = analysis_type || 0;
              temObj.category = category;
              callback(temObj);
            } catch (error) {
              console.error(error);
            }
          }
        });
      } else {
        if (condition.dimensions || condition.values) {
          // {intl.get('COMM.OTRF')}filter数据结构变化为数组
          if (condition.values && condition.values.length > 0) {
            condition.values.forEach(value => {
              if (
                value.filter &&
                !Array.isArray(value.filter) &&
                typeof value.filter === 'object'
              ) {
                value.filter = [value.filter];
              }
            });
          }
          getaAnalysisFieldListData(
            analysisData.asset_id,
            id,
            cal_condition,
            function (chartData) {
              let temObj = {};
              temObj.timer = analysisData.timer;
              temObj.assetId = analysisData.asset_id;
              temObj.rawData = chartData[0].data;
              temObj.condition = cal_condition;
              temObj.chartType = analysisData.chart_type;
              temObj.id = id;
              temObj.options = JSON.parse(analysisData.custom_settings);
              temObj.analysis_name = analysisData.analysis_name;
              callback(temObj);
            }
          );
        } else {
          // {intl.get('COMM.NDAI')}
          const {
            chart_type,
            custom_settings,
            chart_type_enhancer,
            custom_settings_enhancer,
            analysis_type,
          } = analysisData;

          try {
            const { data } = await getConditionData(
              analysisData.asset_id,
              id,
              condition
            );
            const chartColumns = condition.columns.filter(col => {
              return col.inChart;
            });
            let _chart_type =
              chart_type || JSON.parse(chart_type_enhancer || '[]')[0];
            const transformData = getTransData(
              chartColumns,
              data.chartData || [],
              _chart_type,
              condition
            );

            let _custom_settings = custom_settings
              ? JSON.parse(custom_settings)
              : JSON.parse(custom_settings_enhancer || '[]')[0];

            let temObj = {};
            temObj.timer = analysisData.timer;
            temObj.assetId = analysisData.asset_id;
            temObj.conditionData = data.chartData || [];
            temObj.rawData = transformData;
            temObj.condition = conditionWrapper(cal_condition);
            temObj.chartType = _chart_type;
            temObj.id = id;
            temObj.options = _custom_settings;
            temObj.analysis_name = analysisData.analysis_name;
            temObj.analysis_type = analysis_type || 0;
            callback(temObj);
          } catch (error) {
            console.error(error);
          }
        }
      }
    },
    () => {
      callback();
    }
  );
};

/**
 * 分享完不需要鉴权的方法根据分析仪id{intl.get('COMM.GET_DATA')}
 * @param {*} id {intl.get('APP.ANALYZER')}id
 * @param {*} callback 返回加载图形需要的data{intl.get('APIT.OBJECT')}
 */
export const returnShareData = (id, token, callback, variable) => {
  AnalysisQuerySingleShare(id, token, analysisData => {
    const cal_condition = JSON.parse(analysisData.cal_condition);
    const condition = cal_condition[0];
    if (condition.dimensions || condition.values) {
      // {intl.get('COMM.OTRF')}filter数据结构变化为数组
      if (condition.values && condition.values.length > 0) {
        condition.values.forEach(value => {
          if (
            value.filter &&
            !Array.isArray(value.filter) &&
            typeof value.filter === 'object'
          ) {
            value.filter = [value.filter];
          }
        });
      }
    }

    getaAnalysisFieldListDataByToken(
      analysisData.asset_id,
      token,
      [{ ...condition, variable }],
      id,
      function (chartData) {
        let result = chartData[0].data;
        if (chartData[0].chartData) {
          const chartColumns = condition.columns.filter(col => {
            return col.inChart;
          });
          result = getTransData(
            chartColumns,
            chartData[0].chartData,
            analysisData.chart_type,
            condition
          );
        }
        let temObj = {};
        const {
          timer,
          asset_id,
          asset_type,
          chart_type,
          custom_settings,
          analysis_name,
          chart_type_enhancer,
          custom_settings_enhancer,
          analysis_type,
        } = analysisData;

        let _chart_type =
          chart_type || JSON.parse(chart_type_enhancer || '[]')[0];
        let _custom_settings = custom_settings
          ? JSON.parse(custom_settings)
          : JSON.parse(custom_settings_enhancer || '[]')[0];

        temObj.timer = timer;
        temObj.assetId = asset_id;
        temObj.assetType = asset_type;
        temObj.rawData = result;
        temObj.conditionData = chartData[0].chartData || [];
        temObj.condition = conditionWrapper(cal_condition);
        temObj.chartType = _chart_type;
        temObj.id = id;
        temObj.options = _custom_settings;
        temObj.analysis_name = analysis_name;
        temObj.analysis_type = analysis_type || 0;
        callback(temObj);
      }
    );
  });
};

export const request = async (checkAbortFunc, promise, ...args) => {
  var CancelToken = axios.CancelToken;
  var source = CancelToken.source();

  const response = promise(...args, {
    cancelToken: source.token,
  });

  let inter = setInterval(() => {
    if (checkAbortFunc()) {
      source.cancel();
      clearInterval(inter);
    }
  }, 60);

  const result = await response;

  clearInterval(inter);

  return result;
};

/**
 * 根据分析仪id{intl.get('COMM.GET_DATA')}
 * @param {*} id {intl.get('APP.ANALYZER')}id
 * @param {*} callback 返回加载图形需要的data{intl.get('APIT.OBJECT')}
 */
export const returnDataNew = async ({
  analysis,
  callback,
  variable,
  sheetIndex = 0,
  errCallback,
  filters,
  menuId,
}) => {
  const analysisId = analysis.analysis_id || analysis.id;
  try {
    // if (!AnalysisMap[analysisId]) {
    AnalysisMap[analysisId] = request(
      () => {
        return menuId && qs.parse(location.search)?.menuId !== menuId;
      },
      getAnalysisById,
      analysisId
    );
    // }

    const { data } = await AnalysisMap[analysisId];

    const analysisData = data;
    const { prepare_condition } = analysisData;
    const cal_condition = JSON.parse(analysisData.cal_condition);
    if (cal_condition.length === 0) {
      message.error(intl.get('ANAL.NO_WORKSPACE').d('分析仪不存在工作区'));
      return;
    }
    sheetIndex =
      sheetIndex > cal_condition.length - 1
        ? cal_condition.length - 1
        : sheetIndex;

    let sheetName = [intl.get('COMM.WORKSPACE_1').d('工作区1')];
    if (prepare_condition) {
      const { sheetsName } = JSON.parse(prepare_condition);
      sheetsName && (sheetName = sheetsName);
    }

    const condition = cal_condition[sheetIndex];
    if (condition.dimensions || condition.values) {
      // {intl.get('COMM.OTRF')}filter数据结构变化为数组
      if (condition.values && condition.values.length > 0) {
        condition.values.forEach(value => {
          if (
            value.filter &&
            !Array.isArray(value.filter) &&
            typeof value.filter === 'object'
          ) {
            value.filter = [value.filter];
          }
        });
      }
      getaAnalysisFieldListData(
        analysisData.asset_id,
        analysisId,
        cal_condition,
        function (chartData) {
          let temObj = {};
          const {
            timer,
            asset_id,
            asset_type,
            chart_type,
            custom_settings,
            analysis_name,
            chart_type_enhancer,
            custom_settings_enhancer,
            analysis_type,
          } = analysisData;

          let _chart_type =
            chart_type || JSON.parse(chart_type_enhancer || '[]')[sheetIndex];
          let _custom_settings = custom_settings
            ? JSON.parse(custom_settings)
            : JSON.parse(custom_settings_enhancer || '[]')[sheetIndex];

          temObj.timer = timer;
          temObj.assetId = asset_id;
          temObj.assetType = asset_type;
          temObj.rawData = chartData[0].data;
          temObj.condition = cal_condition;
          temObj.chartType = _chart_type;
          temObj.id = analysisId;
          temObj.options = _custom_settings;
          temObj.analysis_type = analysis_type || 0;
          temObj.analysis_name = analysis_name;
          temObj.sheetNames = sheetName;
          temObj.prepare_condition = prepare_condition;
          callback(temObj);
        }
      );
    } else {
      // {intl.get('COMM.NDAI')}
      let temObj = {};
      const {
        timer,
        asset_id,
        asset_type,
        chart_type,
        custom_settings,
        analysis_name,
        category,
        chart_type_enhancer,
        custom_settings_enhancer,
        analysis_type,
      } = analysisData;

      let _chart_type =
        chart_type || JSON.parse(chart_type_enhancer || '[]')[sheetIndex];
      let _custom_settings = custom_settings
        ? JSON.parse(custom_settings)
        : JSON.parse(custom_settings_enhancer || '[]')[sheetIndex];
      temObj.timer = timer;
      temObj.assetId = asset_id;
      temObj.assetType = asset_type;
      temObj.conditionData = [];
      temObj.rawData = { dims: {} };
      temObj.condition = conditionWrapper(cal_condition);
      temObj.chartType = _chart_type;
      temObj.id = analysisId;
      temObj.options = _custom_settings;
      temObj.analysis_name = analysis_name;
      temObj.category = category;
      temObj.sheetNames = sheetName;
      temObj.analysis_type = analysis_type || 0;
      temObj.prepare_condition = prepare_condition;
      if (analysis.selected_catalog) {
        temObj.selected_catalog = analysis.selected_catalog;
      }
      if (
        condition.tableCondition ||
        !condition.columns ||
        condition.columns.length === 0
      ) {
        // {intl.get('COMM.TVDNADD')}
        callback(temObj);
        return void 0;
      }

      // {intl.get('COMM.BCFCULC')}
      if (typeof filters === 'object') {
        const keys = Object.keys(filters);
        let filterCondition = keys
          .map(k => {
            const same = condition.columns.find(
              m => m.col_name === k || m.column === k
            );

            if (same && filters[k] && filters[k] !== '') {
              return {
                column: k,
                compareObj: filters[k],
                datatype: 0,
                satisfy_type: 0,
                type: 4,
                unit: 0,
                varibleType: 'values',
              };
            }
            return undefined;
          })
          .filter(e => e);
        condition.filters = [...(condition.filters || []), ...filterCondition];
      }

      try {
        const { data } = await request(
          () => {
            return menuId && qs.parse(location.search)?.menuId !== menuId;
          },
          getConditionData,
          asset_id,
          analysisId,
          {
            ...condition,
            variable,
          }
        );
        const chartColumns = condition.columns.filter(col => {
          return col.inChart;
        });
        const transformData = getTransData(
          chartColumns,
          data.chartData || [],
          _chart_type,
          condition
        );
        temObj.conditionData = data.chartData || [];
        temObj.rawData = transformData;
        temObj.prepare_condition = prepare_condition;
        callback(temObj);
      } catch (error) {
        console.error(error);
        errCallback && errCallback(error);
      }
    }
  } catch (error) {
    if (error?.data?.message === intl.get('SRC.TADNEOHF')) {
      message.error(`分析仪【${analysis.analysis_name}】不存在或已失效`);
    } else {
      if (error?.data?.message) {
        message.error(error?.data?.message);
      }
    }
  }
};

/**
 * 分享完不需要鉴权的方法根据分析仪id{intl.get('COMM.GET_DATA')}
 * @param {*} id {intl.get('APP.ANALYZER')}id
 * @param {*} callback 返回加载图形需要的data{intl.get('APIT.OBJECT')}
 */
export const returnShareDataNew = async ({
  analysis,
  token,
  callback,
  variable,
  sheetIndex = 0,
  filters,
}) => {
  const analysisId = analysis.analysis_id || analysis.id;
  try {
    const { data } = await getAnalysisShareById(analysisId, token);
    const analysisData = data;
    const cal_condition = JSON.parse(analysisData.cal_condition);
    const { prepare_condition } = analysisData;
    const condition = cal_condition[sheetIndex];
    sheetIndex =
      sheetIndex > cal_condition.length - 1
        ? cal_condition.length - 1
        : sheetIndex;

    let sheetName = [intl.get('COMM.WORKSPACE_1').d('工作区1')];
    if (prepare_condition) {
      const { sheetsName } = JSON.parse(prepare_condition);
      sheetsName && (sheetName = sheetsName);
    }

    if (condition.dimensions || condition.values) {
      // {intl.get('COMM.OTRF')}filter数据结构变化为数组
      if (condition.values && condition.values.length > 0) {
        condition.values.forEach(value => {
          if (
            value.filter &&
            !Array.isArray(value.filter) &&
            typeof value.filter === 'object'
          ) {
            value.filter = [value.filter];
          }
        });
      }
    }

    const {
      timer,
      asset_id,
      asset_type,
      chart_type,
      custom_settings,
      analysis_name,
      chart_type_enhancer,
      custom_settings_enhancer,
      analysis_type,
    } = analysisData;

    let _chart_type =
      chart_type || JSON.parse(chart_type_enhancer || '[]')[sheetIndex];
    let _custom_settings = custom_settings
      ? JSON.parse(custom_settings)
      : JSON.parse(custom_settings_enhancer || '[]')[sheetIndex];

    let temObj = {};
    temObj.timer = timer;
    temObj.assetId = asset_id;
    temObj.assetType = asset_type;
    temObj.rawData = { dims: {} };
    temObj.condition = conditionWrapper(cal_condition);
    temObj.chartType = _chart_type;
    temObj.id = analysisId;
    temObj.options = _custom_settings;
    temObj.analysis_name = analysis_name;
    temObj.sheetNames = sheetName;
    temObj.analysis_type = analysis_type || 0;
    temObj.prepare_condition = prepare_condition;
    if (
      condition.tableCondition ||
      !condition.columns ||
      condition.columns.length === 0
    ) {
      // {intl.get('COMM.TVDNADD')}
      callback(temObj);
      return;
    }

    // {intl.get('COMM.BCFCULC')}
    if (typeof filters === 'object') {
      const keys = Object.keys(filters);
      let filterCondition = keys
        .map(k => {
          const same = condition.columns.find(
            m => m.col_name === k || m.column === k
          );

          if (same && filters[k] && filters[k] !== '') {
            return {
              column: k,
              compareObj: filters[k],
              datatype: 0,
              satisfy_type: 0,
              type: 4,
              unit: 0,
              varibleType: 'values',
            };
          }
          return undefined;
        })
        .filter(e => e);
      condition.filters = [...(condition.filters || []), ...filterCondition];
    }

    getaAnalysisFieldListDataByToken(
      asset_id,
      token,
      [
        {
          ...condition,
          variable,
        },
      ],
      analysisId,
      function (chartData) {
        let result = chartData[0].data;
        if (chartData[0].chartData) {
          const chartColumns = condition.columns.filter(col => {
            return col.inChart;
          });
          result = getTransData(
            chartColumns,
            chartData[0].chartData,
            _chart_type,
            condition
          );
        }
        temObj.conditionData = chartData[0].chartData;
        temObj.prepare_condition = prepare_condition;
        temObj.rawData = result;
        callback(temObj);
      }
    );
  } catch (error) {
    if (error.data.message === intl.get('SRC.TADNEOHF')) {
      message.error(`分析仪【${analysis.analysis_name}】不存在或已失效`);
    } else {
      message.error(error.data.message);
    }
  }
};

/**
 * intl.get('COMM.RTAD')
 * @param {*} assetId
 * @param {*} params
 * @param {*} token
 * @param {*} callback
 */
export const refreshTextAreaData = async (assetId, params, token, callback) => {
  if (params.queryParams) {
    const queryParams = [];
    params.queryParams.forEach(item => {
      if (item.value) {
        queryParams.push(item);
      } else if (CONDITION_LIST.indexOf(item.type) > -1) {
        queryParams.push({
          ...item,
          value: null,
        });
      }
    });
    queryParams.forEach(item => {
      if (item.datatype === 8 && CONDITION_LIST.indexOf(item.type) < 0) {
        item.value = Number(item.value);
      }
    });
    params.queryParams = queryParams;
  }
  try {
    const { data } = await queryDataByReportViewId(assetId, params);

    callback(data.results);
  } catch (error) {
    console.error(error);
  }
};
