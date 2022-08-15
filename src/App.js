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

    // 缺口设置
    this.gapStart = external["缺口起始角度"] || "225";
    this.gapEnd = external["缺口终止角度"] || "-45";
    this.gauaeMin = external["刻度盘最小值"] || "0";
    this.gauaeMax = external["刻度盘最大值"] || "100";

    // 颜色渐变设置
    this.colorArray = external["颜色渐变"] || "0-#47a6d1,0.5-#10d4a0,1-#e6dd1a";

    // 圆环设置
    // this.gauaeValue = external["圆环占比"] || "98.3";
    this.gauaeWidth = external["圆环宽度"] || "45";
    this.gauaeSize = external["圆环整体大小"] || "75";
    this.gauaeBorderWidth = external["圆环边框宽度"] || "2";
    this.gauaeBorderColor = external["圆环边框颜色"] || "#1C242C";

    // 中部文字设置
    this.middleFontSize = external["中部文字字号"] || "60";
    this.middleColor = external["中部文字颜色"] || "#111";
    this.middleFontFamily = external["中部文字字体"] || "";
    this.middleSite = external["中部文字位置"] || "0";

    // 底部文字设置
    this.bottomText = external["底部文字"] || "";
    this.bottomFontSize = external["底部文字字号"] || "60";
    this.bottomColor = external["底部文字颜色"] || "#111";
    this.bottomFontFamily = external["底部文字字体"] || "";
    this.bottomSite = external["底部文字位置"] || "100";

    // 单位设置
    this.company = external["单位设置"] || "%";
    this.companyFontSize = external["单位字号"] || "70";
    this.companyColor = external["单位颜色"] || "#111";
    this.companyFontFamily = external["单位字体"] || "";
    this.companySite = external["单位位置"] || "65";
  }

  componentDidMount() {
    this.refs["wpgt_gauge"].parentNode.style.width = "100%";
    this.refs["wpgt_gauge"].parentNode.style.height = "100%";

    this.Event_Center_getName = () => {
      return "进度条-仪表盘";
    };

    this.initEcharts();
  }

  initEcharts() {
    let myChart = echarts.init(this.refs["wpgt_gauge"]);
    let option = {};

    let propsData = this.props.dataSource;

    let colorArray = [];

    let colorList = this.colorArray.split(",");
    colorList.forEach((item) => {
      item = item.split("-");
      colorArray.push({
        offset: Number(item[0]),
        color: item[1],
      });
    });

    const color = new echarts.graphic.LinearGradient(0, 0, 1, 0, colorArray);

    option = {
      title: {
        text: this.company,
        x: "center",
        y: `${this.companySite}%`,
        textStyle: {
          fontSize: this.companyFontSize,
          color: this.companyColor,
          fontFamily: this.companyFontFamily,
          fontWeight: "normal",
        },
      },

      series: [
        {
          type: "gauge",
          min: this.gauaeMin,
          max: this.gauaeMax,
          radius: `${this.gauaeSize}%`,
          startAngle: this.gapStart,
          endAngle: this.gapEnd,
          pointer: { show: false },
          detail: {
            formatter: function (value) {
              return `{number|${value}}`;
            },
            rich: {
              number: {
                fontSize: this.middleFontSize,
                color: this.middleColor,
                fontFamily: this.middleFontFamily,
              },
            },
            offsetCenter: ["0%", `${this.middleSite}%`],
          },
          data: [
            {
              value: propsData[1][0],
              name: this.bottomText,
            },
          ],
          title: {
            show: true,
            color: this.bottomColor,
            offsetCenter: ["0", `${this.bottomSite}%`],
            fontSize: this.bottomFontSize,
            fontFamily: this.bottomFontFamily,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: [[1, this.gauaeBorderColor]],
              width: this.gauaeBorderWidth,
            },
          },
          progress: {
            show: true,
            width: this.gauaeWidth,
            itemStyle: {
              color: color,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
      ],
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
        <div ref="wpgt_gauge" style={{ width: "100%", height: "100%" }}></div>
      </>
    );
  }
}
