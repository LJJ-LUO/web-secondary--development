/**
 * 事件交互事件动作定义
 * IEvent表示该事件或动作为事件交互专属
 */
import intl from 'react-intl-universal';

// 事件映射
export const EVENTS_MAP = {
  seriesclick: 'click',
  doubleclick: 'dbclick',
  mouseenter: 'mouseover',
  mouseleave: 'mouseout',
  oncontextmenu: 'contextmenu',
};

// 公共事件
const COMMON_EVENTS = [
  {
    key: 'click',
    name: intl.get('SRC.SERIES_CLICK'),
    type: 'IEvent',
    payload: [],
  },
  {
    key: 'mouseover',
    name: intl.get('EVEN.MOUSEUP'),
    type: 'IEvent',
    payload: [],
  },
  {
    key: 'mouseout',
    name: intl.get('EVEN.MOUSEDOWN'),
    type: 'IEvent',
    payload: [],
  },
  {
    key: 'legendClick',
    name: intl.get('SRC.LEGEND_CLICK'),
    type: 'IEvent',
    payload: [],
  },
];

// 公共动作
const COMMON_ACTIONS = [
  {
    key: 'show',
    type: 'IEvent',
    name: intl.get('SRC.DISPLAY'),
  },
  {
    key: 'hide',
    type: 'IEvent',
    name: intl.get('SRC.HIDE'),
  },
  {
    key: 'toggleVisibility',
    type: 'IEvent',
    name: intl.get('EVEN.SHOWHIDE'),
  },
  {
    key: 'enable',
    type: 'IEvent',
    name: intl.get('EVEN.ENABLE'),
  },
  {
    key: 'disable',
    type: 'IEvent',
    name: intl.get('EVEN.DISENABLE'),
  },
  {
    key: 'toggleStatus',
    type: 'IEvent',
    name: intl.get('EVEN.TOGGLE_STATUS'),
  },
];

export const ANALYSE_EVENTS_DESIGN_STATE = {
  common: {
    events: COMMON_EVENTS,
    actions: COMMON_ACTIONS,
  },
  '109': {
    events: [
      {
        key: 'mouseover',
        type: 'IEvent',
        name: intl.get('EVEN.MOUSEUP'),
        payload: [],
      },
      {
        key: 'mouseout',
        type: 'IEvent',
        name: intl.get('EVEN.MOUSEDOWN'),
        payload: [],
      },
    ],
    actions: COMMON_ACTIONS,
  },
  '134': {
    events: [
      {
        key: 'mouseover',
        type: 'IEvent',
        name: intl.get('EVEN.MOUSEUP'),
        payload: [],
      },
      {
        key: 'mouseout',
        type: 'IEvent',
        name: intl.get('EVEN.MOUSEDOWN'),
        payload: [],
      },
    ],
    actions: COMMON_ACTIONS,
  },
};
