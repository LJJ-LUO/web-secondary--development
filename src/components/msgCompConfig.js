// 组件可派发事件
export const events = [

];

// 组件可接收事件
export const actions = [
  {
    key: "setValue",
    name: "设值",
    isSupportChild: true, // 是否支持子表
    params: [
      {
        key: "value",
        name: "值",
        dataType: "Array",
      },
    ],
  },

];

export default {
  actions,
  events,
};
