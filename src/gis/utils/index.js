import axios from 'axios';
import Highcharts from 'highcharts/highstock';
import numeral from 'numeral';
import {
  MARKER_COLOR,
  MARKER_LABEL,
  MARKER_SIZE,
  AREA_CHARTS,
  AREASPLINE_CHARTS,
} from '../analyzer_2/constant';
import intl from 'react-intl-universal';
import colors from '../themes/colors';

export function getMaxValue(source) {
  // let len = source.toString().split('.')[0].length;
  // return Math.pow(10, len);
  return Math.max(...source);
}

// intl.get('EVEN.OBTAIN')geojson文件
export function loadJSON(urls, callback) {
  const reqs = urls.map(item => {
    return (() => axios.get(item.path))();
  });

  axios
    .all(reqs)
    .then(axios.spread((...result) => callback && callback(result)));
}

/**
 * intl.get('COMM.CGCVT')，计算方法
 */
export function getYAxis(customizedOptions) {
  const { yAxis } = customizedOptions;
  return yAxis && Array.isArray(yAxis)
    ? yAxis[0]
    : typeof yAxis === 'object'
    ? yAxis
    : {};
}

// intl.get('COMM.AVERAGE_ARRAY')
export function getArrayAverage(arr) {
  return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

// intl.get('COMM.MAX_ARRAY')
export function getArrayMax(arr) {
  return Math.max.apply(null, arr);
}

// intl.get('COMM.FTMVOTA')
export function getArrayMin(arr) {
  return Math.min.apply(null, arr);
}
// 辅助线标准差计算
export function stdDeviation(arr) {
  let sd;
  let ave;
  let sum = 0;
  let sums = 0;
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    sum += Number(arr[i]);
  }
  ave = sum / len;
  for (let i = 0; i < len; i++) {
    sums += (Number(arr[i]) - ave) * (Number(arr[i]) - ave);
  }
  sd = Math.sqrt(sums / len).toFixed(4);
  return sd;
}

// intl.get('COMM.FTMOTA')
export function getArrayMiddle(arr) {
  let new_arr = [].concat(arr);
  let mid;
  new_arr.sort((x, y) => {
    if (x < y) {
      return -1;
    } else if (x > y) {
      return 1;
    } else {
      return 0;
    }
  });
  if (new_arr.length % 2 === 0) {
    mid = (new_arr[new_arr.length / 2 - 1] + new_arr[new_arr.length / 2]) / 2;
  }
  if (new_arr.length % 2 !== 0) {
    mid = new_arr[(new_arr.length - 1) / 2];
  }
  return mid;
}

// 计算辅助线位置
export function setPlotLinesValue(customizedOptions, data) {
  let yAxis = getYAxis(customizedOptions);
  let { plotLines = [] } = yAxis;

  if (plotLines.length) {
    plotLines.forEach(line => {
      if (line.select1 !== intl.get('COMM.FIXED_VALUE')) {
        let arr = [];
        data.vals.map(el => {
          if (el.column === line.select2) {
            arr = el.data;
          }
        });
        if (line.select3 === intl.get('COMM.AVERAGE_VALUE')) {
          line.value = getArrayAverage(arr);
        } else if (line.select3 === intl.get('COMM.MAXIMUM')) {
          line.value = getArrayMax(arr);
        } else if (line.select3 === intl.get('SRC.MINIMUM_VALUE')) {
          line.value = getArrayMin(arr);
        } else if (line.select3 === intl.get('COMP.UCL')) {
          line.value = getArrayAverage(arr) + 2 * stdDeviation(arr);
        } else if (line.select3 === intl.get('COMP.LCL')) {
          line.value = getArrayAverage(arr) - 2 * stdDeviation(arr);
        } else {
          line.value = getArrayMiddle(arr);
        }
      }
    });
  }

  yAxis.plotLines = plotLines;

  return yAxis;
}

/**
 * intl.get('COMM.CGA')
 * @param {{intl.get('COMM.START_COLOR')}} startColor
 * @param {{intl.get('COMP.END_COLOR')}} endColor
 * @param {{intl.get('COMM.NOS')}} step
 */
export class GradientColor {
  constructor(startColor, endColor, step) {
    this.startRGB = this.colorRgb(startColor);
    this.startR = this.startRGB[0];
    this.startG = this.startRGB[1];
    this.startB = this.startRGB[2];
    this.endRGB = this.colorRgb(endColor);
    this.endR = this.endRGB[0];
    this.endG = this.endRGB[1];
    this.endB = this.endRGB[2];
    this.sR = (this.endR - this.startR) / (step - 1);
    this.sG = (this.endG - this.startG) / (step - 1);
    this.sB = (this.endB - this.startB) / (step - 1);
    this.colorArr = [];

    for (let i = 0; i < step; i++) {
      const hex = this.colorHex(
        `rgb(${parseInt(this.sR * i + this.startR)},${parseInt(
          this.sG * i + this.startG
        )},${parseInt(this.sB * i + this.startB)})`
      );
      this.colorArr.push(hex);
    }

    return this.colorArr;
  }

  // intl.get('COMM.TAKE')hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
  colorRgb(startColor) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = startColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#';
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      // {intl.get('COMM.PSDCV')}
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
      }
      return sColorChange;
    }
    return sColor;
  }

  // intl.get('COMM.TAKE')rgb表示方式转换为hex表示方式
  colorHex(rgb) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(rgb)) {
      let aColor = rgb.replace(/(?:(|)|rgb|RGB)*/g, '').split(',');
      let strHex = '#';
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
        if (hex === '0') {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = rgb;
      }
      return strHex;
    } else if (reg.test(rgb)) {
      let aNum = rgb.replace(/#/, '').split('');
      if (aNum.length === 6) {
        return rgb;
      } else if (aNum.length === 3) {
        let numHex = '#';
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    }
    return rgb;
  }
}

/**
 * intl.get('COMM.CTDC')
 * @param {*} dims
 * @param {*} values
 */
export function annotationTransform(dims, values) {
  let annotationColumns = {
    color: [],
    size: [],
    label: [],
  };

  function pushAnnotation(col) {
    col.annotations.includes(MARKER_COLOR) && annotationColumns.color.push(col);
    col.annotations.includes(MARKER_SIZE) && annotationColumns.size.push(col);
    col.annotations.includes(MARKER_LABEL) && annotationColumns.label.push(col);
  }

  // intl.get('COMM.FTF')
  let filterDims = dims.filter(k => {
    if (k.isAnnotation) {
      pushAnnotation(k);
      return false;
    }
    return true;
  });
  let filterValues = values.filter(k => {
    if (k.isAnnotation) {
      pushAnnotation(k);
      return false;
    }
    return true;
  });

  return {
    annotationColumns,
    filterDims,
    filterValues,
  };
}

/**
 * intl.get('COMM.DOUBLE')y轴设置
 */
export function secondYConfig(y, isSecondY, hasTrend = false) {
  let yAxis = y;
  let common = {
    align: 'high',
    offset: 0,
    rotation: 0,
    y: -10,
  };

  let yAxis1 =
    yAxis && Array.isArray(yAxis)
      ? yAxis[0]
      : typeof yAxis === 'object'
      ? yAxis
      : {};
  let title1 = yAxis1.title || {};

  if (title1.align === 'middle') {
    title1 = {
      text: title1.text && title1.text !== '' ? title1.text : '',
      ...common,
      ...title1,
    };
  } else {
    title1 = {
      ...title1,
      text: title1.text && title1.text !== '' ? title1.text : '',
      ...common,
    };
  }

  yAxis = [{ ...yAxis1, title: title1, gridZIndex: 2 }];

  if (isSecondY) {
    let yAxis2 = Array.isArray(y) && y[1] ? y[1] : {};
    let title2 = yAxis2.title || {};

    title2 = {
      ...title2,
      text: title2.text && title2.text !== '' ? title2.text : '',
      ...common,
    };
    yAxis = [
      ...yAxis,
      {
        ...yAxis2,
        title: title2,
        gridLineWidth: yAxis[0].gridLineWidth,
        gridLineDashStyle: yAxis[0].gridLineDashStyle,
        gridLineColor: yAxis[0].gridLineColor,
        gridZIndex: 1,
        opposite: true,
      },
    ];
    // 数据设为次轴时，不显示趋势对应的y轴
    if (hasTrend) {
      yAxis[0].visible = false;
    }
  }
  return yAxis;
}
// 分组图 设置次轴， 只能有一个Y轴
export function secondYConfigForGroup(y, isSecondY) {
  let yAxis = y;
  let common = {
    align: 'high',
    offset: 0,
    rotation: 0,
    y: -10,
  };
  let yAxis1 =
    yAxis && Array.isArray(yAxis)
      ? yAxis[isSecondY ? 1 : 0] || {}
      : typeof yAxis === 'object' && !isSecondY
      ? yAxis
      : {};

  let title1 = yAxis1.title || {};

  if (title1.align === 'middle') {
    title1 = {
      text: title1.text && title1.text !== '' ? title1.text : '',
      ...common,
      ...title1,
    };
  } else {
    title1 = {
      ...title1,
      text: title1.text && title1.text !== '' ? title1.text : '',
      ...common,
    };
  }
  yAxis = [{ ...yAxis1, title: title1, opposite: isSecondY }];
  return yAxis;
}
// intl.get('COMM.AMFCTG')
const getFillColor = color => ({
  linearGradient: {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 1,
  },
  stops: [
    [0, color],
    [
      1,
      Highcharts.Color(color)
        .setOpacity(0)
        .get('rgba'),
    ],
  ],
});
/**
 * intl.get('COMM.AMSG')
 */
export function seriesAreaFill(series, chartType, options) {
  const { customizedTheme = {} } = options;
  const { themeTone = 'blueWhite', themeCode = 'blueWhite' } = customizedTheme;
  if (
    AREA_CHARTS.includes(chartType) ||
    AREASPLINE_CHARTS.includes(chartType)
  ) {
    const gradientSeries = series.map((k, v) => {
      if (
        options.colors &&
        options.colors[v] &&
        options.seriesColorType !== 'range'
      ) {
        return Object.assign({}, k, {
          fillColor: options.colors[v],
        });
      } else {
        return Object.assign({}, k, {
          fillColor: getFillColor(
            colors[themeTone][themeCode][v] || colors[themeTone][themeCode][0]
          ),
        });
      }
    });

    return gradientSeries;
  }

  return series;
}

/**
 * intl.get('COMM.MATF')
 */
export function gis_annotationTransform(columns, data) {
  let annotationColumns = {
    color: [],
    size: [],
    label: [],
  };

  function pushAnnotation(col) {
    col.annotations.includes(MARKER_COLOR) && annotationColumns.color.push(col);
    col.annotations.includes(MARKER_SIZE) && annotationColumns.size.push(col);
    col.annotations.includes(MARKER_LABEL) && annotationColumns.label.push(col);
  }
  let index = -1;
  const [header, ...rows] = data;

  columns.forEach(k => {
    if (k.isAnnotation) {
      let { col_name } = k;
      header.forEach((item, i) => {
        if (item === col_name) {
          index = i;
        }
      });
      k.data = rows.map(row => row[index]).sort((a, b) => a - b);
      pushAnnotation(k);
    }
  });
  return annotationColumns;
}

function isMiddle(x, min, max) {
  return typeof x === 'number' && x >= min && x <= max;
}
/**
 * intl.get('COMM.SRC')
 * @param {*} series
 * @param {*} chartType
 * @param {*} options
 * @returns
 */
export function rangeColorDisplay(series, chartType, options, transFormType) {
  if (
    options.seriesColorType === 'range' &&
    options.colors &&
    options.colors.length > 0 &&
    series &&
    series.length > 0
  ) {
    // {intl.get('ANAL.GROUPING')}
    if (
      [
        'group',
        'stack',
        'pie',
        'singleDimStack',
        'column',
        'dateTime',
      ].includes(transFormType)
    ) {
      for (let i = 0; i < options.colors.length; i++) {
        let { color, max, min } = options.colors[i];
        for (let j = 0; j < series.length; j++) {
          series[j].data = series[j].data.map(item => {
            if (item) {
              if (typeof item === 'number' && isMiddle(item, min, max)) {
                item = {
                  y: item,
                  color,
                };
              } else if (item.y && isMiddle(item.y, min, max)) {
                item.color = color;
              }
            }
            return item;
          });
        }
      }
    }
    delete options.colors;
  }
  return series;
}

// intl.get('COMP.PIE_CHART')label 数据格式
export function getTipsLabel(format, y, value, thousands) {
  let label;
  switch (format) {
    case '':
      label = '';
      break;
    case intl.get('COMM.INTEGER'):
      label = numeral(y || value).format(thousands ? '0,0' : '0');
      break;
    case intl.get('COMM.PERCENTAGE'):
      label = numeral(y || value).format(thousands ? '0,0%' : '0%');
      break;
    case intl.get('ANAL.AOM'):
      label = thousands ? numeral(y || value).format('$0,') : `$${y || value}`;
      break;
    case intl.get('ANAL.KTDP'):
      label = numeral(y || value).format(thousands ? '0,0.00' : '0.00');
      break;
    default:
      label = numeral(y || value).format(thousands ? '0,0' : format);
  }
  return label;
}

// 饼图-单位-tips-百分比冲突
export function pieFormatter(dataLabels, plotOptions, thousands) {
  let {
    enabled,
    enabledLabelPrecent,
    enabledLabelUnit,
    tips,
    formatter,
  } = dataLabels;

  let unit_formatter = () =>
    enabledLabelUnit
      ? `(${intl.get('analysis.pie.label.unit')}: ${enabledLabelUnit})`
      : '';

  let percent_formatter = percentage =>
    enabledLabelPrecent ? '' : `(${numeral(percentage).format('0.00')}%)`;

  if (enabledLabelPrecent || enabledLabelUnit || tips || thousands) {
    if (formatter) {
      // {intl.get('COMM.REMOVE')}tips生成的formatter 防止替换
      delete dataLabels?.formatter;
    }
    if (enabledLabelPrecent || enabledLabelUnit || tips || thousands) {
      plotOptions.pie = Object.assign({}, plotOptions.pie, {
        dataLabels: {
          enabled: enabled,
          distance: plotOptions?.pie?.dataLabels?.distance || 20, // {intl.get('COMP.DBDLAS')}
          formatter: function() {
            const { name, y, percentage, value, series } = this.point;
            let str = `<div><b>${name} </b></div><div>${series?.name}:
             ${
               tips
                 ? getTipsLabel(tips, y, value, thousands)
                 : numeral(y).format(thousands ? '0,0' : '0')
             }${unit_formatter()}${percent_formatter(percentage)}</div>`;

            return str;
          },
        },
      });
    }
  }
  return plotOptions;
}

// 设置双Y轴的辅助线
/**
 *
 * @param {*} plotLines  辅助线配置
 * @param {*} index  第几个Y轴
 * @param {*} col_name  当前轴对应字段的名字
 * @returns
 */
export function doubleYAxisPlotLines(plotLines, index, col_name) {
  let res = plotLines.filter(line => {
    return (
      (index === 0 && line.select1 === '固定值') ||
      (line.select1 === '计算值' && line.select2 === col_name)
    );
  });
  return res.length > 0 ? res : null;
}
