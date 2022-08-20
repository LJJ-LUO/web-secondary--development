<template>
  <div class="metting_all">
    <!-- 会议位置标题 -->
    <div class="metting_title">
      <div>人工点名</div>
      <img src="./assets/quit.png" alt="" @click="outMett" />
    </div>
    <!-- 会议 -->
    <div class="metting">
      <!-- 上侧 -->
      <div class="metting_top">
        <!-- 会场终端 -->
        <div class="metting_table">
          <div class="table_title">
            <img src="./assets/ico_dw.png" alt="" />
            <div>会场终端</div>
            <img style="margin-left: 35%" src="./assets/ico_ty.png" alt="" />
          </div>
          <!-- 搜索 -->
          <div class="metting_search">
            <el-input placeholder="请输入搜索关键字" clearable v-model="mettName"></el-input>
            <el-button icon="el-icon-search" @click="inputChange">查询</el-button>
          </div>
          <!-- 切换 -->
          <!-- <div class="radio_search">
            <el-radio-group v-model="radioSearch" size="small">
              <el-radio-button label="4" :class="radioSearch == '4' ? radioStyle : ''" @click.native.prevent="changRadio(4)">终端</el-radio-button>
              <el-radio-button label="1" :class="radioSearch == '1' ? radioStyle : ''" @click.native.prevent="changRadio(1)">本地</el-radio-button>
              <el-radio-button label="2" :class="radioSearch == '2' ? radioStyle : ''" @click.native.prevent="changRadio(2)">融合</el-radio-button>
              <el-radio-button label="3" :class="radioSearch == '3' ? radioStyle : ''" @click.native.prevent="changRadio(3)">监控</el-radio-button>
            </el-radio-group>
          </div> -->
          <!-- 表格 -->
          <el-table :data="tableData" height="77%" :header-cell-style="{ background: '#012641', borderBottom: '1px solid #013657' }">
            <el-table-column prop="name" label="会场名称" :show-overflow-tooltip="true" header-align="center" align="center" width="230"></el-table-column>
            <el-table-column prop="hw_addr" label="会场标识" :show-overflow-tooltip="true" header-align="center" align="center" width="250"></el-table-column>
            <el-table-column c label="操作" header-align="center" align="center">
              <template slot-scope="scope">
                <el-row v-if="scope.row.status == 1" :gutter="20">
                  <el-col :span="3">
                    <div class="table_img">
                      <div v-if="!scope.row.is_main || scope.row.is_main == false">&nbsp;</div>
                      <img v-if="scope.row.is_main == true" src="./assets/user_2.png" />
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="table_img">
                      <!-- <img v-if="!scope.row.checked" src="./assets/nothand1.png" @click="callRoll(scope.row)" /> -->
                      <img v-if="scope.row.checked == 0" src="./assets/handle.png" @click="callRoll(scope.row)" />
                      <img v-if="scope.row.checked == 1" src="./assets/isHandel.png" @click="callRoll(scope.row)" />
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="table_img">
                      <img v-if="!scope.row.mic_status" src="./assets/notMic1.png" />
                      <img v-if="scope.row.mic_status == 'on'" src="./assets/mic2.png" @click="handleTabelIcon(scope.row, 'micCall', 0)" />
                      <img v-if="scope.row.mic_status == 'off'" src="./assets/mic_2.png" @click="handleTabelIcon(scope.row, 'micCall', 1)" />
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="table_img">
                      <img v-if="!scope.row.mic_status" src="./assets/notOutMic.png" />
                      <img v-if="scope.row.mic_status == 'on'" src="./assets/mic_3.png" />
                      <img v-if="scope.row.mic_status == 'off'" src="./assets/mic_4.png" />
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="table_img">
                      <img v-if="!scope.row.vol_status" src="./assets/notVoice.png" />
                      <img v-if="scope.row.vol_status == 'on'" src="./assets/horn_1.png" @click="handleTabelIcon(scope.row, 'loudspeaker', 0)" />
                      <img v-if="scope.row.vol_status == 'off'" src="./assets/horn_2.png" @click="handleTabelIcon(scope.row, 'loudspeaker', 1)" />
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="table_img">
                      <img src="./assets/Hangup.png" alt="" @click="handleTabelIcon(scope.row, 'hangup')" />
                    </div>
                  </el-col>
                </el-row>
                <el-row v-else :gutter="20">
                  <el-col :span="3">
                    <div class="table_img">
                      <img src="./assets/call_2.png" @click="handleTabelIcon(scope.row, 'recall')" />
                    </div>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 直播视频 -->
        <div class="metting_tool">
          <div class="tool_title">
            <img src="./assets/ico_dw.png" alt="" />
            <div>点名画面</div>
            <img style="margin-left: 12%" src="./assets/ico_ty.png" alt="" />
          </div>
          <div class="metting_live">
            <flv-video ref="flvVideo" class="flvVideo" :mettItem="selectMett"></flv-video>
            <!-- <img src="https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg" alt="" /> -->
          </div>
        </div>
      </div>
      <!-- 下侧 -->
      <div class="metting_bottom">
        <!-- 标题 -->
        <div class="live_title">
          <img src="./assets/ico_dw.png" alt="" />
          <div>本地</div>
          <img src="./assets/ico_ty.png" alt="" />
        </div>
        <div class="live_radio">
          <!-- 视频 -->
          <el-row :gutter="20" class="live_row">
            <el-col :span="8" class="live_col">
              <div>视频:</div>
              <el-radio-group v-model="rollItem.video_status" class="live_radio">
                <el-radio label="on">正常</el-radio>
                <el-radio label="off">异常</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="8" class="live_col">
              <div>音频:</div>
              <el-radio-group v-model="rollItem.audio_status" class="live_radio">
                <el-radio label="on">正常</el-radio>
                <el-radio label="off">异常</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="8" class="live_col">
              <div>网络:</div>
              <el-radio-group v-model="rollItem.network_status" class="live_radio">
                <el-radio label="on">正常</el-radio>
                <el-radio label="off">异常</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <!-- 备注 -->
          <div class="live_remarks">
            <div class="live_textarea">
              <div>备注:</div>
              <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="rollItem.notes"> </el-input>
            </div>
          </div>
          <el-button type="primary" class="live_button" @click="saveRoll">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './index.css'
import flvVideo from './components/flvVideo.vue'
import { creatMeeting, finishMetting, artificalVideoList, callTheRollForm, micCall, loudspeaker, recall, hangup } from './api/asset'

export default {
  name: 'dianMing',
  props: {
    customConfig: Object,
  },
  components: {
    flvVideo,
  },
  data() {
    return {
      creatMeetId: '',
      // 表格数据
      tableData: [],
      tableDataCopy: [],
      mettingInfo: {},
      mettName: '',
      // 单选框样式
      radioStyle: 'radioSearch_color',
      radioSearch: '',
      checkBoxSearch: '',
      rollList: [],
      rollItem: {
        conference_id: null,
        terminal_id: null,
        video_status: '',
        audio_status: '',
        network_status: '',
        notes: '',
        parent_id: '',
      },
      selectMett: {},
    }
  },
  created() {
    // this.creatMetting()
  },
  mounted() {
    this.getParams()
    let { componentId } = this.customConfig || {}
    componentId && window.componentCenter?.register(componentId, 'comp', this, eventActionDefine)
  },

  methods: {
    getParams() {
      let str = location.search.substr(1).split('&')
      let obj = {}
      str.forEach((e) => {
        let list = e.split('=')
        obj[list[0]] = list[1]
      })
      this.creatMeetId = obj.data_id
      if (obj.meeting_id == '') {
        this.creatMetting()
      } else {
        this.mettingInfo.conference_id = obj.meeting_id
        this.getTableList()
        this.rollItem.conference_id = parseInt(this.mettingInfo.conference_id)
        this.rollItem.parent_id = this.creatMeetId
      }
    },
    // 创建会议
    async creatMetting() {
      // this.creatMeetId = '283e4c1ed46644c1930618064025b028hyxj'
      const params = {
        id: this.creatMeetId,
        type: 2,
      }
      let { data } = await creatMeeting(params)
      this.mettingInfo = data
      this.getTableList()
      this.rollItem.conference_id = parseInt(data.conference_id)
      this.rollItem.parent_id = this.creatMeetId
    },
    // 点名资源
    async getTableList() {
      const params = {
        conference_id: this.mettingInfo.conference_id,
      }
      let { data } = await artificalVideoList(params)
      this.tableData = data
      this.tableDataCopy = data
      console.log('data===', data)
    },
    // 表格数据
    // async getArtificalList() {
    //   const params = {
    //     conference_id: parseInt(this.mettingInfo.conference_id),
    //     external: '',
    //   }
    //   let { data } = await artificalVideoList(params)
    //   this.rollList = data

    //   console.log('rollList===', this.rollList)
    // },
    // 点名表单
    async rollForm() {
      let res = await callTheRollForm(this.rollItem)
      console.log('res===', res)
    },

    async outMett() {
      let params = {
        conference_id: this.mettingInfo.conference_id,
        data_id: this.creatMeetId,
        type: 2, //1 紧急会议 0 普通会议
      }
      let res = await finishMetting(params)
      console.log('结束会议===', res)
    },

    // 搜索
    inputChange() {
      let arraylist = JSON.parse(JSON.stringify(this.tableDataCopy))
      if (this.mettName == '') {
        this.getTableList()
      } else {
        this.tableData = arraylist.filter((x) => {
          return x.name.includes(this.mettName.toString())
        })
      }
      arraylist = []
    },

    // 切换表格
    changRadio(e) {
      if (this.radioSearch && this.radioSearch == e) {
        this.radioSearch = ''
        this.getTableList()
        return
      }
      this.radioSearch = e
      let filterList = []
      let dataList = JSON.parse(JSON.stringify(this.tableDataCopy))
      dataList.forEach((item, index) => {
        if (e != '4' && item.type == e) {
          filterList.push(item)
        } else if (e == '4' && item.type == '0') {
          filterList.push(item)
        }
      })
      this.tableData = filterList
    },

    // 触发图标事件
    async handleTabelIcon(row, type, status) {
      let dataForm = {
        conference_id: this.mettingInfo.conference_id,
        terminal_id: row.id,
      }
      // // 主席设置
      if (type == 'recall') {
        recall(dataForm).then((res) => {})
      }
      // 麦克风控制
      if (type == 'micCall') {
        dataForm.status = status
        micCall(dataForm).then((res) => {})
      }
      // 扬声器控制
      if (type == 'loudspeaker') {
        dataForm.status = status
        loudspeaker(dataForm).then((res) => {})
      }
      // 挂断
      if (type == 'hangup') {
        let form = {
          conference_id: this.mettingInfo.conference_id,
          terminal_id: [row.id],
        }
        hangup(form).then((res) => {})
      }
      await this.getTableList()
    },

    // 点名
    callRoll(row) {
      if (this.rollItem.terminal_id != row.id) {
        this.rollItem = {
          terminal_id: row.id,
          video_status: '',
          audio_status: '',
          network_status: '',
          notes: '',
        }
      }
      this.selectMett = row
      this.$refs.flvVideo.mpegts_destroy()
      this.$refs.flvVideo.initMpegts()
    },

    // 保存
    saveRoll() {
      console.log('this.rollItem', this.rollItem)
      this.rollForm()
      this.getParams()
    },

    triggerEvent() {
      let { componentId, appId } = this.customConfig || {}
      componentId &&
        appId &&
        window.eventCenter?.triggerEventNew({
          objectId: appId,
          componentId: componentId,
          type: 'app',
          event: '',
          payload: {
            value: '',
          },
        })
    },
    do_EventCenter_getMettingInfo(params) {
      // 三个值给你，data_id,meeting_id,type
      // {
      //   data_id: "283e4c1ed46644c1930618064025b028hyxj",
      //   meeting_id: "xxxxxxxxxxxxxxxxxxxxxx",
      //   type: 2
      // }
      console.log('会议信息', params)
      // this.creatMeetId = params.data_id
      // if (params.meeting_id == '') {
      //   this.creatMetting()
      // } else {
      //   this.mettingInfo.conference_id = params.meeting_id
      //   this.getTableList()
      //   this.rollItem.conference_id = parseInt(this.mettingInfo.conference_id)
      //   this.rollItem.parent_id = this.creatMeetId
      // }
    },
    Event_Center_getName() {
      return '接收会议信息'
    },
  },

  destroyed() {
    window.componentCenter?.removeInstance(this.customConfig?.componentId)
  },
}
</script>

<style lang="less" scoped>
// 会议整体
.metting_all {
  width: 100%;
  height: 100%;
  padding: 30px 10px 0 10px;
  background: #001529;
  box-sizing: border-box;
  z-index: -1;
}
// 会议位置标题
.metting_title {
  width: 100%;
  position: absolute;
  top: 8px;
  color: #ffffff;
  font-size: 21px;
}
// 退出标题
.metting_title img {
  position: absolute;
  right: 1%;
  top: 3px;
  width: 26px;
  height: 26px;
}
// 会议
.metting {
  width: 100%;
  height: 100%;
  padding-top: 15px;
  box-sizing: border-box;
}
// 会议上侧
.metting_top {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  // 左侧表格
  .metting_table {
    width: 60%;
    height: 100%;
    border: 1px solid #00a6d3;
    border-top-left-radius: 20px;
  }
  // 表格标题
  .table_title {
    margin-left: -3px;
    background: url('./assets/bg_title@2x.png') no-repeat;
    color: #ffffff;
    height: 35px;
    line-height: 35px;
    width: 70%;
    font-size: 15px;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .table_title img:first-child {
    margin: 3px 4px 0 -4px;
    width: 28px;
    height: 28px;
  }
  .table_img {
    img {
      cursor: pointer;
      margin-top: 7px;
      width: 26px;
      height: 26px;
    }
  }

  // 搜索
  .metting_search {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0 10px 20px;
    width: 28%;
    /deep/ .el-button {
      margin: 0;
      height: 35px;
      line-height: 35px;
      border-radius: 0;
      padding: 0 15px;
      background: #032037;
      border-color: #014e70;
      color: #00b8e2;
    }
  }
  // 单选
  .radio_search {
    padding-left: 20px;
    padding-bottom: 10px;
    /deep/ .el-radio-button {
      box-shadow: none !important;
    }
    /deep/ .el-radio-button__inner {
      color: #ffffff;
      border-color: #00a6d3;
      background: #001529;
    }
  }
  .radioSearch_color {
    /deep/ .el-radio-button__inner {
      color: #1985e1;
    }
  }
  // 搜索框样式
  /deep/ .el-input__inner {
    color: #fff;
    height: 35px;
    border-radius: 0;
    background: #04162e;
    border-color: #024b6b;
  }
  // Table样式配置
  /deep/ .el-table {
    width: 100%;
    height: 100%;
    background: none;
  }
  /deep/ .el-table tr {
    background: none;
  }
  /deep/ .metting_table ::before {
    height: 0;
  }
  /deep/ .el-table__header .cell {
    color: #1985e1;
  }
  /deep/ .el-table tbody tr:hover > td {
    background: #171f34 !important;
  }
  /deep/ .el-table__row .cell {
    color: #ffffff;
  }
  /deep/ .el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: 1px solid #013153;
  }
  /deep/ .gutter {
    background: rgb(1, 38, 65);
  }
  // 滚动条样式
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 0;
  }

  // 右侧
  .metting_tool {
    width: 40%;
    height: 100%;
    border: 1px solid #00a6d3;
    margin-left: 15px;
    border-top-left-radius: 12px;
  }
  .metting_tool {
    background: #002c47;
  }
  .metting_live {
    padding: 10px;
    width: 100%;
    height: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    .flvVideo {
      display: flex;
      flex: 1;
      height: 100%;
    }
  }
  .metting_live img {
    width: 100%;
    height: 75%;
  }
  // 工具栏标题
  .tool_title {
    background: url('./assets/bg_title.png') no-repeat;
    color: #ffffff;
    height: 30px;
    line-height: 30px;
    width: 100%;
    font-size: 15px;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .tool_title img:first-child {
    margin: 3px 4px 0 -15px;
    width: 28px;
    height: 28px;
  }
}
// 会议下侧
.metting_bottom {
  width: 100%;
  height: 28%;
  margin-top: 10px;
  border: 1px solid #00a6d3;
  display: flex;
  .live_title {
    width: 26px;
    height: 70%;
    box-sizing: border-box;
    background: linear-gradient(to bottom, #014664, rgba(0, 78, 120, 0.1));
    border-top-left-radius: 5px;
    padding-top: 20px;
    padding-right: 4px;
    font-size: 14px;
    color: #ffffff;
    writing-mode: vertical-rl;
    letter-spacing: 6px;
    display: flex;
    position: relative;
  }
  .live_title img:first-child {
    margin: -15px 0 12px 2px;
  }
  .live_title img:last-child {
    width: 45px;
    position: absolute;
    top: 65%;
    right: -30%;
    -webkit-transform: scaleY(-1);
    -o-transform: scaleY(-1);
    transform: scaleY(-1);
    -webkit-transform: rotate(90deg);
  }
  .live_radio {
    width: 60%;
  }
  .live_remarks {
    width: 95%;
    padding-left: 25px;
    padding-top: 20px;
    font-size: 14px;
    box-sizing: border-box;
    color: #ffffff;
  }
  .live_textarea {
    display: flex;
  }
  .live_textarea div:first-child {
    width: 55px;
  }
  .live_button {
    float: right;
    margin-top: 15px;
    margin-right: 5%;
  }
  .live_row {
    width: 100%;
    margin: 0 !important;
    color: #ffffff;
    font-size: 14px;
    padding-left: 15px;
    padding-top: 20px;
  }
  .live_col {
    display: flex;
  }
  .live_radio {
    margin-left: 20px;
    margin-top: 3px;
  }
  /deep/ .el-radio__label {
    color: #ffffff;
  }
  /deep/ .el-textarea__inner {
    color: #ffffff;
    background: #001529;
  }
  // 滚动条样式
  /deep/ ::-webkit-scrollbar {
    width: 0;
  }
}
</style>
