// 组件可派发事件
export const events = [
  {
    key: "mettingReserve",
    name: "预定会议",
    type: "IEvent",
    payload: [
      {
        name: "开始时间(小时)",
        key: "startHour",
        dataType: "datetime",
      },
      {
        name: "开始时间(分钟)",
        key: "startMinute",
        dataType: "string",
      },
      {
        name: "结束时间(小时)",
        key: "endHour",
        dataType: "datetime",
      },
      {
        name: "结束时间(分钟)",
        key: "endMinute",
        dataType: "string",
      },
      {
        name: "会议室ID",
        key: "mettingID",
        dataType: "string",
      },
    ],
  },
];

// 组件可接收事件
export const actions = [
  {
    key: "process",
    name: "逻辑控制",
    type: "IEvent",
    params: [],
  },
];

export default {
  actions,
  events,
};
