// 组件可派发事件
export const events = [];

// 组件可接收事件
export const actions = [
  {
    key: "getMettingInfo",
    name: "会议信息",
    isSupportChild: false,
    params: [
      {
        key: "mettingInfo",
        name: "会议信息",
        dataType: "object",
      },
    ],
  },
];

export default {
  actions,
  events,
};
