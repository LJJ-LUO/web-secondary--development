import intl from 'react-intl-universal';
import * as JUMP from './jump'; // * 跳转模块
import { FILTER_RENDER, DateModal } from './filter.js'; // * 过滤组件

// 数据填报过滤条件中不需要后续值的条件
const CONDITION_LIST = [116, 117];

export { JUMP, FILTER_RENDER, DateModal, CONDITION_LIST };

export const COMPONENT_TYPE = {
  VIDEO_LIST: 'video-list',
};

// * intl.get('CONF.VLC')
export const VIDEO_LIST = {};

VIDEO_LIST.DATA_SOURCE = {
  REPORT: 1,
  1: intl.get('CONF.DATA_FILLING'),
};

VIDEO_LIST.DATA_SOURCE_ARR = [1];

// * intl.get('APP.ANALYZER') 其他属性

export const CHART_DETAIL = {};

// * intl.get('CONF.CHART_LINKAGE')
CHART_DETAIL.CHART_LINKAGE = {
  DATA: 1,
  CHART_SWITCH: 2,
  DRILL_DOWN: 3,
  POP_UP: 4,
};

//  * intl.get('CONF.CANVAS_GROUP')
CHART_DETAIL.CUSTOM_CANVAS_GROUP = {
  ALIGNMENT: [
    { title: 'left', content: intl.get('CONF.ALIGN_LEFT') },
    { title: 'center', content: intl.get('CONF.CENTER_ALIGNMENT') },
    { title: 'right', content: intl.get('CONF.ALIGN_RIGHT') },
  ],
};

// * intl.get('CONT.CHART')-其他类型
CHART_DETAIL.CHART_OTHER = {
  UserList: '605', // * 用户列表
  CenterTextTemplate: '606', // * 中间强调文本区
  ShortTextTemplate: '607', // * 简短公文区
  WeatherTemplate: '608', // * 天气区
  TimelineList: '609', // * 有图片的时间轴列表
  RichTextPicture: '610', // * 富文本图片区
  Animation: '612', // * 箭头动画
  PendingItems: '613', // * 用户信息
  TimelineSimple: '614', // * 简单时间轴列表
  ItemList: '616', // * 事项清单区
  RealtimeEvents: '618', // * 实时事件区
  NameCard: '619', // * 名片
  DataSummarized: '620', // * 数据汇总列表区
  UserInfo: '621', // * 用户信息
  ScrollTextTemplate: '625', // * 滚动卡片
  WarningPopup: '626', // * 预警弹窗
  AlarmRecord: '627', // * 告警记录
  DeviceRecord: '628', // * 设备告警
  CardText: '629', // * 文字卡片
  CardVariable: '630', // * 文字变量
  InformationIndicators: '631', // * 带附加信息的指标
  PhotoWallOne: '634', // * 照片墙(一个)
  PhotoWall: '635', // * 照片墙
  NonfictionBar: '633', // * 带附加信息的指标
  CourierName: '636', // * 分组多选
  AssociationGroupHead: '637', // * 关联组头部
  AssociationGroupBody: '638', // * 关联组主体
  Model3D: '641', // * 3D模型
  SearchCard: '643', // * 搜索卡片
};
