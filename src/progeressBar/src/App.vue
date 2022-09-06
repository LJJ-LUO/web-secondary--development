<template>
  <div className="analyzer-vue-demo" class="veu-demo" :style="{
    width: '100%',
    height: '100%',
  
  }" ref="rock_div">
    <div ref="rockEcharts" class="rockEcharts">

    </div>


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


import * as echarts from "echarts";

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
      colorArr: [], radiusP: [['40%', '50%'], ['48%', '60%']],
      piePosition: { center: [], legend: [['60%', '50%'], ['60%', '20%']] },
      legendS: {},
      legTextSty: {},
      tleShow: true,
      titleText: {},
      titleStyle: {},
      totalStyle: {},
      legAppoint: {}
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
  },
  mounted() {

    this.colorArr = this.options?.externalVariables?.数据系列颜色 != undefined ? this.options?.externalVariables?.数据系列颜色.split(',') : []
    if (this.options?.externalVariables?.内半径 != undefined) {
      let temp = this.options?.externalVariables?.内半径?.split(',')
      temp.forEach((x, i) => {
        this.radiusP[0][i] = x || this.radiusP[0][i]
      })
    }
    if (this.options?.externalVariables?.外半径 != undefined) {
      let temp = this.options?.externalVariables?.外半径?.split(',')
      temp.forEach((x, i) => {
        this.radiusP[1][i] = x || this.radiusP[1][i]
      })
    }
    // this.radiusP[0] = this.options?.externalVariables?.内半径 || this.radiusP[0]
    // this.radiusP[1] = this.options?.externalVariables?.外半径 || this.radiusP[1]
    this.piePosition.center[0] = this.options?.externalVariables?.饼图水平位置 ? Number(this.options?.externalVariables?.饼图水平位置) + '%' : '50%'
    this.piePosition.center[1] = this.options?.externalVariables?.饼图垂直位置 ? Number(this.options?.externalVariables?.饼图垂直位置) + '%' : '50%'
    if (this.options?.externalVariables?.图例水平位置 != undefined) {
      let temp = this.options?.externalVariables?.图例水平位置?.split(',')
      temp.forEach((x, i) => {
        this.piePosition.legend[0][i] = x || this.piePosition.legend[0][i]
      })
    }
    if (this.options?.externalVariables?.图例垂直位置 != undefined) {
      let temp = this.options?.externalVariables?.图例垂直位置?.split(',')
      temp.forEach((x, i) => {
        this.piePosition.legend[1][i] = x || this.piePosition.legend[1][i]
      })
    }
    // this.piePosition.legend[0] = this.options?.externalVariables?.图例水平位置 || '60%'
    // this.piePosition.legend[1] = this.options?.externalVariables?.图例垂直位置 || '50%'
    this.piePosition.left = this.options?.externalVariables?.标题水平位置 || 'center'
    this.piePosition.top = this.options?.externalVariables?.标题垂直位置 || 'center'
    this.legendS.itemWidth = this.options?.externalVariables?.图例图形宽 || '25'
    this.legendS.itemHeight = this.options?.externalVariables?.图例图形高 || '14'
    this.legendS.width = this.options?.externalVariables?.图例宽 || undefined
    this.legTextSty.fontSize = this.options?.externalVariables?.图例文字大小 || ''
    this.legTextSty.fontFamily = this.options?.externalVariables?.图例文字字体 || ''
    this.tleShow = this.options?.externalVariables?.标题显示 == 'true' ? true : false
    this.titleText.title = this.options?.externalVariables?.标题内容 || '电站总数'
    this.titleText.unit = this.options?.externalVariables?.单位内容 || ''
    this.titleStyle.fontSize = this.options?.externalVariables?.标题文字大小 || '16'
    this.titleStyle.fontFamily = this.options?.externalVariables?.标题字体 || ''
    this.titleStyle.color = this.options?.externalVariables?.标题颜色 || ''
    this.totalStyle.fontSize = this.options?.externalVariables?.总计字体大小 || ''
    this.totalStyle.fontFamily = this.options?.externalVariables?.总计字体 || ''
    this.totalStyle.color = this.options?.externalVariables?.总计颜色 || ''
    this.totalStyle.fontWeight = this.options?.externalVariables?.总计加粗 == 'true' ? 'bold' : 'normal'
    this.legAppoint.text = this.options?.externalVariables?.跳转图例
    this.legAppoint.location = this.options?.externalVariables?.跳转地址 || 'https://www.baidu.com/'
    this.$refs.rock_div.parentNode.style.height = "100%"
    this.$refs.rock_div.parentNode.style.width = "100%"
    this.$refs.rock_div.parentNode.parentNode.style.minHeight = "0"



    this.dataFn()

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
    // this.initFn()
  },
  methods: {
    initFn(series, legend) {
      let scaleData = []
      series.forEach(x => {
        console.log(x);
        scaleData.push(...x.data)
      })
      let sum = 0
      scaleData.forEach(x => {
        sum += Number(x.value)
      })

      let options = {
        title: {
          text: `{name|${this.titleText.title}}\n{val|${sum}}{a|${this.titleText.unit}}`,
          show: this.tleShow,
          left: this.piePosition.left,
          top: this.piePosition.top,
          textStyle: {
            fontWeight: 'normal',
            color: '#c9c9c9',
            fontSize: '16', rich: {
              name: {
                fontSize: this.titleStyle.fontSize,
                fontFamily: this.titleStyle.fontFamily,
                color: this.titleStyle.color,
                align: 'center',
                fontWeight: 'normal',
                padding: [10, 0],

              },
              val: {
                fontSize: this.totalStyle.fontSize,
                fontFamily: this.totalStyle.fontFamily,
                color: this.totalStyle.color,
                align: 'center',
                fontWeight: this.totalStyle.fontWeight,

              },
              a: {
                fontSize: this.titleStyle.fontSize,
                fontFamily: this.titleStyle.fontFamily,
                color: this.titleStyle.color,
                align: 'center',
                fontWeight: 'normal',

              },
            },
          },
        },
        legend,

        tooltip: {
          trigger: 'item',
          padding: [10, 10, 10, 10],
          formatter: "{b} :<br/> {d}%",
        },
        series
      }
      let Gechart = echarts.init(this.$refs.rockEcharts);
      // console.log(options);
      let that = this
      Gechart.on('legendselectchanged', function (obj) {
        if (that.legAppoint.text) {
          let temp = that.legAppoint.text.split(',')
          temp.forEach((x, i) => {
            if (obj.name == x) {
              console.log(that.legAppoint.location.split(',')[i]);
              window.PubSub.publish('menuClick', {
                key: ` ${that.legAppoint.location.split(',')[i]}`,
                isSubMenu: 1,
                pubsubParams: ''
              });
              // window.location.href = that.legAppoint.location.split(',')[i]
            }
          })
        }

        // window.location.href = 'https://www.baidu.com/?tn=02003390_25_hao_pg'
        // 使用 legendToggleSelect Action 会重新触发 legendselectchanged Event，导致本函数重复运行
        // 使得 无 selected 对象


      })
      Gechart.setOption(options);
      options && Gechart.setOption(options);
      const task = () => {
        Gechart.resize();
      };
      window.addEventListener("resize", debounce(task, 300));
    },
    dataFn() {
      let tableD = JSON.parse(JSON.stringify(this.dataSource))
      tableD.shift()
      let temp = this.suanHandle(tableD)
      let series = []
      let legend = []
      let ci = 0

      temp.forEach((x, i) => {
        let data = []
        let data2 = []
        x.forEach((t, id) => {
          data.push({
            name: t[1], value: t[0], itemStyle: { color: this.colorArr[ci] || null }

          })
          ci++
          data2.push(t[1])
        })


        series[i] = {
          type: 'pie',
          radius: [this.radiusP[0][i], this.radiusP[1][i]],
          center: [this.piePosition.center[0], this.piePosition.center[1]],
          // radius: [40 + i * 8 + '%', 45 + i * 8 + '%'],
          label: { show: false, },
          labelLine: { show: false, },
          data
        }
        legend[i] = {
          formatter: function (name) {
            const item = data.find((i) => {
              return i.name === name;
            });
            return `{name|${name}}{percent|${item.value}}`
          },
          orient: 'vertical',
          left: this.piePosition.legend[0][i],
          top: this.piePosition.legend[1][i],
          data,
          itemWidth: Number(this.legendS.itemWidth),
          itemHeight: Number(this.legendS.itemHeight),
          textStyle: {
            color: 'auto',
            fontSize: '16',
            width: this.legendS.width ? Number(this.legendS.width) : undefined,

            rich: {
              name: {
                width: 80,
                fontSize: this.legTextSty.fontSize,
                fontFamily: this.legTextSty.fontFamily,
              },
              percent: {
                width: 10,
                align: "right",
                fontSize: this.legTextSty.fontSize,
                fontFamily: this.legTextSty.fontFamily,
              },

            },
          }
        }
      })
      this.initFn(series, legend)
    },
    suanHandle(arr) {
      let a = {}
      let b = []
      let lastArr = []
      let typeA = Math.round(arr[0]?.length / 2)
      for (let y = 0; y < typeA; y++) {
        b = []
        a = {}
        arr.forEach(x => {
          let key = x[2 * y]
          if (a[key] >= 0) {
            a[key] += Number(x[2 * y + 1])
          } else {
            a[key] = Number(x[2 * y + 1])
          }
        })
        let i = 0

        for (let key in a) {
          b[i] = [Number(a[key].toFixed(2)), key]
          i++
        }
        b.sort(function (a, b) {
          return b[0] - a[0]
        })
        lastArr.push(JSON.parse(JSON.stringify(b)))

      }
      return lastArr
    },
    clickTestFn() {
      console.log(this.legAppoint.location.split(',')[0], '===========');
      window.PubSub.publish('menuClick', {
        key: `${this.legAppoint.location.split(',')[0]}`,
        isSubMenu: 1,
        pubsubParams: ''
      });
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
      return "进度环";
    },
    do_EventCenter_messageSuccess(param) {
      console.log(param);
      alert("动作执行成功！");
    },
  },
};
</script>

<style lang="less" scoped>
.veu-demo {
  position: relative;

  .temp {
    position: absolute;
    top: 10px;

    button {
      width: 100px;
      height: 100px;
    }
  }
}

.rockEcharts {
  height: 100%;



}
</style>
