<template>
  <div class="gangkouPie" ref="gangkouPie" id="gangkouPie"></div>
</template>

<script>
import * as echarts from 'echarts'
import './index.css'

const zipObject = (arr1, arr2) => {
  const ret = {}
  arr1.forEach((item, index) => {
    ret[item] = arr2[index]
  })
  return ret
}
const debounce = (func, ms) => {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, ms)
  }
}

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    componentId: {
      type: String | undefined,
      default: '',
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
      pieData: [],
      seriesColor: [],
      legendTxColor: '',
      legendTxSize: '',
      legendTxFamily: '',
      legendNumColor: '',
      legendNumSize: 'null',
      legendNumFamily: '',
      pieLeft: '',
      pieTop: '',
      legendPieRight: '',
      legendPieTop: '',
      legendInOut: 80,
      legendItemGap: 10,
      num: 0,
      borderColor: '',
      scaleSize: 25,
      pieOut: [],
      pieIn: [],
      pieInOpctiy: 0.2,
    }
  },
  mounted() {
    this.$refs.gangkouPie.parentNode.style.height = '100%'
    this.$refs.gangkouPie.parentNode.style.width = '100%'
    this.$refs.gangkouPie.parentNode.parentNode.style.minHeight = '0'

    let { 系列颜色, 图例每项间隔, 图例文字数值间距, 色块放大尺寸, 边框颜色, 图例名称颜色, 图例名称大小, 图例名称字体, 图例数值颜色, 图例数值大小, 图例数值字体, 饼图左距离, 饼图顶距离, 图例右距离, 图例顶距离, 外图内径外径, 内图内径外径, 内图透明度 } = this.options?.externalVariables
    this.seriesColor = 系列颜色 ? 系列颜色.split('-') : ['#0778e5', '#84e2e5', '#51deac', '#e6c77c', '#e69146', '#13d8ea']
    this.legendTxColor = 图例名称颜色 ? 图例名称颜色 : '#fff'
    this.legendTxSize = 图例名称大小 ? 图例名称大小 : '16'
    this.legendTxFamily = 图例名称字体 ? 图例名称字体 : 'Microsoft YaHei'
    this.legendNumColor = 图例数值颜色 ? 图例数值颜色 : '#fff'
    this.legendNumSize = 图例数值大小 ? 图例数值大小 : '20'
    this.legendNumFamily = 图例数值字体 ? 图例数值字体 : 'Microsoft YaHei'
    this.pieLeft = 饼图左距离 ? 饼图左距离 : '130'
    this.pieTop = 饼图顶距离 ? 饼图顶距离 : '0'
    this.legendPieRight = 图例右距离 ? 图例右距离 : '50'
    this.legendPieTop = 图例顶距离 ? 图例顶距离 : 'middle'
    this.legendInOut = 图例文字数值间距 ? parseInt(图例文字数值间距) : 80
    this.legendItemGap = 图例每项间隔 ? parseInt(图例每项间隔) : 10
    this.borderColor = 边框颜色 ? 边框颜色 : 'rgb(15, 29, 51, 0.5)'
    this.scaleSize = 色块放大尺寸 ? parseInt(色块放大尺寸) : 25
    this.pieOut = 外图内径外径 ? 外图内径外径.split('-') : ['40%', '54%']
    this.pieIn = 内图内径外径 ? 内图内径外径.split('-') : ['28%', '40%']
    this.pieInOpctiy = 内图透明度 ? Number(内图透明度) : 0.2

    this.mapData()
    this.initEcharts()

    const events = []
    const actions = []
    this.componentId &&
      window.componentCenter?.register &&
      window.componentCenter.register(this.componentId, 'comp', this, {
        events,
        actions,
      })
    this.updateProcess && this.updateProcess()
  },
  methods: {
    //处理格式
    mapData() {
      let pieDataCopy = JSON.parse(JSON.stringify(this.dataSource))
      pieDataCopy.shift()
      this.pieData = pieDataCopy.map((x) => {
        this.num += Number(x[1])
        return {
          name: x[0],
          value: Number(x[1]),
        }
      })
      console.log('this.pieData', this.pieData)
    },
    // 初始化图表
    initEcharts() {
      if (this.myChart !== null && this.myChart !== '' && this.myChart !== undefined) {
        this.myChart.dispose() //销毁
      }
      let self = this
      let gangkouPie = this.$refs.gangkouPie
      this.myChart = echarts.init(gangkouPie)
      let option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          icon: 'circle',
          top: this.legendPieTop,
          right: this.legendPieRight,
          itemGap: this.legendItemGap,
          itemWidth: 10, // 设置图例图形的宽
          itemHeight: 10,
          itemStyle: {
            borderWidth: 0,
          },
          textStyle: {
            fontSize: '16',
            width: this.legendInOut,
            rich: {
              name: {
                color: this.legendTxColor,
                fontSize: this.legendTxSize,
                fontFamily: this.legendTxFamily,
              },
              percent: {
                align: 'right',
                fontFamily: this.legendNumFamily,
                color: this.legendNumColor,
                fontSize: this.legendNumSize,
                verticalAlign: 'middle',
                fontWeight: 700,
              },
            },
          },
          formatter: function (name) {
            if (name !== '') {
              let item = self.pieData.find((x) => x.name === name)
              let p = ((item.value / self.num) * 100).toFixed(0)
              return `{name|${name}}{percent| ${p}%}`
            }
          },
          // data: this.legendData
        },
        series: [
          {
            type: 'pie',
            radius: this.pieOut,
            left: this.pieLeft,
            top: this.pieTop,
            itemStyle: {
              borderRadius: 0,
              borderColor: this.borderColor,
              borderWidth: 2,
            },
            tooltip: {
              show: true,
              borderWidth: 0,
              backgroundColor: 'transparent',
              padding: [0, 0, 0, 0],
              confine: true,
              formatter: (params) => {
                if (params.name !== '') {
                  let item = self.pieData.find((x) => x.name === params.name)
                  let p = ((item.value / self.num) * 100).toFixed(0)
                  return `<div style="text-indent: 20px;background:url( ${require('../src/assest/tooipBg1.png')}) no-repeat center center;background-size: 100%;background-attachment: fixed;height: 66px;width: 120px;font-size: 14px;color: #a8c7e5;">${params.name}<br/><span style="margin-left: 20px;font-size: 16px;color: #fff;font-weight: 700;">${p}%</span></div>`
                }
              },
            },
            emphasis: {
              scaleSize: this.scaleSize,
            },
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: this.pieData,
          },
          {
            type: 'pie',
            cursor: 'auto',
            radius: this.pieIn,
            left: this.pieLeft,
            top: this.pieTop,
            itemStyle: {
              borderRadius: 0,
              borderColor: this.borderColor,
              borderWidth: 2,
              opacity: this.pieInOpctiy,
            },
            tooltip: {
              show: false,
            },
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            emphasis: {
              disabled: true,
            },
            data: this.pieData,
          },
        ],
      }

      option && this.myChart.setOption(option)
      const task = () => {
        this.myChart.resize()
      }
      window.addEventListener('resize', debounce(task, 300))
    },

    // clickBt() {
    //     this.componentId &&
    //         window.eventCenter?.triggerEvent &&
    //         window.eventCenter.triggerEvent(this.componentId, "onClick", {
    //             name: "二开插件",
    //         });
    // },
    // 逻辑控制用，不可删，return内容可改
    Event_Center_getName: () => {
      return ''
    },
    do_EventCenter_messageSuccess(param) {
      console.log(param)
    },
  },
}
</script>

<style lang="less" scoped>
.gangkouPie {
  height: 100%;
  width: 100%;
}
</style>
