import intl from 'react-intl-universal';
import numeral from 'numeral';
import cloneDeep from 'lodash.clonedeep';
import { transpose, group } from 'd3-array';
// import { formatDate } from 'common/Charts/dataTransform/dateTimeUtils';
import * as Constant from './constant';
import * as Util from './util';
import axios from 'axios';

export function getColImage(col_type) {
  switch (col_type) {
    case 0:
      return 'icon-ziduan';
    case 5:
    case 6:
      return 'icon-shijian2';
    case 8:
      return 'icon-shuju5';
    default:
      return 'icon-ziduan';
  }
}

export function getMarkImage(type) {
  switch (type) {
    case '31':
      return 'icon-tiaose';
    case '32':
      return 'icon-daxiao';
    case '33':
      return 'icon-biaoqian1';
    default:
      return 'icon-tiaose';
  }
}

export function getOrderImage(order) {
  switch (order) {
    case 0:
      return 'icon-shengxu';
    case 1:
      return 'icon-jiangxu';
    case 3:
      return 'icon-paixu1';
    default:
      return null;
  }
}

export function getOrderIcon(order) {
  switch (order) {
    case 0:
      return 'icon-shengxu';
    case 1:
      return 'icon-jiangxu';
    case 3:
      return 'icon-paixu1';
    default:
      return null;
  }
}

export function isDate(col_type) {
  return col_type === 5 || col_type === 6;
}

export function isRegularDate(col_type) {
  return col_type === 5;
}

export function isText(col_type) {
  return col_type === 0;
}

export function isNumber(col_type) {
  return col_type === 8;
}

export function isCalc(col) {
  return col === Constant.CALC_TYPE;
}

export function hasFilter(col) {
  return col.ruleConditions && col.ruleConditions.length > 0;
}

export function getPattern(columns) {
  return (columns || [])
    .map(col =>
      isNumber(
        col?.convertColumn ? col.convertColumn.datatype : col.col_datatype
      )
        ? 'N'
        : 'T'
    )
    .join('');
}

export function getDimNumber(number) {
  return {
    110: 1,
    111: 1,
    116: 2,
    117: 2,
    118: 2,
    119: 2,
    121: 2,
    122: 2,
    123: 2,
    124: 2,
    127: 2,
    128: 2,
    133: number - 1,
    201: 2,
    130: 2,
    131: 2,
    405: 0,
    109: 0,
    134: 0,
    202: 2,
    304: 2,
    305: 2,
    306: 2,
    307: 2,
    315: 2,
    317: 2,
    421: 2,
    430: 0,
    436: 3,
  };
}

export function getTransData(
  chartColumns,
  conditionData,
  chartType,
  condition
) {
  // 修复下钻时的 dataType {intl.get('EXAM.ERROR')}
  const { drillDownOption } = condition;
  const drillCol = drillDownOption?.[0];
  const clone = chartColumns;
  const rowLength =
    conditionData && conditionData.length ? conditionData.length : 0;
  if (!rowLength || clone.length === 0) {
    return {};
  }
  const colLength = conditionData[0].length;
  if (!colLength) {
    return {};
  }

  const number = getDimNumber(colLength)[chartType];
  const dimsLength = number !== undefined ? number : 1;

  function getColsData(col, conditionData) {
    const data = [];
    for (let i = 1; i < rowLength; i++) {
      data.push(conditionData[i][col]);
    }
    return data;
  }

  const dims = clone.slice(0, dimsLength).map((col, index) => {
    const colExtension = drillCol || col;
    return {
      ...col,
      alias: col.alias, // 取别名
      col_alias: col.col_alias, // 关联资产后产生的别名
      column: col.col_name,
      datatype: colExtension.col_datatype,
      data: getColsData(index, conditionData),
    };
  });
  const vals = clone.slice(dimsLength).map((col, index) => {
    return {
      ...col,
      alias: col.alias, // 取别名
      col_alias: col.col_alias, // 关联资产后产生的别名
      column: col.col_name,
      datatype: col.col_datatype,
      data: getColsData(index + dimsLength, conditionData),
    };
  });
  const sers = condition.series || [];
  return {
    dims,
    vals,
    keys: [],
    sers,
  };
}

// 图表模板的highcharts{intl.get('COMM.DATA_CONVERSION')}(源为二维数组格式)
export function transform(conditionData, chartType) {
  const clone = conditionData[0]
    ? conditionData[0].map(head => {
        return {
          column: head,
        };
      })
    : [];
  const rowLength =
    conditionData && conditionData.length ? conditionData.length : 0;
  if (!rowLength || clone.length === 0) {
    return {};
  }

  const colLength = conditionData[0].length;
  if (!colLength) {
    return {};
  }

  const number = getDimNumber(colLength)[chartType];
  const dimsLength = number !== undefined ? number : 1;

  function getColsData(col, conditionData) {
    const data = [];
    for (let i = 1; i < rowLength; i++) {
      data.push(conditionData[i][col]);
    }
    return data;
  }

  const dims = clone.slice(0, dimsLength).map((col, index) => {
    return {
      column: col.column,
      datatype: Constant.TEXT_DATATYPE,
      data: getColsData(index, conditionData),
    };
  });
  const vals = clone.slice(dimsLength).map((col, index) => {
    return {
      column: col.column,
      datatype: Constant.NUMBER_DATATYPE,
      data: getColsData(index + dimsLength, conditionData),
    };
  });

  return { dims, vals };
}
// 是否使用calculate显示
export function isCalcColumn(col) {
  return (
    !!col.calculate || (col.customType !== undefined && col.customType !== -1)
  );
}

// 是否为表计算字段
export function isTableCalcColumn(col) {
  return !!col?.quickTableCalculate?.type;
}
// 是否为高级计算字段 同环比 {intl.get('ANAL.CUMULATIVE_CALCULATION')}
export function isAdvanceColumn(col) {
  return !!col?.advanceCalculateType;
}
// intl.get('ANAL.IIASF')
export function isStatisticsColumn(col) {
  if (col.calculate === 1) {
    return true;
  }
  if (col.calculate === 0) {
    return false;
  }
  if (col.calculate === undefined) {
    return col.customType !== undefined && col.customType !== -1;
  }
}

// 是否为新增字段 表计算新增，同环比新增
export function isExtraColumn(col) {
  return (
    col.calculate !== undefined ||
    (col.customType !== undefined && col.customType !== -1) ||
    isTableCalcColumn(col) ||
    isAdvanceColumn(col)
  );
}

/**
 * 字段统计、新增图标控制逻辑
 * @param {*} col
 * true {intl.get('ANAL.STATISTICAL_METHOD')}
 * false {intl.get('ANAL.NNS')}
 */
export function isFxIcon(col) {
  if (col.calculate === 1) {
    return true;
  }
  if (col.calculate === 0 && col.customType !== Constant.CUSTOM_NONE_AGG) {
    return true;
  }
  if (col.calculate === 0 && col.customType === Constant.CUSTOM_NONE_AGG) {
    return false;
  }
  if (
    col.calculate === undefined &&
    col.customType !== Constant.CUSTOM_NONE_AGG &&
    col.customType !== undefined
  ) {
    return true;
  }
}

export function isShowCalcIcon(col, transFormFlag, isFxIcon) {
  return (
    (col.ruleConditions && col.ruleConditions.length > 0) ||
    transFormFlag ||
    (typeof col.order === 'number' && col.order !== 2) ||
    col?.orderVariable ||
    isFxIcon ||
    col?.quickTableCalculate?.type ||
    col?.advanceCalculateType
  );
}

export function isLabelColorByBarOpen(labelColorByBar, style, color, content) {
  // labelColorByBar使用数据列颜色，style自定义颜色，color数据列颜色，content标签内容
  return (
    '<span style="color:' +
    (labelColorByBar ? color : style.color) +
    ';">' +
    content +
    '<span>'
  );
}

export function integerDigitsincludingdecimals(num) {
  let digits = parseInt(num).toString().length;
  return digits;
}

export function loadDataLabels(format, thousands) {
  let labels = {};
  switch (format) {
    case intl.get('ANAL.INTEGER'):
      labels = {
        formatter: function(data) {
          const {
            shapeType,
            name = '',
            percentage,
            y,
            value,
            series,
          } = this.point;
          let content = numeral(y ?? value).format(thousands ? '0,0' : '0');
          const { labelColorByBar = false, style } = data;
          if (labelColorByBar) {
            return Util.isLabelColorByBarOpen(
              labelColorByBar,
              style,
              this.color,
              content
            );
          } else {
            if (shapeType === 'arc') {
              const { name: subName } = series;
              return `<div><b>${name} </b></div><div>${subName}: ${content}(${numeral(
                percentage
              ).format('0.00')}%)</div>`;
            }
          }
          return content;
        },
      };
      break;
    case intl.get('ANAL.PERCENTAGE'):
      labels = {
        formatter: function(data) {
          const {
            shapeType,
            name = '',
            percentage,
            y,
            value,
            series,
          } = this.point;
          const __value = y ?? value ?? 0;
          let form = '';
          // {intl.get('COMM.WTVILT')} 1% 的时候,动态生成格式化字符串
          if (__value < 0.01) {
            let decimal = __value.toString().split('.');
            if (decimal[1]) {
              for (let i = 0, len = decimal[1].length - 2; i < len; i++) {
                form += i === 0 ? '.0' : '0';
              }
            }
          }
          let content = numeral(y ?? value).format(
            thousands ? `0,0${form}%` : `0${form}%`
          );
          const { labelColorByBar = false, style } = data;
          if (labelColorByBar) {
            return Util.isLabelColorByBarOpen(
              labelColorByBar,
              style,
              this.color,
              content
            );
          } else {
            if (shapeType === 'arc') {
              const { name: subName } = series;
              return `<div><b>${name} </b></div><div>${subName}: ${content}(${numeral(
                percentage
              ).format(thousands ? '0,0.00' : '0.00')}%)</div>`;
            }
          }
          return content;
        },
      };
      break;
    case intl.get('ANAL.AOM'):
      labels = {
        formatter: function(data) {
          const {
            shapeType,
            name = '',
            percentage,
            y,
            value,
            series,
          } = this.point;
          let content = thousands
            ? numeral(y ?? value).format('$0,')
            : (y ?? value) < 0
            ? `-$${Math.abs(y ?? value ?? 0)}`
            : `$${y ?? value}`;
          const { labelColorByBar = false, style } = data;
          if (labelColorByBar) {
            return Util.isLabelColorByBarOpen(
              labelColorByBar,
              style,
              this.color,
              content
            );
          } else {
            if (shapeType === 'arc') {
              const { name: subName } = series;
              return `<div><b>${name} </b></div><div>${subName}: ${content}(${numeral(
                percentage
              ).format('0.00')}%)</div>`;
            }
          }
          return content;
        },
      };
      break;
    case intl.get('ANAL.KTDP'):
      labels = {
        formatter: function(data) {
          const {
            shapeType,
            name = '',
            percentage,
            y,
            value,
            series,
          } = this.point;
          let content = numeral(y ?? value).format(
            thousands ? '0,0.00' : '0.00'
          );
          const { labelColorByBar = false, style } = data;
          if (labelColorByBar) {
            return Util.isLabelColorByBarOpen(
              labelColorByBar,
              style,
              this.color,
              content
            );
          } else {
            if (shapeType === 'arc') {
              const { name: subName } = series;
              return `<div><b>${name} </b></div><div>${subName}: ${content}(${numeral(
                percentage
              ).format(thousands ? '0,0.00' : '0.00')}%)</div>`;
            }
          }
          return content;
        },
      };
      break;
    default:
      labels = {
        formatter: function(data) {
          const {
            shapeType,
            name = '',
            percentage,
            y,
            value,
            series,
          } = this.point;
          let content;
          // 判断Y为几位数
          if (Util.integerDigitsincludingdecimals(y ?? value) > 3) {
            if (format === '') {
              content = thousands
                ? numeral(y ?? value).format('0,0')
                : y ?? value;
            } else {
              content = numeral(y ?? value).format(thousands ? '0,0' : format);
            }
          } else if (!thousands) {
            content = numeral(y ?? value).format(format);
          } else {
            content = y ?? value;
          }

          const { labelColorByBar = false, style } = data;
          if (labelColorByBar) {
            return Util.isLabelColorByBarOpen(
              labelColorByBar,
              style,
              this.color,
              content
            );
          } else {
            if (shapeType === 'arc') {
              const { name: subName } = series;
              return `<div><b>${name} </b></div><div>${subName}: ${content}(${numeral(
                percentage
              ).format(thousands ? '0,0.00' : '0.00')}%)</div>`;
            }
          }
          return content;
        },
      };
  }
  return labels.formatter;
}

export function loadToolTip(format, thousands) {
  let tooltip = {};

  switch (format) {
    case intl.get('ANAL.INTEGER'):
      tooltip = {
        formatter: function() {
          const tempPoints = Array.isArray(this.points) ? this.points : [this];
          const temValues = tempPoints.map(item => {
            const {
              key,
              percentage,
              point: {
                y,
                value,
                category,
                series: { name },
                options: { weight },
              },
            } = item;
            return {
              value: y ?? value ?? weight,
              percentage: percentage
                ? ` (${numeral(this.percentage).format('0.00')}%)`
                : '',
              title: key ?? category ?? '',
              name,
            };
          });
          return `<b>${temValues[0]?.title}</b><br/>${temValues
            .map(item => {
              const { value, percentage, name } = item;
              return `${name}：<b>${numeral(value).format(
                thousands ? '0,0' : '0'
              ) + percentage}</b>`;
            })
            .join('<br/>')}`;
        },
      };
      break;
    case intl.get('ANAL.PERCENTAGE'):
      tooltip = {
        formatter: function() {
          const tempPoints = Array.isArray(this.points) ? this.points : [this];
          const temValues = tempPoints.map(item => {
            const {
              key,
              percentage,
              point: {
                y,
                value,
                category,
                series: { name },
                options: { weight },
              },
            } = item;
            return {
              value: y ?? value ?? weight,
              percentage: percentage
                ? ` (${numeral(percentage).format(
                    thousands ? '0,0.00' : '0.00'
                  )}%)`
                : '',
              title: key || category || '',
              name,
            };
          });
          return `<b>${temValues[0]?.title}</b><br/>${temValues
            .map(item => {
              const { value, percentage, name } = item;
              return `${name}：<b>${numeral(value).format(
                thousands ? '0,0%' : '0%'
              ) + percentage}</b>`;
            })
            .join('<br/>')}`;
        },
      };
      break;
    case intl.get('ANAL.AOM'):
      tooltip = {
        formatter: function() {
          const tempPoints = Array.isArray(this.points) ? this.points : [this];
          const temValues = tempPoints.map(item => {
            const {
              key,
              percentage,
              point: {
                y,
                value,
                category,
                series: { name },
                options: { weight },
              },
            } = item;
            return {
              value: y ?? value ?? weight,
              percentage: percentage
                ? ` (${numeral(this.percentage).format(
                    thousands ? '0,0.00' : '0.00'
                  )}%)`
                : '',
              title: key || category || '',
              name,
            };
          });
          return `<b>${temValues[0]?.title}</b><br/>${temValues
            .map(item => {
              const { value, percentage, name } = item;
              return `${name}：<b>${numeral(value).format('$0,') +
                percentage}</b>`;
            })
            .join('<br/>')}`;
        },
      };
      break;
    case intl.get('ANAL.KTDP'):
      tooltip = {
        formatter: function() {
          const tempPoints = Array.isArray(this.points) ? this.points : [this];
          const temValues = tempPoints.map(item => {
            const {
              key,
              percentage,
              point: {
                y,
                value,
                category,
                series: { name },
                options: { weight },
              },
            } = item;
            return {
              value: y ?? value ?? weight,
              percentage: percentage
                ? ` (${numeral(this.percentage).format(
                    thousands ? '0,0.00' : '0.00'
                  )}%)`
                : '',
              title: key || category || '',
              name,
            };
          });
          return `<b>${temValues[0]?.title}</b><br/>${temValues
            .map(item => {
              const { value, percentage, name } = item;
              return `${name}：<b>${numeral(value).format(
                thousands ? '0,0.00' : '0.00'
              ) + percentage}</b>`;
            })
            .join('<br/>')}`;
        },
      };
      break;
    default:
      tooltip = {
        formatter: function() {
          const tempPoints = Array.isArray(this.points) ? this.points : [this];
          const temValues = tempPoints.map(item => {
            const {
              key,
              point: {
                y,
                value,
                category,
                options: { weight },
                series: { name },
              },
            } = item;
            return {
              title: key || category || '',
              format:
                format !== '' && format !== undefined
                  ? Util.thousandsFormat(
                      y ?? value ?? weight,
                      thousands,
                      format
                    )
                  : numeral(y ?? value).format('0,0'),
              name,
            };
          });
          return `<b>${temValues[0]?.title}</b><br/>${temValues
            .map(item => {
              const { format } = item;
              return `${intl.get('COMM.VALUE:')}<b>${format}</b>`;
            })
            .join('<br/>')}`;
        },
      };
  }
  if (format !== undefined && !format && format !== 0) {
    tooltip = Object.assign({}, tooltip, {
      formatter: null,
    });
  }

  return tooltip;
}
// 默认设置千分位并存在小数的情况
export function thousandsFormat(num, thousands, format) {
  if (thousands && num) {
    let [integer, point] = num?.toString()?.split('.');
    let res;
    let reg = /(\d{3})(?=\d)/g;
    let newStr = integer
      .split('')
      .reverse()
      .join('')
      .replace(reg, match => {
        return match + ',';
      });
    newStr = newStr
      .split('')
      .reverse()
      .join('');
    point ? (res = newStr + '.' + point) : (res = newStr);
    return res;
  } else if (!format) {
    return num;
  } else {
    return numeral(num).format(format);
  }
}

export function tooltipFormat(options, dims) {
  const { thousands = true } = options;

  if (
    !options?.hasOwnProperty('thousands') &&
    !options?.hasOwnProperty('tips')
  ) {
    options.tooltip = {
      ...options.tooltip,
      formatter: function() {
        const title = this.key || this.category;
        return (
          '<b>' +
          title +
          '</b><br/>' +
          intl.get('COMM.VALUE:').d(' 值： ') +
          '<b>' +
          Util.thousandsFormat(this.y, thousands) +
          '</b>'
        );
      },
    };
  } else if (
    options?.hasOwnProperty('thousands') &&
    options.thousands === false &&
    !options?.hasOwnProperty('tips')
  ) {
    options.tooltip = {
      ...options.tooltip,
      formatter: function() {
        const title = this.key || this.category;
        return (
          '<b>' +
          title +
          '</b><br/>' +
          intl.get('COMM.VALUE:').d(' 值： ') +
          '<b>' +
          Util.thousandsFormat(
            this.y === undefined ? this.point?.value : this.y,
            thousands
          ) +
          '</b>'
        );
      },
    };
  }
  if (
    options.tips &&
    dims[0] &&
    (dims[0]?.col_datatype !== undefined || dims[0]?.datatype !== undefined)
  ) {
    options.tooltip = {
      ...options.tooltip, // 兼容折线开启线条和tips数值格式
      ...Util.loadToolTip(options.tips, thousands),
    };
  }
  // 开启千分位并且没有设置tips格式的时候
  if (
    thousands &&
    !options.tips &&
    dims[0] &&
    (dims[0]?.col_datatype !== undefined || dims[0]?.datatype !== undefined)
  ) {
    options.tooltip = {
      ...options.tooltip, // 兼容折线开启线条和tips数值格式
      ...Util.loadToolTip(options.tips, thousands),
    };
  }
  return options;
}
export function getCalculateType(datatype, type) {
  let menus = {};
  if (isText(datatype)) {
    menus = Constant.textMenu;
  } else if (isNumber(datatype)) {
    menus = Constant.numberMenu;
  } else if (isDate(datatype)) {
    menus = Constant.dateMenu;
  } else if (isCalc(datatype)) {
    menus = Constant.EXCEL_CALC_MENU;
  }
  return menus[type];
}
// 获取同比环比 累计计算对应文字
export function getAdvanceType(type) {
  return Constant.ADVANCE_CALC_MENU[type];
}
export function getAdvanceAddition({ advanceType, type, originDatatype }) {
  let addition = '';
  switch (advanceType) {
    case 'a':
      addition = `(${getAdvanceType(type)})`;
      break;
    case 'c':
      addition = `(${getCalculateType(originDatatype, type)})`;
      break;
    case 't':
      addition = `(${getCalculateType(Constant.CALC_TYPE, type)})`;
      break;
    default:
      break;
  }
  return addition;
}
export const replaceString = (string, needle, replacement, options = {}) => {
  if (typeof string !== 'string') {
    throw new TypeError(`Expected input to be a string, got ${typeof string}`);
  }

  if (
    !(typeof needle === 'string' && needle.length > 0) ||
    !(typeof replacement === 'string' || typeof replacement === 'function')
  ) {
    return string;
  }

  let result = '';
  let matchCount = 0;
  let prevIndex = options.fromIndex > 0 ? options.fromIndex : 0;

  if (prevIndex > string.length) {
    return string;
  }

  while (true) {
    // eslint-disable-line no-constant-condition
    const index = string.indexOf(needle, prevIndex);

    if (index === -1) {
      break;
    }

    matchCount++;

    const replaceStr =
      typeof replacement === 'string'
        ? replacement
        : replacement(needle, matchCount, string, index);

    // Get the initial part of the string on the first iteration
    const beginSlice = matchCount === 1 ? 0 : prevIndex;

    result += string.slice(beginSlice, index) + replaceStr;

    prevIndex = index + needle.length;
  }

  if (matchCount === 0) {
    return string;
  }

  return result + string.slice(prevIndex);
};

export function isCustomColumn(data) {
  return (
    data.calculate !== undefined &&
    (data.customType === Constant.CUSTOM_EXPRESSION_TYPE ||
      data.customType === Constant.CUSTOM_NONE_AGG)
  );
}

export function isDrillChart(chartType) {
  return [
    '102',
    '103',
    '104',
    '105',
    '108',
    '113',
    '114',
    '115',
    '120',
    '127',
    '128',
    '201',
    '203',
    '408',
  ].includes(chartType);
}

export function isColumnDuplicate(columns, col) {
  return columns.find(column => column.col_name === col.col_name);
}

function isEmpty(source) {
  return source === null || source === undefined || source === '';
}

export function fromDataToLatLanData(data, map, dim, options, layer, columns) {
  // 需要剔除无效数据，并把图层放在第一列;
  const cols = data[0];
  const dimColIndex = cols.indexOf(dim);
  let header = [dim];
  let headerLatLan = [];
  cols.forEach((c, index) => {
    if (index !== dimColIndex) {
      header.push(c);
    }
  });
  const restHeader = header.slice(1);

  // intl.get('ANAL.FPBL')
  let raw = data.slice(1);
  let temp = raw.filter(r => {
    const v = r[dimColIndex];
    return !isEmpty(v);
  });

  let content = transpose(temp);
  const dimValues = content[dimColIndex] || [];
  for (let i = 0; i < dimValues.length; i++) {
    headerLatLan[i] = cloneDeep(map.get(dimValues[i]));
  }

  content.splice(dimColIndex, 1);

  if (options.bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_ARCGIS) {
    headerLatLan = headerLatLan.map(row => {
      return gcj02towgs84(row);
    });
  }

  const { attach = [] } = layer;

  // intl.get('ANAL.CID')
  let dataColsMap = new Map();
  for (let j = 0; j < dimValues.length; j++) {
    const key = dimValues[j];
    if (dataColsMap.get(key)) {
      continue;
    }
    let currentIndexes = [];
    dimValues.forEach((v, index) => {
      if (v === key) {
        currentIndexes.push(index);
      }
    });
    dataColsMap.set(key, currentIndexes);
  }

  // intl.get('ANAL.COLUMN_DATA')
  let dataMap = new Map();
  for (const [k, v] of dataColsMap) {
    let form = [];
    let table = [];
    for (let m = 0; m < content.length; m++) {
      let rowData = content[m].filter((item, index) => {
        return v.includes(index);
      });
      const setData = Array.from(new Set(rowData));
      const attachCol = attach.find(a => {
        const name = a && a.value !== undefined ? a.value : a;
        const rawCol = columns.find(
          c => restHeader[m] === (c.col_alias || c.col_name)
        );
        return rawCol && name === rawCol.col_name;
      });
      if (attachCol && attachCol.type === '2') {
        // {intl.get('ANAL.DFT')}
        table.push([restHeader[m]].concat(rowData));
      } else {
        // {intl.get('ANAL.MTFD')}
        form.push({ label: restHeader[m], value: setData[0] });
      }
    }
    table = transpose(table);
    dataMap.set(k, { form, table });
  }

  return {
    headerLatLan,
    dimValues,
    dataMap,
    attach,
  };
}

// intl.get('ANAL.LLCOSC')
export function fromDataToLatLanDataByChart(
  data,
  columns,
  layer,
  dim,
  options
) {
  const cols = data[0];
  const latItem = columns.find(c => layer.latColumn === c.col_name);
  const lngItem = columns.find(c => layer.lanColumn === c.col_name);
  if (!latItem || !lngItem) {
    return {};
  }
  const latIndex = cols.indexOf(latItem.col_alias || latItem.col_name);
  const lanIndex = cols.indexOf(lngItem.col_alias || lngItem.col_name);
  let header = [layer.latColumn, layer.lanColumn];
  let headerLatLan = [];
  cols.forEach((c, index) => {
    if (index !== latIndex && index !== lanIndex) {
      header.push(c);
    }
  });
  const restHeader = header.slice(2);
  // intl.get('ANAL.FPBL')
  data = data.slice(1);
  data = data.filter(r => {
    const v1 = r[latIndex];
    const v2 = r[lanIndex];
    return !isEmpty(v1) && !isEmpty(v2);
  });

  let array = [];
  for (let i = 0; i < data.length; i++) {
    array[i] = {};
    for (let n = 0; n < data[i].length; n++) {
      array[i][cols[n]] = data[i][n];
    }
  }

  const content = group(array, d => d[(layer?.lanColumn)]);
  let layerValues = [];
  content.forEach((value, key) => {
    headerLatLan.push([
      value[0][(lngItem?.col_name)],
      value[0][(latItem?.col_name)],
    ]);
    layerValues.push(key);
  });

  if (options.bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_ARCGIS) {
    headerLatLan = headerLatLan.map(row => {
      return gcj02towgs84(row);
    });
  }

  return {
    headerLatLan,
    content,
    layerValues,
    numberCols: restHeader,
    dim,
  };
}

function baiduTomars(point) {
  let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  let mars_point = [];
  let x = point[0] - 0.0065;
  let y = point[1] - 0.006;
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  mars_point[0] = z * Math.cos(theta);
  mars_point[1] = z * Math.sin(theta);
  return mars_point;
}

const PI = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;

function out_of_china(lng, lat) {
  return (
    lng < 72.004 || lng > 137.8347 || (lat < 0.8293 || lat > 55.8271 || false)
  );
}

function transformlat(lng, lat) {
  var ret =
    -100.0 +
    2.0 * lng +
    3.0 * lat +
    0.2 * lat * lat +
    0.1 * lng * lat +
    0.2 * Math.sqrt(Math.abs(lng));
  ret +=
    ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
      2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) /
    3.0;
  ret +=
    ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) *
      2.0) /
    3.0;
  return ret;
}

function transformlng(lng, lat) {
  var ret =
    300.0 +
    lng +
    2.0 * lat +
    0.1 * lng * lng +
    0.1 * lng * lat +
    0.1 * Math.sqrt(Math.abs(lng));
  ret +=
    ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
      2.0) /
    3.0;
  ret +=
    ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) /
    3.0;
  ret +=
    ((150.0 * Math.sin((lng / 12.0) * PI) +
      300.0 * Math.sin((lng / 30.0) * PI)) *
      2.0) /
    3.0;
  return ret;
}

function gcj02towgs84(point) {
  const [lat, lng] = point.reverse();
  if (out_of_china(lng, lat)) {
    return [lat, lng];
  } else {
    var dlat = transformlat(lng - 105.0, lat - 35.0);
    var dlng = transformlng(lng - 105.0, lat - 35.0);
    var radlat = (lat / 180.0) * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
    const mglat = lat + dlat;
    const mglng = lng + dlng;
    return [lng * 2 - mglng, lat * 2 - mglat].reverse();
  }
}

function wgs84togcj02(point) {
  const [lng, lat] = point;
  if (out_of_china(lng, lat)) {
    return [lng, lat];
  } else {
    var dlat = transformlat(lng - 105.0, lat - 35.0);
    var dlng = transformlng(lng - 105.0, lat - 35.0);
    var radlat = (lat / 180.0) * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
    var mglat = lat + dlat;
    var mglng = lng + dlng;
    return [mglng, mglat];
  }
}

export function fromLatLanDataToMapData(data, layer, columns, options) {
  const cols = data[0];
  const latItem = columns.find(c => layer.latColumn === c.col_name);
  const lngItem = columns.find(c => layer.lanColumn === c.col_name);
  if (!latItem || !lngItem) {
    return {};
  }
  const latIndex = cols.indexOf(latItem.col_alias || latItem.col_name);
  const lanIndex = cols.indexOf(lngItem.col_alias || lngItem.col_name);
  let header = [layer.latColumn, layer.lanColumn];
  let headerLatLan = [];
  let dimValues = [];
  let content = [];
  cols.forEach((c, index) => {
    if (index !== latIndex && index !== lanIndex) {
      header.push(c);
    }
  });
  const restHeader = header.slice(2);
  // intl.get('ANAL.FPBL')
  data = data.slice(1);
  data = data.filter(r => {
    const v1 = r[latIndex];
    const v2 = r[lanIndex];
    return !isEmpty(v1) && !isEmpty(v2);
  });

  const { bgMap } = options;
  for (let i = 0; i < data.length; i++) {
    if (layer.cs === 'BD-09') {
      headerLatLan[i] = baiduTomars([
        +data[i][latIndex],
        +data[i][lanIndex],
      ]).reverse();
    } else if (
      bgMap &&
      (bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_STANDARD ||
        bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_SATELLITE) &&
      layer.cs === 'WGS84'
    ) {
      headerLatLan[i] = wgs84togcj02([+data[i][latIndex], +data[i][lanIndex]]);
    } else if (
      (!bgMap ||
        bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_ARCGIS ||
        bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_SUPERMAP) &&
      layer.cs === 'GCJ-02'
    ) {
      headerLatLan[i] = gcj02towgs84([+data[i][latIndex], +data[i][lanIndex]]);
    } else {
      headerLatLan[i] = [+data[i][lanIndex], +data[i][latIndex]];
    }
    dimValues[i] = `${intl.get('ANAL.LONGITUDE')}: ${
      headerLatLan[i][1]
    }，${intl.get('ANAL.LATITUDE')}: ${headerLatLan[i][0]}`;
    content[i] = [];
    for (let j = 0; j < header.length; j++) {
      if (j !== latIndex && j !== lanIndex) {
        content[i].push(data[i][j]);
      }
    }
  }

  content = transpose(content);

  const { attach = [] } = layer;

  // intl.get('ANAL.CID')
  let dataColsMap = new Map();
  for (let j = 0; j < dimValues.length; j++) {
    const key = dimValues[j];
    if (dataColsMap.get(key)) {
      continue;
    }
    let currentIndexes = [];
    dimValues.forEach((v, index) => {
      if (v === key) {
        currentIndexes.push(index);
      }
    });
    dataColsMap.set(key, currentIndexes);
  }

  // intl.get('ANAL.COLUMN_DATA')
  let dataMap = new Map();
  for (const [k, v] of dataColsMap) {
    let form = [];
    let table = [];
    for (let m = 0; m < content.length; m++) {
      let rowData = content[m].filter((item, index) => {
        return v.includes(index);
      });
      const setData = Array.from(new Set(rowData));
      const attachCol = attach.find(a => {
        const name = a && a.value !== undefined ? a.value : a;
        const rawCol = columns.find(
          c => restHeader[m] === (c.col_alias || c.col_name)
        );
        return rawCol && name === rawCol.col_name;
      });
      if (attachCol && attachCol.type === '2') {
        // {intl.get('ANAL.DFT')}
        table.push([restHeader[m]].concat(rowData));
      } else {
        // {intl.get('ANAL.MTFD')}
        form.push({ label: restHeader[m], value: setData[0] });
      }
    }
    table = transpose(table);
    dataMap.set(k, { form, table });
  }

  return {
    headerLatLan,
    dimValues,
    dataMap,
  };
}

export function acceptDataType(col_datatype) {
  return (
    col_datatype === 0 ||
    col_datatype === 5 ||
    col_datatype === 6 ||
    col_datatype === 7 ||
    col_datatype === 8 ||
    col_datatype === 18
  );
}

export function handleOptions(options, condition, chart_type, fixedType) {
  condition = condition || {};
  const { thousands = true } = options;
  // const chartColumns = (condition.columns || []).filter(col => {
  //   return col.inChart;
  // });
  // let dim = chartColumns[0] || {};
  if (options && options.chart) {
    delete options.chart.height;
  }

  options.tooltip = {
    ...options.tooltip, // 兼容折线开启线条和tips数值格式
    ...Util.loadToolTip(
      chart_type === '438' && !options.tips ? '' : options.tips,
      fixedType !== undefined ? false : thousands
    ),
  };

  if (
    options.plotOptions &&
    options.plotOptions.series &&
    options.plotOptions.series.dataLabels &&
    options.plotOptions.series.dataLabels.enabled &&
    options.plotOptions.series.dataLabels.tips
  ) {
    options.plotOptions.series.dataLabels.formatter = Util.loadDataLabels(
      options.plotOptions.series.dataLabels.tips,
      thousands
    );
  }
  if (
    options.secondY &&
    options.secondY.series &&
    options.secondY.series.dataLabels &&
    options.secondY.series.dataLabels.tips &&
    options.secondY.series.dataLabels.enabled
  ) {
    options.secondY.series.dataLabels.formatter = Util.loadDataLabels(
      options.secondY.series.dataLabels.tips,
      thousands
    );
  }
}

export function fromDataToChartLatLanData(
  data,
  map,
  columns,
  layer,
  dim,
  options
) {
  const cols = data[0];
  const dimColIndex = dim ? cols.indexOf(dim) : -1;
  const layerColIndex = cols.indexOf(layer);
  let headerLatLan = [];
  let numberCols = [];
  cols.forEach((c, index) => {
    const col = columns.find(l => c === (l.col_alias || l.col_name));
    if (
      index !== dimColIndex &&
      index !== layerColIndex &&
      Util.isNumber(col.col_datatype)
    ) {
      numberCols.push(c);
    }
  });
  // intl.get('ANAL.FPBL')
  let raw = data.slice(1);
  let temp = raw.filter(r => {
    const v = r[layerColIndex];
    return !isEmpty(v);
  });

  let array = [];
  for (let i = 0; i < temp.length; i++) {
    array[i] = {};
    for (let n = 0; n < temp[i].length; n++) {
      array[i][cols[n]] = temp[i][n];
    }
  }

  const content = group(array, d => d[layer]);
  let layerValues = [];
  content.forEach((value, key) => {
    headerLatLan.push(cloneDeep(map.get(key)));
    layerValues.push(key);
  });

  if (options.bgMap === Constant.GIS_MAP_TYPES.GIS_MAP_BG_TYPE_ARCGIS) {
    headerLatLan = headerLatLan.map(row => {
      return gcj02towgs84(row);
    });
  }

  return {
    headerLatLan,
    content,
    layerValues,
    numberCols,
    dim,
  };
}

export function getExternalConfig(data) {
  let newList = [];
  Object.keys(data).forEach(type => {
    let parsms = data[type].param;
    let exteralParsms = data[type];
    if (parsms) {
      parsms = JSON.parse(parsms);
      if (!parsms?.version) {
        // 老版插件没有version{intl.get('ANAL.FIELD')}
        Object.keys(parsms).forEach(types => {
          parsms[types].id = type;
          const id = type;
          let obj = {
            ...parsms[types],
            img: `${Constant.getImageUrl(id)}${parsms[types].img}`,
            disableimg: `${Constant.getImageUrl(id)}${
              parsms[types].disableimg
            }`,
            type: types,
            pattern: parsms[types]?.pattern
              ? new RegExp(parsms[types]?.pattern)
              : /^[TN]{1,}$/,
            category: 'other',
            external: true,
            libUrls: parsms[types].lib
              ? parsms[types].lib.map(url => `${Constant.getLibUrl(id)}${url}`)
              : null,
            cssUrls: parsms[types].cssDep
              ? parsms[types].cssDep.map(
                  url => `${Constant.getCssUrl(id)}${url}`
                )
              : null,
            jsUrl: parsms[types].scriptName
              ? `${Constant.getJsUrl(id)}${parsms[types].scriptName}`
              : null,
          };
          newList.push({ ...obj });
        });
      } else {
        // 新版二开插件version:'2'
        try {
          const id = type;
          let obj = {
            ...parsms.props,
            name: exteralParsms.name,
            img: exteralParsms?.icon ? JSON.parse(exteralParsms?.icon) : '',
            disableimg: `${Constant.getImageUrl(id)}${parsms.props.disableimg}`,
            id,
            type: parsms.id,
            // type: parsms.props?.type,
            pattern: parsms?.props?.pattern
              ? new RegExp(parsms?.props?.pattern)
              : /^[TN]{1,}$/,
            category: 'other',
            external: true,
            libUrls:
              parsms.props?.lib?.length > 0
                ? parsms.lib.map(url => `${Constant.getLibUrl(id)}${url}`)
                : null,
            cssUrls:
              parsms.props?.cssDep?.length > 0
                ? parsms.cssDep.map(url => `${Constant.getCssUrl(id)}${url}`)
                : null,
            jsUrl: parsms.props.scriptName
              ? `${Constant.getJsUrl(id)}${parsms.props.scriptName}`
              : null,
            version: parsms.version,
            projectType: parsms.props?.projectType,
          };
          newList.push({ ...obj });
        } catch (e) {
          console.error(e);
        }
      }
    }
  });
  return newList;
}

export async function loadExternalConfig(callback, token) {
  axios
    .get(
      token
        ? Constant.EXTERNAL_NEW_JSON_URL_BY_TOKEN + token
        : Constant.EXTERNAL_NEW_JSON_URL
    )
    .then(function(response) {
      const { data } = response;
      const list = Util.getExternalConfig(data.result);
      callback && callback(list);
    })
    .catch(function() {});
}

export function getLib(url) {
  return new Promise(function(resolve, reject) {
    var script = document.createElement('script');
    script.type = 'text/javascript';

    if (script.readyState) {
      // IE
      script.onreadystatechange = function() {
        if (
          script.readyState === 'loaded' ||
          script.readyState === 'complete'
        ) {
          script.onreadystatechange = null;
          resolve('success: ' + url);
        }
      };
    } else {
      // Others
      script.onload = function() {
        resolve('success: ' + url);
      };
    }

    script.onerror = function() {
      reject(Error(url + 'load error!'));
    };

    script.src = url;
    document.body.appendChild(script);
  });
}

export function getCSS(url) {
  return new Promise(function(resolve, reject) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';

    if (link.readyState) {
      // IE
      link.onreadystatechange = function() {
        if (link.readyState === 'loaded' || link.readyState === 'complete') {
          link.onreadystatechange = null;
          resolve('success: ' + url);
        }
      };
    } else {
      // Others
      link.onload = function() {
        resolve('success: ' + url);
      };
    }

    link.onerror = function() {
      reject(Error(url + 'load error!'));
    };

    link.href = url;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
  });
}

export function downloadDataAsCSV(source, fileName, type = 'csv') {
  let csvRows = [];
  if (!Array.isArray(source)) {
    return;
  }
  for (var j = 0; j < source.length; j++) {
    csvRows.push(source[j].join(','));
  }
  let csvString = csvRows.join('\n');
  // BOM的方式解决EXCEL乱码问题
  const BOM = '\uFEFF';
  csvString = BOM + csvString;

  var downloadLink = document.createElement('a');
  downloadLink.href =
    `data:attachment/${type},` + encodeURIComponent(csvString);
  downloadLink.download = fileName + `.${type}` || `temp.${type}`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export function getDynamicColsPattern(data) {
  const transData = transpose(data);
  let pattern = '';
  for (let i = 0; i < transData.length; i++) {
    const row = transData[i];
    const p = row.every(item => {
      return !item || !isNaN(parseFloat(+item));
    })
      ? 'N'
      : 'T';
    pattern = pattern + p;
  }
  return pattern;
}

// intl.get('ANAL.POQOLITL')
export function findLegendIndex(layer, arr) {
  let k, v;
  arr.treeLegends.forEach((i, j) => {
    if (i.id === layer.id) {
      k = j;
      return void 0;
    }

    if (i.children && i.children.length) {
      i.children.forEach((x, y) => {
        if (x.id === layer.id) {
          k = j;
          v = y;
          return void 0;
        }
      });
    }
  });
  return [k, v];
}

// intl.get('ANAL.CWTFNID')
export function isRepeatColName(now, insert, key = 'col_name') {
  return now.find(k => insert.find(v => v[key].trim() === k.col_name.trim()));
}

export function getDatatype(datatype) {
  switch (datatype) {
    case 0:
    case 5:
    case 6:
      return 0;
    case 8:
      return 8;
  }
}

// intl.get('ANAL.GTMLOTWAN')
export function getAssetNameWidth(
  col,
  transFormFlag,
  isFxIcon,
  inChart = false
) {
  let width = 130;
  // intl.get('ANAL.CALCULATION_FIELD')icon
  if (isShowCalcIcon(col, transFormFlag, isFxIcon)) {
    width = width - 25;
  }

  if (inChart) {
    width = width - 25;
  }
  if (
    col.customType === Constant.CUSTOM_EXPRESSION_TYPE ||
    col.customType === Constant.CUSTOM_NONE_AGG
  ) {
    width = width - 25;
  }
  return width;
}

// intl.get('ANAL.SHOW_SWITCH')
export function isShowChange(col) {
  return (
    (isAdvanceColumn(col) || isTableCalcColumn(col) || isCalcColumn(col)) &&
    // {intl.get('ANAL.NNF')}
    col.customType !== Constant.CUSTOM_EXPRESSION_TYPE &&
    col.customType !== Constant.CUSTOM_NONE_AGG
  );
}
// 获取字段的名字
export function getColumnName(col) {
  return (
    col.alias ||
    col.col_alias || // 资产关联后拼接的名字
    col.col_name ||
    col.column
  );
}
// 获取字段类型
export function getColumDataType(col) {
  let c_datatype =
    typeof col.convertColumn?.datatype === 'number' // 数据准备修改了字段类型 数值类型是0
      ? col.convertColumn?.datatype
      : col.col_datatype;
  return c_datatype;
}

export function changeThousandDeafult(options, dims) {
  const { thousands = true } = options;

  // 默认未设置tooltip悬浮框格式，控制千分位展示效果
  options = Util.tooltipFormat(options, dims);
  // 选中数据标签格式切换千分位刷新显示
  if (
    options.plotOptions &&
    options.plotOptions.series &&
    options.plotOptions.series.dataLabels &&
    options.plotOptions.series.dataLabels.enabled &&
    options.plotOptions.series.dataLabels.hasOwnProperty('tips')
  ) {
    options.plotOptions.series.dataLabels.formatter = Util.loadDataLabels(
      options.plotOptions.series.dataLabels.tips,
      thousands
    );
  }

  // 未选中数据标签切换千分位刷新展示
  if (
    options.plotOptions &&
    options.plotOptions.series &&
    options.plotOptions.series.dataLabels &&
    options.plotOptions.series.dataLabels.enabled &&
    !options.thousands &&
    !options.plotOptions.series.dataLabels.hasOwnProperty('tips')
  ) {
    options.plotOptions.series.dataLabels.formatter = Util.loadDataLabels(
      '',
      thousands
    );
  }

  if (
    options.secondY &&
    options.secondY.series &&
    options.secondY.series.dataLabels &&
    options.secondY.series.dataLabels.enabled
  ) {
    options.secondY.series.dataLabels.formatter = Util.loadDataLabels(
      options.secondY.series.dataLabels.tips,
      thousands
    );
  }

  return options;
}
