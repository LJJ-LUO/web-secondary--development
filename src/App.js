import React, { Component } from "react";
import * as echarts from "echarts";
import "./app.less";

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
    this.yAxisLineMax = external["Y轴线最大值"] || "800";
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
    this.refs["jsgk_barX"].parentNode.style.width = "100%";
    this.refs["jsgk_barX"].parentNode.style.height = "100%";
    this.refs["jsgk_barX"].parentNode.parentNode.style.minHeight = 0;

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
          maxData: [],
          endBlockWidthDatt: [],
        };
        propsData.forEach((e, i) => {
          if (i > 0) {
            yAxisData.push(e[0]);
            dataList[index - 1].name = item;
            dataList[index - 1].data.push(e[index]);
            dataList[index - 1].maxData.push(Number(this.yAxisLineMax));
            dataList[index - 1].endBlockWidthDatt.push(Number(this.seriesDataEndBlockWidth));
          }
        });
      }
    });

    dataList.forEach((item, index) => {
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
          data: item.maxData,
        },
        // 隐形块
        {
          name: item.name,
          type: "bar",
          barWidth: this.seriesDataEndBlockHeight,
          stack: "2",
          z: -2,
          barGap: "0",
          yAxisIndex: 1,
          itemStyle: {
            color: this.barBackgroundColor,
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

    this.initEcharts(yAxisData, seriesData);
  }

  initEcharts(yAxisData, seriesData) {
    let myChart = echarts.init(this.refs["jsgk_barX"]);
    let option = {};

    option = {
      backgroundColor: this.barBackgroundColor,
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
