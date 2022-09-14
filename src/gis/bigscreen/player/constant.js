import intl from 'react-intl-universal';
import { ChartTypes, AI_ChartTypes } from '../../analyzer_2/constant';
import { chartTemplates } from './toolbar/chartTemplateTools/templates';
import externalStore from '../../analyzer_2/store/external';
import {
  returnDataNew,
  returnShareDataNew,
  refreshTextAreaData,
} from '../../report/common/reportFunction';
import qs from 'querystringify';
import { CONDITION_LIST } from '../../config/bigScreen';
import { objDeepCopy } from '../../common/Transform';
import merge from 'lodash.merge';

const TABLE_TYPES = ['101', '601'];
const INDICATOR_TYPES = ['405', '416', '109', '134', '602'];

export function getMergeOptions(data) {
  return {
    title: { text: data.analysis_name },
    yAxis: { alternateGridColor: false },
    legend: { enabled: true },
  };
}

export const chartTypeArray = [
  { type: intl.get('SRC.LINE_CHART'), icon: 'icon-shuzhou', id: 'line' },
  { type: intl.get('SRC.HISTOGRAM'), icon: 'icon-tubiaoleixing', id: 'column' },
  { type: intl.get('SRC.AREA_MAP'), icon: 'icon-mianjitu', id: 'area' },
  { type: intl.get('SRC.PIE_CHART'), icon: 'icon-bingtu', id: 'pie' },
  {
    type: intl.get('SRC.INSTRUMENT_DIAGRAM'),
    icon: 'icon-yibiaotu',
    id: 'index',
  },
  { type: intl.get('SRC.OTHER'), icon: 'icon-qita1', id: 'other' },
];

export const THEMES = {
  THEME_ID_1: 't-101',
  THEME_ID_2: 't-102',
};

const POLOR_COLORS_1 = ['#4F9BFF', '#F7BF40', '#6EFF68', '#FF7596', '#05E3FF'];
const POLOR_COLORS_2 = ['#33E7F8', '#F5C303', '#9864E3', '#51B4D7'];

export const themes = [
  {
    id: THEMES.THEME_ID_1,
    name: intl.get('SRC.ICEBERG'),
    thumbnail: 'theme_101.png',
    cartesian: {
      highcharts: {
        colors: ['#43BAFE', '#51FFC1', '#FFC000', '#FF7596', '#82D920'],
      },
      echarts: {
        color: ['#43BAFE', '#51FFC1', '#FFC000', '#FF7596', '#82D920'],
      },
    },
    polar: {
      highcharts: {
        colors: POLOR_COLORS_1,
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              formatter: function () {
                return `<span style="color: ${POLOR_COLORS_1[this.point.colorIndex]
                  }">${this.y || this.key}</span>`;
              },
            },
          },
        },
      },
      echarts: {
        color: POLOR_COLORS_1,
      },
    },
    indicator: {
      customStyle: {
        indicatorTitleColor: '#FFFFFF',
        indicatorValueColor: '#6EFF68',
        indicatorUnitColor: '#82D920',
      },
    },
    table: {},
  },
  {
    id: THEMES.THEME_ID_2,
    name: intl.get('SRC.DUSK'),
    thumbnail: 'theme_102.png',
    cartesian: {
      highcharts: {
        colors: ['#33E7F8', '#F5C303', '#9864E3', '#51B4D7'],
      },
      echarts: {
        color: ['#33E7F8', '#F5C303', '#9864E3', '#51B4D7'],
      },
    },
    polar: {
      highcharts: {
        colors: POLOR_COLORS_2,
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              formatter: function () {
                return `<span style="color: ${POLOR_COLORS_2[this.point.colorIndex]
                  }">${this.y || this.key}</span>`;
              },
            },
          },
        },
      },
      echarts: {
        color: POLOR_COLORS_2,
      },
    },
    indicator: {
      customStyle: {
        indicatorTitleColor: '#FFFFFF',
        indicatorValueColor: '#FFC90A',
        indicatorUnitColor: '#8FB3FF',
      },
    },
    table: {},
  },
];

export function getCatagory(blockType, chartType) {
  const allTypes = ChartTypes.concat(AI_ChartTypes, externalStore.config);
  const targetCharts = blockType === 'chart' ? allTypes : chartTemplates;
  const chart = targetCharts.find(t => {
    return t.type === chartType;
  });
  if (INDICATOR_TYPES.includes(chartType)) {
    return 'indicator';
  }
  if (TABLE_TYPES.includes(chartType)) {
    return 'table';
  }
  if (chart && chart.category === 'pie') {
    return 'polar';
  }
  return 'cartesian';
}

export const CUSTOM_EVENT_NAME = 'CUSTOM_EVENT';
export const MAP_CIRCLE_EVENT = 'MAP_CIRCLE_EVENT';
export const ANALYZER_VARIABLE_EVENT = 'ANALYZER_VARIABLE_EVENT';
export const LINKAGE_EVENT = 'LINKAGE_EVENT';
// intl.get('EVEN.UPDATE_VARIABLE')
export const changeVariables = (params, blocks, store) => {
  blocks.forEach(item => {
    if (
      !item.isTemplate &&
      (item.type === 'chart' || item.type === 'chart-template')
    ) {
      if (item.type === 'chart') {
        refreshData(item, params, store);
      } else if (item.type === 'chart-template') {
        refreshTextArea(item, params, store);
      }
    }
    if (item.type === 'container' || item.type === 'jump') {
      const arr = JSON.parse(JSON.stringify(item.variable));
      params.forEach(param => {
        let flag = true;
        arr.forEach((obj, index) => {
          if (obj.name === param.name) {
            item.variable[index].current_value = param.current_value;
            flag = false;
          }
        });
        if (flag && param.name && param.name !== '') {
          item.variable.push(param);
        }
      });
    }
  });
};
// intl.get('SRC.REFRESH_DATA')
const refreshData = async (block, params, store) => {
  const { variables = [] } = store;
  const { analysis_id } = block.data;
  const { token } = qs.parse(window.location.search);
  if (analysis_id && !block.isTemplate) {
    let newVariables = objDeepCopy(block.variable);
    newVariables.forEach(obj => {
      params.forEach(param => {
        if (obj.variable_name === param.name) {
          obj.current_value = param.current_value;
        }
        if (obj.variable_name === param.name && param.default_value) {
          obj.default_value = param.default_value;
        }
      });
    });
    variables.forEach(obj => {
      let num = 0;
      newVariables.forEach(item => {
        if (item.variable_type === 2) {
          if (item.variable_name === obj.name) {
            num++;
            item.current_value = obj.default_value;
          }
        } else {
          num++;
        }
      });
      if (num === 0) {
        newVariables.push({
          name: obj.name,
          current_value: obj.default_value,
        });
      }
    });
    if (token) {
      returnShareDataNew({
        analysis: block.data,
        token,
        callback: data => {
          data.options = merge(
            {
              title: {
                text: block.data.chart_type === '408' ? null : block.name,
              },
              yAxis: { alternateGridColor: false },
              legend: { enabled: true },
            },
            data.options
          );
          data.analysis_id = block.data.analysis_id;
          data.create_member = block.data.create_member;
          if (data.condition[0]) {
            data.condition[0].variable = newVariables;
          }
          block.data = data;
        },
        variable: newVariables,
        sheetIndex: block.sheetIndex,
      });
    } else {
      await returnDataNew({
        analysis: block.data,
        callback: data => {
          data.options = merge(
            {
              title: {
                text: block.data.chart_type === '408' ? null : block.name,
              },
              yAxis: { alternateGridColor: false },
              legend: { enabled: true },
            },
            data.options
          );
          data.analysis_id = block.data.analysis_id;
          data.create_member = block.data.create_member;
          if (data.condition[0]) {
            data.condition[0].variable = newVariables;
          }
          block.data = data;
        },
        variable: newVariables,
        sheetIndex: block.sheetIndex,
      });
    }
  }
};

// intl.get('COMM.RTAC')
const refreshTextArea = async (block, params) => {
  const { assetId, limitNumber } = block.data;
  const { token } = qs.parse(window.location.search);
  if (assetId && block.data.variables && block.data.variables.length > 0) {
    let tempVariables = JSON.parse(JSON.stringify(block.data.variables));
    tempVariables.forEach(item => {
      params.forEach(param => {
        if (item.variable_type === 2 && item.variable_name === param.name) {
          item.current_value = param.current_value;
        }
      });
    });
    const valueList = [5, 6, 8];
    let queryParams = tempVariables.map(item => {
      if (CONDITION_LIST.indexOf(item.type) > -1) {
        return {
          colName: item.assetName || item.name,
          filterCondition: 0,
          type: item.type,
          value: null,
          datatype: item.col_datatype || 0,
        };
      } else if (item.current_value && item.current_value !== '') {
        return {
          // {intl.get('COMM.PFN')}, 没有再使用字段标题
          colName: item.assetName || item.name,
          filterCondition: 0,
          type: item.type,
          value:
            valueList.indexOf(item.col_datatype) > -1
              ? parseFloat(item.current_value, 10)
              : item.current_value,
          datatype: item.col_datatype || 0,
        };
      }
    });

    await refreshTextAreaData(
      assetId,
      {
        pageSize: limitNumber ? parseInt(limitNumber) : 10,
        pageNum: 1,
        queryParams: queryParams,
      },
      token || null,
      rawData => {
        block.data = {
          ...block.data,
          rawData: rawData,
        };
      }
    );
  }
};
// intl.get('SRC.DCO')
export function deepCompare(oldData, newData) {
  if (
    isObject(oldData) &&
    isObject(newData) &&
    Object.keys(oldData).length === Object.keys(newData).length
  ) {
    // {intl.get('SRC.TTIOATNOEITS')}
    // {intl.get('COMM.TAPIAO')},判断元素是否相同
    for (const key in oldData) {
      if (oldData.hasOwnProperty(key)) {
        if (!deepCompare(oldData[key], newData[key])) {
          // 对象中具有不相同属性 {intl.get('APP.RETURN')}false
          return false;
        }
      }
    }
  } else if (
    isArray(oldData) &&
    isArray(oldData) &&
    oldData.length === newData.length
  ) {
    // {intl.get('SRC.TTIAATALITS')}
    for (let i = 0, length = oldData.length; i < length; i++) {
      if (!deepCompare(oldData[i], newData[i])) {
        // 如果数组元素中具有不相同元素,{intl.get('APP.RETURN')}false
        return false;
      }
    }
  } else if (oldData === newData) {
    // {intl.get('COMM.WTTIABT')},如果相同,则返回true
    return true;
  } else {
    // {intl.get('COMM.OTHER_TYPES')},均返回false
    return false;
  }
  // 走到这里,说明数组或者对象中所有元素都相同,{intl.get('APP.RETURN')}true
  return true;
}
// 判断此intl.get('APIT.TYPE')是否是Arrayintl.get('APIT.TYPE')
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
// 判断此对象是否是Object{intl.get('APIT.TYPE')}
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}
