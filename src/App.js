import React, { Component } from "react";
import "./app.less";
import * as echarts from "echarts";

export default class App extends Component {
  state = {};
  constructor(props) {
    super(props);
    let options = JSON.parse(JSON.stringify(props.options));
    console.log(options);
    if (props.options.externalVariables) {
      this.X轴线颜色 = options.externalVariables.X轴线颜色;
      this.Y轴线颜色 = options.externalVariables.Y轴线颜色;
      this.轴线文字大小 = options.externalVariables.轴线文字大小;
      this.轴线文字颜色 = options.externalVariables.轴线文字颜色;
      this.色块缝隙宽度 = options.externalVariables.色块缝隙宽度;
      this.网格线颜色 = options.externalVariables.网格线颜色;
      this.标签字体颜色 = options.externalVariables.标签字体颜色;
      this.标签字体大小 = options.externalVariables.标签字体大小;
      this.标签字体 = options.externalVariables.标签字体;
      this.图例字体颜色 = options.externalVariables.图例字体颜色;
      this.图例字体大小 = options.externalVariables.图例字体大小;
      this.数据列背景颜色 = options.externalVariables.数据列背景颜色;
      this.数据柱形颜色 = options.externalVariables.数据柱形颜色;
    }
    if (this.数据柱形颜色) {
      this.数据柱形颜色 = JSON.parse(this.数据柱形颜色);
      this.数据柱形颜色.forEach((item, index) => {
        this.数据柱形颜色.splice(index + (index + 1), 0, "transparent");
      });
    }
  }
  initEcharts(data) {
    let echartsXdate = {};
    let echartsYdate = [];
    let echartSeries = [];
    let blankData = [];
    let backData = [];
    data.forEach((item, index) => {
      if (index > 0) {
        echartsYdate.push(item[0]);
        blankData.push(this.色块缝隙宽度 ? this.色块缝隙宽度 : 10);
        backData.push(0);
      } else {
        item.forEach((headerItem, headerIndex) => {
          if (headerIndex > 0) {
            echartsXdate[headerItem] = [];
            data.forEach((dataItem, dataIndex) => {
              if (dataIndex > 0) {
                echartsXdate[headerItem].push(+dataItem[headerIndex]);
              }
            });
          }
        });
      }
    });
    console.log(blankData, backData);
    let flag = false;
    for (let k in echartsXdate) {
      let message = [];
      if (!flag) {
        message = {
          name: k,
          type: "bar",
          stack: "truck",
          barWidth: 25,
          itemStyle: {
            borderColor: "transparent",
            borderWidth: 0,
          },
          label: {
            show: true,
            position: ["0", "35px"],
            fontSize: this.标签字体大小 ? +this.标签字体大小 : 18,
            color: this.标签字体颜色 ? this.标签字体颜色 : "#6F84BD",
            fontFamily: this.标签字体 ? this.标签字体 : "MicrosoftYaHei",
            formatter: function (param) {
              return param.name;
            },
          },
          data: echartsXdate[k],
        };
        flag = true;
      } else {
        message = {
          name: k,
          type: "bar",
          stack: "truck",
          barWidth: 25,
          itemStyle: {
            borderColor: "transparent",
            borderWidth: 0,
          },
          data: echartsXdate[k],
        };
      }
      echartSeries.push(message);
    }
    echartSeries.forEach((item, index) => {
      echartSeries.splice(index + (index + 1), 0, {
        name: "间距",
        type: "bar",
        stack: "truck",
        barWidth: 25,
        itemStyle: {
          borderColor: "transparent",
          borderWidth: 0,
        },
        label: {
          show: false,
        },
        data: blankData,
      });
    });
    echartSeries.pop();
    console.log(echartSeries);
    echartSeries.push({
      name: "背景框",
      type: "bar",
      data: backData,
      barWidth: 30,
      barGap: "-110%",
      showBackground: true,
      backgroundStyle: {
        color: this.数据列背景颜色 ? this.数据列背景颜色 : "#1E272E",
        borderColor: "rgba(255, 255, 255, 0.19)",
        borderWidth: 0,
      },
      itemStyle: {
        normal: {
          color: "transparent",
        },
      },
      z: -1,
    });
    const myChart = echarts.init(this.refs.wangyuSB);
    let option = {
      backgroundColor: "transparent",
      color: this.数据柱形颜色
        ? this.数据柱形颜色
        : ["#52A8FF", "transparent", "#FFA940", "transparent", "#29EFC4", "transparent", "#FFC53D", "transparent", "#C099FC", "transparent"],
      legend: {
        right: "5%",
        itemWidth: 15,
        itemHeight: 13,
        itemGap: 20,
        textStyle: {
          fontFamily: "MicrosoftYaHei",
          fontSize: this.图例字体大小 ? this.图例字体大小 : 18,
          color: this.图例字体颜色 ? this.图例字体颜色 : "rgba(178, 175, 173, 1)",
        },
        data: data[0] ? data[0] : ["完成量", "总量"],
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        backgroundColor: "rgba(42, 51, 74, 0.89)",
        borderColor: "transparent",
        formatter: function (params) {
          let returnData = '<div style="padding: 2px 10px;">';
          returnData += '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: rgba(210, 221, 249, 1);">' + params[0].axisValue + "</span><br/>";
          for (let i = 0; i < params.length; i++) {
            if (params[i].seriesName !== "间距" && params[i].seriesName !== "背景框") {
              returnData += '<span style="display:inline-block; width:10px; height:8px; margin-right:5px; border-radius:1px; background-color:' + params[i].color + '"></span>';
              returnData +=
                '<span style="font-family: MicrosoftYaHei; font-size: 14px; color: rgba(178, 175, 173, 1); ">' +
                params[i].seriesName +
                '：</span><span style="font-family: Verdana; font-size: 12px; color: ' +
                params[i].color +
                '">' +
                params[i].value +
                '</span><span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: rgba(178, 175, 173, 1);"></span><br/>';
            }
          }
          returnData += "</div>";
          return returnData;
        },
      },
      grid: {
        left: "3%",
        top: "10%",
        right: "5%",
        bottom: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        name: "",
        position: "top",
        axisLine: {
          show: this.X轴线颜色 ? true : false,
          lineStyle: {
            color: this.X轴线颜色 ? this.X轴线颜色 : "#2F77A8",
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            show: true,
            color: this.网格线颜色 ? this.网格线颜色 : "#2F77A8",
          },
        },
        axisLabel: {
          margin: 10,
          fontFamily: "MicrosoftYaHei",
          fontSize: this.轴线文字大小 ? this.轴线文字大小 : 12,
          color: this.轴线文字颜色 ? this.轴线文字颜色 : "rgba(113, 113, 113, 1)",
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: "category",
        inverse: true,
        data: echartsYdate ? echartsYdate : ["泵房通检工单", "客服工单", "管网维修工单", "二供维修工单", "水表更换工单", "欠费停水工单", "二供告警工单", "其他"],
        axisLine: {
          show: this.Y轴线颜色 ? true : false,
          lineStyle: {
            color: this.Y轴线颜色 ? this.Y轴线颜色 : "#2F77A8",
          },
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          margin: 10,
          fontFamily: "MicrosoftYaHei",
          fontSize: 12,
          show: false,
          color: "rgba(113, 113, 113, 1)",
        },

        axisTick: {
          show: false,
        },
      },
      series: echartSeries,
    };
    myChart.setOption(option);
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
      console.log("resize");
      myChart.resize();
    };
    const debounceTask = debounce(task, 1000);
    window.addEventListener("resize", debounceTask);
  }

  componentDidMount() {
    const { dataSource } = this.props;
    const data = JSON.parse(JSON.stringify(dataSource));
    this.refs["wangyuSB"].parentNode.style.width = "100%";
    this.refs["wangyuSB"].parentNode.style.height = "100%";
    this.initEcharts(data);
    this.Event_Center_getName = () => {
      return "Demo实例";
    };
  }

  render() {
    return <div ref="wangyuSB" style={{ width: "100%", height: "100%" }}></div>;
  }
}
