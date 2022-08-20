<template>
  <div class="metting_all">
    <!-- 会议位置标题 -->
    <div class="metting_title">
      <div>位置:{{ mettingTitle }}</div>
      <div v-if="!mettingSwitch" class="metting_type" style="color: red">(未录播)</div>
      <div v-if="mettingSwitch" class="metting_type" style="color: green">(录播中)</div>
      <el-switch v-model="mettingSwitch" @change="changeSwitch" active-color="#13ce66" inactive-color="#ff4949" class="metting_switch"></el-switch>
      <img @click="loginOut" src="./assets/quit.png" alt="" />
    </div>
    <!-- 会议 -->
    <div class="metting">
      <!-- 左侧 -->
      <div class="metting_left">
        <!-- 会场终端 -->
        <div class="metting_table">
          <div class="table_title">
            <img src="./assets/ico_dw.png" alt="" />
            <div>会场终端</div>
            <img style="margin-left: 50%" src="./assets/ico_ty.png" alt="" />
          </div>
          <!-- 搜索 -->
          <div class="metting_search">
            <el-input v-model="searchData" placeholder="请输入搜索关键字" clearable></el-input>
            <el-button icon="el-icon-search" @click="searchTabelData">查询</el-button>
            <el-button icon="el-icon-document-add" @click="addSourcesData">增加</el-button>
          </div>
          <!-- 切换 -->
          <div class="radio_search">
            <el-radio-group v-model="radioSearch" size="small">
              <el-radio-button label="4" :class="radioSearch == '4' ? radioStyle : ''" @click.native.prevent="changRadio(4)">终端</el-radio-button>
              <el-radio-button label="1" :class="radioSearch == '1' ? radioStyle : ''" @click.native.prevent="changRadio(1)">本地</el-radio-button>
              <el-radio-button label="2" :class="radioSearch == '2' ? radioStyle : ''" @click.native.prevent="changRadio(2)">融合</el-radio-button>
              <el-radio-button label="3" :class="radioSearch == '3' ? radioStyle : ''" @click.native.prevent="changRadio(3)">监控</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 表格 -->
          <el-table :data="tableDataShow" height="77%" @selection-change="tableDataChange" :header-cell-style="{ background: '#012641', borderBottom: '1px solid #013657' }">
            <el-table-column type="selection" header-align="center" align="center" width="60"> </el-table-column>
            <el-table-column prop="name" label="会场名称" :show-overflow-tooltip="true" header-align="center" align="center" width="230"></el-table-column>
            <el-table-column prop="hw_addr" label="会场标识" :show-overflow-tooltip="true" header-align="center" align="center" width="250"></el-table-column>
            <el-table-column prop="local_venue_name" label="观看会场" :show-overflow-tooltip="true" header-align="center" align="center" width="300"></el-table-column>
            <el-table-column c label="操作" header-align="center" align="center">
              <template slot-scope="scope">
                <el-row :gutter="20">
                  <el-col :span="4">
                    <div class="table_img">
                      <img v-if="scope.row.status == 1" src="./assets/handle.png" @click="handleTabelIcon(scope.row, 'handleSay')" />
                      <img v-if="scope.row.status == 0" src="./assets/call_2.png" />
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="table_img">
                      <img v-if="scope.row.status == 1 && !scope.row.is_main" src="./assets/user_1.png" @click="handleTabelIcon(scope.row, 'isMain')" />
                      <img v-if="scope.row.status == 1 && scope.row.is_main == true" src="./assets/user_2.png" />
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="table_img">
                      <img v-if="scope.row.status == 1 && scope.row.mic_status == 'on'" src="./assets/mic_1.png" @click="handleTabelIcon(scope.row, 'micCall', 0)" />
                      <img v-if="scope.row.status == 1 && scope.row.mic_status == 'off'" src="./assets/mic_2.png" @click="handleTabelIcon(scope.row, 'micCall', 1)" />
                      <img v-if="scope.row.status == 1 && !scope.row.mic_status" src="./assets/mic_3.png" />
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="table_img">
                      <img v-if="scope.row.status == 1 && scope.row.mic_status == 'on'" src="./assets/mic_4.png" />
                      <img v-if="scope.row.status == 1 && scope.row.mic_status == 'off'" src="./assets/mic_5.png" />
                      <img v-if="scope.row.status == 1 && !scope.row.mic_status" src="./assets/mic_6.png" />
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="table_img">
                      <img v-if="scope.row.status == 1 && scope.row.vol_status == 'on'" src="./assets/horn_1.png" @click="handleTabelIcon(scope.row, 'loudspeaker', 0)" />
                      <img v-if="scope.row.status == 1 && scope.row.vol_status == 'off'" src="./assets/horn_2.png" @click="handleTabelIcon(scope.row, 'loudspeaker', 1)" />
                      <img v-if="scope.row.status == 1 && !scope.row.vol_status" src="./assets/horn_3.png" />
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="table_img">
                      <img v-if="scope.row.status == 1" src="./assets/camera_1.png" @click="handleTabelIcon(scope.row, 'preview')" />
                    </div>
                  </el-col>
                  <el-col :span="3">
                    <div class="table_img">
                      <img v-if="scope.row.status == 1" src="./assets/leave_1.png" @click="handleTabelIcon(scope.row, 'handup')" />
                    </div>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 本地-发言-监控 -->
        <div class="metting_live">
          <div class="live_col">
            <div class="live_title">
              <img src="./assets/ico_dw.png" alt="" />
              <div>本地</div>
              <img src="./assets/ico_ty.png" alt="" />
            </div>
            <div class="live_vedio">
              <flv-video videoID="localLive" ref="localLive" :mettItem="localVedioItem" class="flvVideo"></flv-video>
            </div>
          </div>
          <div class="live_col">
            <div class="live_title">
              <img src="./assets/ico_dw.png" alt="" />
              <div>发言</div>
              <img src="./assets/ico_ty.png" alt="" />
            </div>
            <div class="live_vedio">
              <flv-video videoID="handleLive" ref="handleLive" :mettItem="handleVedioItem" class="flvVideo"></flv-video>
            </div>
          </div>
          <div class="live_col">
            <div class="live_title">
              <img src="./assets/ico_dw.png" alt="" />
              <div>监控</div>
              <img src="./assets/ico_ty.png" alt="" />
            </div>
            <div class="live_vedio">
              <flv-video videoID="watchLive" ref="watchLive" :mettItem="watchVedioItem" class="flvVideo"></flv-video>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="metting_right">
        <!-- 工具栏 -->
        <div class="metting_tool">
          <div class="tool_title">
            <img src="./assets/ico_dw.png" alt="" />
            <div>工具栏</div>
            <img style="margin-left: 28%" src="./assets/ico_ty.png" alt="" />
          </div>
          <el-row :gutter="20">
            <el-col :span="8" class="tool_col">
              <span>呼叫/挂断</span>
              <div class="tool_icon">
                <div class="icon_div" @click="handleToolIcon('recall')">
                  <img v-if="!callType" src="./assets/call_1.png" alt="" />
                  <img v-if="callType" src="./assets/call_2.png" alt="" />
                </div>
                <div class="icon_div" @click="handleToolIcon('hangup')">
                  <img src="./assets/Hangup.png" alt="" />
                </div>
              </div>
            </el-col>
            <el-col :span="8" class="tool_col">
              <span>单页面轮询</span>
              <div class="tool_icon">
                <div class="icon_div" @click="openLoopDialog">
                  <img src="./assets/loop_1.png" alt="" />
                </div>
                <div class="icon_div" @click="handleToolIcon('oneLoop')">
                  <img src="./assets/start_1.png" alt="" />
                </div>
              </div>
            </el-col>
            <!-- <el-col :span="8" class="tool_col">
              <span>多页面轮询</span>
              <div class="tool_icon">
                <div class="icon_div">
                  <img src="./assets/loop_2.png" alt="" />
                </div>
                <div class="icon_div">
                  <img src="./assets/start_1.png" alt="" />
                </div>
              </div>
            </el-col> -->
            <!-- <el-col :span="8" class="tool_col">
              <span>锁定/解锁视频源</span>
              <div class="tool_icon">
                <div class="icon_div">
                  <img src="./assets/lock_1.png" alt="" />
                </div>
                <div class="icon_div">
                  <img src="./assets/unlock_1.png" alt="" />
                </div>
              </div>
            </el-col> -->
            <el-col :span="8" class="tool_col">
              <span>锁定/解锁会议</span>
              <div class="tool_icon">
                <div class="icon_div" @click="handleToolIcon('lock')">
                  <img src="./assets/lock_2.png" alt="" />
                </div>
                <div class="icon_div" @click="handleToolIcon('unLock')">
                  <img src="./assets/unlock_2.png" alt="" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 任务提醒 -->
        <div class="metting_task">
          <div class="task_title">
            <img src="./assets/ico_dw.png" alt="" />
            <div>任务提醒</div>
            <img style="margin-left: 25%" src="./assets/ico_ty.png" alt="" />
          </div>
          <div class="task_list">
            <div class="task_data" v-for="(item, index) in taskData" :key="index">
              {{ item.task }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 增加弹窗 -->
    <el-dialog :visible.sync="addSourcesDialog" :show-close="false" class="metting_dialog" :close-on-click-modal="false" width="65%">
      <el-table :data="addSourcesDataList" height="500" :header-cell-style="{ background: '#012641', borderBottom: '1px solid #013657', color: '#1985e1' }" max-height="500">
        <el-table-column prop="name" label="名称" :show-overflow-tooltip="true" header-align="center" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" type="text" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="model" label="型号" :show-overflow-tooltip="true" header-align="center" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.model" placeholder="请选择" size="small">
              <el-option v-for="(item, index) in dialogModelOption" :key="index" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" :show-overflow-tooltip="true" header-align="center" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.type" placeholder="请选择" size="small">
              <el-option v-for="(item, index) in dialogTypeOption" :key="index" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="connection_identifier" label="连接标识" :show-overflow-tooltip="true" header-align="center" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.connection_identifier" type="text" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="user_name" label="用户名" :show-overflow-tooltip="true" header-align="center" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.user_name" type="text" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="password" label="密码" :show-overflow-tooltip="true" header-align="center" align="center">
          <template slot-scope="scope">
            <el-input type="password" v-model="scope.row.password" size="small" />
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center" width="170">
          <template slot-scope="scope">
            <div class="addSources_dialog_handlebutton">
              <el-button type="primary" size="mini">其他参数</el-button>
              <el-button type="primary" size="mini" @click="delectTableRow(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-button icon="el-icon-plus" class="add_button" @click="addTableRow()">新增</el-button>

      <div class="addSources_dialog_button">
        <el-button @click="addSourcesDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveAddSourcesData">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 轮询弹窗 -->
    <el-dialog :visible.sync="loopDialog" :show-close="false" class="metting_dialog" :close-on-click-modal="false" width="55%">
      <!-- 弹窗标题 -->
      <div slot="title" class="dialog_title">
        <div>主席画面轮询设置</div>
        <div>
          <el-button @click="closeLoopDialog">取消</el-button>
          <el-button type="primary" @click="saveLoopData">确定</el-button>
        </div>
      </div>
      <!-- 轮询时间 -->
      <div class="dialog_input_number">
        <div>轮播间隔(秒)</div>
        <el-input-number v-model="oneLoopTimes" controls-position="right" :min="1"></el-input-number>
      </div>
      <!-- 穿梭表格 -->
      <div class="dialog_table">
        <!-- 已选资源 -->
        <div class="dialog_table_select">
          <div class="dialog_table_title">
            <div>
              <div class="title_line"></div>
              <span>已选资源</span>
            </div>
            <el-button type="primary" @click="handleSelectBatchData">批量选中</el-button>
          </div>
          <div class="dialog_table_table">
            <el-table :data="selectedTableData" height="500" @selection-change="selectTabelDataChange" :header-cell-style="{ background: '#012641', borderBottom: '1px solid #013657', color: '#1985e1' }" max-height="500">
              <el-table-column type="selection" header-align="center" align="center" width="60"> </el-table-column>
              <el-table-column prop="name" label="终端名称" :show-overflow-tooltip="true" sortable header-align="center" align="center"></el-table-column>
              <el-table-column prop="hw_addr" label="连接标识" :show-overflow-tooltip="true" header-align="center" align="center"></el-table-column>
              <el-table-column c label="操作" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="selectTableRow(scope.row)">选中</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 轮询资源 -->
        <div class="dialog_table_loop">
          <div class="dialog_table_title">
            <div>
              <div class="title_line"></div>
              <span>轮询资源</span>
            </div>
            <el-button type="primary" @click="handleLoopBatchData">批量剔除</el-button>
          </div>
          <div class="dialog_table_table">
            <el-table :data="loopTableData" height="500" @selection-change="loopTabelDataChange" :header-cell-style="{ background: '#012641', borderBottom: '1px solid #013657', color: '#1985e1' }" max-height="500">
              <el-table-column type="selection" header-align="center" align="center" width="60"> </el-table-column>
              <el-table-column prop="name" label="会场名称" :show-overflow-tooltip="true" sortable header-align="center" align="center"></el-table-column>
              <el-table-column prop="hw_addr" label="会场标识" :show-overflow-tooltip="true" header-align="center" align="center"></el-table-column>
              <el-table-column label="操作" header-align="center" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="deleteTableRow(scope.row)">剔除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "./index.css";
import { creatMetting, saveAddResources, getResources, getVideoList, changeMain, record, say, preview, micCall, loudspeaker, finishMetting, recall, oneLoop, hangup, lockMetting, getWsServer } from "./api/asset";
import flvVideo from "./components/flvVideo.vue";

export default {
  components: { flvVideo },
  name: "App",

  props: {
    customConfig: Object,
  },

  data() {
    return {
      // 数据ID
      data_id: "",

      mettingID: "",
      // 位置标题
      mettingTitle: "",
      // 是否录播
      mettingSwitch: false,
      // 搜索文本
      searchData: "",
      // 单选切换
      radioSearch: "",
      // 单选框样式
      radioStyle: "radioSearch_color",
      // 呼叫状态
      callType: false,
      // 轮询弹窗
      loopDialog: false,
      // 轮询时长
      oneLoopTimes: 8,
      // 表格数据
      tableSelectData: [],
      // 会议锁定状态
      lockType: 1,

      // 新增弹窗
      addSourcesDialog: false,
      // 新增弹窗表格数据
      addSourcesDataList: [{ data_id: this.get_UUID(), parent_id: "", name: "", model: "", type: "", connection_identifier: "", user_name: "", password: "", KVParams: {} }],

      // 型号数组
      dialogModelOption: [],
      // 类型数组
      dialogTypeOption: [],

      // 弹窗已选数据表格
      selectedTableData: [],
      // 弹窗批量选中数据
      selectDataList: [],
      // 弹窗轮询资源表格
      loopTableData: [],
      // 弹窗批量轮询数据
      loopDataList: [],
      // 保存轮询的数据
      saveLoopDataList: [],

      // 表格数据
      tableData: [],
      tableDataShow: [],
      // 任务数据
      taskData: [],

      // 是否锁定
      isLock: false,

      // webSocket
      webSocket: null,

      // 直播流
      localVedioItem: {
        video_url: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4",
      },
      handleVedioItem: {
        video_url: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4",
      },
      watchVedioItem: {
        video_url: "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4",
      },
    };
  },

  mounted() {
    let { componentId } = this.customConfig || {};
    componentId && window.componentCenter?.register(componentId, "comp", this, eventActionDefine);

    this.mettingID = 1000;
    this.getTableDataList();
  },

  methods: {
    // 获取UUID
    get_UUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        return (c === "x" ? (Math.random() * 16) | 0 : "r&0x3" | "0x8").toString(16);
      });
    },

    // 获取会议信息
    do_EventCenter_getMettingInfo(value) {
      // let data_id = "10735fc4549a4ceb931fa3fd98804f91";
      // this.mettingID = 1000;

      console.log("----->", value);

      this.data_id = value.data_id;

      if (value.mettingID) {
        this.mettingID = value.mettingID;
      } else {
        creatMetting(value.data_id).then((res) => {
          this.mettingID = res.data.conference_id;
        });
      }

      this.getTableDataList();
      this.initSocket();
    },

    // 退出会议
    loginOut() {
      let dataForm = {
        conference_id: this.mettingID,
        data_id: this.data_id,
        type: 0,
      };
      finishMetting(dataForm).then((res) => {});
    },

    // 查询
    searchTabelData() {
      if (this.isLock) {
        this.$notify({
          title: "会议已锁定",
          type: "warning",
          duration: 0,
        });
        return;
      }
      if (this.searchData) {
        this.tableDataShow = this.tableData.filter((x) => {
          return x.name.includes(this.searchData.toString());
        });
      } else {
        this.getTableDataList();
      }
    },

    // 新增
    addSourcesData() {
      if (this.isLock) {
        this.$notify({
          title: "会议已锁定",
          type: "warning",
          duration: 0,
        });
        return;
      }
      this.addSourcesDialog = true;
    },

    // 保存资源列表
    saveAddSourcesData() {
      this.addSourcesDialog = false;
      let dataForm = JSON.parse(JSON.stringify(this.addSourcesDataList));
      dataForm.forEach((item) => {
        item.data_id = "";
      });
      saveAddResources(this.mettingID, dataForm).then((res) => {
        this.$message.success("新增成功");
      });
    },

    // 新增表格行
    addTableRow() {
      this.addSourcesDataList.push({ data_id: this.get_UUID(), parent_id: "", name: "", model: "", type: "", connection_identifier: "", user_name: "", password: "", KVParams: {} });
    },

    // 表格删除行
    delectTableRow(row) {
      this.addSourcesDataList.forEach((item, index) => {
        if (item.data_id == row.data_id) {
          this.addSourcesDataList.splice(index, 1);
        }
      });
    },

    // 切换表格
    changRadio(e) {
      if (this.isLock) {
        this.$notify({
          title: "会议已锁定",
          type: "warning",
          duration: 0,
        });
        return;
      }

      if (this.radioSearch && this.radioSearch == e) {
        this.radioSearch = "";
        this.getTableDataList();
        return;
      }

      this.radioSearch = e;

      let filterList = [];
      let dataList = JSON.parse(JSON.stringify(this.tableData));
      dataList.forEach((item, index) => {
        if (e != "4" && item.type == e) {
          filterList.push(item);
        } else if (e == "4" && item.type == "0") {
          filterList.push(item);
        }
      });

      this.tableDataShow = filterList;
    },

    // 打开弹窗
    openLoopDialog() {
      if (this.isLock) {
        this.$notify({
          title: "会议已锁定",
          type: "warning",
          duration: 0,
        });
        return;
      }
      this.loopDialog = true;
    },

    // 关闭弹窗
    closeLoopDialog() {
      this.loopDialog = false;
      this.oneLoopTimes = 8;
    },

    // 录播
    changeSwitch() {
      let dataForm = {
        conference_id: "",
        status: "",
      };
      this.mettingSwitch ? (dataForm.status = 1) : (dataForm.status = 2);
      record(dataForm).then((res) => {
        this.mettingSwitch ? this.$message.success("录制中") : this.$message.error("停止录制");
      });
    },

    // 获取视频资源列表
    getTableDataList() {
      let dataForm = {
        conference_id: this.mettingID,
        external: "",
      };
      let dataList = [];
      getVideoList(dataForm).then((res) => {
        this.mettingTitle = res.data.meeting_room_name;
        this.mettingTitle = res.data.mettingSwitch;
        this.tableData = res.data.terminal_list;
        this.tableDataShow = JSON.parse(JSON.stringify(res.data.terminal_list));
        this.selectedTableData = JSON.parse(JSON.stringify(res.data.terminal_list));
      });
      return dataList;
    },

    // 弹窗确认按钮
    saveLoopData() {
      this.loopDialog = false;
      this.saveLoopDataList = this.loopTableData;
    },

    // 表格数据改变
    tableDataChange(data) {
      this.tableSelectData = data;
    },

    // 弹窗选中数据改变
    selectTabelDataChange(data) {
      this.selectDataList = data;
    },
    // 弹窗选中数据
    selectTableRow(row) {
      let arr = this.selectedTableData;
      arr.forEach((e, i) => {
        if (row.id == e.id) {
          arr.splice(i, 1);
        }
      });
      this.loopTableData.push(row);
    },
    // 弹窗批量选中
    handleSelectBatchData() {
      if (JSON.stringify(this.selectDataList) != "[]") {
        let arr = this.selectedTableData;
        this.selectDataList.forEach((item, index) => {
          arr.forEach((e, i) => {
            if (item.id == e.id) {
              arr.splice(i, 1);
            }
          });
          this.loopTableData.push(item);
        });
      }
    },

    // 弹窗轮询数据改变
    loopTabelDataChange(data) {
      this.loopDataList = data;
    },
    // 弹窗剔除数据
    deleteTableRow(row) {
      let arr = this.loopTableData;
      arr.forEach((e, i) => {
        if (row.id == e.id) {
          arr.splice(i, 1);
        }
      });
      this.selectedTableData.push(row);
    },
    // 弹窗批量剔除
    handleLoopBatchData() {
      if (JSON.stringify(this.loopDataList) != "[]") {
        let arr = this.loopTableData;
        this.loopDataList.forEach((item, index) => {
          arr.forEach((e, i) => {
            if (item.id == e.id) {
              arr.splice(i, 1);
            }
          });
          this.selectedTableData.push(item);
        });
      }
    },

    // 触发图标事件
    async handleTabelIcon(row, type, status) {
      if (this.isLock) {
        this.$notify({
          title: "会议已锁定",
          type: "warning",
          duration: 0,
        });
        return;
      }
      let dataForm = {
        conference_id: this.mettingID,
        terminal_id: row.id,
      };
      // 快速发言
      if (type == "handleSay") {
        this.$refs.localLive.mpegts_destroy();
        this.$refs.localLive.initMpegts();
        say(dataForm).then((res) => {});
      }
      // 主席设置
      if (type == "isMain") {
        changeMain(dataForm).then((res) => {});
      }
      // 麦克风控制
      if (type == "micCall") {
        dataForm.status = status;
        micCall(dataForm).then((res) => {});
      }
      // 扬声器控制
      if (type == "loudspeaker") {
        dataForm.status = status;
        loudspeaker(dataForm).then((res) => {});
      }
      // 预监
      if (type == "preview") {
        this.$refs.watchLive.mpegts_destroy();
        this.$refs.watchLive.initMpegts();
        let form = {
          conference_id: this.mettingID,
          terminal_list: [row.id],
        };
        preview(form).then((res) => {});
      }
      // 结束会议
      if (type == "handup") {
        let form = {
          conference_id: this.mettingID,
          terminal_id: [row.id],
        };
        hangup(form).then((res) => {});
      }

      await this.getTableDataList();
    },

    // 触发工具栏事件
    handleToolIcon(type) {
      if (type == "unLock") {
        this.isLock = false;
      }
      if (this.isLock) {
        this.$notify({
          title: "会议已锁定",
          type: "warning",
          duration: 0,
        });
        return;
      }
      let dataForm = {
        conference_id: this.mettingID,
      };
      if (type == "recall" || type == "hangup") {
        let terminalIdList = [];

        if (JSON.stringify(this.tableSelectData) != "[]") {
          this.tableSelectData.forEach((item, index) => {
            terminalIdList.push(item.id);
          });

          dataForm.terminal_id = terminalIdList.join(",");

          if (type == "recall") {
            dataForm.external = "";
            recall(dataForm).then((res) => {
              this.callType = true;
            });
          } else {
            hangup(dataForm).then((res) => {
              this.callType = false;
            });
          }
        }
      }
      if (type == "oneLoop") {
        let terminalIdList = [];

        if (JSON.stringify(this.saveLoopDataList) != "[]") {
          this.saveLoopDataList.forEach((item, index) => {
            terminalIdList.push(item.id);
          });

          dataForm.terminal_list = terminalIdList;
          dataForm.loop_interval = this.oneLoopTimes;
          dataForm.external = "";
          oneLoop(dataForm).then((res) => {});
        }
      }
      if (type == "lock" || type == "unLock") {
        type == "lock" ? (dataForm.status = 1) : (dataForm.status = 0);
        dataForm.external = "";
        if (type == "lock") {
          this.isLock = true;
          this.$notify({
            title: "会议已锁定",
            type: "warning",
          });
        } else {
          this.$notify({
            title: "已解除会议锁定",
            type: "success",
          });
        }
        lockMetting(dataForm).then((res) => {});
      }
    },

    // 建立websocket连接
    initSocket() {
      let dataForm = {
        conference_id: this.mettingID,
      };
      getWsServer(dataForm).then((res) => {
        let url = res.data;
        this.webSocket = new WebSocket(url);
        this.webSocket.onopen = this.webSocketOnOpen;
        this.webSocket.onclose = this.webSocketOnClose;
        this.webSocket.onmessage = this.webSocketOnMessage;
        this.webSocket.onerror = this.webSocketOnError;
      });
    },

    // 建立连接成功后的状态
    webSocketOnOpen() {
      console.log("websocket连接成功");
    },
    // 获取到后台消息的事件，操作数据的代码在onmessage中书写
    webSocketOnMessage(res) {
      this.taskData = res.data;
    },
    //连接失败的事件
    webSocketOnError(res) {
      console.log("websocket连接失败");
      console.log(res);
    },

    triggerEvent() {
      let { componentId, appId } = this.customConfig || {};
      componentId &&
        appId &&
        window.eventCenter?.triggerEventNew({
          objectId: appId,
          componentId: componentId,
          type: "app",
          event: "onImgClick",
          payload: {
            value: "sasdasd",
          },
        });
    },

    Event_Center_getName() {
      return "应用二开测试";
    },
  },

  destroyed() {
    window.componentCenter?.removeInstance(this.customConfig?.componentId);
  },
};
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
// 会议
.metting {
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 15px;
  box-sizing: border-box;
}
// 会议位置标题
.metting_title {
  width: 99%;
  box-sizing: border-box;
  position: absolute;
  top: 8px;
  color: #ffffff;
  font-size: 21px;
  display: flex;
  align-items: center;
}
// 退出icon
.metting_title img {
  cursor: pointer;
  z-index: 2;
  position: absolute;
  right: 0;
  top: 3px;
  width: 26px;
  height: 26px;
}
// 录播状态
.metting_type {
  font-size: 17px;
  margin-left: 10px;
}
// 录播开关
.metting_switch {
  margin-top: 4px;
  margin-left: 10px;
}
// 会议左侧
.metting_left {
  width: 80%;
  height: 100%;
  box-sizing: border-box;
  margin-right: 15px;
  // 左侧表格
  .metting_table {
    width: 100%;
    height: 64%;
    border: 1px solid #00a6d3;
    border-top-left-radius: 20px;
  }
  // 表格标题
  .table_title {
    margin-left: -3px;
    background: url("./assets/bg_title@2x.png") no-repeat;
    color: #ffffff;
    height: 35px;
    line-height: 35px;
    width: 40%;
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
  .table_img img {
    cursor: pointer;
    z-index: 2;
    margin-top: 7px;
    width: 26px;
    height: 26px;
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
  // 多选
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
    height: 35px;
    border-radius: 0;
    background: #04162e;
    border-color: #024b6b;
    color: #ffffff;
  }
  // Table样式配置
  /deep/ .el-table {
    width: 100%;
    height: 100%;
    background: none;
  }
  /deep/ .el-table__header .cell {
    color: #1985e1;
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
  // 左侧下部
  .metting_live {
    height: 33%;
    margin-top: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 左下直播布局
  .live_col {
    width: 33.33%;
    height: 100%;
    border: 1px solid #00a6d3;
    margin-left: 15px;
    display: flex;
    background: #002c47;
  }
  .metting_live .live_col:first-child {
    margin-left: 0;
  }
  // 左下直播标题
  .live_title {
    width: 26px;
    height: 60%;
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
  // 直播视频
  .live_vedio {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 100%;
    .flvVideo {
      display: flex;
      flex: 1;
      height: 100%;
    }
  }
  .live_vedio img {
    width: 100%;
    height: 100%;
  }
}
// 会议右侧
.metting_right {
  width: 19%;
  height: 100%;
  box-sizing: border-box;
  // 工具栏
  .metting_tool,
  .metting_task {
    width: 100%;
    height: 37%;
    border: 1px solid #00a6d3;
    border-top-left-radius: 12px;
  }
  .metting_tool {
    background: #002c47;
  }
  /deep/ .el-row {
    margin: 0 !important;
  }
  // 任务提醒
  .metting_task {
    margin-top: 10px;
    height: 60%;
  }
  // 工具栏标题
  .tool_title,
  .task_title {
    background: url("./assets/bg_title.png") no-repeat;
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
  .task_title img:first-child {
    margin: 3px 4px 0 -15px;
    width: 28px;
    height: 28px;
  }
  // 工具栏布局
  .tool_col {
    text-align: center;
    margin-top: 10px;
  }
  // 工具栏图标
  .tool_icon {
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 工具栏图标边框
  .icon_div {
    cursor: pointer;
    z-index: 2;
    border: 1px solid #ffffff;
    padding: 3px 3px 0 3px;
  }
  // 工具栏标题
  .tool_col span {
    font-size: 12px;
    color: #ffffff;
  }
  // 工具栏图片
  .tool_col img {
    width: 30px;
    height: 30px;
  }
  // 任务列表
  .task_list {
    box-sizing: border-box;
    width: 100%;
    height: 94%;
    overflow-y: auto;
  }
  .task_data {
    box-sizing: border-box;
    color: #ffffff;
    text-align: left;
    padding-left: 20px;
    padding-right: 20px;
    height: 35px;
    line-height: 35px;
    border: 1px solid #013153;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  // 滚动条样式
  /deep/ .task_list::-webkit-scrollbar {
    width: 0;
  }
}
// 会议弹窗
.metting_dialog {
  .dialog_title {
    padding: 10px;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #155d9f;
    /deep/ .el-button {
      padding: 8px 24px;
    }
  }
  .dialog_input_number {
    display: flex;
    align-items: center;
    /deep/ .el-input__inner,
    /deep/ .el-input-number__decrease,
    /deep/ .el-input-number__increase {
      background: #002c47;
      color: #ffffff;
      border-color: #00a6d3;
    }
  }
  .dialog_input_number div {
    margin-right: 20px;
    color: #ffffff;
  }
  .dialog_table {
    margin-top: 20px;
    width: 100%;
    height: 100;
    display: flex;
  }
  .dialog_table_select {
    width: 49%;
    margin-right: 2%;
  }
  .dialog_table_loop {
    width: 49%;
  }
  .dialog_table_title {
    height: 30px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    margin-bottom: 8px;
    div:first-child {
      display: flex;
      align-items: center;
    }
    /deep/ .el-button {
      padding: 6px 24px;
    }
  }
  .title_line {
    height: 20px;
    width: 4px;
    background: #00a6d3;
    margin-right: 10px;
  }
  .dialog_table_table {
    border: 1px solid #00a6d3;
  }
  /deep/ ::before {
    height: 0;
  }
  /deep/ .gutter {
    background: rgb(1, 38, 65);
  }
  /deep/ .el-dialog__header {
    padding: 0 !important;
  }
  /deep/ .el-dialog__body {
    background: #002c47;
  }
  /deep/ .el-input__inner {
    background: #001529;
    border-color: #014e70;
    color: #ffffff;
  }
  // 滚动条样式
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 0;
  }
}
.addSources_dialog_handlebutton {
  width: 100%;
  display: flex;
}
.add_button {
  width: 100%;
  margin: 10px 0;
  background: #002c47;
  color: #ffffff;
}
// 新增资源弹窗
.addSources_dialog_button {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/ .el-button {
    padding: 8px 24px !important;
  }
  /deep/ .el-button:first-child {
    margin-right: 20px;
  }
}

/deep/ .dialog_table ::before {
  height: 0;
}

/deep/ .el-table {
  width: 100%;
  height: 100%;
  background: none;
}
/deep/ .el-table tr {
  background: none;
}
/deep/ .el-table tbody tr:hover > td {
  background: #171f34 !important;
}
/deep/ .el-table__row .cell {
  color: #ffffff;
}
</style>
