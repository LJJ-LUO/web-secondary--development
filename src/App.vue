<template>
  <div className="analyzer-vue-demo" :style="{
    width: '100%',
    height: '100%',
  }" ref="rock_div">
    <div id="rockEcharts" ref="rockEcharts"></div>

  </div>
</template>

<script>
const zipObject = (arr1, arr2) => {
  const ret = {};
  arr1.forEach((item, index) => {
    ret[item] = arr2[index];
  });
  return ret;
};

// import * as echarts from "echarts";
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts)
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
      default: () => { },
    },
  },
  data() {
    return {
      lineItem: {
        name: '降雨量',
        type: 'line',
        borderRadius: 10,
        // yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        tooltip: {
          valueSuffix: ''
        }
      },
      barItem: {
        name: '降雨量',
        type: 'column',
        // yAxis: 1,
        borderRadius: 10,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        tooltip: {
          valueSuffix: ' '
        }
      },

      optionH: {
        credits: { enabled: false },
        chart: {
          backgroundColor: 'transparent',
          zoomType: 'xy',
        },
        title: {
          text: ''
        },
        xAxis: [{
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          crosshair: true,
          labels: {

          }
        }],
        yAxis: [{ // Primary yAxis
          labels: {
            format: `{value}`,
            style: {
              color: Highcharts.getOptions().colors[1]
            }
          },
          title: {
            text: '',
            style: {
              color: Highcharts.getOptions().colors[1]
            }
          }
        }, { // Secondary yAxis
          title: {
            text: '(单位%)',

          },
          labels: {
            format: '{value}',
            style: {
              color: Highcharts.getOptions().colors[0]
            }
          },
          opposite: true
        }],
        tooltip: {
          shared: true
        },
        legend: {
          layout: 'horizontal',
          align: 'left',
          x: 120,
          verticalAlign: 'top',
          y: 100,
          floating: true,
          symbolRadius: 2
          // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [
          // {
          //   name: '温度',
          //   type: 'line',
          //   data: [7.0, 6, 9.5, 14.5, 8.2, 11.5, 25.2, 16.5, 13.3, 18.3, 13.9, 9.6],
          //   tooltip: {
          //     valueSuffix: '°C'
          //   }
          // }, {
          //   name: '温度',
          //   type: 'line',
          //   data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
          //   tooltip: {
          //     valueSuffix: '°C'
          //   }
          // }]
        ]
      }
    };
  },
  computed: {
    tableDataHeader() {
      return (this.dataSource[0] || []).map(t => ({
        prop: t,
        label: t,
      }));
    },
    tableData() {
      let [header, ...tableData] = this.dataSource;
      tableData = tableData || [];
      return tableData.map(d => (window?._?.zipObject || zipObject)(header, d));
    },
    dataArrColor() {
      let colorArr = this.options?.externalVariables?.数据系列颜色 || ''
      colorArr = colorArr?.split(',')
      return colorArr
    },
    yAxisUnit() {
      let unit = this.options?.externalVariables?.y轴单位 || ''
      unit = unit.split(',')
      return unit
    },
    xAxisOp() {
      let color = this.options?.externalVariables?.坐标系颜色
      let fontFamily = this.options?.externalVariables?.坐标系字体
      let fontSize = this.options?.externalVariables?.坐标系字号
      return { color, fontFamily, fontSize }
    },
    legendStyle() {
      let color = this.options?.externalVariables?.图例文字颜色
      let fontFamily = this.options?.externalVariables?.图例字体
      let fontSize = this.options?.externalVariables?.图例字号
      return { color, fontFamily, fontSize }
    },
    legendOp() {
      let x = Number(this.options?.externalVariables?.图例位置x)
      let y = Number(this.options?.externalVariables?.图例位置y)

      return { x, y }
    },
    tipsUnit() {
      let tips = this.options?.externalVariables?.tips单位 || ''
      tips = tips.split(',')
      return tips
    }
  },
  created() {
    let tableD = JSON.parse(JSON.stringify(this.dataSource))
    let column = tableD.shift()
    column.shift()
    let a = []
    for (let x = 0; x < tableD[0]?.length; x++) {
      let temp = []
      tableD.forEach(item => {
        temp.push(item[x])
      })
      a.push(temp)
    }
    let xAxis = a.shift()

    this.optionH.xAxis[0].categories = xAxis
    this.optionH.legend.itemStyle = this.legendStyle
    this.optionH.legend.x = this.legendOp.x
    this.optionH.legend.y = this.legendOp.y
    this.optionH.xAxis[0].labels.style = this.xAxisOp
    this.optionH.yAxis[0].labels.style = this.xAxisOp
    this.optionH.yAxis[1].labels.style = this.xAxisOp
    this.optionH.yAxis[0].labels.format = `{value}${this.yAxisUnit[0]}`
    this.optionH.yAxis[1].labels.format = `{value}${this.yAxisUnit[1] || ''}`
    let fem = Math.round(a?.length / 2)
    for (let i = 0; i < fem; i++) {
      let x1 = a[i]
      let x2 = a[i + fem]
      this.barItem.data = x1
      this.barItem.name = column[i]
      this.barItem.color = this.dataArrColor[i] || null
      this.barItem.tooltip.valueSuffix = this.tipsUnit[0]
      this.lineItem.tooltip.valueSuffix = this.tipsUnit[1] || this.tipsUnit[0]
      this.lineItem.data = x2
      this.lineItem.yAxis = 1
      this.lineItem.name = column[i + fem] + '(%)'
      this.lineItem.color = this.dataArrColor[i] || null
      if (column[i] != '' && column[i] != undefined) this.optionH.series[i] = JSON.parse(JSON.stringify(this.barItem))

      if (column[i + fem] != '' && column[i + fem] != undefined) { this.optionH.series[i + fem] = JSON.parse(JSON.stringify(this.lineItem)) }
    }
    // this.optionH.series.forEach((x, i) => {
    //   x.data == null ? this.optionH.series[i] = '' : null
    // })
    console.log(this.optionH.series, column);

  },
  mounted() {

    this.$refs.rock_div.parentNode.style.height = "100%"
    this.$refs.rock_div.parentNode.style.width = "100%"
    this.$refs.rock_div.parentNode.parentNode.style.minHeight = "0"

    this.initFn()
    const events = [
      {
        key: "onClick",
        name: "点击",
        payload: [
          {
            name: "名称",
            dataType: "string",
            key: "name",
          },
        ],
      },
    ];

    const actions = [
      {
        key: "messageSuccess",
        name: "成功提示",
        params: [
          {
            key: "value",
            name: "值",
            dataType: "string",
          },
        ],
      },
    ];

    this.componentId &&
      window.componentCenter?.register &&
      window.componentCenter.register(this.componentId, "comp", this, {
        events,
        actions,
      });
    this.updateProcess && this.updateProcess();
  },
  methods: {
    initFn() {

      var chart = Highcharts.chart(this.$refs.rockEcharts, this.optionH);
    },

    clickBt() {
      this.componentId &&
        window.eventCenter?.triggerEvent &&
        window.eventCenter.triggerEvent(this.componentId, "onClick", {
          name: "二开插件",
        });
    },
    // 逻辑控制用，不可删，return内容可改
    Event_Center_getName: () => {
      return "折柱混合";
    },
    do_EventCenter_messageSuccess(param) {
      console.log(param);
      alert("动作执行成功！");
    },
  },
};
</script>


<style lang="less" scoped>
#rockEcharts {
  height: 100%;
  width: 100%;
}
</style>