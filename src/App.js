import React, { Component } from "react";
import * as echarts from "echarts";
import "./app.less";
import toopImg from "../src/assets/tooipBg2.png";

export default class App extends Component {
  constructor(props) {
    super(props);

    let external = props.options?.externalVariables ? props.options.externalVariables : {};
    // 系列颜色
    this.barBackgroundColor = external["背景颜色"] || "";
    this.barColorArr = external["系列颜色数组"] || "#3FF2FD-#F39924-#27A6FE";
    this.barGraduallyColorArr = external["对应渐变颜色数组"] || "#F60C0D-#2EBC27-#0413FF";
    // 图例配置
    this.legendIconWidth = external["图例图标宽度"] || "18";
    this.legendIconHeight = external["图例图标高度"] || "3";
    this.legendColor = external["图例文字颜色"] || "#fff";
    this.legendFontSize = external["图例文字字号"] || "14";
    this.legendGap = external["图例间距"] || "20";
    this.legendPosition = external["图例整体位置"] || "5";
    // X轴配置
    this.xAxisLineColor = external["X轴线颜色"] || "#fff";
    this.xAxisLabelColor = external["X轴文字颜色"] || "#fff";
    this.xAxisLabelFontSize = external["X轴文字字号"] || "14";
    // Y轴配置
    this.yAxisLineColor = external["Y轴线颜色"] || "#fff";
    this.yAxisSplitLineColor = external["Y轴分割线颜色"] || "#fff";
    this.yAxisLabelColor = external["Y轴文字颜色"] || "#fff";
    this.yAxisLabelFontSize = external["Y轴文字字号"] || "14";
    // 柱形数据配置
    this.barDataWdith = external["柱形数据宽度"] || "30";
    this.barDataTilt = external["柱形数据倾斜角度"] || "20";
    this.barDataSpacing = external["柱形数据间距"] || "25";
    this.barDataLeftPosition = external["柱形数据向左偏移系数"] || "1";
    // 悬浮窗配置
    this.tooltipHeight = external["悬浮窗高度"] || "90";
    this.tooltipWidth = external["悬浮窗宽度"] || "160";
  }

  componentDidMount() {
    if (process.env.NODE_ENV !== "development") {
      this.refs["jsgk_barYs"].parentNode.style.width = "100%";
      this.refs["jsgk_barYs"].parentNode.style.height = "100%";
      this.refs["jsgk_barYs"].parentNode.parentNode.style.overflow = "visible";
      this.refs["jsgk_barYs"].parentNode.parentNode.parentNode.parentNode.style.overflow = "visible";
      this.refs["jsgk_barYs"].parentNode.parentNode.parentNode.parentNode.parentNode.style.overflow = "visible";
      this.refs["jsgk_barYs"].parentNode.parentNode.style.minHeight = 0;
    }

    this.handleEchartsData();

    this.Event_Center_getName = () => {
      return "插件名称";
    };
  }

  handleEchartsData() {
    let propsData = JSON.parse(JSON.stringify(this.props.dataSource));

    let spacing = Number(this.barDataSpacing);
    let leftPosition = Number(this.barDataLeftPosition);

    // X轴数据
    let xAxisData = [];
    // 图例数据
    let legendData = [];
    // 首次处理数据
    let dataList = [];
    // 二次处理数据
    let seriesData = [];

    propsData.forEach((item, index) => {
      if (index > 0) {
        xAxisData.push(item[0]);
        if (xAxisData.length < 1) {
          legendData.push(item[1]);
          dataList.push({
            name: item[1],
            data: [item[2]],
          });
        } else {
          if (legendData.includes(item[1])) {
            dataList.forEach((e, i) => {
              if (item[1] === e.name) {
                e.data.push(item[2]);
              }
            });
          } else {
            legendData.push(item[1]);
            dataList.push({
              name: item[1],
              data: [item[2]],
            });
          }
        }
      }
    });

    xAxisData = [...new Set(xAxisData)];

    dataList.forEach((item, index) => {
      let dataObj = {
        type: "custom",
        name: item.name,
        animation: true,
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)]);
          const xlocation = api.coord([api.value(0), 0]);
          return {
            type: "InclinedRoofBar",
            shape: {
              api,
              xValue: api.value(0),
              yValue: api.value(1),
              x: location[0] + spacing * index * 2 - spacing * leftPosition,
              y: location[1],
              xAxisPoint: [xlocation[0] + spacing * index * 2 - spacing * leftPosition, xlocation[1]],
            },
            style: {
              fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0.2,
                  color: this.barColorArr.split("-")[index] || "#3FF2FD",
                },
                {
                  offset: 1,
                  color: this.barGraduallyColorArr.split("-")[index] || "rgba(0,0,0,0)",
                },
              ]),
            },
          };
        },
        data: item.data,
      };
      seriesData.push(dataObj);
    });

    this.initEcharts(xAxisData, legendData, seriesData);
  }

  initEcharts(xAxisData, legendData, seriesData) {
    let myChart = echarts.init(this.refs["jsgk_barYs"]);
    let option = {};

    let barWidth = Number(this.barDataWdith);
    let barTilt = Number(this.barDataTilt);

    // 绘制柱状图左侧面
    const InclinedRoofBar = echarts.graphic.extendShape({
      shape: { x: 0, y: 0 },
      buildPath: function (ctx, shape) {
        const xAxisPoint = shape.xAxisPoint;
        const c0 = [shape.x, shape.y];
        const c1 = [shape.x - barWidth, shape.y - barTilt];
        const c2 = [xAxisPoint[0] - barWidth, xAxisPoint[1]];
        const c3 = [xAxisPoint[0], xAxisPoint[1]];
        ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath();
      },
    });
    echarts.graphic.registerShape("InclinedRoofBar", InclinedRoofBar);

    option = {
      backgroundColor: this.barBackgroundColor,
      // 颜色数组
      color: this.barColorArr.split("-"),
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
        backgroundColor: "transparent",
        borderWidth: 0,
        formatter: (params) => {
          let list = [];
          let listItem = "";
          for (var i = 0; i < params.length; i++) {
            list.push(
              `<div style="font-size: 14px; color: #fff; padding-left: 15px; padding-top: 2px;">
                <div style="display: flex; align-items: center;">
                  <div style="width: 18px; border: 1px solid ${params[i].color}; margin-right: 10px;">
                  </div>${params[i].seriesName}: ${params[i].value}</div>
                </div>
              `
            );
          }
          listItem = list.join("");
          return (
            `
              <div style="background: url(${toopImg}) no-repeat; background-size: cover; background-attachment: fixed; height: ${Number(this.tooltipHeight)}px; width: ${Number(this.tooltipWidth)}px;">
              <div style="font-size: 14px; color: #B0C4DD; padding-left: 15px; padding-top: 12px;">${params[0].name}</div>
            ` +
            listItem +
            `</div>`
          );
        },
      },
      // 柱状图整体大小
      grid: {
        left: "5%",
        right: "5%",
        bottom: "5%",
        top: "13%",
        containLabel: true,
      },
      // 图例配置
      legend: {
        top: `${this.legendPosition}%`,
        itemWidth: Number(this.legendIconWidth),
        itemHeight: Number(this.legendIconHeight),
        left: "right",
        padding: [0, 75, 0, 0],
        itemGap: Number(this.legendGap),
        textStyle: {
          color: this.legendColor,
          fontSize: this.legendFontSize,
        },
        data: legendData,
      },
      // X轴配置
      xAxis: {
        type: "category",
        // X轴线
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: this.xAxisLineColor,
          },
        },
        // X轴文字
        axisLabel: {
          show: true,
          textStyle: {
            color: this.xAxisLabelColor,
            fontSize: this.xAxisLabelFontSize,
          },
        },
        // 是否显示刻度
        axisTick: {
          show: false,
        },
        // X轴数据
        data: xAxisData,
      },
      // y轴配置
      yAxis: {
        type: "value",

        axisTick: {
          show: false,
        },

        axisLabel: {
          formatter: function (params) {
            let str = String(params);
            if (str.length === 9) {
              return `${params / 100000000}亿`;
            } else if (str.length === 8) {
              return `${params / 1000000}00万`;
            } else if (str.length === 7) {
              return `${params / 100000}0万`;
            } else if (str.length === 6) {
              return `${params / 10000}万`;
            } else if (str.length === 5) {
              return `${params / 10000}万`;
            }
            return params;
          },
          textStyle: {
            color: this.yAxisLabelColor,
            fontSize: this.yAxisLabelFontSize,
          },
        },

        axisLine: {
          show: true,
          lineStyle: {
            color: this.yAxisLineColor,
          },
        },

        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            width: 1,
            color: this.yAxisSplitLineColor,
          },
        },
      },
      // 数据
      series: seriesData,
    };

    option && myChart.setOption(option);

    function debounce(func, ms = 1000) {
      let timer;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, ms);
      };
    }
    const task = () => {
      myChart.resize();
    };
    const debounceTask = debounce(task, 300);
    window.addEventListener("resize", debounceTask);
  }

  render() {
    return <div ref="jsgk_barYs" style={{ width: "100%", height: "100%" }}></div>;
  }
}
