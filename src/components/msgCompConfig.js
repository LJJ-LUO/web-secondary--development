// 组件可派发事件
export const events = [
  {
    key: "change",
    name: "内容改变",
    payload: [
      {
        name: "内容",
        key: "value",
        dataType: "objectArrary",
      },
    ],
  },
];

// 组件可接收事件
export const actions = [
  {
    key: "dataFilter",
    name: "过滤数据",
    params: [
      {
        key: "value",
        name: "过滤条件",
        dataType: "object",
      },
    ],
  },
];

export default {
  actions,
  events,
};
