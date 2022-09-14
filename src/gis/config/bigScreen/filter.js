import intl from 'react-intl-universal';
// * intl.get('CONF.FILTER_ASSEMBLY')
export const FILTER_RENDER = {};

FILTER_RENDER.DISPLAY_TYPE = {
  SELECT: 1,
  MENU: 2,
  BUTTON: 3,
  TIME: 4,
  TIME_SLIDER: 5,
  VAGUESELECT: 6,
  RADIO: 7,
};
FILTER_RENDER.DISPLAY_CONTENT = {
  SELECT: intl.get('CONF.DDB'),
  MENU: intl.get('CONF.TAB'),
  BUTTON: intl.get('CONF.BUTTON'),
  TIME: intl.get('CONF.TIME_SELECTION'),
  TIME_SLIDER: intl.get('CONF.TSS'),
  VAGUESELECT: intl.get('CONF.FUZZY_SEARCH'),
  RADIO: intl.get('CONF.RADIO '),
};

// * intl.get('CONF.TTTRTA')
FILTER_RENDER.DISPLAY_TYPE_OPTION = Object.keys(FILTER_RENDER.DISPLAY_TYPE).map(
  item => {
    return {
      type: FILTER_RENDER.DISPLAY_TYPE[item],
      content: FILTER_RENDER.DISPLAY_CONTENT[item],
    };
  }
);

FILTER_RENDER.DISPLAY_AS_BUTTON_TYPE = {
  FIXED_VALUE: 0,
  USER_INPUT: 1,
};
FILTER_RENDER.DISPLAY_AS_TIME_THEME = {
  DEFAULT: 0,
  SIMPLE: 1,
};

/**
 * * intl.get('CONF.CONSTANT_CONFIGURATION')
 * * DateModal {intl.get('CONF.FILTER_ASSEMBLY')} 固定值 模态框
 *   */
export const DateModal = {
  8: intl.get('CONF.BEFORE'), // moment(+'1597570634000').subtract(50, 'y')  moment(+'1597570634000')
  9: intl.get('CONF.AFTER'), // moment(+'1597570634000')   moment(+'1597570634000').add(50, 'y')
  13: intl.get('CONF.RANGE'), // moment(+'1597570634000') moment(+'1597570634000')
  15: intl.get('CONF.TODAY'), // moment().startOf('d')   moment().endOf('d')
  16: intl.get('CONF.YESTERDAY'), // moment().startOf('d').subtract(1, 'd')  moment().endOf('d').subtract(1, 'd')
  17: intl.get('CONF.LAST_WEEK'), // moment().startOf('d').subtract(1, 'w')  moment().endOf('s')
  18: intl.get('CONF.LTW'), // moment().startOf('d').subtract(2, 'w')  moment().endOf('s')
  19: intl.get('CONF.LAST_MONTH'), // moment().startOf('d').subtract(1, 'M')  moment().endOf('s')
  20: intl.get('CONF.LTM'), // moment().startOf('d').subtract(3, 'M')  moment().endOf('s')
  21: intl.get('CONF.LAST_YEAR'), // moment().startOf('d').subtract(1, 'y')  moment().endOf('s')
  22: intl.get('CONF.TOMORROW'), // moment().startOf('d').add(1, 'd')  moment().endOf('d').add(1, 'd')
  23: intl.get('CONF.NEXT_WEEK'), // moment().startOf('week').add(1, 'w')  moment().endOf('week').add(1, 'w')
  24: intl.get('CONF.THIS_WEEK'), // moment().startOf('week') moment().endOf('week')
  25: intl.get('CONF.PREVIOUS_WEEK'), // moment().startOf('week').subtract(1, 'w')  moment().endOf('week').subtract(1, 'w')
  26: intl.get('CONF.NEXT_MONTH'), // moment().startOf('M').add(1, 'M')  moment().endOf('M').add(1, 'M')
  27: intl.get('CONF.THIS_MONTH'), // moment().startOf('M')  moment().endOf('M')
  28: intl.get('CONF.PREVIOUS_MONTH'), // moment().startOf('M').subtract(1, 'M')  moment().endOf('M').subtract(1, 'M')
  29: intl.get('CONF.NEXT_YEAR'), // moment().startOf('Y').subtract(1, 'Y')  moment().endOf('Y').subtract(1, 'Y')
  30: intl.get('CONF.THIS_YEAR'), // moment().startOf('Y')  moment().endOf('Y')
  31: intl.get('CONF.PREVIOUS_YEAR'), // moment().startOf('Y').add(1, 'Y')  moment().endOf('Y').add(1, 'Y')
  32: intl.get('CONF.NEXT_QUARTER'), // moment().startOf('Q').add(1, 'Q')  moment().endOf('Q').add(1, 'Q')
  33: intl.get('CONF.THIS_QUARTER'), // moment().startOf('Q')  moment().endOf('Q')
  34: intl.get('CONF.PREVIOUS_QUARTER'), // moment().startOf('Q').subtract(1, 'Q')  moment().endOf('Q').subtract(1, 'Q')
  39: intl.get('CONF.NEAR'),
  40: intl.get('CONF.TDA'),
  41: intl.get('CONF.NTD'),
  BEFORE: 8,
  AFTER: 9,
  Range: 13,
  TODAY: 15,
  YESTERDAY: 16,
  RECENT_WEEK: 17,
  LAST_TWO_WEEKS: 18,
  RECENT_MONTH: 19,
  LAST_THREE_MONTHS: 20,
  RECENT_YEAR: 21,
  TOMORROW: 22,
  NEXT_WEEK: 23,
  THIS_WEEK: 24,
  PREVIOUS_WEEK: 25,
  NEXT_MONTH: 26,
  THIS_MONTH: 27,
  PREVIOUS_MONTH: 28,
  NEXT_YEAR: 29,
  THIS_YEAR: 30,
  PREVIOUS_YEAR: 31,
  NEXT_QUARTERLY: 32,
  THIS_QUARTERLY: 33,
  PREVIOUS_QUARTERLY: 34,
  RECENT: 39,
  RECENT_TWO_DAY: 40,
  RECENT_THREE_DAY: 41,
};

DateModal.RECENT_UNIT = {
  [intl.get('ASS.MINUTE')]: 0,
  [intl.get('ATTE.HOUR')]: 1,
  [intl.get('APP.DAY')]: 2,
  [intl.get('ANAL.MONTH')]: 3,
  MINUTE: 0,
  HOUR: 1,
  DAY: 2,
  MONTH: 3,
};
