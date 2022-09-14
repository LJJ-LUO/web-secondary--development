import intl from 'react-intl-universal';
import { baseUrl } from '../utils/context';

export const ANALYZER_ACTION_TYPE_ADD = 0;
export const ANALYZER_ACTION_TYPE_EDIT = 1;
export const ANALYZER_ACTION_TYPE_UPDATE = 1;
export const ANALYZER_DRAG_EVENT = 'box';
export const ANALYZER_ORDER_EVENT = 'order';
export const ANALYZER_CUSTOM_SORT_ROW_EVENT = 'row';
export const ANALYZER_ORDER_AESC = 0;
export const DEFAULT_TIME_GRANULARITY = 4;
export const CUSTOM_SORT_INDEX = 3;
export const CUSTOM_EXPRESSION_TYPE = 30; // {intl.get('ANAL.TNSITWIASF')}
export const DEFAULT_CHART_TYPE = '101';
export const DEFAULT_ACTIVE_TAB = 7;
export const DEFAULT_TABLE_VIEW_TAB = 1;
export const CUSTOM_NONE_AGG = 999; // {intl.get('ANAL.DNSFFNFITW')}
export const ACCUMULATE_CALC = 9;
export const NO_ADVANCED = 9;
export const ANALYZER_VERSION_1 = 1;
export const TEXT_DATATYPE = 0;
export const NUMBER_DATATYPE = 8;
export const DISPLAY_CHART_DOM_ID = 'analyzer_charts_container';
export const PREVIEW_DOM_ID = 'analyzer_prepare_container';
export const ANALYZER_PREPARE = 'analyzer-prepare';
export const DEFAULT_CHART_GIS_TYPE = '711';
export const mapColors = [
  '#9287e7',
  '#29CC97',
  '#feb64d',
  '#32d3eb',
  '#ff7c7c',
  '#60acfc',
];
export const PER_SCROLL_TABLE_SIZE = 100;

/**
 * intl.get('ANAL.AMT')
 * @property {number} DEFAULT_ANALYSIS_VIEW_TAB {intl.get('ANAL.VIEW')}
 * @property {number} DEFAULT_FILE_VIEW_TAB {intl.get('ANAL.FILE')}
 * @property {number} DEFAULT_START_VIEW_TAB {intl.get('ANAL.START')}
 * @property {number} DEFAULT_DATA_VIEW_TAB {intl.get('COMM.DATA')}
 * @property {number} DEFAULT_AI_VIEW_TAB {intl.get('ANAL.INTELLIGENCE')}
 */
export const ANALYZER_MENUS = {
  DEFAULT_ANALYSIS_VIEW_TAB: 5,
  DEFAULT_FILE_VIEW_TAB: 2,
  DEFAULT_START_VIEW_TAB: 1,
  DEFAULT_DATA_VIEW_TAB: 3,
  DEFAULT_AI_VIEW_TAB: 4,
};

export const textMenu = {
  1: intl.get('ANAL.COUNT'),
  6: intl.get('EX.DDC'),
};

export const numberMenu = {
  0: intl.get('ANAL.SUM'),
  1: intl.get('ANAL.COUNT'),
  2: intl.get('ANAL.AVERAGE_VALUE'),
  3: intl.get('ANAL.MAXIMUM'),
  4: intl.get('ANAL.MINIMUM_VALUE'),
  7: intl.get('EX.DE_SUMMATION'),
  8: intl.get('COMM.KURTOSIS'),
  9: intl.get('EX.SKEWNESS'),
  14: intl.get('EX.SSD'),
  15: intl.get('EX.OSD'),
  12: intl.get('EX.SAMPLE_VARIANCE'),
  13: intl.get('EX.POPULATION_VARIANCE'),
  17: intl.get('EX.DISPERSION_COEFFICIENT'),
  30: intl.get('COMM.CUSTOM_AGGREGATION'),
};

export const CALC_TYPE = 'table_calc_type';

export const numberMenuForDisplay = [
  { 0: intl.get('ANAL.SUM'), 1: intl.get('ANAL.COUNT') },
  {
    2: intl.get('ANAL.AVERAGE_VALUE'),
    3: intl.get('ANAL.MAXIMUM'),
    4: intl.get('ANAL.MINIMUM_VALUE'),
  },
  { 999: intl.get('ANAL.MORE') },
];

export const moreMenus = {
  7: intl.get('EX.DE_SUMMATION'),
  8: intl.get('COMM.KURTOSIS'),
  9: intl.get('EX.SKEWNESS'),
  14: intl.get('EX.SSD'),
  15: intl.get('EX.OSD'),
  12: intl.get('EX.SAMPLE_VARIANCE'),
  13: intl.get('EX.POPULATION_VARIANCE'),
  17: intl.get('EX.DISPERSION_COEFFICIENT'),
  30: intl.get('COMM.CUSTOM_AGGREGATION'),
};

export const dateMenu = {
  1: intl.get('ANAL.COUNT'),
  6: intl.get('EX.DDC'),
};

export const timeGranularityMenu = {
  0: intl.get('EX.BY_YEAR'),
  1: intl.get('COMM.QUARTERLY'),
  2: intl.get('EX.MONTHLY'),
  3: intl.get('EX.BY_WEEK'),
  4: intl.get('EX.BY_DAY'),
  5: intl.get('EX.ON_TIME'),
  6: intl.get('EX.BY_POINTS'),
  7: intl.get('EX.BY_SECOND'),
  8: intl.get('ANAL.CUSTOM'),
};

export const MARKER_COLOR = '31';
export const MARKER_SIZE = '32';
export const MARKER_LABEL = '33';

export const markerMenus = [
  { key: MARKER_COLOR, name: intl.get('ANAL.COLOUR') },
  { key: MARKER_SIZE, name: intl.get('EVEN.SIZE') },
  { key: MARKER_LABEL, name: intl.get('ANAL.LABEL') },
];

// intl.get('ANAL.DDS')
export const DEFAULT_MARK_SIZE = 48;

export const DEFAULT_MARK_MIN_SIZE = 10;

export const DEFAULT_SCATTER_SIZE = 10;

export const DEFAULT_SCATTER_MIN_SIZE = 2;

// intl.get('ANAL.CTTSD')
export const ALLOW_MARK_SIZE_TYPE = [
  '102',
  '108',
  '127',
  '128',
  '201',
  '130',
  '145',
  '402',
  '111',
];

// intl.get('ANAL.MSC')
export const markerThemes = [
  '#2094fd',
  '#44de72',
  '#e07af9',
  '#ff5252',
  '#ffc62b',
  '#3ddfed',
];

export const seColor = ['#6bd1ff', '#0454f2'];

export const SystemVaribles = {
  $current_user_id: intl.get('COMM.CUI'),
  $current_user_name: intl.get('ANAL.CUN'),
  $current_office_id: intl.get('COMM.CDI'),
  $current_office_name: intl.get('ANAL.CDN'),
  $current_user_login_name: intl.get('COMM.DQYHDLM'),
  $current_company_name: intl.get('ANAL.CCN'),
  $current_time: intl.get('COMM.CURRENT_DATE'),
  $current_office_and_next: intl.get('COMM.CDASDI'),
  $start_time_of_today: intl.get('COMP.TODAY_START_TIME'),
  $end_time_of_today: intl.get('COMP.TODAY_END_TIME'),
  $current_direct_sub_company_id: intl.get('COMM.DIRECT_SUB_COMPANY_ID'),
  // $tomorrow: intl.get('ANAL.TOMORROW'),
  // $day_before: intl.get('COMM.NDA'),
  // $day_after: intl.get('COMM.NDL'),
};

export const ChartIconTypes = [
  { key: 'common', icon: 'icon-common', desc: intl.get('ANAL.COMMONLY_USED') },
  { key: 'line', icon: 'icon-shuzhou', desc: intl.get('DICT.LINE_CHART') },
  { key: 'column', icon: 'icon-tubiao', desc: intl.get('COMM.HISTOGRAM') },
  { key: 'area', icon: 'icon-mianjitu', desc: intl.get('COMP.AREA_MAP') },
  { key: 'pie', icon: 'icon-bingtu', desc: intl.get('COMP.PIE_CHART') },
  {
    key: 'index',
    icon: 'icon-yibiaotu',
    desc: intl.get('COMP.INSTRUMENT_DIAGRAM'),
  },
  { key: 'map', icon: 'icon-ditu', desc: intl.get('REPO.MAP') },
  { key: 'other', icon: 'icon-qita1', desc: intl.get('COMP.OTHER') },
];

export const CHART_TYPE_SVG = [
  {
    key: 'common',
    icon: 'icon-changgui',
    icon_disable: 'icon-changgui-bukeyong',
    desc: intl.get('ANAL.COMMONLY_USED'),
  },
  {
    key: 'line',
    icon: 'icon-zhexiantu',
    icon_disable: 'icon-zhexiantu-bukeyong',
    desc: intl.get('DICT.LINE_CHART'),
  },
  {
    key: 'column',
    icon: 'icon-zhuzhuangtu',
    icon_disable: 'icon-zhuzhuangtu-bukeyong',
    desc: intl.get('COMM.HISTOGRAM'),
  },
  {
    key: 'area',
    icon: 'icon-mianjitu1',
    icon_disable: 'icon-mianjitu-bukeyong',
    desc: intl.get('COMP.AREA_MAP'),
  },
  {
    key: 'pie',
    icon: 'icon-bingtu1',
    icon_disable: 'icon-bingtu-bukeyong',
    desc: intl.get('COMP.PIE_CHART'),
  },
  {
    key: 'index',
    icon: 'icon-yibiaotu1',
    icon_disable: 'icon-yibiaotu-bukeyong',
    desc: intl.get('COMP.INSTRUMENT_DIAGRAM'),
  },
  {
    key: 'map',
    icon: 'icon-ditu1',
    icon_disable: 'icon-ditu-bukeyong',
    desc: intl.get('REPO.MAP'),
  },
  {
    key: 'other',
    icon: 'icon-qita2',
    icon_disable: 'icon-qita-bukeyong',
    desc: intl.get('COMP.OTHER'),
  },
];

export const ChartTypes = [
  /** ****  start of {intl.get('ANAL.COMMON_CHARTS')} *******/
  {
    img: 'table.png',
    disableimg: 'table-gray.png',
    type: '101',
    name: intl.get('ANAL.DATA_TABLE'),
    category: 'table',
    pattern: /^[TN]{1,}$/,
    common: true,
  },
  {
    img: 'baseLine.png',
    disableimg: 'baseLine-gray.png',
    type: '114',
    name: intl.get('ANAL.FSL'),
    category: 'line',
    pattern: /^[TN]N{1,}$/,
    common: true,
  },
  {
    img: 'basicColumn.png',
    disableimg: 'basicColumn-gray.png',
    type: '102',
    name: intl.get('COMP.FOUNDATION_COLUMNAR'),
    category: 'column',
    pattern: /^[TN]N{1,}$/,
    common: true,
  },
  {
    img: 'basicStrip.png',
    disableimg: 'basicStrip-gray.png',
    type: '108',
    name: intl.get('COMP.FOUNDATION_STRIP'),
    category: 'column',
    pattern: /^[TN]N{1,}$/,
    common: true,
  },
  {
    img: 'straightArea.png',
    disableimg: 'straightArea-gray.png',
    type: '120',
    name: intl.get('COMP.LINEAR_AREA'),
    category: 'area',
    pattern: /^[TN]N{1,}$/,
    common: true,
  },
  {
    img: 'pie.png',
    disableimg: 'pie-gray.png',
    type: '103',
    name: intl.get('COMM.BPC'),
    category: 'pie',
    pattern: /^[TN]N$/,
    common: true,
  },
  {
    img: 'groupingLine.png',
    disableimg: 'groupingLine-gray.png',
    type: '116',
    name: intl.get('COMP.GROUPING_LINE'),
    category: 'line',
    pattern: /^[TN]{2}N{1}$/,
    common: true,
  },
  {
    img: 'stackingLine.png',
    disableimg: 'stackingLine-gray.png',
    type: '121',
    name: intl.get('COMP.STACKED_LINES'),
    category: 'area',
    pattern: /^[TN]{2}N{1,}$/,
    common: true,
  },
  {
    img: 'groupedColumn.png',
    disableimg: 'groupedColumn-gray.png',
    type: '127',
    name: intl.get('COMM.GROUPED_COLUMNAR'),
    category: 'column',
    pattern: /^[TN]{2}N{1}$/,
    common: true,
  },
  {
    img: 'groupingStrip.png',
    disableimg: 'groupingStrip-gray.png',
    type: '128',
    name: intl.get('COMM.GROUPED_BAR'),
    category: 'column',
    pattern: /^[TN]{2}N{1}$/,
    common: true,
  },
  {
    img: 'complex-table.png',
    disableimg: 'complex-table-gray.png',
    type: '139',
    name: intl.get('ANAL.ComplexForm'),
    category: 'table',
    pattern: /^[TN]{2,}$/,
    common: true,
  },
  /** ****  end of {intl.get('ANAL.COMMON_CHARTS')} *******/
  {
    img: 'verticalLine.png',
    disableimg: 'verticalLine-gray.png',
    type: '115',
    pattern: /^[TN]N{1,}$/,
    name: intl.get('COMP.VERTICAL_LINE'),
    category: 'line',
  },
  {
    img: 'basecurve.png',
    disableimg: 'basecurve_gray.png',
    type: '104',
    pattern: /^[TN]N{1,}$/,
    name: intl.get('COMP.FOUNDATION_CURVE'),
    category: 'line',
  },
  {
    img: 'verticalcurve.png',
    disableimg: 'verticalcurve-gray.png',
    type: '113',
    pattern: /^[TN]N{1,}$/,
    name: intl.get('COMP.VERTICAL_CURVE'),
    category: 'line',
  },
  {
    img: 'verticalgroupingline.png',
    disableimg: 'verticalgroupingline-gray.png',
    type: '117',
    pattern: /^[TN]{2}N{1}$/,
    name: intl.get('COMP.VGL'),
    category: 'line',
  },
  {
    img: 'groupingCurve.png',
    disableimg: 'groupingCurve-gray.png',
    type: '118',
    pattern: /^[TN]{2}N{1}$/,
    name: intl.get('COMP.GROUPING_CURVE'),
    category: 'line',
  },
  {
    img: 'verticalgroupingCurve.png',
    disableimg: 'verticalgroupingCurve-gray.png',
    type: '119',
    pattern: /^[TN]{2}N{1}$/,
    name: intl.get('COMP.VGC'),
    category: 'line',
  },
  {
    img: 'stackedColumn.png',
    disableimg: 'stackedColumn-gray.png',
    type: '201',
    pattern: /^[TN]{2}N{1}$/,
    name: intl.get('ANAL.GSC'),
    category: 'column',
  },
  {
    img: 'stackedStrip.png',
    disableimg: 'stackedStrip-gray.png',
    type: '130',
    pattern: /^[TN]{2}N{1}$/,
    name: intl.get('ANAL.GSB'),
    category: 'column',
  },
  {
    img: 'stackedStrip.png',
    disableimg: 'stackedStrip-gray.png',
    type: '145',
    pattern: /^[TN]N{1,}$/,
    name: intl.get('COMM.STACKED_BAR'),
    category: 'column',
  },
  {
    img: 'bar-chart-race.gif',
    disableimg: 'basicStrip-gray.png',
    type: '146',
    pattern: /^[TT]{2}N{1}$/,
    name: intl.get('COMM.DYNAMIC_BAR'),
    category: 'column',
  },
  {
    img: 'cylinder.png',
    disableimg: 'cylinder-gray.png',
    type: '147',
    pattern: /TN$/,
    name: intl.get('COMM.SOLID_CYLINDER'),
    category: 'column',
  },
  {
    img: 'curveArea.png',
    disableimg: 'curveArea-gray.png',
    type: '105',
    pattern: /^[TN]N{1,}$/,
    name: intl.get('COMP.CURVE_AREA'),
    category: 'area',
  },
  {
    img: 'stackingCurve.png',
    disableimg: 'stackingCurve-gray.png',
    type: '122',
    pattern: /^[TN]{2}N{1,}$/,
    name: intl.get('COMP.STACKING_CURVE'),
    category: 'area',
  },
  {
    img: 'percentStackingLine.png',
    disableimg: 'percentStackingLine-gray.png',
    type: '123',
    pattern: /^[TN]{2}N{1,}$/,
    name: intl.get('ANAL.PSL'),
    category: 'area',
  },
  {
    img: 'percentStackingCurve.png',
    disableimg: 'percentStackingCurve-gray.png',
    type: '124',
    pattern: /^[TN]{2}N{1,}$/,
    name: intl.get('ANAL.PSC'),
    category: 'area',
  },
  {
    img: 'straightLineArea.png',
    disableimg: 'straightLineArea-gray.png',
    type: '125',
    pattern: /^[TN]N{2}$/,
    name: intl.get('COMP.LAR'),
    category: 'area',
  },
  {
    img: 'straightCurveArea.png',
    disableimg: 'straightCurveArea-gray.png',
    type: '126',
    pattern: /^[TN]N{2}$/,
    name: intl.get('COMP.CAR'),
    category: 'area',
  },
  {
    img: 'doublePie.png',
    disableimg: 'doublePie-gray.png',
    type: '131',
    pattern: /^[TN]{2}N$/,
    name: intl.get('ANAL.DPC'),
    category: 'pie',
  },
  {
    img: 'sector.png',
    disableimg: 'sector-gray.png',
    type: '132',
    pattern: /^[TN]N$/,
    name: intl.get('COMM.SECTOR_DIAGRAM'),
    category: 'pie',
  },
  {
    img: 'risingSun.png',
    disableimg: 'risingSun-gray.png',
    type: '133',
    pattern: /^[TN]{2,}N$/,
    name: intl.get('COMM.RSC'),
    category: 'pie',
  },
  {
    img: 'ring.png',
    disableimg: 'ring-gray.png',
    type: '408',
    pattern: /^[TN]N$/,
    name: intl.get('COMM.PROGRESS_LOOP'),
    category: 'pie',
  },
  {
    img: 'index.png',
    disableimg: 'index-gray.png',
    type: '405',
    pattern: /^(T?)N$/,
    name: intl.get('COMM.INDEX_CARD'),
    category: 'index',
  },
  {
    img: 'z-index.png',
    disableimg: 'z-index-gray.png',
    type: '416',
    pattern: /^TN$/,
    name: intl.get('ANAL.SDSVIC'),
    category: 'index',
  },
  {
    img: 'speed.png',
    disableimg: 'speed-gray.png',
    type: '109',
    pattern: /^N$/,
    name: intl.get('COMM.SPEEDOMETER'),
    category: 'index',
  },
  {
    img: 'dashBoard.png',
    disableimg: 'dashBoard-gray.png',
    type: '134',
    pattern: /^N{1,2}$/,
    name: intl.get('COMP.DASHBOARD'),
    category: 'index',
  },
  {
    img: 'progress.png',
    disableimg: 'progress-gray.png',
    type: '423',
    pattern: /^N{1,2}$/,
    name: intl.get('ANAL.PROGRESS_BAR'),
    category: 'index',
  },
  {
    img: 'ranking-list.png',
    disableimg: 'ranking-list-gray.png',
    type: '424',
    pattern: /^TN$/,
    name: intl.get('COMP.RANKING_LIST'),
    category: 'index',
  },
  {
    img: 'map-colored.png',
    disableimg: 'map-colored-gray.png',
    type: '703',
    pattern: /^T{1}N{1}$/,
    name: intl.get('ANAL.MCM'),
    category: 'map',
  },
  {
    img: 'map-bubble.png',
    disableimg: 'map-bubble-gray.png',
    type: '705',
    pattern: /^T{1}N{1}$/,
    name: intl.get('ANAL.MAP_BUBBLE'),
    category: 'map',
  },
  {
    img: 'scatter.png',
    disableimg: 'scatter-gray.png',
    type: '111',
    pattern: /^[TN]{1}[N]{2}$/,
    name: intl.get('COMP.SCATTER_DIAGRAM'),
    category: 'other',
  },
  {
    img: 'sankey.png',
    disableimg: 'sankey-gray.png',
    type: '202',
    pattern: /^[TN]{2}N{1}$/,
    name: intl.get('COMM.SANKEY '),
    category: 'other',
  },
  {
    img: 'radar.png',
    disableimg: 'radar-gray.png',
    type: '110',
    pattern: /^[TN]N{1,}$/,
    name: intl.get('COMM.RADAR_CHART'),
    category: 'other',
  },
  {
    img: 'lineBar.png',
    disableimg: 'lineBar-gray.png',
    type: '203',
    pattern: /^TN+$/,
    name: intl.get('ANAL.FCMD'),
    category: 'other',
  },
  {
    img: 'lineBar.png',
    disableimg: 'lineBar-gray.png',
    type: '204',
    pattern: /^[TN]N{2,}$/,
    name: intl.get('ANAL.SPMG'),
    category: 'other',
  },
  {
    img: 'polar.png',
    disableimg: 'polar-gray.png',
    type: '112',
    pattern: /^[TN]N{1,}$/,
    name: intl.get('ANAL.WIND_ROSE'),
    category: 'other',
  },
  {
    img: 'Vbar.png',
    disableimg: 'Vbar-gray.png',
    type: '402',
    pattern: /^[TN]N{1,}$/,
    name: intl.get('ANAL.CUSTOMIZED_HISTOGRAM'),
    category: 'other',
  },
  {
    img: 'line.png',
    disableimg: 'line-gray.png',
    type: '403',
    pattern: /^[TN]N{1,}$/,
    name: intl.get('ANAL.CLC'),
    category: 'other',
  },
  {
    img: 'treemap.png',
    disableimg: 'treemap-gray.png',
    type: '702',
    pattern: /^[TN]N{1}$/,
    name: intl.get('COMM.RECTANGULAR_TREE'),
    category: 'other',
  },
  {
    img: 'funnel.png',
    disableimg: 'funnel-gray.png',
    type: '420',
    pattern: /^TN$/,
    name: intl.get('COMM.FUNNEL_DIAGRAM'),
    category: 'other',
  },
  {
    img: 'pyramid.png',
    disableimg: 'pyramid-gray.png',
    type: '437',
    pattern: /^TN$/,
    name: intl.get('COMP.PYRAMID_CHART'),
    category: 'other',
  },
  {
    img: 'gantter.png',
    disableimg: 'gantter-gray.png',
    type: '438',
    pattern: /^TTTN{0,1}$/,
    name: intl.get('COMP.GANTT_CHART'),
    category: 'other',
  },
  {
    img: 'table.png',
    disableimg: 'table-gray.png',
    type: '421',
    pattern: /^[TN]{2}N{1,}$/,
    name: intl.get('ANAL.CROSS_TABLE'),
    category: 'other',
  },
  {
    img: 'model-pic.png',
    disableimg: 'model-pic-gray.png',
    type: '425',
    name: intl.get('ANAL.MODEL_PICTURE'),
    category: 'other',
  },
  {
    img: 'wordcloud.png',
    disableimg: 'wordcloud-gray.png',
    type: '426',
    // pattern: /^[T]{1}N{0,1}$/,
    pattern: /^T{1}N{1}$/,
    name: intl.get('COMM.WCP'),
    category: 'other',
  },
  {
    img: 'two-way-bar.png',
    disableimg: 'two-way-bar-gray.png',
    type: '427',
    pattern: /^[TN]{1}[N]{2}$/,
    name: intl.get('COMM.BIDIRECTIONAL_HISTOGRAM'),
    category: 'other',
  },
  {
    img: 'kline.png',
    disableimg: 'kline-gray.png',
    type: '432',
    pattern: /^[TN]N{4,}$/,
    name: intl.get('COMM.K-LINE_DIAGRAM'),
    category: 'other',
  },
  {
    img: 'bubble.png',
    disableimg: 'bubble-gray.png',
    type: '430',
    pattern: /^[N]{3}$/,
    name: intl.get('COMM.BUBBLE_DIAGRAM'),
    category: 'other',
  },
  {
    img: 'three-d.png',
    disableimg: 'three-d-gray.png',
    type: '428',
    name: intl.get('ANAL.THREE-DIMENSIONAL_MODEL'),
    category: 'other',
  },
  {
    img: 'forum-list.png',
    disableimg: 'forum-list-gray.png',
    type: '431',
    name: intl.get('COMP.FORUM_LIST'),
    pattern: /N|T/,
    category: 'other',
  },
  {
    img: 'organization.png',
    disableimg: 'organization-gray.png',
    type: '436',
    pattern: /^[T]{3}$/,
    name: intl.get('COMM.ORGANIZATION_CHART'),
    category: 'other',
  },
  {
    img: 'graph.png',
    disableimg: 'graph-gray.png',
    type: '439',
    pattern: /^TTTNT{0,1}$/,
    name: intl.get('COMP.RELATIONSHIP_GRAPH'),
    category: 'other',
  },
  {
    img: 'gis-bubble.png',
    disableimg: 'gis-bubble-gray.png',
    type: '711',
    name: `GIS ${intl.get('COMP.MAP')}`,
    category: 'map',
  },
  {
    img: 'gis-heatmap.png',
    disableimg: 'gis-heatmap-gray.png',
    type: '712',
    name: `GIS ${intl.get('ANAL.THERMODYNAMIC_DIAGRAM')}`,
    category: 'map',
  },
  {
    img: 'gis-column.png',
    disableimg: 'gis-column-gray.png',
    type: '713',
    name: `GIS ${intl.get('ANAL.STATISTICAL_CHART')}`,
    category: 'map',
  },
  {
    img: 'gis-scatter.png',
    disableimg: 'gis-scatter-gray.png',
    type: '714',
    name: `GIS ${intl.get('ANAL.HSM')}`,
    category: 'map',
  },
  {
    img: '3d-map.png',
    disableimg: '3d-map-gray.png',
    type: '715',
    name: `3D ${intl.get('map')}`,
    category: 'map',
  },
  {
    img: 'nanjing.png',
    disableimg: 'nanjing-gray.png',
    type: '317',
    pattern: /^[TN]{2}N{1,}$/,
    name: intl.get('ANAL.OMON'),
    category: 'map',
  },
  {
    img: 'jiangsu.png',
    disableimg: 'jiangsu-gray.png',
    type: '305',
    pattern: /^[TN]{2}N{1,}$/,
    name: intl.get('COMM.OMOJP'),
    category: 'map',
  },
  {
    img: 'jiangsuqx.png',
    disableimg: 'jiangsuqx-gray.png',
    type: '315',
    pattern: /^[TN]{2}N{1,}$/,
    name: intl.get('COMM.OMODACIJP'),
    category: 'map',
  },
  {
    img: 'china.png',
    disableimg: 'china-gray.png',
    type: '307',
    pattern: /^[TN]{2}N{1,}$/,
    name: intl.get('COMM.NOM'),
    category: 'map',
  },
];

export const markerTypes = [
  {
    type: 'marker',
    icon: 'icon-weizhi',
  },
  {
    type: 'circle',
    icon: 'icon-tuoyuan1',
  },
  {
    type: 'triangle',
    icon: 'icon-juxing',
  },
  {
    type: 'square',
    icon: 'icon-juxing1',
  },
  {
    type: 'polygon',
    icon: 'icon-juxingkaobei',
  },
  {
    type: 'people',
    icon: 'icon-qunzu',
  },
  {
    type: 'shine',
    icon: 'icon-tuoyuan',
  },
  {
    type: 'police',
    icon: 'icon-jingcha',
  },
  {
    type: 'airplane',
    icon: 'icon-fei',
  },
];

export const statisticsTypes = [
  {
    type: 'pie',
    icon: 'icon-bingtu',
  },
  {
    type: 'bar',
    icon: 'icon-yuanjiaojuxingkaobei1',
  },
  {
    type: 'column',
    icon: 'icon-yuanjiaojuxingkaobei2',
  },
];

const EXTERNAL_BASE_URL = '/storage_area/ext_plugins/web';
export function getImageUrl(id) {
  return `${EXTERNAL_BASE_URL}/${id}/images/`;
}
export function getLibUrl(id) {
  return `${EXTERNAL_BASE_URL}/${id}/libs/`;
}
export function getCssUrl(id) {
  return `${EXTERNAL_BASE_URL}/${id}/css/`;
}
export function getJsUrl(id) {
  return `${EXTERNAL_BASE_URL}/${id}/js/`;
}
export const EXTERNAL_DATA_VARIABLE = '__analysisData';
export const EXTERNAL_PARAM_VARIABLES = '__analysisVariables';
export const EXTERNAL_DATA_OPTIONS = '__analysisOptions';
export const EXTERNAL_NEW_JSON_URL = `${baseUrl}/plugin/queryConfList?type=3`;
export const EXTERNAL_NEW_JSON_URL_BY_TOKEN = `${baseUrl}/plugin/queryConfListByToken?type=3&token=`;

export const TABLE_VIEW_TYPE = 1;
export const ANALYSIS_VIEW_TYPE = 2;
export const RELATION_VIEW_TYPE = 3;
export const COLUMN_DATATYPE_DATE = 5;
export const COLUMN_DATATYPE_TIMESTAMP = 6;
export const DATE_TIMEGRANULARITY = 4;
export const TIMESTAMP_TIMEGRANULARITY = 7;
export const GRAY_IN_TABLE_VIEW = ['711', '712', '713', '714', '715']; // 在表视图部分不可直接点击gis地图，gis热力图，gis统计图，gis热点图以及3d地图

export const ARCGIS_SERVICE_RESOLUTIONS = [
  0.15228550437313793,
  0.07614275218656896,
  0.03807137609328448,
  0.01903568804664224,
  0.00951784402332112,
  0.00475892201166056,
  0.00237946100583028,
  0.00118973050291514,
  5.9486525145757e-4,
  2.97432625728785e-4,
  1.5228550437313792e-4,
  7.614275218656896e-5,
  3.807137609328448e-5,
  1.903568804664224e-5,
  9.51784402332112e-6,
];
export const GIS_MAP_TYPES = {
  GIS_MAP_BG_TYPE_STANDARD: 'n-1',
  GIS_MAP_BG_TYPE_DARK: 'n-2',
  GIS_MAP_BG_TYPE_SATELLITE: 'n-3',
  GIS_MAP_BG_TYPE_ARCGIS: 'n-4',
  GIS_MAP_BG_TYPE_SUPERMAP: 'n-5',
  GIS_MAP_BG_TYPE_TIANDISATELLITE: 'n-6',
  GIS_MAP_BG_TYPE_TIANDITERRAIN: 'n-7',
  GIS_MAP_BG_TYPE_CITY_GIS: 'n-8',
  GIS_MAP_BG_TYPE_TMS: 'n-9',
};

export const CESIUM_SCENE_MODE = {
  CESIUM_MAP_3D: '3d',
  CESIUM_MAP_2D: '2d',
  CESIUM_MAP_COLUMBUS_VIEW: 'columbus_view',
};

// intl.get('ANAL.DWAHOPPW')
export const POPUP_CONFIG = {
  defaultWidth: 669,
  defaultHeight: 580,
};

// intl.get('ANAL.DCOSCC')
export const DEFAULT_CYLINDER_THEMES = [
  {
    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
    stops: [[0, '#6dde64'], [1, '#23c215']],
  },
  {
    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
    stops: [[0, '#57dec3'], [1, '#07b894']],
  },
  {
    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
    stops: [[0, '#e6d776'], [1, '#dac225']],
  },
  {
    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
    stops: [[0, '#889ee6'], [1, '#294eca']],
  },
  {
    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
    stops: [[0, '#f3afe6'], [1, '#e652c8']],
  },
  {
    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
    stops: [[0, '#ffaba5'], [1, '#fc6867']],
  },
];

export const PREPARE_VIEW = -1;
// intl.get('ANAL.DMDRTIM')
export const PREPARE_INSERT_MENU_ENGINE = [
  // {
  //   name: intl.get('ANAL.CONSTANT_FIELD'),
  //   img: require('../images/const-column.png'),
  //   key: 1,
  //   icon: 'icon-changliangziduan',
  // },
  // {
  //   name: intl.get('ANAL.CALCULATION_FIELD'),
  //   img: require('../images/calc-column.png'),
  //   key: 2,
  //   icon: 'icon-jisuanziduan',
  // },
];
// intl.get('ANAL.DRTIM')
export const PREPARE_INSERT_MENU = [
  {
    name: intl.get('ANAL.CONSTANT_FIELD'),
    img: require('../images/const-column.png'),
    key: 1,
    icon: 'icon-changliangziduan',
  },
  {
    name: intl.get('ANAL.CALCULATION_FIELD'),
    img: require('../images/calc-column.png'),
    key: 2,
    icon: 'icon-jisuanziduan',
  },
  // {
  //   name: intl.get('ANAL.RCT'),
  //   img: require('../images/ranks-transp.png'),
  //   key: 3,
  //   icon: 'icon-hangliezhuanzhi',
  // },
  {
    name: intl.get('ANAL.NUMERICAL_DISCRETIZATION'),
    img: require('../images/num-dispersed.png'),
    key: 4,
    icon: 'icon-shuzhilisan1',
  },
  {
    name: intl.get('ANAL.SPLIT_FIELDS'),
    img: require('../images/break-column.png'),
    key: 5,
    icon: 'icon-chaifenziduan',
  },
  // {
  //   name: intl.get('ANAL.GROUPING_FIELD'),
  //   img: require('../images/group-column.png'),
  //   key: 6,
  // },
  {
    name: intl.get('ANAL.MERGE_FIELDS'),
    img: require('../images/merge-column.png'),
    key: 7,
    icon: 'icon-hebingziduan',
  },
];

// intl.get('ANAL.DPDM')
export const PREPARE_DATA_MENU = [
  {
    name: intl.get('COMM.FILTER'),
    img: require('../images/condition-filter.png'),
    key: 8,
    icon: 'icon-funnel-outline',
  },
  {
    name: intl.get('ANAL.ADVANCED_FILTERING'),
    img: require('../images/expression-filter.png'),
    key: 9,
    icon: 'icon-gaojiguolv',
  },
  {
    name: intl.get('ANAL.NULL_FILL'),
    img: require('../images/column-type.png'),
    key: 10,
    icon: 'icon-buzhi1',
  },
];

// intl.get('ANAL.DPAT')
export const GATHER_ICON = [
  {
    name: intl.get('EVEN.INSIDE'),
    img: require('../images/gather-inside.png'),
    imgGray: require('../images/gather-inside-gray.png'),
    key: 'inner',
  },
  {
    name: intl.get('SRC.LEFT'),
    img: require('../images/gather-left.png'),
    imgGray: require('../images/gather-left-gray.png'),
    key: 'left_outer',
  },
  {
    name: intl.get('REPO.RIGHT'),
    img: require('../images/gather-right.png'),
    imgGray: require('../images/gather-right-gray.png'),
    key: 'right_outer',
  },
  {
    name: intl.get('ANAL.COMPLETELY_EXTERNAL'),
    img: require('../images/gather-outside.png'),
    imgGray: require('../images/gather-outside-gray.png'),
    key: 'full_outer',
  },
];

export const EXTRA_COLUMNS_INDEX = 1000000;

// 标记功能有效图表
export const USE_ANNOTATION_CHART = [
  '114',
  '116',
  '104',
  '118',
  '102',
  '127',
  '201',
  '120',
  '105',
  '121',
  '122',
  '123',
  '124',
  '711',
];

// intl.get('ANAL.TASCC')
export const AREA_CHARTS = ['120', '121', '123'];

export const AREASPLINE_CHARTS = ['105', '122', '124'];

export const ANALYSIS_ENGINE_SPARK = 0;

export const ANALYSIS_ENGINE_DIRECT_LINK = 1;

// intl.get('ANAL.POCTS')
export const LABEL_PRECENT_CHARTS = ['103', '408'];

// intl.get('ANAL.PCT')
export const PIE_CHARTS = ['103', '131', '132', '133', '408'];

// intl.get('COMM.USELESS_ATTRIBUTE')。为了解决编译警告
export const PREVIEW_CHART_DOM_ID = undefined;

// intl.get('ANAL.TDIPWASLM')
export const COLUMN_SEPERA = [3, 4, 5, 8, 9];

// intl.get('ANAL.CFSRC')
export const RANGE_COLOR_CHARTS = [
  '103',
  '132',
  '408',
  '114',
  '115',
  '116',
  '104',
  '113',
  '117',
  '118',
  '119',
  '102',
  '108',
  '127',
  '128',
  '201',
  '130',
  '145',
];
export const PROPERTY_LABEL_UNIT_CHARTS = ['103', '131', '132', '408'];

// intl.get('ANAL.CPWFC')无筛选配置的自定义插件
export const UNSUPPORT_FILTER_PLUGIN = ['EX_240', 'EX_811'];
// intl.get('ANAL.CWLVTANS') 不支持图例值总计的图表
export const UNSUPPORT_TOTAL_CHARTS = [
  ...PIE_CHARTS,
  '420',
  '437',
  '439',
  '432',
  '438',
  '125',
  '126',
];
// 不支持添加多个自定义颜色
export const UNSUPPORT_CUSTOM_COLORS = [];
// intl.get('ANAL.SCCCI') 切换图表清除配置项目
export const CHARTS_CLEAR = ['702'];
// intl.get('ANAL.SPECIFY_COLUMN') 指定柱列
export const COLUMNS_OPTION = ['203'];
// 不支持双Y轴设置的
export const NO_DOUBLE_Y = ['203', '204', '430', '432'];
// intl.get('ANAL.DSCT')数据系列颜色类型
export const SERIES_TYPE_DEFAULT = 'default';
export const SERIES_TYPE_GRADIENT = 'gradient';
export const SERIES_TYPE_RANGE = 'range';

// intl.get('ANAL.FMC')快速表计算
export const EXCEL_CALC = [
  {
    key: 't1',
    name: intl.get('ANAL.CUMULATIVE_SUMMARY'),
  },
  {
    key: 't2',
    name: intl.get('ANAL.DIFFERENCE_CALCULATION'),
  },
  {
    key: 't3',
    name: intl.get('ANAL.CODP'),
  },
  {
    key: 't4',
    name: intl.get('ANAL.PROPORTION_CALCULATION'),
  },
  {
    key: 't5',
    name: intl.get('ANAL.RANKING_CALCULATION'),
  },
  {
    key: 't9',
    name: intl.get('ANAL.MOBILE_COMPUTING'),
  },
];
export const EXCEL_CALC_TIME = [
  {
    key: 't10',
    name: intl.get('ANAL.COMPOUND_GROWTH'),
  },
];
export const EXCEL_CALC_MENU = {
  1: intl.get('ANAL.CUMULATIVE_SUMMARY'),
  2: intl.get('ANAL.DIFFERENCE_CALCULATION'),
  3: intl.get('ANAL.CODP'),
  4: intl.get('ANAL.PROPORTION_CALCULATION'),
  5: intl.get('ANAL.RANKING_CALCULATION'),
  9: intl.get('ANAL.MOBILE_COMPUTING'),
  10: intl.get('ANAL.COMPOUND_GROWTH'),
};
// intl.get('ANAL.ETC')
// export const EXCEL_CALC_EDITABLE = [1, 2, 3, 4, 5, 9];
export const EXCEL_CALC_EDITABLE = [];
// intl.get('COMM.THERMODYNAMIC_DIAGRAM')、统计图、热点图配置项
// 屏蔽点位弹窗、点位聚合、{intl.get('COMM.LINK_JUMP')}
export const UNSUPPORT_CONFIG_MAP = ['712', '713', '714'];

// 临时屏蔽204的一些配置
export const CHART_204 = '204';

export const CHART_203 = '203';

export const ADVANCE_COMPARE_ALL = [
  { key: 1, value: intl.get('ANAL.YOYGV') },
  { key: 2, value: intl.get('ANAL.YOYGR') },
  { key: 3, value: intl.get('ANAL.LWMG') },
  { key: 4, value: intl.get('ANAL.LWMGR') },
  { key: 5, value: intl.get('ANAL.MOMG') },
  { key: 6, value: intl.get('ANAL.MOMGR') },
  { key: 7, value: intl.get('ANAL.YOYG') },
  { key: 8, value: intl.get('ANAL.LAST_YOYGR') },
];
export const ADVANCE_COMPARE_YEAR = [
  { key: 1, value: intl.get('ANAL.YOYGV') },
  { key: 2, value: intl.get('ANAL.YOYGR') },
];
export const ADVANCE_COMPARE_WEEK = [
  { key: 1, value: intl.get('ANAL.YOYGV') },
  { key: 2, value: intl.get('ANAL.YOYGR') },
  { key: 7, value: intl.get('ANAL.YOYG') },
  { key: 8, value: intl.get('ANAL.LAST_YOYGR') },
];
export const ADVANCE_CALC_MENU = {
  1: intl.get('ANAL.YOYGV'),
  2: intl.get('ANAL.YOYGR'),
  3: intl.get('ANAL.LWMG'),
  4: intl.get('ANAL.LWMGR'),
  5: intl.get('ANAL.MOMG'),
  6: intl.get('ANAL.MOMGR'),
  7: intl.get('ANAL.YOYG'),
  8: intl.get('ANAL.LAST_YOYGR'),
  9: intl.get('ANAL.CUMULATIVE_CALCULATION'),
};
export const AI_CHART_TYPE_SVG = [
  {
    key: 'timeSeriesAnalysis',
    icon: 'icon-shixufenxi',
    icon_disable: 'icon-shixufenxi2',
    desc: intl.get('ANAL.TSA'),
  },
];

export const AI_ChartTypes = [
  {
    img: 'ai_801.png',
    disableimg: 'ai_801_disable.png',
    type: '801',
    name: intl.get('ANAL.TSP'),
    category: 'timeSeriesAnalysis',
    pattern: /^TN$/,
    common: true,
  },
  {
    img: 'ai_802.png',
    disableimg: 'ai_802_disable.png',
    type: '802',
    name: intl.get('ANAL.OVERALL_TREND'),
    category: 'timeSeriesAnalysis',
    pattern: /^TN$/,
    common: true,
  },
  {
    img: 'ai_803.png',
    disableimg: 'ai_803_disable.png',
    type: '803',
    name: intl.get('ANAL.PERIODIC_DETECTION'),
    category: 'timeSeriesAnalysis',
    pattern: /^TN$/,
    common: true,
  },
  {
    img: 'ai_804.png',
    disableimg: 'ai_804_disable.png',
    type: '804',
    name: intl.get('ANAL.TIMING_OUTLIERS'),
    category: 'timeSeriesAnalysis',
    pattern: /^TN$/,
    common: true,
  },
  {
    img: 'ai_805.png',
    disableimg: 'ai_805_disable.png',
    type: '805',
    name: intl.get('ANAL.PRINCIPALFACTOR'),
    category: 'timeSeriesAnalysis',
    pattern: /N|T/,
    common: true,
  },
  {
    img: 'ai_806.png',
    disableimg: 'ai_806_disable.png',
    type: '806',
    name: intl.get('ANAL.ROOTCAUSEPOSITIONING'),
    category: 'timeSeriesAnalysis',
    pattern: /N|T/,
    common: true,
  },
];

export const UNSUPPORT_THEME = ['432'];
// 不支持筛选的，切换图表隐藏筛选框
export const UNSUPPORT_SELECTOR = ['139', '146'];
export const UNSUPPORT_TIPS = ['430'];
// 不支持X轴配置
export const UNSUPPORT_XAXIS = ['110', '112'];
// 不支持Y轴配置
export const UNSUPPORT_YAXIS = ['112'];
export const SUPPORT_MULTI_COLORS = ['112', '420', '437']; // 支持同数据列多颜色
export const OPEN_MULTI_COLORS = ['420', '437']; // 默认开启同数据列多颜色
// 支持混合图表设置
export const SUPPORT_MIX_DASH = ['102', '108'];
// 其他图标设置了混合图表的设置，在某些图表中禁止渲染
export const UNSUPPORT_MIXING = ['120', '105'];

// 异常点配置--折线图
export const ANOMALY_POINT = ['114', '116', '115', '104', '113', '403'];

export const RELATION_COLOR_MAP = {
  low: '#999999',
  middle: 'rgba(93, 238, 80, 0.2)',
  high: 'rgba(23, 157, 11, 0.6)',
};
export const CARTESIAN_COORDINATE_SYSTEM = [
  '102',
  '104',
  '105',
  '108',
  '111',
  '113',
  '114',
  '115',
  '116',
  '117',
  '118',
  '119',
  '120',
  '121',
  '122',
  '123',
  '124',
  '125',
  '126',
  '127',
  '128',
  '129',
  '130',
  '145',
  '201',
  '203',
  '204',
  '402',
  '403',
  '406',
  '430',
];
export const CHART_LINE_SYSTEM = [
  '114',
  '115',
  '104',
  '113',
  '116',
  '117',
  '118',
  '119',
];
export const CHART_BAR_SYSTEM = [
  '102',
  '108',
  '112',
  '127',
  '128',
  '129',
  '130',
  '145',
  '201',
  '203',
  '204',
  '402',
];
export const CHART_AREA_SYSTEM = ['120', '121', '105', '123', '122', '124'];
export const CHART_OD = ['317', '305', '315', '307'];
// 不支持图表描述 GIS地图+3D,od地图 模型图片 三维模型
export const CHART_UNSUPPORT_DESCRIPTION = [
  ...GRAY_IN_TABLE_VIEW,
  ...CHART_OD,
  '425',
  '428',
  '436', // 组织架图
];
export const PIE_CHART = ['103', '131', '132', '133', '408'];

export const WORD_CLOUD = ['426'];

export const COMBINATION = [
  '组合一',
  '组合二',
  '组合三',
  '组合四',
  '组合五',
  '组合六',
  '组合七',
  '组合八',
  '组合九',
  '组合十',
];

export const TREND_ANALYSIS = ['114', '115', '104', '113'];
// 不支持千分位图表
export const UNSUPPORT_THOUSANDS = ['437', '420'];
// 不支持混合图表设置
export const UNSUPPORT_MIX_CHARTS = ['402', '114'];

// 取数据第一条作为数据源的图表
export const ALLOWEDFIRSTDATA_CHARTS = ['134', '423'];
