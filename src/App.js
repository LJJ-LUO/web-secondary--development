import React, { Component } from "react";
import { Input, Typography, Radio, Space, DatePicker, Empty, Tooltip } from "antd";
import { ReloadOutlined, LeftOutlined, RightOutlined, SearchOutlined, ScheduleOutlined } from "@ant-design/icons";
import moment from "moment";
import { format } from "date-fns";
import "./app.less";
import * as applicationsService from "./api/asset";
const { Text } = Typography;
function getGMTTime(date) {
  const dateStr = date.split(" ");
  // const strGMT = dateStr[0] + " " + dateStr[1] + " " + " GMT+0800";//2022.6.6修改
  const strGMT = `${dateStr[0]} ${dateStr[1] } GMT+0800`;//2022.8.8修改
  // const strGMT = dateStr[0] + " " + dateStr[1] + " " + dateStr[2] + " " + dateStr[5] + " " + dateStr[3] + " GMT+0800";
  return strGMT;
}

function formatDate(date, formatStr = "yyyy/MM/dd") {
  if (date) {
    if (typeof date === "number") {
      return format(new Date(Number(date)), formatStr);
    } else {
      return format(new Date(date), formatStr);
    }
  } else {
    return "";
  }
}
const getDayList = (now) => {
  const _now = new Date(formatDate(now)).getTime();
  const arr = [];
  for (let i = 0; i < 24; i++) {
    arr.push({
      name: i,
      dateRange: [_now + i * 60 * 60 * 1000, _now + (i + 1) * 60 * 60 * 1000],
    });
  }
  return arr;
};
const weekNames = {
  0: "周日",
  1: "周一",
  2: "周二",
  3: "周三",
  4: "周四",
  5: "周五",
  6: "周六",
};
const getWeekList = (now, that) => {
  const _now = new Date(formatDate(now)).getTime();
  const arr = [];
  const dayAroundList = [];
  const _week = new Date(formatDate(now)).getDay();
  const currentWeek = _week === 0 ? 6 : _week;
  for (let i = 0; i < 7; i++) {
    const week_date = formatDate(_now + (i - currentWeek) * 24 * 60 * 60 * 1000, "MM-dd");
    const dayAroundOne = formatDate(_now + (i - currentWeek) * 24 * 60 * 60 * 1000, "yyyy年MM月dd日");
    dayAroundList.push(dayAroundOne);
    arr.push({
      name: week_date + " " + weekNames[i],
      dateRange: [_now + (i - currentWeek) * 24 * 60 * 60 * 1000, _now + (i - currentWeek + 1) * 24 * 60 * 60 * 1000],
    });
  }
  that.setState({
    dayAround: dayAroundList,
  });
  return arr;
};
const dateFormat = "YYYY-MM-DD";
const _dataFormat = "yyyy-MM-dd HH:mm:ss";
function getFilterData(data, keywords, option = { name: "name", date: "date" }) {
  const filter = (node) => {
    if (node[option.name].toLowerCase().indexOf(keywords.toLowerCase()) > -1) {
      return true;
    } else {
      return false;
    }
  };
  if (!(data && data.length)) {
    return [];
  }
  const result = [];
  data.forEach((item) => {
    const _data = item;
    if (filter(item)) {
      result.push(_data);
    }
  });
  return result;
}
const typeOptions = [
  { label: "日视图", value: "day" },
  { label: "周视图", value: "week" },
];

const getColumnsContent = (data, dateLists, type) => {
  return (
    <>
      {dateLists.map((item, i) => {
        const colors = [];
        const dateRangeStart = item.dateRange[0];
        const dateRangeEnd = item.dateRange[1];
        const dateRange = dateRangeEnd - dateRangeStart;
        const _date = data.date || [];
        _date.forEach((date) => {
          const _startTime = new Date(date.startTime).getTime();
          const _endTime = new Date(date.endTime).getTime();
          let _startPercent;
          let _endPercent;
          if (!(_startTime >= dateRangeEnd || _endTime <= dateRangeStart)) {
            const _start = _startTime - dateRangeStart;
            _startPercent = _start > 0 ? (_start / dateRange).toFixed(6) : 0;
            const _end = dateRangeEnd - _endTime;
            _endPercent = _end < 0 ? 1 : 1 - (_end / dateRange).toFixed(6);
          }
          if ((_startPercent || _startPercent === 0) && (_endPercent || _endPercent === 0)) {
            colors.push({
              _startPercent: _startPercent,
              _endPercent: _endPercent,
            });
          }
        });
        let linearGradientStr = "";
        colors
          .sort(function (a, b) {
            return a._startPercent - b._startPercent;
          })
          .forEach((item) => {
            linearGradientStr += `, transparent 0, transparent ${item._startPercent * 100}%, rgb(227, 239, 219) 0, rgb(227, 239, 219) ${
              item._endPercent * 100
            }%, transparent 0,transparent`;
          });
        const _count = type === "week" ? (colors.length > 1 ? colors.length : "") : "";
        return (
          <div className="columns" style={{ backgroundImage: `linear-gradient(90deg${linearGradientStr})` }} key={item.name + i + item.dateRange[0]}>
            {_count}
          </div>
        );
      })}
    </>
  );
};
export default class App extends Component {
  constructor(props) {
    super(props);
    const now = new Date();
    const dayList = getDayList(now);
    const { customConfig } = this.props;
    let { assetId } = customConfig || {};
    this.state = {
      type: "day",
      filterData: [],
      keywords: "",
      data: [],
      currentData: now,
      dateLists: dayList,
      dayAround: [],
      assetId: assetId,
    };
  }
  handleTypeChange = (e) => {
    const _dateLists = e.target.value === "week" ? getWeekList(new Date(this.state.currentData), this) : getDayList(new Date(this.state.currentData));
    this.setState({ type: e.target.value, dateLists: _dateLists }, () => {
      this.handleRefresh();
    });
  };
  customFormat = (value) => {
    return `${this.state.dayAround[0]}-${this.state.dayAround[this.state.dayAround.length - 1]}`;
  };
  handleRefresh = async () => {
    const { dateLists } = this.state;
    const { data: _data } = await applicationsService.getLists({
      assetId: this.state.assetId,
      startTime: formatDate(dateLists[0].dateRange[0], _dataFormat),
      endTime: formatDate(dateLists[dateLists.length - 1].dateRange[1], _dataFormat),
    });
    const newData = [];
    if (Array.isArray(_data.dataResultList)) {
      _data.dataResultList.forEach((item) => {
        const _index = newData.findIndex((v) => v.driverId === item.driverId);
        if (_index === -1) {
          const obj = {};
          obj.name = item.name;
          obj.date = [];
          obj.driverId = item.driverId;
          if (item.dateResult) {
            obj.date.push({
              assetId: this.state.assetId,
              startTime: formatDate(getGMTTime(item.dateResult.startTime), _dataFormat),
              endTime: formatDate(getGMTTime(item.dateResult.endTime), _dataFormat),
            });
          }
          newData.push(obj);
        } else {
          newData[_index].date.push({
            assetId: this.state.assetId,
            startTime: formatDate(getGMTTime(item.dateResult.startTime), _dataFormat),
            endTime: formatDate(getGMTTime(item.dateResult.endTime), _dataFormat),
          });
        }
      });
    }
    newData.push()
    console.log(newData, "====");
    this.setState({ filterData: getFilterData(newData, this.state.keywords), data: newData });
  };
  handleCurrentTime = (value) => {
    const _dateLists = this.state.type === "week" ? getWeekList(new Date(value), this) : getDayList(new Date(value));
    this.setState({ currentData: new Date(value), dateLists: _dateLists }, () => {
      this.handleRefresh();
    });
    this.handleRefresh();
  };
  handleSearch = (e) => {
    this.setState({ keywords: e.target.value });
    this.setState({ filterData: getFilterData(this.state.data, e.target.value) });
  };
  handlePrev = () => {
    const _now = new Date(this.state.currentData).getTime() - (this.state.type === "day" ? 1 : 7) * 24 * 60 * 60 * 1000;
    const _dateLists = this.state.type === "week" ? getWeekList(new Date(_now), this) : getDayList(new Date(_now));
    this.setState({ currentData: new Date(_now), dateLists: _dateLists }, () => {
      this.handleRefresh();
    });
  };
  handleNext = () => {
    const _now = new Date(this.state.currentData).getTime() + (this.state.type === "day" ? 1 : 7) * 24 * 60 * 60 * 1000;
    const _dateLists = this.state.type === "week" ? getWeekList(new Date(_now), this) : getDayList(new Date(_now));
    this.setState({ currentData: new Date(_now), dateLists: _dateLists }, () => {
      this.handleRefresh();
    });
  };
  currentNowDay = () => {
    this.setState(
      {
        currentData: new Date(),
        type: "day",
        dateLists: getDayList(new Date()),
      },
      () => {
        this.handleRefresh();
      }
    );
  };
  render() {
    const { type, currentData, keywords, dateLists, filterData } = this.state;

    return (
      <div className="container">
        <div className="tools row">
          <Text className="tools-title">仪器预约记录</Text>
          <Space className="space">
            <Radio.Group size="small" buttonStyle="solid" options={typeOptions} onChange={this.handleTypeChange} value={type} optionType="button" />
            <ReloadOutlined style={{ cursor: "pointer" }} onClick={this.handleRefresh} />
          </Space>
          <Space className="space">
            <ScheduleOutlined style={{ cursor: "pointer" }} onClick={this.currentNowDay} />
            <LeftOutlined style={{ cursor: "pointer" }} onClick={this.handlePrev} />
            <DatePicker
              size="small"
              allowClear={false}
              value={moment(currentData, dateFormat)}
              picker={type === "week" ? type : "date"}
              format={type === "week" ? this.customFormat : null}
              onChange={this.handleCurrentTime}
            />
            <RightOutlined style={{ cursor: "pointer" }} onClick={this.handleNext} />
          </Space>
        </div>
        <div className="header row">
          <div className="tools-title">
            <Input style={{ paddingLeft: 0, paddingRight: 0 }} prefix={<SearchOutlined />} value={keywords} bordered={false} placeholder="搜索仪器" onChange={this.handleSearch} />
          </div>
          <div className="table-header" style={{ gridTemplateColumns: `repeat(${dateLists.length},${100 / dateLists.length}%)` }}>
            {dateLists.length > 0 &&
              dateLists.map((item, i) => (
                <div key={i} className="columns">
                  {item.name}
                </div>
              ))}
          </div>
        </div>
        <div className="content">
          <div className="content-scroll">
            {filterData.length > 0 &&
              filterData.map((item, i) => (
                <div key={i + item.name} className="header row">
                  <div className="tools-title">
                    <Tooltip title={item.name}>
                      <Text>{item.name}</Text>
                    </Tooltip>
                  </div>
                  <div className="table-header" style={{ gridTemplateColumns: `repeat(${dateLists.length},${100 / dateLists.length}%)` }}>
                    {dateLists && getColumnsContent(item, dateLists, type)}
                  </div>
                </div>
              ))}
            {filterData.length === 0 && <Empty style={{ paddingTop: 16, paddingBottom: 16, borderBottom: "1px solid #ccc", margin: 0 }}></Empty>}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.handleRefresh();
  }
  componentDidUpdate(prevProps, prevState) {}
}
