import intl from 'react-intl-universal';
/**
 * intl.get('COMM.ACLCD')
 */
// const COMMON_EVENTS = [
//   {
//     key: 'change',
//     name: intl.get('COMM.CONTENT_CHANGE'),
//     payload: [
//       {
//         name: intl.get('REPO.CONTENT'),
//         dataType: 'string',
//         key: 'value',
//       },
//     ],
//   },
// ];

const COMMON_ACTIONS = [
  {
    key: 'hideComponent',
    name: intl.get('PROC.COMPONENT_HIDING'),
    hasReturn: false,
  },
  {
    key: 'showComponent',
    name: intl.get('PROC.COMPONENT_DISPLAY'),
    hasReturn: false,
  },
  {
    key: 'toggleComponent',
    name: intl.get('COMM.CEI'),
    hasReturn: false,
  },
];

// intl.get('COMM.FILTER')
const CHART_FILTER = {
  key: 'filter',
  name: intl.get('COMM.COMPONENT_FILTERING'),
  type: 'customAction',
  params: [],
};

export const ANALYSE_EVENTS = {
  common: {
    events: [],
    actions: COMMON_ACTIONS,
  },
  '101': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('REPO.CONTENT'),
            dataType: 'string',
            key: 'value',
          },
        ],
      },
      {
        key: 'rowClick',
        name: intl.get('REPO.LINE_CLICK'),
        payload: [
          {
            name: intl.get('REPO.ROWCONTENT'),
            dataType: 'object',
            key: 'rowValue',
          },
        ],
      },
    ],
    actions: [...COMMON_ACTIONS, CHART_FILTER],
  },
  // intl.get('COMM.FOUNDATION_HISTOGRAM')
  '102': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMP.FSL')
  '114': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMP.GROUPING_LINE')
  '116': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMP.VERTICAL_LINE')
  '115': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMP.FOUNDATION_CURVE')
  '104': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMP.VERTICAL_CURVE')
  '113': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMP.VGC')
  '119': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMP.GROUPING_CURVE')
  '118': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMP.VGL')
  '117': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMP.FOUNDATION_STRIP')
  '108': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMM.GROUPED_COLUMNAR')
  '127': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMM.GROUPED_BAR')
  '128': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMM.GSC')
  '201': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMM.GSB')
  '130': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMM.STACKED_BAR')
  '145': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('ANAL.DIMENSION'),
            dataType: 'string',
            key: 'name',
          },
          {
            name: intl.get('ANAL.NUMERICAL_VALUE'),
            dataType: 'number',
            key: 'value',
          },
        ],
      },
    ],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMM.BPC')
  '103': {
    events: [],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMM.SECTOR_DIAGRAM')
  '132': {
    events: [],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  // intl.get('COMM.PROGRESS_LOOP')
  '408': {
    events: [],
    actions: [CHART_FILTER, ...COMMON_ACTIONS],
  },
  '711': {
    events: [
      {
        key: 'click',
        name: intl.get('APP.CLICK'),
        payload: [
          {
            name: intl.get('SRC.PLACE_NAME'),
            dataType: 'string',
            key: 'pos',
          },
          {
            name: intl.get('ANAL.LONGITUDE'),
            dataType: 'number',
            key: 'lng',
          },
          {
            name: intl.get('ANAL.LATITUDE'),
            dataType: 'number',
            key: 'lat',
          },
        ],
      },
    ],
    actions: [
      ...COMMON_ACTIONS,
      {
        key: 'filterMap',
        name: intl.get('COMM.MAP_FILTERING'),
        type: 'customAction',
        params: [],
      },
    ],
  },
};
