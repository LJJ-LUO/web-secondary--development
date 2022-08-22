<template>
  <div ref="eChartsLine" class="eCharts_Box">
    <div class="lineEchart" ref="lineEchart" id="lineEchart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "./index.css";
// import { getAssetById } from "./api/asset";

const zipObject = (arr1, arr2) => {
  const ret = {};
  arr1.forEach((item, index) => {
    ret[item] = arr2[index];
  });
  return ret;
};

// 防抖
const debounce = (func, ms) => {
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
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    componentId: {
      type: String | undefined,
      default: "",
    },
    options: {
      type: Object,
      default: () => ({
        // 配置项从externalVariables里取
        externalVariables: {},
      }),
    },
    updateProcess: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      timer: null,
      myChart: null,
      lineData: [],
      xAxisData: [],
      legendData: [],
      xAxisLineColor: "rgba(92, 105, 115, 1)",
      yAxisLineColor: "green",
      axisLabels: {
        fontStyle: "oblique",//normal,italic,oblique
        fontSize: '16',
        color: "yellow"
      },
      yAxisLabels: {
        fontStyle: "oblique",//normal,italic,oblique
        fontSize: '16',
        color: "yellow"
      },
      markLines: {
        silent: true,
        symbol: ['none','none'], // 不显示箭头和圆点
        label: {
          show: true,
          color: "rgba(237, 205, 175, 1)",
          fontFamily: "sans-serif"
        },
        lineStyle: {
          color: "rgba(237, 205, 175, 1)",
          type: "solid" // dashed,dotted
        },
        data: [{
          name: 'Y 轴水平线',
          yAxis: '1800'
        }]
      },
      lineType: 0,
      seriesColor: [],
      lineShowSymbol: 0,
      linePointW: "",
      linePointC: ""
    };
  },
  computed: {},
  mounted() {
    this.$refs.eChartsLine.parentNode.style.height = "100%"
    this.$refs.eChartsLine.parentNode.style.width = "100%"
    this.$refs.eChartsLine.parentNode.parentNode.style.minHeight = "0"

    console.log('this.options',this.options);
    // let { 辅助线颜色, 辅助线隐藏两端, 辅助线样式, 辅助线文字显示, 辅助线文字样式, 辅助线文字颜色 } = this.options?.externalVariables;
    // this.markLines.symbol = 辅助线隐藏两端 ? 辅助线隐藏两端.split(",") : ["circle","triangle"];
    // this.markLines.lineStyle.color = 辅助线颜色 ? 辅助线颜色 : "rgba(237, 205, 175, 1)";
    // this.markLines.lineStyle.type = 辅助线样式 ? 辅助线样式 : "dashed";
    // this.markLines.label.show = 辅助线文字显示 ? Boolean(parseInt(辅助线文字显示)) : false;
    // this.markLines.label.fontFamily = 辅助线文字样式 ? 辅助线文字样式 : "sans-serif";
    // this.markLines.label.color = 辅助线文字颜色 ? 辅助线文字颜色 : "rgba(237, 205, 175, 1)";

    let { X轴颜色, X轴字体, X轴文字大小, X轴字体颜色 } = this.options?.externalVariables;
    this.xAxisLineColor = X轴颜色 ? X轴颜色 : "red";
    this.axisLabels.fontStyle = X轴字体 ? X轴字体 : "oblique";
    this.axisLabels.fontSize = X轴文字大小 ? X轴文字大小 : "16";
    this.axisLabels.color = X轴字体颜色 ? X轴字体颜色 : "yellow";

    let { Y轴颜色, Y轴字体, Y轴文字大小, Y轴文字颜色 } = this.options?.externalVariables;
    this.yAxisLineColor = Y轴颜色 ? Y轴颜色 : "green";
    this.yAxisLabels.fontStyle = Y轴字体 ? Y轴字体 : "oblique";
    this.yAxisLabels.fontSize = Y轴文字大小 ? Y轴文字大小 : "30";
    this.yAxisLabels.color = Y轴文字颜色 ? Y轴文字颜色 : "yellow";

    let { 折线虚实, 系列颜色,  折线点开关 } = this.options?.externalVariables;
    this.lineType = 折线点开关 ? Boolean(parseInt(折线点开关)) : false;
    this.lineShowSymbol = 折线虚实 ? 折线虚实.split(",") : [];
    this.seriesColor = 系列颜色 ? 系列颜色.split(",") : [];

    let { 点边框颜色, 点边框宽度 } = this.options?.externalVariables;
    this.linePointC = 点边框颜色 ? 点边框颜色 : "";
    this.linePointW = 点边框宽度 ? 点边框宽度 : "12";

    this.getData();
    this.initEcharts()

    const events = [];
    const actions = [];
    this.componentId &&
      window.componentCenter?.register &&
      window.componentCenter.register(this.componentId, "comp", this, {
        events,
        actions,
      });
    this.updateProcess && this.updateProcess();
  },
  methods: {
    getData() {
      // let { data } = await getAssetById("09523f09-a7bc-4357-94de-453df29f89f8");
      // this.dataSource
      let data = JSON.parse(JSON.stringify(this.dataSource))
      // console.log('this.dataSource',data);
      this.xAxisData = [];
      this.legendData = [];
      this.xAxisData = data[0].slice(1);
      let value = data.slice(1);
      this.lineData = value.map(x=>{
        this.legendData.push(x.shift())
        return x
      }).map((y,i)=>{
        let names = this.legendData[i];
        let obj = {
          name: names,
          type: 'line',
          // stack: 'Total',
          // seriesLayoutBy: 'column',
          showSymbol: this.lineType,
          symbol: "circle",
          symbolSize: 6,
          itemStyle: {
            color: this.seriesColor[i] ? this.seriesColor[i] : "", // 系列颜色
            borderColor: this.linePointC,
            borderWidth: this.linePointW
          },
          lineStyle: {
            // width: 2,
            type: this.lineShowSymbol.includes(names) ? "dashed" :"solid",
          },
          data: y,
          // markLine: null
        }
        // if (i == 0) {
        //   let { 辅助线位置 } = this.options?.externalVariables;
        //   this.markLines.data[0].yAxis = 辅助线位置 ? parseInt(辅助线位置) : y[0];
        //   obj.markLine = this.markLines
        // }
        return obj;
      })
      console.log(this.xAxisData);
      console.log(this.lineData);
      console.log(this.legendData);
      console.log(this.markLines.data);
    },
    // 初始化图表
    initEcharts() {
      if (this.myChart !== null && this.myChart !== "" && this.myChart !== undefined) {
        this.myChart.dispose();//销毁
      }
      let lineEchart = this.$refs.lineEchart;
      this.myChart = echarts.init(lineEchart);
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          icon: "circle",
          left: "5%",
          top: 15,
          // type: "scroll",
          itemStyle: {
            borderWidth: 0
          },
          textStyle: {
            color: "rgba(92, 105, 115, 1)"
          },
          data: this.legendData,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxisData,
          axisLine: {
            show: true, // y轴线
            lineStyle: {
              color: this.xAxisLineColor
            }
          },
          axisTick: {
            show: false // 刻度线
          },
          axisLabel: this.axisLabels
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: true, // y轴线
            lineStyle: {
              color: this.yAxisLineColor
            }
          },
          axisLabel: this.yAxisLabels,
          splitLine: {
            show: false // y轴网格线
          }
        },
        series: this.lineData
      };

      option && this.myChart.setOption(option);
      const task = () => {
        this.myChart.resize();
      };
      window.addEventListener("resize", debounce(task, 300));
    },
    // clickBt() {
    //   this.componentId &&
    //     window.eventCenter?.triggerEvent &&
    //     window.eventCenter.triggerEvent(this.componentId, "onClick", {
    //       name: "二开插件",
    //     });
    // },
    // 逻辑控制用，不可删，return内容可改
    Event_Center_getName: () => {
      return "";
    },
    do_EventCenter_messageSuccess(param) {
      console.log(param);
    },
  },
};
</script>

<style lang="less" scoped>
.eCharts_Box {
  width: 100%;
  height: 100%;

  .lineEchart {
    width: 100%;
    height: 100%;
    // background: rgba(15, 18, 25, 0.9);

  }
}
</style>
