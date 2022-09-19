// 组件可派发事件
export const events = [];

// 组件可接收事件
export const actions = [
  {
    key: "filterData",
    name: "过滤数据",
    isSupportChild: false,
    params: [
      {
        key: "list",
        name: "过滤条件",
        dataType: "objectArray",
      },
    ],
  },
];

export default {
  actions,
  events,
};
