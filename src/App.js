import React, { Component } from "react";
import * as echarts from "echarts";
import "./app.less";

export default class App extends Component {
  state = {
    dataSource: [],
  };

  constructor(props) {
    super(props);

    let external = props.options?.externalVariables
      ? props.options.externalVariables
      : {};

    // 标题配置项
    this.radarTitle = external["标题"] || "";
    this.radarTitleSite = external["标题位置"] || "90";
    this.radarTitleColor = external["标题颜色"] || "#111";
    this.radarTitleFontSize = external["标题字号"] || "22";
    this.radarTitleFontFamily = external["标题字体"] || "";

    // 图例配置项
    this.legendIsShow = external["图例是否显示"] || "false";
    this.legendSpacing = external["图例间距"] || "30";
    this.legendSite = external["图例位置"] || "8";
    this.legendColor = external["图例文字颜色"] || "#111";
    this.legendFontSize = external["图例文字字号"] || "20";
    this.legendFontFamily = external["图例文字字体"] || "";

    // 雷达图配置
    this.radarSize = external["雷达图大小"] || "70";
    if (eval(external["图例是否显示"])) {
      this.radarSite = external["雷达图位置"] || "45";
    } else {
      this.radarSite = "50";
    }
    this.radarBackground = external["雷达图背景颜色"] || "#fff";
    this.radarXColor = external["雷达图X轴颜色"] || "#153269";
    this.radarYColor = external["雷达图Y轴颜色"] || "#113865";
    this.radarSymSize = external["雷达图拐点大小"] || "5";
    this.radarIsRot = external["雷达图是否开启轮播"] || "false";
    this.radarRotTimer = external["雷达图轮播间隔"] || "2000";
    this.radarRotSymSize = external["雷达图轮播拐点大小"] || "10";
    this.radarRotSymColor = external["雷达图轮播拐点颜色"] || "#FFFFFF";

    // 边角配置
    this.radarMax = external["边角最大值"] || "20000";
    this.radarNameColor = external["边角标题颜色"] || "#111";
    this.radarNameFontSize = external["边角标题字号"] || "14";
    this.radarNameFontFamily = external["边角标题字体"] || "";

    // 系列配置
    this.radarSeries = external["数据系列颜色"]
      ? external["数据系列颜色"].split(",")
      : ["#ffc956"];
    this.radarBorderWidth = external["雷达图边框宽度"] || "1";

    this.echartsTimer = null;
  }

  componentDidMount() {
    this.refs["wpgt_radar"].parentNode.style.width = "100%";
    this.refs["wpgt_radar"].parentNode.style.height = "100%";

    this.Event_Center_getName = () => {
      return "雷达轮播";
    };

    this.handleData();
  }

  componentWillUnmount() {
    this.echartsTimer && clearInterval(this.echartsTimer);
  }

  handleData() {
    let propsData = JSON.parse(JSON.stringify(this.props.dataSource));
    let nameList = [];
    let labelList = [];
    let dataList = [];
    let valueList = [];
    let indicatorConfig = [];
    let seriesConfig = [];

    propsData.forEach((item, index) => {
      if (index > 0) {
        if (nameList.length < 1) {
          nameList.push(item[0]);
          labelList.push(item[1]);
          dataList.push({
            name: item[0],
            data: [item[2]],
          });
          valueList.push([item[2]]);
        } else {
          if (nameList.includes(item[0])) {
            dataList.forEach((e, i) => {
              if (item[0] === e.name) {
                e.data.push(item[2]);
                valueList[i].push(item[2]);
                labelList.push(item[1]);
              }
            });
          } else {
            nameList.push(item[0]);
            labelList.push(item[1]);
            dataList.push({
              name: item[0],
              data: [item[2]],
            });
            valueList.push([item[2]]);
          }
        }
      }
    });

    labelList = [...new Set(labelList)];
    labelList.forEach((item) => {
      indicatorConfig.push({
        name: item,
        max: Number(this.radarMax),
      });
    });

    dataList.forEach((item, index) => {
      seriesConfig.push({
        name: item.name,
        type: "radar",
        data: [item.data],
        symbolSize: this.radarSymSize,
        // 覆盖物颜色
        areaStyle: {
          color: {
            type: "radial",
            x: 0.5, //右
            y: 1, //下
            r: 1,
            colorStops: [
              {
                offset: 1,
                color: this.radarSeries[index] || "#4BFFFC",
              },
              {
                offset: 0.2,
                color: "rgba(0,0,0,0)",
              },
            ],
            globalCoord: false,
          },
          opacity: 0.5,
        },
        // 覆盖物点位样式
        itemStyle: {
          normal: {
            show: false,
            color: this.radarSeries[index],
            borderColor: this.radarSeries[index],
          },
        },
        // 覆盖物边框样式
        lineStyle: {
          color: this.radarSeries[index],
          width: Number(this.radarBorderWidth),
        },
      });
    });

    this.initEcharts(indicatorConfig, seriesConfig, nameList, valueList);
  }

  initEcharts(indicatorConfig, seriesConfig, nameList, valueList) {
    let myChart = echarts.init(this.refs["wpgt_radar"]);
    let option = {};

    option = {
      // 标题配置
      title: {
        text: this.radarTitle,
        left: "center",
        top: `${this.radarTitleSite}%`,
        textStyle: {
          color: this.radarTitleColor,
          fontSize: this.radarTitleFontSize,
          fontFamily: this.radarTitleFontFamily,
        },
      },
      // 图例配置
      legend: {
        show: eval(this.legendIsShow),
        orient: "vertical",
        itemGap: Number(this.legendSpacing),
        top: "center",
        right: `${this.legendSite}%`,
        // 图例字体颜色
        textStyle: {
          color: this.legendColor,
          fontSize: this.legendFontSize,
          fontFamily: this.legendFontFamily,
        },
        // 数据
        data: nameList,
        icon: "square",
      },
      // 雷达图配置
      radar: {
        // 雷达图大小
        radius: `${this.radarSize}%`,
        // 雷达图位置
        center: [`${this.radarSite}%`, "50%"],
        // 边角标题样式
        name: {
          textStyle: {
            color: this.radarNameColor,
            fontSize: this.radarNameFontSize,
            fontFamily: this.radarNameFontFamily,
          },
        },
        // 边角名称及最大值
        indicator: indicatorConfig,
        // 雷达图背景
        splitArea: {
          areaStyle: {
            color: this.radarBackground,
          },
        },
        // x轴
        axisLine: {
          lineStyle: {
            color: this.radarXColor,
          },
        },
        // y轴
        splitLine: {
          lineStyle: {
            color: this.radarYColor,
          },
        },
      },
      // 数据配置
      series: seriesConfig,
    };

    option && myChart.setOption(option);

    if (eval(this.radarIsRot)) {
      let indexNum = 0;
      this.echartsTimer = setInterval(() => {
        if (indexNum > valueList[0].length - 1) {
          indexNum = 0;
        }
        let seriesArr = [...seriesConfig];

        let dataArr = [];

        valueList.forEach((item, index) => {
          let arr = [];
          item.forEach((e, i) => {
            if (indexNum === i) {
              arr.push(e);
            } else {
              arr.push(100000);
            }
          });
          dataArr.push(arr);
        });

        seriesArr.forEach((item, index) => {
          seriesArr.push({
            name: item.name,
            type: "radar",
            z: 10,
            symbolSize: this.radarRotSymSize,
            animation: false,
            data: [
              {
                value: dataArr[index],
                itemStyle: {
                  color: this.radarRotSymColor,
                  shadowColor: "#FFFFFF",
                  shadowBlur: 10,
                },
                lineStyle: { width: 0 },
              },
            ],
          });
        });

        option.series = seriesArr;

        indexNum++;

        option && myChart.setOption(option);
      }, Number(this.radarRotTimer) || 2000);
    }

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
        <div ref="wpgt_radar" style={{ width: "100%", height: "100%" }}></div>
      </>
    );
  }
}
