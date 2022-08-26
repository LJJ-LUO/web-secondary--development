<template>
  <div class="statisticalPage">
    <div class="statisticalHead">
      <el-radio-group v-model="reportType" @change="reportChange">
        <el-radio-button label="日报"></el-radio-button>
        <el-radio-button label="月报"></el-radio-button>
        <el-radio-button label="年报"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="tabPage">
      <div class="statisticalDateOf">
        <div class="leftBox">
          <el-button class="marginR" type="primary" icon="el-icon-arrow-left" size="small" @click="addDate('reduce')">{{ pickerUp }}</el-button>
          <el-date-picker v-show="reportType === '日报'" class="marginR" v-model="selectDate" size="small" :editable="false" value-format="yyyy-MM-dd" key="date" type="date"></el-date-picker>
          <el-date-picker v-show="reportType === '月报'" class="marginR" v-model="selectDate" size="small" :editable="false" value-format="yyyy-MM" key="month" type="month"></el-date-picker>
          <el-date-picker v-show="reportType === '年报'" class="marginR" v-model="selectDate" size="small" :editable="false" value-format="yyyy" key="year" type="year"></el-date-picker>
          <el-button class="marginR" type="primary" size="small" @click="addDate('add')">
            {{ pickerDown }}
            <i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
          <el-button style="width: 80px" type="primary" size="small" @click="getReportsData">查询</el-button>
        </div>
        <el-button class="exportBtn" type="primary" size="small" @click="exportReportsData">导出</el-button>
      </div>
      <div ref="tableBox" class="tableBox">
        <div class="toplab">
          <div class="tableTop">
            <div class="title">电站名称</div>
            <div class="content">{{ reportObj.station_name }}</div>
          </div>
          <div class="tableTop" style="width: 30%">
            <div class="title">装机容量</div>
            <div class="content">{{ reportObj.machine_volume }}&nbsp;kWp</div>
          </div>
        </div>
        <el-table :data="tableData" max-height="500px" :summary-method="getSummaries" :cell-style="changeCellStyle" style="width: 100%">
          <el-table-column prop="name" label="" align="center" width="110" class-name="textClass"></el-table-column>
          <el-table-column prop="all" sortable align="center" min-width="120" :label="`总（${tableUnit}）`"></el-table-column>
          <el-table-column prop="jian" sortable align="center" min-width="120" :label="`尖（${tableUnit}）`"></el-table-column>
          <el-table-column prop="feng" sortable align="center" min-width="120" :label="`峰（${tableUnit}）`"></el-table-column>
          <el-table-column prop="ping" sortable align="center" min-width="120" :label="`平（${tableUnit}）`"></el-table-column>
          <el-table-column prop="gu" sortable align="center" min-width="120" :label="`谷（${tableUnit}）`"></el-table-column>
        </el-table>
        <div class="tabel_title">{{ powerGeneration }}</div>
        <el-table :data="deviationTableData" max-height="500px" :summary-method="getSummaries" :cell-style="changeCellStyle" style="width: 100%">
          <el-table-column prop="time" sortable :label="tableTitle" align="center" width="110"></el-table-column>
          <el-table-column prop="power_eq" sortable align="center" min-width="120" :label="`逆变器发电量（${deviationUnit}）`"></el-table-column>
          <el-table-column prop="power_db" sortable align="center" min-width="120" :label="`计量表发电量（${deviationUnit}）`"></el-table-column>
          <el-table-column prop="deviation_rate" sortable align="center" label="偏差率（%）"></el-table-column>
        </el-table>
        <div class="tabel_title">图表</div>
        <div ref="lineEchart" id="lineEchart" class="lineEchart"></div>
        <!-- <img :src="echartImg" style="width: 100%; height: 350px" alt="" /> -->
        <div class="tabel_title">逆变器事件报警</div>
        <el-table :data="alarmTableData" max-height="500px" :summary-method="getSummaries" :cell-style="changeCellStyle" style="width: 100%">
          <el-table-column prop="equipment_name" sortable label="逆变器名称" align="center" width="120"></el-table-column>
          <el-table-column prop="total_cnt" sortable align="center" label="总计" min-width="80"></el-table-column>
          <el-table-column prop="sg_cnt" sortable align="center" label="事故" min-width="80"></el-table-column>
          <el-table-column prop="yc_cnt" sortable align="center" label="异常" min-width="80"></el-table-column>
          <el-table-column prop="bw_cnt" sortable align="center" label="变位" min-width="80"></el-table-column>
          <el-table-column prop="gz_cnt" sortable align="center" label="告知" min-width="80"></el-table-column>
          <el-table-column prop="yx_cnt" sortable align="center" label="越限" min-width="80"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
// import appService from "@njsdata/app-sdk";
import eventActionDefine from './components/msgCompConfig'
import './index.css'
import { queryReportsData, exportReports } from './api/asset'
import * as echarts from 'echarts'
import moment from 'moment'
// 防抖
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
  name: 'App',
  props: {
    customConfig: Object,
  },
  computed: {
    pickerUp() {
      return this.reportType === '日报' ? '上一日' : this.reportType === '月报' ? '上一月' : '上一年'
    },
    pickerDown() {
      return this.reportType === '日报' ? '下一日' : this.reportType === '月报' ? '下一月' : '下一年'
    },
    powerGeneration() {
      return this.reportType === '日报' ? '日发电时段' : this.reportType === '月报' ? '月发电时段' : '年发电时段'
    },
    tableTitle() {
      return this.reportType === '日报' ? '时间' : this.reportType === '月报' ? '日期' : '月份'
    },
    deviationUnit() {
      return this.reportType === '年报' ? '万kWh' : 'kWh'
    },
    tableUnit() {
      return this.reportType === '日报' ? 'kWh' : '万kWh'
    },
  },
  data() {
    return {
      echartImg: '',
      timer: null,
      myChart: null,
      parmasType: '',
      paramsId: '',
      reportType: '日报',
      selectDate: '',
      tableData: [],
      alarmTableData: [],
      deviationTableData: [],
      xAxisData: [],
      eqData: [],
      dbData: [],
      rateData: [],
      tableHeight: 570,
      reportObj: {
        machine_volume: '',
        name: '',
      },
    }
  },
  created() {
    this.selectDate = moment(new Date()).format('YYYY-MM-DD')
  },
  mounted() {
    // this.dataType({ id: '1' })

    let { componentId } = this.customConfig || {}
    componentId && window.componentCenter?.register(componentId, 'comp', this, eventActionDefine)
    this.tableHeight = this.$refs.tableBox.offsetHeight
    // console.log('this.tableHeight',this.tableHeight);
    // this.getReportsData()
  },
  methods: {
    do_EventCenter_getId(val) {
      // console.log('val==================>', val)
      this.dataType(val)
    },
    Event_Center_getName() {
      return '统计报表ID参数接收'
    },
    // 参数类型判断
    dataType(val) {
      let { id } = val
      this.parmasType = typeof id
      if (typeof id === 'object') {
        let idArry = id
          .map((x) => {
            return x.id
          })
          .toString()
        this.paramsId = idArry
      } else {
        this.paramsId = id
      }
      if (this.paramsId != '' || this.paramsId[0] != '') {
        this.getReportsData()
      }
    },
    // 报表数据接口
    async getReportsData() {
      let params = {
        id: this.paramsId,
        date: this.selectDate,
      }
      console.log('params=============>', params)
      if (params.id == '' || params.id[0] == '') return
      let { data } = await queryReportsData(params)
      let { electricityStatistics, generateElectricity, alarmReport } = data
      this.reportObj = {
        station_name: electricityStatistics.station_name,
        machine_volume: electricityStatistics.station_id,
      }
      this.tableData = [
        {
          name: '发电量',
          all: electricityStatistics.power_all,
          jian: electricityStatistics.power_j,
          feng: electricityStatistics.power_f,
          ping: electricityStatistics.power_p,
          gu: electricityStatistics.power_g,
        },
        {
          name: '上网电量',
          all: electricityStatistics.swdl_all,
          jian: electricityStatistics.swdl_j,
          feng: electricityStatistics.swdl_f,
          ping: electricityStatistics.swdl_p,
          gu: electricityStatistics.swdl_g,
        },
        {
          name: '自发自用电量',
          all: electricityStatistics.zfzydl_all,
          jian: electricityStatistics.zfzydl_j,
          feng: electricityStatistics.zfzydl_f,
          ping: electricityStatistics.zfzydl_p,
          gu: electricityStatistics.zfzydl_g,
        },
      ]
      this.alarmTableData = alarmReport
      this.xAxisData = []
      this.eqData = []
      this.dbData = []
      this.rateData = []
      this.deviationTableData = generateElectricity.map((x) => {
        x.time = '6:00'
        this.xAxisData.push(x.time)
        if (this.reportType === '日报') {
          let end = parseInt(x.time.split(':')[0]) + 1 + ':00'
          x.time = x.time + '-' + end
        }
        this.eqData.push(x.power_eq)
        this.dbData.push(x.power_db)
        this.rateData.push(x.deviation_rate)
        return x
      })
      // console.log('data', data)
      // console.log('this.tableData', this.tableData)
      // console.log('this.alarmTableData', this.alarmTableData)
      // console.log('generateElectricity', generateElectricity)
      this.initEcharts()
    },
    // 报表导出
    AsciiToString(asccode) {
      return String.fromCharCode(asccode)
    },
    UrlDecode(zipStr) {
      var uzipStr = ''
      for (var i = 0; i < zipStr.length; i += 1) {
        var chr = zipStr.charAt(i)
        if (chr === '+') {
          uzipStr += ' '
        } else if (chr === '%') {
          var asc = zipStr.substring(i + 1, i + 3)
          if (parseInt('0x' + asc) > 0x7f) {
            uzipStr += decodeURI('%' + asc.toString() + zipStr.substring(i + 3, i + 9).toString())
            i += 8
          } else {
            uzipStr += this.AsciiToString(parseInt('0x' + asc))
            i += 2
          }
        } else {
          uzipStr += chr
        }
      }

      return uzipStr
    },
    async exportReportsData() {
      let echartImg = this.myChart.getDataURL({
        pixelRatio: 2,
      })
      // echartImg = await this.translateBase64ImgToBlob(echartImg, 'image/jpeg')
      // console.log('echartImg', echartImg)
      // let fileIm = new FormData()
      // fileIm.append('file', echartImg, 'echartImg.image')
      let params = {
        id: this.paramsId,
        decode: echartImg,
        time: this.selectDate,
      }
      exportReports(params)
        .then((res) => {
          const temp = res.headers['content-disposition'].split('=')[1] // 对文件名乱码转义--【Node.js】使用iconv-lite解决中文乱码
          let iconv = require('iconv-lite')
          iconv.skipDecodeWarning = true //忽略警告
          let fileName = iconv.decode(temp, 'utf-8')
          const _res = res.data
          let blob = new Blob([_res])
          let downloadElement = document.createElement('a')
          let href = window.URL.createObjectURL(blob) //创建下载的链接
          downloadElement.href = href
          let fileNameNew = this.UrlDecode(fileName)
          downloadElement.download = fileNameNew //下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() //点击下载
          document.body.removeChild(downloadElement) //下载完成移除元素
          window.URL.revokeObjectURL(href) //释放掉blob对象

          // var blob = res.data
          // // FileReader主要用于将文件内容读入内存
          // var reader = new FileReader()
          // reader.readAsDataURL(blob)
          // // onload当读取操作成功完成时调用
          // reader.onload = function (e) {
          //   var a = document.createElement('a')
          //   // 获取文件名fileName
          //   var fileName = res.headers['content-disposition'].split('=')
          //   fileName = fileName[fileName.length - 1]
          //   fileName = decodeURI(fileName)
          //   a.download = fileName
          //   a.href = e.target.result
          //   document.body.appendChild(a)
          //   a.click()
          //   document.body.removeChild(a)
          // }
        })
        .catch((err) => {
          // this.$message.error('导出失败')
          alert('导出失败')
        })
    },
    // 报表切换
    reportChange(val) {
      console.log('报表类型', val)
      switch (val) {
        case '日报':
          this.selectDate = moment(new Date()).format('YYYY-MM-DD')
          break
        case '月报':
          this.selectDate = moment(new Date()).format('YYYY-MM')
          break
        default:
          this.selectDate = moment(new Date()).format('YYYY')
          break
      }
      this.getReportsData()
      this.initEcharts()
    },
    // 合计
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map((item) => Number(item[column.property]))
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = sums[index].toFixed(2)
          sums[index] += ''
        } else {
          sums[index] = 'N/A'
        }
      })
      return sums
    },
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label === '时间' || row.column.label === '日期' || row.column.label === '月份') {
        return 'font-weight: 700' // 修改的样式
      } else {
        return ''
      }
    },
    // 日期加减
    addDate(type) {
      if (this.reportType === '日报') {
        if (type === 'reduce') {
          this.selectDate = moment(this.selectDate).subtract(1, 'day').startOf('day').format('YYYY-MM-DD')
        } else {
          this.selectDate = moment(this.selectDate).add(1, 'day').startOf('day').format('YYYY-MM-DD')
        }
      } else if (this.reportType === '月报') {
        if (type === 'reduce') {
          this.selectDate = moment(this.selectDate).subtract(1, 'month').startOf('month').format('YYYY-MM')
        } else {
          this.selectDate = moment(this.selectDate).add(1, 'month').startOf('month').format('YYYY-MM')
        }
      } else if (this.reportType === '年报') {
        if (type === 'reduce') {
          this.selectDate = moment(this.selectDate).subtract(1, 'year').startOf('year').format('YYYY')
        } else {
          this.selectDate = moment(this.selectDate).add(1, 'year').startOf('year').format('YYYY')
        }
      }
    },
    // 初始化图表
    initEcharts() {
      const colors = ['#70b603', '#027db4', '#0000bf']
      if (this.myChart !== null && this.myChart !== '' && this.myChart !== undefined) {
        this.myChart.dispose() //销毁
      }
      let lineEchart = this.$refs.lineEchart
      this.myChart = echarts.init(lineEchart)
      let option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        grid: {
          left: '4%',
          right: '4%',
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: { show: true },
        //   },
        // },
        legend: {
          itemHeight: 18,
          itemWidth: 36,
          itemGap: 200,
          icon: 'rect',
          data: [
            {
              name: '发电量(逆变器)',
              icon: 'rect',
            },
            {
              name: '发电量(计量表)',
              icon: 'rect',
            },
            {
              name: '偏差率',
              icon: '',
            },
          ],
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            data: this.xAxisData,
          },
        ],
        yAxis: [
          // {
          //   type: 'value',
          //   name: 'h',
          //   position: 'right',
          //   alignTicks: true,
          //   nameTextStyle: {
          //     color: '#9898b3',
          //   },
          //   axisLine: {
          //     show: true,
          //     lineStyle: {
          //       color: '#ebebeb',
          //     },
          //   },
          //   axisLabel: {
          //     color: '#333',
          //     formatter: '{value}',
          //   },
          //   splitLine: {
          //     show: false, // y轴网格线
          //   },
          // },
          {
            type: 'value',
            name: '%',
            position: 'right',
            alignTicks: true,
            offset: 0,
            nameTextStyle: {
              color: '#9898b3',
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ebebeb',
              },
            },
            axisLabel: {
              color: '#333',
              formatter: '{value}',
            },
            splitLine: {
              show: false, // y轴网格线
            },
          },
          {
            type: 'value',
            name: this.deviationUnit,
            position: 'left',
            alignTicks: true,
            nameTextStyle: {
              color: '#9898b3',
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ebebeb',
              },
            },
            axisLabel: {
              color: '#333',
              formatter: '{value}',
            },
            splitLine: {
              show: false, // y轴网格线
            },
          },
        ],
        series: [
          {
            name: '发电量(逆变器)',
            type: 'bar',
            barWidth: 30,
            data: this.eqData,
          },
          {
            name: '发电量(计量表)',
            type: 'bar',
            barWidth: 30,
            // yAxisIndex: 1,
            data: this.dbData,
          },
          {
            name: '偏差率',
            type: 'line',
            showSymbol: false,
            smooth: true,
            yAxisIndex: 1,
            data: this.rateData,
          },
        ],
      }

      option && this.myChart.setOption(option)
      const task = () => {
        this.myChart.resize()
      }
      window.addEventListener('resize', debounce(task, 300))
    },
    stringToByte(str) {
      var bytes = new Array()
      var len, c
      len = str.length
      for (var i = 0; i < len; i++) {
        c = str.charCodeAt(i)
        if (c >= 0x010000 && c <= 0x10ffff) {
          bytes.push(((c >> 18) & 0x07) | 0xf0)
          bytes.push(((c >> 12) & 0x3f) | 0x80)
          bytes.push(((c >> 6) & 0x3f) | 0x80)
          bytes.push((c & 0x3f) | 0x80)
        } else if (c >= 0x000800 && c <= 0x00ffff) {
          bytes.push(((c >> 12) & 0x0f) | 0xe0)
          bytes.push(((c >> 6) & 0x3f) | 0x80)
          bytes.push((c & 0x3f) | 0x80)
        } else if (c >= 0x000080 && c <= 0x0007ff) {
          bytes.push(((c >> 6) & 0x1f) | 0xc0)
          bytes.push((c & 0x3f) | 0x80)
        } else {
          bytes.push(c & 0xff)
        }
      }
      return bytes
    },
    translateBase64ImgToBlob(base64, contentType) {
      let arr = base64.split(',') //去掉base64格式图片的头部
      let bstr = atob(arr[1]) //atob()方法将数据解码
      let leng = bstr.length
      let u8arr = new Uint8Array(leng)
      while (leng--) {
        u8arr[leng] = bstr.charCodeAt(leng) //返回指定位置的字符的 Unicode 编码
      }
      let blob = new Blob([u8arr], { type: contentType })
      // var blobImg = {}
      // blobImg.url = URL.createObjectURL(blob) //创建URL
      // blobImg.name = new Date().getTime() + '.png'
      return blob
    },
  },
  destroyed() {
    window.componentCenter?.removeInstance(this.customConfig?.componentId)
  },
}
</script>

<style lang="less" scoped>
/deep/.el-picker-panel {
  position: absolute;
  z-index: 222;
}
.statisticalPage {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  height: calc(100% - 20px);
  padding: 0 20px 20px 20px;
  .statisticalHead {
    margin-top: 20px;
    width: 100%;
    min-width: 500px;
    /deep/.el-radio-button__inner {
      width: 140px;
    }
  }

  .tabPage {
    margin-top: 25px;
    height: calc(100% - 100px);
    min-width: 680px;
    .statisticalDateOf {
      display: flex;
      align-items: center;
      .leftBox {
        .marginR {
          margin-right: 20px;
        }
      }
      .exportBtn {
        margin-left: auto;
        margin-right: 20px;
        right: 0px;
        width: 80px;
      }
    }
    .tableBox {
      background: #ffffff;
      margin-top: 20px;
      padding: 0 20px;
      padding-bottom: 20px;
      box-shadow: 0 0 5px 5px #f3f4f5;
      padding-top: 10px;
      height: calc(100% - 70px);
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 6px;
        height: 8px;
        background: #f5f5f5;
      }
      /*定义滑块内阴影+圆角*/
      &::-webkit-scrollbar-thumb {
        background: #333333;
        border-radius: 10px;
      }

      /*定义滚动条轨道内阴影+圆角*/
      &::-webkit-scrollbar-track {
        background: #fff;
      }

      .toplab {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .tableTop {
          display: flex;
          align-items: center;
          width: 70%;
          font-size: 14px;
          line-height: 48px;
          text-align: left;
          border-top: 1px solid #ebedf0;
          .title {
            text-indent: 25px;
            font-weight: 700;
            width: 110px;
            min-width: 110px;
            background: #f8f8f8;
          }
          .content {
            padding-left: 20px;
            color: #333333;
          }
        }
      }
      /deep/.el-table {
        .textClass {
          font-weight: 700;
        }
        th.el-table__cell {
          background: #f8f8f8;
          color: #000;
        }
        .el-table__body td.el-table__cell {
          &:first-child {
            background: #f8f8f8;
          }
        }
        .el-table__footer-wrapper {
          td.el-table__cell {
            &:first-child {
              background: #f8f8f8;
              font-weight: bold;
            }
            &:nth-child(n + 2) {
              background: #ffffff;
              font-weight: bold;
            }
          }
        }
      }

      .tabel_title {
        margin-top: 15px;
        width: 100%;
        height: 30px;
        font-size: 16px;
        color: #333333;
      }
      .lineEchart {
        width: 100%;
        height: 350px;
      }
    }
  }
}
</style>
