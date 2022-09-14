import intl from 'react-intl-universal';
/**
 * * intl.get('CONF.JMT')
 *
 *   */

export const JUMP_TYPE_ARR = [
  {
    value: 0,
    label: intl.get('APP.CURRENT_PAGE'),
  },
  {
    value: 1,
    label: intl.get('CONF.NEW_PAGE'),
  },
  {
    value: 2,
    label: intl.get('CONF.OIC'),
  },
  // {
  //   value: 3,
  //   label: intl.get('CONF.UTC'),
  // },
  {
    value: 4,
    label: intl.get('CONF.POIC'),
  },
  {
    value: 5,
    label: intl.get('CONF.APP_TAB'),
  },
];

export const JUMP_TYPE = {
  CURRENT: 0,
  NEW: 1,
  CONTAINER: 2,
  UPDATE: 3,
  MODAL: 4,
  APP_TAB: 5,
};

/**
 * * intl.get('CONF.SMOJM')
 * * 1. data_id
 *   */
export const JUMP_TYPE_UPDATE_WAY_ARR = [
  {
    value: 'data_id',
    label: 'data_id',
  },
];

export const JUMP_TYPE_UPDATE_WAY_DATA_ID = 'data_id';

export const JUMP_COMPONENT_TYPE = [
  {
    value: 'link',
    label: intl.get('APP.BUTTON'),
  },
  {
    value: 'select',
    label: intl.get('COMM.DDB'),
  },
];
