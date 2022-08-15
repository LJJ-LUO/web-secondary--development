import React, { Component } from "react";
import * as echarts from "echarts";
import "./app.less";

const events = [];

const actions = [];

export default class App extends Component {
  constructor(props) {
    super(props);

    let external = props.options?.externalVariables
      ? props.options.externalVariables
      : {};

    // 图例
    this.legendColor = external["图例文字颜色"] || "#111";
    this.legendFontSize = external["图例文字字号"] || "14";
    this.legendFontFamily = external["图例文字字体"] || "";

    // X轴配置
    this.axisXColor = external["X轴文字颜色"] || "#111";
    this.axisXFontSize = external["X轴文字字号"] || "16";
    this.axisXFontFamily = external["X轴文字字体"] || "";

    // 柱状图配置
    this.seriesBarColor = external["柱状图系列颜色"]
      ? external["柱状图系列颜色"].split(",")
      : ["#15F6EE", "#32BBFF"];
    this.axisYBarTitle = external["柱状图左侧Y轴标题"] || "水量  (万m²)";
    this.axisYBarTitleColor = external["柱状图Y轴标题颜色"] || "#111";
    this.axisYBarTitleFontSize = external["柱状图Y轴标题字号"] || "16";
    this.axisYBarTitleFontFamily = external["柱状图Y轴标题字体"] || "";
    this.seriesBarSpacing = external["柱状图数据列间距"] || "60";
    this.seriesBarData = external["柱状图使用数据"] || "1,2";

    // 折线图配置
    this.seriesLineColor = external["折线图系列颜色"]
      ? external["折线图系列颜色"].split(",")
      : ["#F7CFAB", "#9888CC"];
    this.axisYLineTitle = external["折线图右侧Y轴标题"] || "百分比  (%)";
    this.axisYLineTitleColor = external["折线图Y轴标题颜色"] || "#111";
    this.axisYLineTitleFontSize = external["折线图Y轴标题字号"] || "16";
    this.axisYLineTitleFontFamily = external["折线图Y轴标题字体"] || "";
    this.seriesLineSize = external["折线图拐点大小"] || "6";
    this.seriesLineBorderColor = external["折线图拐点边框颜色"] || "#111";
    this.seriesLineBorderWidth = external["折线图拐点边框宽度"] || "1";
    this.seriesLineData = external["折线图使用数据"] || "3,4";
  }

  componentDidMount() {
    this.refs["wpgt_lineBar"].parentNode.style.width = "100%";
    this.refs["wpgt_lineBar"].parentNode.style.height = "100%";

    const { componentId } = this.props;

    window?.componentCenter?.register(componentId, "comp", this, {
      events,
      actions,
    });

    this.Event_Center_getName = () => {
      return "堆叠折柱混合图";
    };

    this.handleData();
  }

  handleData() {
    let propsData = JSON.parse(JSON.stringify(this.props.dataSource));
    let propsName = propsData[0];
    this.seriesBarData = this.seriesBarData.split(",");
    this.seriesLineData = this.seriesLineData.split(",");

    let seriesConfig = [];
    let X_data = [];
    let bar_data = [];
    let line_data = [];
    // 生成柱状图数据
    this.seriesBarData.forEach((item, index) => {
      let barName = "";
      let barArr = [];
      propsData.forEach((e, i) => {
        if (i > 0) {
          X_data.push(e[0]);
          barName = propsName[item];
          barArr.push(e[item]);
        }
      });
      bar_data.push({
        name: barName,
        data: barArr,
      });
    });
    // 生成折线图数据
    this.seriesLineData.forEach((item, index) => {
      let lineName = "";
      let lineArr = [];
      propsData.forEach((e, i) => {
        if (i > 0) {
          X_data.push(e[0]);
          lineArr.push(e[item]);
          lineName = propsName[item];
        }
      });
      line_data.push({
        name: lineName,
        data: lineArr,
      });
    });

    bar_data.forEach((item, index) => {
      seriesConfig.push({
        name: item.name,
        data: item.data,
        stack: "AA",
        type: "bar",
        barCategoryGap: `${this.seriesBarSpacing}%`,
        color: this.seriesBarColor[index],
      });
    });

    line_data.forEach((item, index) => {
      seriesConfig.push({
        name: item.name,
        data: item.data,
        type: "line",
        yAxisIndex: 1,
        symbol: "circle",
        symbolSize: this.seriesLineSize,
        color: this.seriesLineColor[index],
        itemStyle: {
          normal: {
            borderWidth: this.seriesLineBorderWidth,
            borderColor: this.seriesLineBorderColor,
          },
        },
        lineStyle: {
          width: 2,
          type: "solid",
        },
      });
    });
    X_data = [...new Set(X_data)];

    this.initEcharts(X_data, seriesConfig);
  }

  initEcharts(X_data, seriesConfig) {
    let myChart = echarts.init(this.refs["wpgt_lineBar"]);
    let option = {};

    option = {
      // 图例
      legend: {
        top: "1%",
        left: "6%",
        data: [
          { name: "售水量", icon: "square" },
          { name: "产销差水量", icon: "square" },
          { name: "供水量", icon: "circle" },
          { name: "产销差率", icon: "circle" },
        ],
        textStyle: {
          color: this.legendColor,
          fontSize: this.legendFontSize,
          fontFamily: this.legendFontFamily,
        },
      },
      // x轴
      xAxis: {
        type: "category",
        axisLabel: {
          color: this.axisXColor,
          fontSize: this.axisXFontSize,
          fontFamily: this.axisXFontFamily,
          padding: [10, 0, 0, 0],
        },
        data: X_data,
      },
      // y轴
      yAxis: [
        {
          type: "value",
          name: this.axisYBarTitle,
          nameLocation: "center",
          nameTextStyle: {
            color: this.axisYBarTitleColor,
            fontSize: this.axisYBarTitleFontSize,
            fontFamily: this.axisYBarTitleFontFamily,
            padding: [0, 0, 35, 0],
          },
        },
        {
          type: "value",
          name: this.axisYLineTitle,
          nameLocation: "center",
          nameTextStyle: {
            color: this.axisYLineTitleColor,
            fontSize: this.axisYLineTitleFontSize,
            fontFamily: this.axisYLineTitleFontFamily,
            padding: [35, 0, 0, 0],
          },
        },
      ],
      // 数据
      series: seriesConfig,
    };

    option && myChart.setOption(option);

    function debounce(func, ms = 1000) {
      let timer;
      return function (...args) {
        if (timer) {
          clearTimeout(timer);
        }
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
    return (
      <>
        <div ref="wpgt_lineBar" style={{ width: "100%", height: "100%" }}></div>
      </>
    );
  }
}
