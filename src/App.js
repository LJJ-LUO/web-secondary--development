import React, { Component } from "react";
import * as echarts from "echarts";
import "./app.less";

const events = [];

const actions = [];

export default class App extends Component {
  constructor(props) {
    super(props);

    let external = props.options?.externalVariables ? props.options.externalVariables : {};

    // 图例
    this.legendPadding = external["图例位置"] || "1";
    this.legendColor = external["图例文字颜色"] || "#111";
    this.legendFontSize = external["图例文字字号"] || "14";
    this.legendFontFamily = external["图例文字字体"] || "";
    this.legendIconWidth = external["图例图标宽度"] || 15;
    this.legendIconHeight = external["图例图标高度"] || 15;

    // X轴配置
    this.axisX0Color = external["X轴0刻度线颜色"] || "#33bbff";
    this.axisXColor = external["X轴文字颜色"] || "#111";
    this.axisXFontSize = external["X轴文字字号"] || "16";
    this.axisXFontFamily = external["X轴文字字体"] || "";

    // 柱状图配置
    this.seriesBarColor = external["柱状图系列颜色"] ? external["柱状图系列颜色"].split(",") : ["#15F6EE", "#32BBFF"];
    this.axisYBarLabelColor = external["柱状图左侧Y轴字体颜色"] || "#111";
    this.axisYBarLabelFontSize = external["柱状图左侧Y轴字体字号"] || "16";
    this.axisYBarTitle = external["柱状图左侧Y轴标题"] || "水量  (万m²)";
    this.axisYBarPadding = external["柱状图Y轴标题距离"] || 35;
    this.axisYBarTitleColor = external["柱状图Y轴标题颜色"] || "#111";
    this.axisYBarTitleFontSize = external["柱状图Y轴标题字号"] || "16";
    this.axisYBarTitleFontFamily = external["柱状图Y轴标题字体"] || "";
    this.seriesBarSpacing = external["柱状图数据列间距"] || "60";
    this.seriesBarSplitColor = external["柱状图分割线颜色"] || "";
    this.seriesBarData = external["柱状图使用数据"] || "1,2";

    // 折线图配置
    this.seriesLineColor = external["折线图系列颜色"] ? external["折线图系列颜色"].split(",") : ["#F7CFAB", "#9888CC"];
    this.axisYLineLabelColor = external["折线图右侧Y轴字体颜色"] || "#111";
    this.axisYLineLabelFontSize = external["折线图右侧Y轴字体字号"] || "16";
    this.axisYLineTitle = external["折线图右侧Y轴标题"] || "百分比  (%)";
    this.axisYLinePadding = external["折线图Y轴标题距离"] || 35;
    this.axisYLineTitleColor = external["折线图Y轴标题颜色"] || "#111";
    this.axisYLineTitleFontSize = external["折线图Y轴标题字号"] || "16";
    this.axisYLineTitleFontFamily = external["折线图Y轴标题字体"] || "";
    this.seriesLineSize = external["折线图拐点大小"] || "6";
    this.seriesLineBorderColor = external["折线图拐点边框颜色"] || "#111";
    this.seriesLineBorderWidth = external["折线图拐点边框宽度"] || "1";
    this.seriesLineSplitColor = external["折线图分割线颜色"] || "";
    this.seriesLineData = external["折线图使用数据"] || "3,4";
  }

  componentDidMount() {
    this.refs["wpgt_lineBar"].parentNode.style.width = "100%";
    this.refs["wpgt_lineBar"].parentNode.style.height = "100%";
    this.refs["wpgt_lineBar"].parentNode.parentNode.style.minHeight = 0;

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
    let legendData = [];
    this.seriesBarData = this.seriesBarData.split(",") || ["1", "2"];
    this.seriesLineData = this.seriesLineData.split(",") || ["3", "4"];

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
        } else {
          legendData.push({
            name: e[item],
            icon: "square",
          });
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
        } else {
          legendData.push({
            name: e[item],
            icon: "circle",
          });
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

    this.initEcharts(X_data, seriesConfig, legendData);
  }

  initEcharts(X_data, seriesConfig, legendData) {
    let myChart = echarts.init(this.refs["wpgt_lineBar"]);
    let option = {};

    option = {
      // 图例
      legend: {
        top: `${this.legendPadding}%`,
        left: "6%",
        data: legendData,
        textStyle: {
          color: this.legendColor,
          fontSize: this.legendFontSize,
          fontFamily: this.legendFontFamily,
        },
        itemWidth: Number(this.legendIconWidth),
        itemHeight: Number(this.legendIconHeight),
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
        axisLine: {
          show: true,
          lineStyle: {
            color: this.axisX0Color,
          },
        },
        data: X_data,
      },
      // y轴
      yAxis: [
        {
          type: "value",
          name: this.axisYBarTitle,
          nameLocation: "center",
          splitLine: {
            lineStyle: {
              color: this.seriesBarSplitColor,
            },
          },
          nameTextStyle: {
            color: this.axisYBarTitleColor,
            fontSize: this.axisYBarTitleFontSize,
            fontFamily: this.axisYBarTitleFontFamily,
            padding: [0, 0, Number(this.axisYBarPadding), 0],
          },
          axisLabel: {
            color: this.axisYBarLabelColor,
            fontSize: this.axisYBarLabelFontSize,
          },
        },
        {
          type: "value",
          name: this.axisYLineTitle,
          nameLocation: "center",
          splitLine: {
            lineStyle: {
              color: this.seriesLineSplitColor,
            },
          },
          nameTextStyle: {
            color: this.axisYLineTitleColor,
            fontSize: this.axisYLineTitleFontSize,
            fontFamily: this.axisYLineTitleFontFamily,
            padding: [Number(this.axisYLinePadding), 0, 0, 0],
          },
          axisLabel: {
            color: this.axisYLineLabelColor,
            fontSize: this.axisYLineLabelFontSize,
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
