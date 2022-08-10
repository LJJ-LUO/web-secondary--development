// 组件可派发事件
export const events = [
  {
    key: "valueChange",
    name: "值改变",
    payload: [
      {
        name: "值",
        key: "value",
        dataType: "string",
      },
    ],
  },
];

// 组件可接收事件
export const actions = [


];

export default {
  actions,
  events,
};
