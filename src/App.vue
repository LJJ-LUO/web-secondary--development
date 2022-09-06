<template>
  <div ref="eChartsLine" class="lineEchart" id="chartPanel"></div>
</template>
<script>
import * as echarts from 'echarts'
import 'echarts-gl' // 3d图表库
import './index.css'

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
      seriesColor: [],
      legendTxColor: '',
      legendInOut: 120,
      legendTxSize: '',
      legendTxFamily: '',
      legendNumColor: '',
      legendNumSize: '',
      legendNumFamily: '',
      legendPieTop: '',
      legendPieRight: '',
      pieScla: '',
      pieLeft: '',
      pieTop: '',
      pieData: [],
      ringHeight: 8,
      legendItemGap: 10,
      selectItem: 30,
      itemOpacity: 1,
      alpha: 30,
    }
  },
  mounted() {
    this.$refs.eChartsLine.parentNode.style.height = '100%'
    this.$refs.eChartsLine.parentNode.style.width = '100%'
    this.$refs.eChartsLine.parentNode.parentNode.style.minHeight = '0'

    //处理格式
    let pieDataCopy = JSON.parse(JSON.stringify(this.dataSource))
    pieDataCopy.shift()
    this.pieData = pieDataCopy.map((x) => {
      return {
        name: x[0],
        value: Number(x[1]),
        itemStyle: {
          color: '',
          opacity: 1,
        },
      }
    })
    console.log('this.pieData', this.pieData)

    console.log('this.options?.externalVariables', this.options?.externalVariables)
    let { 系列颜色, 图例每项间隔, 图形角度, 环形图高度, 选中后高度, 色块透明度, 图例文字数值间距, 图例名称颜色, 图例名称大小, 图例名称字体, 图例数值颜色, 图例数值大小, 图例数值字体, 饼图左距离, 饼图顶距离, 饼图缩放倍率, 图例右距离, 图例顶距离 } = this.options?.externalVariables
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
    this.pieScla = 饼图缩放倍率 ? Number(饼图缩放倍率) : 1.5
    this.legendInOut = 图例文字数值间距 ? parseInt(图例文字数值间距) : 80
    this.ringHeight = 环形图高度 ? parseInt(环形图高度) : 8
    this.legendItemGap = 图例每项间隔 ? parseInt(图例每项间隔) : 10
    this.selectItem = 选中后高度 ? parseInt(选中后高度) : 30
    this.itemOpacity = 色块透明度 ? Number(色块透明度) : 1
    this.alpha = 图形角度 ? parseInt(图形角度) : 30
    if (this.seriesColor.length > 0) {
      for (let index = 0; index < this.seriesColor.length; index++) {
        if (this.pieData[index]) {
          this.pieData[index].itemStyle.color = this.seriesColor[index]
          this.pieData[index].itemStyle.opacity = this.itemOpacity
        }
      }
    }
    // console.log('this.pieData', this.pieData)

    // this.myChart = echarts.init(document.getElementById('chartPanel'))
    this.myChart = echarts.init(this.$refs.eChartsLine)
    this.drawPie()

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
  beforeDestroy() {
    this.myChart.dispose()
    this.myChart = null
  },
  methods: {
    drawPie() {
      let self = this
      let sum = 0
      self.pieData.forEach((x) => {
        sum += Number(x.value)
      })

      // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
      function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
        // 计算
        let midRatio = (startRatio + endRatio) / 2

        let startRadian = startRatio * Math.PI * 2
        let endRadian = endRatio * Math.PI * 2
        let midRadian = midRatio * Math.PI * 2

        // 如果只有一个扇形，则不实现选中效果。
        if (startRatio === 0 && endRatio === 1) {
          isSelected = false
        }

        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = typeof k !== 'undefined' ? k : 1 / 3

        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
        let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
        // let offsetX = 0
        // let offsetY = 0

        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        // let hoverRate = isHovered ? 1.05 : 1
        let hoverRate = isHovered ? 1 : 1

        // 返回曲面参数方程
        return {
          u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32,
          },

          v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
          },

          x: function (u, v) {
            if (u < startRadian) {
              return (offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate) / self.pieScla
            }
            if (u > endRadian) {
              return (offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate) / self.pieScla
            }
            return (offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate) / self.pieScla
          },

          y: function (u, v) {
            if (u < startRadian) {
              return (offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate) / self.pieScla
            }
            if (u > endRadian) {
              return (offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate) / self.pieScla
            }
            return (offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate) / self.pieScla
          },

          z: function (u, v) {
            if (u < -Math.PI * 0.5) {
              return Math.sin(u)
            }
            if (u > Math.PI * 2.5) {
              return Math.sin(u) * h * 0.1
            }
            return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
          },
        }
      }

      // 生成模拟 3D 饼图的配置项
      function getPie3D(pieData, internalDiameterRatio) {
        let series = []
        let sumValue = 0
        let startValue = 0
        let endValue = 0
        let legendData = []
        let k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3

        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i++) {
          sumValue += pieData[i].value

          let seriesItem = {
            name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
            type: 'surface',
            parametric: true,
            wireframe: {
              show: false,
            },
            pieData: pieData[i],
            pieStatus: {
              selected: false,
              hovered: false,
              k: k,
            },
          }

          if (typeof pieData[i].itemStyle != 'undefined') {
            let itemStyle = {}

            typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null
            typeof pieData[i].itemStyle.opacity != 'undefined' ? (itemStyle.opacity = pieData[i].itemStyle.opacity) : null

            seriesItem.itemStyle = itemStyle
          }
          series.push(seriesItem)
        }

        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++) {
          endValue = startValue + series[i].pieData.value

          series[i].pieData.startRatio = startValue / sumValue
          series[i].pieData.endRatio = endValue / sumValue
          series[i].parametricEquation = getParametricEquation(series[i].pieData.startRatio, series[i].pieData.endRatio, false, false, k, 10)

          startValue = endValue

          legendData.push(series[i].name)
        }

        // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
        // series.push({
        //   name: 'mouseoutSeries',
        //   type: 'surface',
        //   parametric: true,
        //   wireframe: {
        //     show: false,
        //   },
        //   itemStyle: {
        //     opacity: 0,
        //   },
        //   parametricEquation: {
        //     u: {
        //       min: 0,
        //       max: Math.PI * 2,
        //       step: Math.PI / 20,
        //     },
        //     v: {
        //       min: 0,
        //       max: Math.PI,
        //       step: Math.PI / 20,
        //     },
        //     x: function (u, v) {
        //       return Math.sin(v) * Math.sin(u) + Math.sin(u)
        //     },
        //     y: function (u, v) {
        //       return Math.sin(v) * Math.cos(u) + Math.cos(u)
        //     },
        //     z: function (u, v) {
        //       return Math.cos(v) > 0 ? 0.1 : -0.1
        //     },
        //   },
        // })

        // 准备待返回的配置项，把准备好的 legendData、series 传入。
        let option = {
          //animation: false,
          legend: {
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: self.legendItemGap,
            orient: 'vertical', //垂直显示
            right: self.legendPieRight,
            top: self.legendPieTop,
            textStyle: {
              color: 'black',
              fontSize: '16',
              width: self.legendInOut,
              rich: {
                name: {
                  // width: self.legendInOut,
                  color: self.legendTxColor,
                  fontSize: self.legendTxSize,
                  fontFamily: self.legendTxFamily,
                },
                percent: {
                  align: 'right',
                  fontFamily: self.legendNumFamily,
                  color: self.legendNumColor,
                  fontSize: self.legendNumSize,
                  verticalAlign: 'middle',
                  fontWeight: 700,
                },
              },
            },
            formatter: function (name) {
              if (name !== 'mouseoutSeries' && name !== '') {
                const item = self.pieData.find((i) => {
                  return i.name === name
                })
                const p = ((item.value / sum) * 100).toFixed(0)
                return `{name|${name}}{percent| ${p}%}`
              }
            },
            data: legendData,
          },
          tooltip: {
            borderWidth: 0,
            backgroundColor: 'transparent',
            padding: [0, 0, 0, 0],
            confine: true,
            formatter: (params) => {
              if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== '') {
                const item = self.pieData.find((i) => {
                  return i.name === params.seriesName
                })
                const p = ((item.value / sum) * 100).toFixed(0)
                return `<div style="text-indent: 20px;background:url( ${require('../src/assest/tooipBg1.png')}) no-repeat center center;background-size: 100%;background-attachment: fixed;height: 66px;width: 120px;font-size: 14px;color: #a8c7e5;">${params.seriesName}<br/><span style="margin-left: 20px;font-size: 16px;color: #fff;font-weight: 700;">${p}%</span></div>`
              }
            },
          },
          xAxis3D: {
            min: -1,
            max: 1,
          },
          yAxis3D: {
            min: -1,
            max: 1,
          },
          zAxis3D: {
            min: -1,
            max: 1,
          },
          grid3D: {
            show: false,
            boxHeight: self.ringHeight,
            left: self.pieLeft,
            top: self.pieTop,
            viewControl: {
              alpha: self.alpha,
              rotateSensitivity: 0,
              zoomSensitivity: 0,
              panSensitivity: 0,
              autoRotate: false,
            },
            //后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
            postEffect: {
              //配置这项会出现锯齿，请自己去查看官方配置有办法解决
              enable: true,
              bloom: {
                enable: true,
                bloomIntensity: 0,
              },
              SSAO: {
                enable: true,
                quality: 'medium',
                radius: 2,
              },
            },
          },
          series: series,
        }
        return option
      }

      // 传入数据生成 option
      let option = getPie3D(self.pieData, 0.7)
      self.myChart.setOption(option)

      // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
      let selectedIndex = ''
      let hoveredIndex = ''

      // 监听点击事件，实现选中效果（单选）
      // myChart.on('click', function (params) {
      //   // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
      //   let isSelected = !option.series[params.seriesIndex].pieStatus.selected
      //   let isHovered = option.series[params.seriesIndex].pieStatus.hovered
      //   let k = option.series[params.seriesIndex].pieStatus.k
      //   let startRatio = option.series[params.seriesIndex].pieData.startRatio
      //   let endRatio = option.series[params.seriesIndex].pieData.endRatio

      //   // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
      //   if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
      //     option.series[selectedIndex].parametricEquation = getParametricEquation(option.series[selectedIndex].pieData.startRatio, option.series[selectedIndex].pieData.endRatio, false, false, k, option.series[selectedIndex].pieData.value)
      //     option.series[selectedIndex].pieStatus.selected = false
      //   }

      //   // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
      //   option.series[params.seriesIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, option.series[selectedIndex].pieData.value)
      //   option.series[params.seriesIndex].pieStatus.selected = isSelected

      //   // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
      //   isSelected ? (selectedIndex = params.seriesIndex) : null

      //   // 使用更新后的 option，渲染图表
      //   myChart.setOption(option)
      // })

      // 监听 mouseover，近似实现高亮（放大）效果
      self.myChart.on('mouseover', function (params) {
        // 准备重新渲染扇形所需的参数
        let isSelected
        let isHovered
        let startRatio
        let endRatio
        let k

        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          return

          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== '') {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected = option.series[hoveredIndex].pieStatus.selected
            isHovered = false
            startRatio = option.series[hoveredIndex].pieData.startRatio
            endRatio = option.series[hoveredIndex].pieData.endRatio
            k = option.series[hoveredIndex].pieStatus.k

            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            option.series[hoveredIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, 10)
            option.series[hoveredIndex].pieStatus.hovered = isHovered

            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = ''
          }

          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (params.seriesName !== 'mouseoutSeries') {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected = option.series[params.seriesIndex].pieStatus.selected
            isHovered = true
            startRatio = option.series[params.seriesIndex].pieData.startRatio
            endRatio = option.series[params.seriesIndex].pieData.endRatio
            k = option.series[params.seriesIndex].pieStatus.k

            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            option.series[params.seriesIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, self.selectItem)
            option.series[params.seriesIndex].pieStatus.hovered = isHovered

            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex
          }

          // 使用更新后的 option，渲染图表
          self.myChart.setOption(option)
        }
      })

      // 修正取消高亮失败的 bug
      self.myChart.on('globalout', function () {
        if (hoveredIndex !== '') {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          let isSelected = option.series[hoveredIndex].pieStatus.selected
          let isHovered = false
          let k = option.series[hoveredIndex].pieStatus.k
          let startRatio = option.series[hoveredIndex].pieData.startRatio
          let endRatio = option.series[hoveredIndex].pieData.endRatio

          // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
          option.series[hoveredIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, 10)
          option.series[hoveredIndex].pieStatus.hovered = isHovered

          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = ''
        }

        // 使用更新后的 option，渲染图表
        self.myChart.setOption(option)
      })
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
      return ''
    },
    do_EventCenter_messageSuccess(param) {
      console.log(param)
    },
  },
}
</script>
<style lang="less" scoped>
// .lineEchart {
//   width: 450px;
//   height: 230px;
// }
.lineEchart {
  width: 100%;
  height: 100%;
}
</style>
