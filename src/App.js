import React, { Component } from "react";
import * as echarts from "echarts";
import "./app.less";
import toopImg from "../src/assets/tooipBg1.png";

export default class App extends Component {
  constructor(props) {
    super(props);

    let external = props.options?.externalVariables ? props.options.externalVariables : {};

    // 颜色配置
    this.barBackgroundColor = external["背景颜色"] || "";
    this.barColorArr = external["柱状颜色渐变"] || "rgba(0,0,0,0)-#3FF1FC";
    // 图例配置
    this.legendIConColor = external["图例图标颜色"] || "#3FF1FC";
    this.legendIconWidth = external["图例图标宽度"] || "18";
    this.legendIConHeight = external["图例图标高度"] || "3";
    this.legendLabelColor = external["图例文字颜色"] || "#fff";
    this.legendLabelFontSize = external["图例文字字号"] || "14";
    this.legendPosition = external["图例整体位置"] || "5";
    // X轴配置
    this.xAxisSplitLineColor = external["X轴分割线颜色"] || "#244364";
    this.xAxisLabelColor = external["X轴文字颜色"] || "#fff";
    this.xAxisLabelFontSize = external["X轴文字字号"] || "14";
    // Y轴配置
    this.yAxisLeftLineColor = external["Y轴线颜色"] || "#244364";
    this.yAxisLeftLineWidth = external["Y轴线宽度"] || "1";
    this.yAxisLabelColor = external["Y轴文字颜色"] || "#fff";
    this.yAxisLabelFontSize = external["Y轴文字字号"] || "14";
    // 柱状数据配置
    this.seriesDataWidth = external["数据柱宽度"] || "22";
    this.seriesBackgroundWidth = external["数据柱背景宽度"] || "22";
    this.seriesBackgroundColor = external["数据柱背景颜色"] || "#24364B";
    this.seriesDataEndBlockWidth = external["数据柱末尾块宽度"] || "3";
    this.seriesDataEndBlockHeight = external["数据柱末尾块高度"] || "30";
    this.seriesDataEndBlockColor = external["数据柱末尾块颜色"] || "#3FF1FC";
  }

  componentDidMount() {
    if (process.env.NODE_ENV !== "development") {
      this.refs["jsgk_barX"].parentNode.style.width = "100%";
      this.refs["jsgk_barX"].parentNode.style.height = "100%";
      this.refs["jsgk_barX"].parentNode.parentNode.style.overflow = "visible";
      this.refs["jsgk_barX"].parentNode.parentNode.parentNode.parentNode.style.overflow = "visible";
      this.refs["jsgk_barX"].parentNode.parentNode.parentNode.parentNode.parentNode.style.overflow = "visible";
      this.refs["jsgk_barX"].parentNode.parentNode.style.minHeight = 0;
    }

    this.handleEchartsData();

    this.Event_Center_getName = () => {
      return "插件名称";
    };
  }

  handleEchartsData() {
    let propsData = JSON.parse(JSON.stringify(this.props.dataSource));

    let yAxisData = [];
    let dataList = [];
    let seriesData = [];

    propsData[0].forEach((item, index) => {
      if (index > 0) {
        dataList[index - 1] = {
          name: "",
          data: [],
          endBlockWidthDatt: [],
        };
        propsData.forEach((e, i) => {
          if (i > 0) {
            yAxisData.push(e[0]);
            dataList[index - 1].name = item;
            dataList[index - 1].data.push(e[index]);
            dataList[index - 1].endBlockWidthDatt.push(Number(this.seriesDataEndBlockWidth));
          }
        });
      }
    });

    let bgData = [];
    for (var i = 0; i < dataList[0].data.length; i++) {
      bgData.push(this.ceilNumber(this.max(dataList[0].data)));
    }

    dataList.forEach((item, index) => {
      item.data.reverse();
      seriesData = [
        // 背景柱状
        {
          type: "bar",
          barWidth: Number(this.seriesBackgroundWidth),
          barGap: "0",
          z: -1,
          itemStyle: {
            color: this.seriesBackgroundColor,
          },
          data: bgData,
        },
        // 隐形块
        {
          show: false,
          name: item.name,
          type: "bar",
          barWidth: this.seriesDataEndBlockHeight,
          stack: "2",
          z: -2,
          barGap: "0",
          yAxisIndex: 1,
          itemStyle: {
            color: "transparent",
          },
          data: item.data,
        },
        // 数据块
        {
          name: item.name,
          type: "bar",
          z: 1,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: this.barColorArr.split("-")[0],
              },
              {
                offset: 1,
                color: this.barColorArr.split("-")[1],
              },
            ]),
          },
          barGap: "0",
          yAxisIndex: 3,
          barWidth: this.seriesDataWidth,
          data: item.data,
        },
        // 末尾块
        {
          name: item.name,
          type: "bar",
          stack: "2",
          z: 1,
          yAxisIndex: 1,
          itemStyle: {
            color: this.seriesDataEndBlockColor,
            borderColor: this.seriesDataEndBlockColor,
          },
          data: item.endBlockWidthDatt,
        },
      ];
    });

    this.initEcharts(yAxisData, seriesData, bgData);
  }

  ceilNumber(number) {
    let bite = 0;
    if (number < 10) {
      return 10;
    }
    while (number >= 10) {
      number /= 10;
      bite += 1;
    }
    return Math.ceil(number) * Math.pow(10, bite);
  }

  max(datas) {
    var max = datas[0];
    for (var i = 0; i < datas.length; i++) {
      if (max < datas[i]) {
        max = datas[i];
      }
    }
    return Number(max);
  }

  initEcharts(yAxisData, seriesData, bgData) {
    let myChart = echarts.init(this.refs["jsgk_barX"]);
    let option = {};

    option = {
      backgroundColor: this.barBackgroundColor,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
        backgroundColor: "transparent",
        borderWidth: 0,
        formatter: (params) => {
          return `<div style="background: url(${toopImg}) no-repeat; background-size: 100%; background-attachment: fixed; height: 90px; width: 160px;">
            <div style="font-size: 15px; color: #B0C4DD; padding-left: 15px; padding-top: 12px;">${params[0].name}</div>
            <div style="display: flex; align-items: center; margin-top: 8px;">
              <div style="width: 10px; height: 10px; margin: -2px 10px 0 15px; background: ${params[2].color}; border-radius: 50%;"></div>
              <div style="color: #fff;">${params[1].value}</div>
            </div>
          </div>`;
        },
      },
      // 图例配置
      legend: {
        top: "2%",
        right: `${this.legendPosition}%`,
        itemWidth: Number(this.legendIconWidth),
        itemHeight: Number(this.legendIConHeight),
        itemStyle: {
          color: this.legendIConColor,
        },
        textStyle: {
          color: this.legendLabelColor,
          fontSize: this.legendLabelFontSize,
        },
      },
      // 整体大小
      grid: {
        left: "5%",
        right: "5%",
        bottom: "5%",
        top: "13%",
        containLabel: true,
      },
      // X轴配置
      xAxis: {
        max: Number(bgData[0]),
        splitLine: {
          show: true,
          lineStyle: {
            color: this.xAxisSplitLineColor,
            type: "dashed",
          },
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
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
            color: this.xAxisLabelColor,
            fontSize: this.xAxisLabelFontSize,
          },
        },
        axisTick: {
          show: false,
        },
      },
      // Y轴配置
      yAxis: [
        {
          inverse: true,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: this.yAxisLeftLineWidth,
              color: this.yAxisLeftLineColor,
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: this.yAxisLabelColor,
              fontSize: this.yAxisLabelFontSize,
            },
          },
          data: yAxisData,
        },
        {
          type: "category",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        {
          type: "category",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        {
          type: "category",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
      ],
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
    return <div ref="jsgk_barX" style={{ width: "100%", height: "100%" }}></div>;
  }
}
