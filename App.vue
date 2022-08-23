<template>
  <div class="main" :style="{ height: mainHeight }">
  <!-- 位置与录播 -->
    <span class="addressSpan"
      >位置：{{ video_listData.meeting_room_name }} <span class="videoGreen" v-show="videoStatus"> (录播中)</span><span class="videoRed" v-show="!videoStatus"> (未录播)</span
      ><el-switch v-model="videoStatus" @change="videoChange" active-color="#13ce66" inactive-color="#ff4949"> </el-switch
    ></span>
    <!-- 屏幕布局选项 -->
    <div class="screenNum">
      <el-radio-group v-model="centerScreenIndex" size="mini" @change="centerScreenIndexChange">
        <el-radio-button :label="item" v-for="(item, index) in centerScreen" :key="index">{{ item.window_layout.length }}</el-radio-button>
      </el-radio-group>
    </div>
    <!-- 上面 -->
    <div class="mainTop">
      <!-- 上面左边 -->
      <div class="topLeft">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="终端" name="zhongduan" class="tabLable">
            <el-checkbox-group v-model="terminalCheckList">
              <div class="checkboxItem" v-for="(item, index) in terminalList" :key="index">
                <el-checkbox :label="item">{{ item.name }}</el-checkbox>
                <div class="checkboxItemIcon">
                  <img src="../pluginTemp/images/handle.png" v-show="!item.status" @click="handleUp(item)" alt="" style="cursor: pointer; height: 24px; width: 24px" />
                  <phone-call theme="filled" size="24" fill="#dc150e" v-show="item.status" @click="recall(item)" style="cursor: pointer" />
                  <people theme="outline" size="24" fill="#ffffff" v-show="!item.is_main && !item.status" @click="changemain(item)" style="cursor: pointer" />
                  <people theme="filled" size="24" fill="#0E98DC" v-show="item.is_main && !item.status" @click="changemain(item)" style="cursor: pointer" />
                </div>
              </div>
            </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="本地" name="bendi" class="tabLable">
            <el-checkbox-group v-model="localCheckList">
              <div class="checkboxItem" v-for="(item, index) in localList" :key="index">
                <el-checkbox  :label="item.name"></el-checkbox>
                <div class="checkboxItemIcon">
                  <img src="../pluginTemp/images/handle.png" v-show="!item.status" @click="handleUp(item)" alt="" style="cursor: pointer; height: 24px; width: 24px" />
                  <phone-call theme="filled" size="24" fill="#dc150e" v-show="item.status" @click="recall(item)" style="cursor: pointer" />
                  <people theme="outline" size="24" fill="#ffffff" v-show="!item.is_main && !item.status" @click="changemain(item)" style="cursor: pointer" />
                  <people theme="filled" size="24" fill="#0E98DC" v-show="item.is_main && !item.status" @click="changemain(item)" style="cursor: pointer" />
                </div>
              </div>
            </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="融合" name="ronghe" class="tabLable">
            <el-checkbox-group v-model="fuseCheckList">
              <div class="checkboxItem" v-for="(item, index) in fuseList" :key="index">
                <el-checkbox  :label="item.name"></el-checkbox>
                <div class="checkboxItemIcon">
                  <img src="../pluginTemp/images/handle.png" v-show="!item.status" @click="handleUp(item)" alt="" style="cursor: pointer; height: 24px; width: 24px" />
                  <phone-call theme="filled" size="24" fill="#dc150e" v-show="item.status" @click="recall(item)" style="cursor: pointer" />
                  <people theme="outline" size="24" fill="#ffffff" v-show="!item.is_main && !item.status" @click="changemain(item)" style="cursor: pointer" />
                  <people theme="filled" size="24" fill="#0E98DC" v-show="item.is_main && !item.status" @click="changemain(item)" style="cursor: pointer" />
                </div>
              </div>
            </el-checkbox-group>
          </el-tab-pane>
          <el-tab-pane label="监控" name="jiankong" class="tabLable">
            <el-checkbox-group v-model="monitorCheckList">
              <div class="checkboxItem" v-for="(item, index) in monitorList" :key="index">
                <el-checkbox  :label="item.name"></el-checkbox>
                <div class="checkboxItemIcon">
                  <img src="../pluginTemp/images/handle.png" v-show="!item.status" @click="handleUp(item)" alt="" style="cursor: pointer; height: 24px; width: 24px" />
                  <phone-call theme="filled" size="24" fill="#dc150e" v-show="item.status" @click="recall(item)" style="cursor: pointer" />
                  <people theme="outline" size="24" fill="#ffffff" v-show="!item.is_main && !item.status" @click="changemain(item)" style="cursor: pointer" />
                  <people theme="filled" size="24" fill="#0E98DC" v-show="item.is_main && !item.status" @click="changemain(item)" style="cursor: pointer" />
                </div>
              </div>
            </el-checkbox-group>
          </el-tab-pane>
        </el-tabs>
        <div class="advance">
          <el-button @click="advance">预监</el-button>
        </div>
      </div>
      <!-- 上面中间 -->
      <div class="topCenter">
        <div
          class="topCenterScreen"
          v-for="(item, index) in nowCenterScreen.window_layout"
          :key="index"
          @drop="drop(item, nowCenterScreen.screen_num, index)"
          :style="{ position: 'absolute', border: '2px solid #113164', background: '#7d7d7d', width: item.w, height: item.h, top: item.y, left: item.x }"
        >
          <el-select
            class="agreement"
            v-show="index < videoList.length"
            v-model="videoSouce[index]"
            :placeholder="item.ipv == 0 ? 'IPV4' : 'IPV6'"
            @change="videoLineChange($event, videoList[index])"
          >
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
          <div style="color: #ffffff" v-if="videoList[index] && index < videoList.length">
            {{ videoList[index].name }}
          </div>
          <img
            class="micIcon"
            style="right: 2.8px"
            @click="imgShowChange('open', item, index)"
            v-show="index < videoList.length && videoList[index].mic_status == 'on'"
            src="../pluginTemp/images/openMIC.png"
            alt=""
          />
          <img
            class="micIcon"
            @click="imgShowChange('off', item, index)"
            v-show="index < videoList.length && videoList[index].mic_status == 'off'"
            src="../pluginTemp/images/offMIC.png"
            alt=""
          />
        </div>
      </div>
      <!-- 上面右边 -->
      <div class="topRight">
        <div>
          <img @click="openLogout" src="../pluginTemp/images/logout.png" alt="" />
        </div>
        <div>
          <img @click="openStatus" src="../pluginTemp/images/setting.png" alt="" />
        </div>
        <div>
          <img @click="lineStatus" src="../pluginTemp/images/line.png" alt="" />
        </div>
        <div>
          <img @click="addStatus" src="../pluginTemp/images/add.png" alt="" />
        </div>
      </div>
    </div>
    <!-- 下面 -->
    <div class="mainBottom">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="终端资源" name="zhongduan" class="tabPane">
          <el-carousel ref="cardShow" :autoplay="false" interval="0" indicator-position="none" :loop="false" arrow="never">
            <el-carousel-item>
              <div draggable="true" @dragstart="dragstart($event)" v-for="(item, index) in buttomTabList" :key="index" class="carouselItem">
                <div class="closeBox" v-show="item.url" @click="closeButtom(item, index)">x</div>
                <img :src="item.url" alt="" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
        <el-tab-pane label="本地设备" name="bendi" class="tabPane">
          <el-carousel ref="cardShow3" :autoplay="false" interval="0" indicator-position="none" :loop="false" arrow="never">
            <el-carousel-item>
              <div draggable="true" @dragstart="dragstart($event)" v-for="(item, index) in buttomTabList" :key="index" class="carouselItem">
                <div class="closeBox" v-show="item.url" @click="closeButtom(item, index)">x</div>
                <img :src="item.url" alt="" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
        <el-tab-pane label="融合通讯" name="ronghe" class="tabPane">
          <el-carousel ref="cardShow1" :autoplay="false" interval="0" indicator-position="none" :loop="false" arrow="never">
            <el-carousel-item>
              <div draggable="true" @dragstart="dragstart($event)" v-for="(item, index) in buttomTabList" :key="index" class="carouselItem">
                <div class="closeBox" v-show="item.url" @click="closeButtom(item, index)">x</div>
                <img :src="item.url" alt="" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
        <el-tab-pane label="监控资源" name="jiankong" class="tabPane">
          <el-carousel ref="cardShow2" :autoplay="false" interval="0" indicator-position="none" :loop="false" arrow="never">
            <el-carousel-item>
              <div draggable="true" @dragstart="dragstart($event)" v-for="(item, index) in buttomTabList" :key="index" class="carouselItem">
                <div class="closeBox" v-show="item.url" @click="closeButtom(item, index)">x</div>
                <img :src="item.url" alt="" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 推出会议弹窗 -->
    <el-dialog title="关闭提示" :visible.sync="offDialogVisible" width="25%" :before-close="handleClose" class="leaceMeetingDialog">
      <span>确认结束会议？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="offDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="leaveMeetingAll">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 会场终端弹窗 -->
    <el-dialog :visible.sync="statusDialogVisible" width="60%" :before-close="handleStatusClose" class="meetingStatus">
      <div class="metting_all">
        <!-- 会议 -->
        <div class="metting">
          <!-- 上侧 -->
          <div class="metting_top">
            <!-- 会场终端 -->
            <div class="metting_table">
              <div class="table_title">
                <div>会场终端</div>
                <img style="margin-left: 35%" src="../pluginTemp/images/ico_ty.png" alt="" />
              </div>
              <!-- 搜索 -->
              <div class="metting_search">
                <el-input placeholder="请输入搜索关键字" v-model="dialogSearch"></el-input>
                <el-button icon="el-icon-search" @click="handleSearch">查询</el-button>
              </div>
              <div class="radio_search">
                <el-radio-group v-model="radioSearch" size="small" @change="dialogRadioSearch">
                  <el-radio-button label="终端"></el-radio-button>
                  <el-radio-button label="本地"></el-radio-button>
                  <el-radio-button label="融合"></el-radio-button>
                  <el-radio-button label="监控"></el-radio-button>
                </el-radio-group>
              </div>
              <!-- 表格 -->
              <el-table :data="meetingStatusData" max-height="500px" :header-cell-style="{ background: '#012641', borderBottom: '1px solid #013657' }">
                <el-table-column show-overflow-tooltip prop="name" label="会场名称" header-align="center" align="center" width="200"></el-table-column>
                <el-table-column show-overflow-tooltip prop="local_venue_name" label="观看会场" header-align="center" align="center" width="200"></el-table-column>
                <el-table-column show-overflow-tooltip prop="hw_addr" label="会场标识" header-align="center" align="center" width="200"></el-table-column>
                <el-table-column label="操作" header-align="center" align="center">
                  <template slot-scope="scope">
                    <el-row :gutter="28">
                      <el-col :span="3">
                        <div class="table_img" @click="handleUp(scope.row)">
                          <img src="../pluginTemp/images/handle.png" alt="" />
                          <!-- <img src="./assets/call_2.png" alt="" /> -->
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div class="table_img" v-show="scope.row.is_main == true" @click="changemain(scope.row)">
                          <img src="../pluginTemp/images/user_1.png" />
                          <!-- <img src="./assets/user_2.png" alt="" /> -->
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div class="table_img" v-show="scope.row.is_main == false" @click="changemain(scope.row)">
                          <img src="../pluginTemp/images/user_2.png" />
                          <!-- <img src="./assets/user_2.png" alt="" /> -->
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div class="table_img" v-show="scope.row.mic_status == 'on'" @click="imgShowChange('open', scope.row)">
                          <img src="../pluginTemp/images/mic_1.png" alt="" />
                          <!-- <img src="./assets/mic_2.png" alt="" /> -->
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div class="table_img" v-show="scope.row.mic_status == 'off'" @click="imgShowChange('off', scope.row)">
                          <img src="../pluginTemp/images/mic_2.png" alt="" />
                          <!-- <img src="./assets/mic_2.png" alt="" /> -->
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div class="table_img">
                          <img src="../pluginTemp/images/mic_3.png" alt="" />
                          <!-- <img src="./assets/mic_4.png" alt="" /> -->
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div class="table_img" v-show="scope.row.vol_status == 'on'" @click="hornChange(scope.row)">
                          <img src="../pluginTemp/images/horn_1.png" alt="" />
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div class="table_img" v-show="scope.row.vol_status == 'off'" @click="hornChange(scope.row)">
                          <img src="../pluginTemp/images/horn_2.png" alt="" />
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div class="table_img" @click="rowMonitor(scope.row)">
                          <img src="../pluginTemp/images/camera_1.png" alt="" />
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div class="table_img" @click="rowFinishMeeting(scope.row)">
                          <img src="../pluginTemp/images/leave_1.png" alt="" />
                        </div>
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 线路切换弹窗 -->
    <el-dialog title="线路切换" :visible.sync="lineDialogVisible" width="25%" :before-close="handleLineClose" class="switchLine">
      <el-radio-group v-model="lineData">
        <el-radio label="IPV4">全部切换IPV4</el-radio>
        <br />
        <el-radio label="IPV6">全部切换IPV6</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lineDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="lineDialogChange">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加临时资源弹窗 -->
    <el-dialog :visible.sync="addDialogVisible" width="60%" :show-close="false" class="temporaryAdd">
      <el-table :data="addtableData" style="width: 100%" height="500px">
        <el-table-column align="center" prop="name" label="名称">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.addtableData"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="model" label="型号">
          <template slot-scope="scope">
            <el-select size="small" class="agreement" v-model="scope.row.model" placeholder="">
              <el-option v-for="item in modelOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="type" label="类型">
          <template slot-scope="scope">
            <el-select size="small" class="agreement" v-model="scope.row.type" placeholder="">
              <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="flag" label="连接标识">
          <template slot-scope="scope"> <el-input size="small" v-model="scope.row.flag"></el-input> </template
        ></el-table-column>
        <el-table-column align="center" prop="username" label="用户名">
          <template slot-scope="scope"> <el-input size="small" v-model="scope.row.username"></el-input> </template
        ></el-table-column>
        <el-table-column align="center" prop="password" label="密码">
          <template slot-scope="scope"> <el-input size="small" v-model="scope.row.password"></el-input> </template
        ></el-table-column>
        <el-table-column align="center" prop="recall" width="180" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">其他参数</el-button>
            <el-button size="mini" type="primary" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="addRow" @click="addRow" style="background: #171f34; color: #ffffff">➕新增</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import appService from "@njsdata/app-sdk";
import { videoPlayer } from "vue-video-player";
import eventActionDefine from "./components/msgCompConfig";
import {
  queryAssetById,
  add_resources,
  create,
  record,
  change_ipv,
  change_main,
  say,
  recall,
  preview,
  mic_all,
  video_list,
  change_all_loudspeaker,
  up_screen,
  window_layout,
  finish,
  hangup,
} from "./api/asset";
import "./index.css";
import { Five, People, PhoneCall } from "@icon-park/vue";
import { finished } from "stream";
export default {
  name: "App",
  props: {
    customConfig: Object,
    info: Object,
  },
  components: {
    videoPlayer,
    Five,
    People,
    PhoneCall,
  },
  data() {
    return {
      conference_id: "", //会议ID，
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.1], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "rtmp/mp4", // 类型
            src: "rtmp://live.hkstv.hk.lxdns.com/live/hks1", // url地址
          },
        ],
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
      activeName: "zhongduan",
      offDialogVisible: false,
      statusDialogVisible: false,
      lineDialogVisible: false,
      addDialogVisible: false,
      imgshow: true,//麦克风图片控制
      lineData: "IPV4",//线路数据
      videoStatus: true,//录播状态
      addtableData: [],//新增弹窗表格
      videoSouce: [],//每个屏幕的线路
      terminalList: [],//终端数据
      localList: [],//本地数据
      fuseList: [],//融合数据
      monitorList: [],//监控数据
      centerScreen: [],
      nowCenterScreen: [],
      videoList: [],
      radioSearch: "",//弹窗radio搜索
      dialogSearch: "",//弹窗搜索
      options: [
        {
          value: "IPV4",
          label: "IPV4",
        },
        {
          value: "IPV6",
          label: "IPV6",
        },
      ],//线路选项
      modelOptions: [
        {
          value: "华为",
          label: "华为",
        },
        {
          value: "中兴",
          label: "中兴",
        },
      ],//弹窗模型选项
      typeOptions: [
        {
          value: "H.323",
          label: "H.323",
        },
      ],//弹窗类型选项
      centerScreenIndex: {},
      meetingStatusData: [],//弹窗最终展示数据
      meetingStatusDataAll: [],//弹窗展示数据
      buttomTabList: [
        {
          url: require("../pluginTemp/images/demoimg.png"),
        },
        {
          url: require("../pluginTemp/images/demoimg2.png"),
        },
        {
          url: require("../pluginTemp/images/demoimg3.png"),
        },
        {
          url: require("../pluginTemp/images/demoimg2.png"),
        },
        {
          url: require("../pluginTemp/images/demoimg3.png"),
        },
      ],//底部预监数据
      terminalCheckList: [],//终端值
      localCheckList: [],//本地值
      fuseCheckList: [],//融合值
      monitorCheckList: [],//监控值
      listId: 0,//新增ID
      nowLocaltion: "终端",//当前的tab
      video_listData: [],//所有会议的初始数据
      data_id: "",//data_id
      mainHeight: "",//组件高度
    };
  },
  computed: {},
  mounted() {
    console.log(document.getElementsByClassName("ant-layout-content"));
    this.mainHeight = document.getElementsByClassName("ant-layout-content")[0].offsetHeight + "px";
    let { componentId } = this.customConfig || {};
    // let urlMessage = this.getUrlParams(window.location.href);
    let dataid = this.GetQueryString("data_id");
    // console.log(this.GetQueryString("data_id"));
    this.creatMeeting(dataid);
    componentId && window.componentCenter?.register(componentId, "comp", this, eventActionDefine);
  },
  methods: {
    // 创建会议
    creatMeeting(data_id) {
      let message = {
        data_id: data_id,
        type: "1",
      };
      create(message).then((res) => {
        if (res.status == 200) {
          this.conference_id = res.data.conference_id;
          this.addResources();
          let message = {
            conference_id: +this.conference_id,
            external: "",
            type: 1,
          };
          video_list(message).then((res) => {
            this.video_listData = res.data;
            if (res.data.is_recording) {
              let message = {
                conference_id: this.conference_id,
                status: 1,
              };
              // record(message).then((res) => {
              //   if (res.status == 200) {
              //     this.$message({
              //       message: "正在录播中",
              //       type: "success",
              //     });
              //   }
              // });
            }
            this.videoList = res.data.terminal_list;
            this.meetingStatusDataAll = res.data.terminal_list;
            this.meetingStatusData = this.meetingStatusDataAll;
            this.videoList.forEach((item, index) => {
              item.ipv == 0 ? (this.videoSouce[index] = "IPV4") : (this.videoSouce[index] = "IPV6");
            });
            this.terminalList = [];
            this.localList = [];
            this.fuseList = [];
            this.monitorList = [];
            res.data.terminal_list.forEach((item, index) => {
              switch (item.type) {
                case 0:
                  this.terminalList.push(item);
                  break;
                case 1:
                  this.localList.push(item);
                  break;
                case 2:
                  this.fuseList.push(item);
                  break;
                case 3:
                  this.monitorList.push(item);
                  break;
              }
            });
          });
          this.windowLayout();
        }
      });
    },
    // 获取所有直播数据
    searhVideoList() {
      let message = {
        conference_id: +this.conference_id,
        external: "",
        type: 1,
      };
      video_list(message).then((res) => {
        this.video_listData = res.data;
        if (res.data.is_recording) {
          let message = {
            conference_id: this.conference_id,
            status: 1,
          };
          record(message).then((res) => {
            if (res.status == 200) {
              this.$message({
                message: "正在录播中",
                type: "success",
              });
            }
          });
        }
        this.videoList = res.data.terminal_list;
        this.meetingStatusDataAll = res.data.terminal_list;
        this.meetingStatusData = this.meetingStatusDataAll;
        this.videoList.forEach((item, index) => {
          item.ipv == 0 ? (this.videoSouce[index] = "IPV4") : (this.videoSouce[index] = "IPV6");
        });
        this.terminalList = [];
        this.localList = [];
        this.fuseList = [];
        this.monitorList = [];
        res.data.terminal_list.forEach((item, index) => {
          switch (item.type) {
            case 0:
              this.terminalList.push(item);
              break;
            case 1:
              this.localList.push(item);
              break;
            case 2:
              this.fuseList.push(item);
              break;
            case 3:
              this.monitorList.push(item);
              break;
          }
        });
      });
    },
    // 录播
    videoChange() {
      this.videoStatus = this.videoStatus;
      let message = {
        conference_id: this.conference_id,
        status: "",
      };
      this.videoStatus ? (message.status = 1) : (message.status = 0);
      record(message).then((res) => {
        if (res.status == 200) {
          if (this.videoStatus) {
            this.$message({
              message: "正在录播中",
              type: "success",
            });
          } else {
            this.$message({
              message: "录制已关闭",
              type: "warning",
            });
          }
        }
      });
    },
    // 主屏幕布局
    windowLayout() {
      let message = {
        local_venue_name: "3123",
      };
      window_layout(message).then((res) => {
        if (res.status == 200) {
          this.centerScreen = res.data;
          this.centerScreenIndex = this.centerScreen[0];
          this.nowCenterScreen = this.centerScreen[0];
          this.videoList.forEach((item, index) => {
            item.ipv == 0 ? (this.videoSouce[index] = "IPV4") : "IPV6";
          });
          this.$nextTick(() => {
            let elements = document.getElementsByClassName("topCenterScreen");
            Array.prototype.forEach.call(elements, function (element) {
              element.addEventListener("dragover", function (event) {
                event.preventDefault();
                event.stopPropagation();
              });
              element.addEventListener("dragEnter", function (event) {
                event.preventDefault();
                event.stopPropagation();
              });
            });
          });
        }
      });
    },
    // 重拨
    recall(row) {
      let message = {
        conference_id: this.conference_id,
        terminal_id: row.id,
      };
      recall(message).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: "已重拨",
            type: "success",
          });
          this.searhVideoList();
        }
      });
    },
    // 呼叫
    changemain(row) {
      let message = {
        conference_id: this.conference_id,
        terminal_id: row.id,
      };
      change_main(message).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: "主席已切换，上屏到主区域",
            type: "success",
          });
          this.searhVideoList();
        }
      });
    },
    // 举手发言
    handleUp(row) {
      let message = {
        conference_id: this.conference_id,
        terminal_id: row.id,
      };
      say(message).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: "发言成功，上屏至第二区域",
            type: "success",
          });
        }
      });
    },
    // 预监
    advance() {
      let message = {
        conference_id: this.conference_id,
        terminal_list: [],
      };
      switch (this.nowLocaltion) {
        case "终端":
          this.terminalCheckList.forEach((item, index) => {
            message.terminal_list.push(item.id);
          });
          break;
        case "本地":
          this.localCheckList.forEach((item, index) => {
            message.terminal_list.push(item.id);
          });
          break;
        case "融合":
          this.fuseCheckList.forEach((item, index) => {
            message.terminal_list.push(item.id);
          });
          break;
        case "监控":
          this.monitorCheckList.forEach((item, index) => {
            message.terminal_list.push(item.id);
          });
          break;
      }
      if (message.terminal_list.length == 0) {
        return this.$message({
          message: "请勾选终端后预监",
          type: "warning",
        });
      }
      preview(message).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: "预监资源已更新",
            type: "success",
          });
        }
      });
    },
    // 底部删除
    closeButtom(item, index) {
      this.buttomTabList[index].url = "";
      this.$message({
        message: "删除成功",
        type: "success",
      });
    },
    // 线路切换
    videoLineChange(val, item) {
      console.log(val, item);
      let message = {
        conference_id: this.conference_id,
        terminal_id: item.id,
        ipv: val == "IPV4" ? 0 : 1,
      };
      change_ipv(message).then((res) => {
        if (res.status == 200) {
          if (val == "IPV4") {
            this.$message({
              message: "已切换至IPV4",
              type: "success",
            });
          } else {
            this.$message({
              message: "已切换至IPV6",
              type: "success",
            });
          }
        }
      });
    },
    // 麦克风
    imgShowChange(val, item, index) {
      let message = {
        conference_id: this.conference_id,
        terminal_id: item.id,
      };
      if (val == "off") {
        message.status = 1;
      } else if (val == "open") {
        message.status = 0;
      }
      mic_all(message).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.$message({
            message: "麦克风状态已切换",
            type: "success",
          });
          message.status == 0 ? item.mic_status == "off" : item.mic_status == "on";
          this.imgshow = !this.imgshow;
          this.searhVideoList();
        }
      });
    },
    // 弹窗搜索方法
    handleSearch() {
      this.meetingStatusData = [];
      this.meetingStatusDataAll.map((item) => {
        if (item.name.indexOf(this.dialogSearch) !== -1) {
          this.meetingStatusData.push(item);
        }
      });
      this.radioSearch = "";
    },
    // 线路弹窗事件
    lineDialogChange() {
      console.log(this.lineData);
      let message = {
        conference_id: +this.conference_id,
        terminal_id: "", // 为空，切换整个会议Ip线路，不为空切换终端ip线路
        ipv: this.lineData == "IPV4" ? 0 : 1, // 0 、为默认ipv4 1 、ipv6
      };
      change_ipv(message).then((res) => {
        console.log(res);
      });
      this.lineDialogVisible = false;
      this.$message({
        message: "保存成功",
        type: "success",
      });
    },
    // 弹窗tabChange
    dialogRadioSearch(val) {
      this.meetingStatusData = [];
      switch (val) {
        case "终端":
          this.meetingStatusDataAll.forEach((item, index) => {
            if (item.type == 0) {
              this.meetingStatusData.push(item);
            }
          });
          break;
        case "本地":
          this.meetingStatusDataAll.forEach((item, index) => {
            if (item.type == 1) {
              this.meetingStatusData.push(item);
            }
          });
          break;
        case "融合":
          this.meetingStatusDataAll.forEach((item, index) => {
            if (item.type == 2) {
              this.meetingStatusData.push(item);
            }
          });
          break;
        case "监控":
          this.meetingStatusDataAll.forEach((item, index) => {
            if (item.type == 3) {
              this.meetingStatusData.push(item);
            }
          });
          break;
      }
    },
    // 扬声器状态切换
    hornChange(row) {
      let message = {
        conference_id: this.conference_id,
        terminal_id: row.id,
        status: 1,
      };
      change_all_loudspeaker(message).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: "扬声器状态已变更",
            type: "success",
          });
        }
      });
    },
    // 弹窗预监
    rowMonitor(row) {
      let message = {
        conference_id: this.conference_id,
        terminal_list: [],
      };
      message.terminal_list[0] = row.id.toString();
      preview(message).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: "已预监",
            type: "success",
          });
          this.searhVideoList();
        }
      });
    },
    // 弹窗踢出会议
    rowFinishMeeting(row) {
      let message = {
        conference_id: this.conference_id,
        terminal_id: row.id,
      };
      hangup(message).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: "已踢出会议",
            type: "success",
          });
        }
      });
    },
    // 屏幕布局变更
    centerScreenIndexChange(val) {
      this.nowCenterScreen = val;
      console.log(val);
    },
    // tab改变
    handleClick(tab, event) {
      this.nowLocaltion = tab.label;
    },
    // 箭头点击
    arrowClick(val) {
      if (val === "right") {
        this.$refs.cardShow.next();
      } else {
        this.$refs.cardShow.prev();
      }
    },
    // 离会按钮
    leaveMeeting(row) {
      this.$message({
        message: "已离会",
        type: "warning",
      });
    },
    // 右侧退出会议按钮
    leaveMeetingAll() {
      let message = {
        conference_id: this.conference_id,
        data_id: this.data_id,
        type: 1, //1 紧急会议 0 普通会议
      };
      finish(message).then((res) => {
        if (res.status == 200) {
          this.$message({
            message: "已离会",
            type: "warning",
          });
          this.offDialogVisible = false;
        }
      });
    },
    // 弹窗新增行
    addRow() {
      let message = {
        name: "",
        model: "",
        type: "",
        flag: "",
        username: "",
        password: "",
        listId: this.listId++,
      };
      this.addtableData.push(message);
      this.$message({
        message: "新增成功",
        type: "success",
      });
    },
    // 弹窗删除行
    deleteRow(row) {
      this.addtableData.forEach((item, index) => {
        if (item.listId == row.listId) {
          this.addtableData.splice(index, 1);
          this.$message({
            message: "删除成功",
            type: "success",
          });
        }
      });
    },
    //临时资源添加
    addResources() {
      let message = {
        conference_id: this.conference_id,
        data_id: "111", // 新增为空
        parent_id: "aa", //跳转二开页面带入的data_id
        name: "名称",
        model: "型号",
        connection_identifier: "192.168.1.1",
        user_name: "admin",
        password: "sdy_23sZG",
        KVParams: { key: "value" }, // 其他参数
      };
      add_resources(message).then((res) => {
        console.log(res);
      });
    },
    // 拖动拖动源
    dragstart(event) {
      console.log(event, "拖动源信息");
    },
    // 拖动接收源
    drop(item, num, index) {
      console.log(item, num, index, "接收源信息");
      let message = {
        conference_id: this.conference_id,
        terminal_id: item.id,
        screen_id: num,
        window_id: index,
      };
      up_screen(message).then((res) => {
        console.log(res);
      });
    },
    // dragleave
    dragleave(event) {
      event.preventDefault();
      console.log("dragleave");
    },
    // 退出弹窗
    handleClose() {
      this.offDialogVisible = false;
    },
    // 会场状态弹窗
    handleStatusClose() {
      this.statusDialogVisible = false;
    },
    // 线路切换弹窗
    handleLineClose() {
      this.lineDialogVisible = false;
    },
    // 新增设备弹窗
    handleAddClose() {
      this.addDialogVisible = false;
    },
    // 退出弹窗
    openLogout() {
      this.offDialogVisible = true;
    },
    // 会场状态弹窗
    openStatus() {
      this.statusDialogVisible = true;
    },
    // 线路切换弹窗
    lineStatus() {
      this.lineDialogVisible = true;
    },
    // 新增设备弹窗
    addStatus() {
      this.addDialogVisible = true;
    },
    //获取URL参数
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
      var context = "";
      if (r != null) context = r[2];
      reg = null;
      r = null;
      return context == null || context == "" || context == "undefined" ? "" : context;
    },
    // 处理资产数据
    translatePlatformDataToJsonArray(originTableData) {
      let originTableHeader = originTableData.data[0];
      let tableHeader = [];
      originTableHeader.forEach((item) => {
        tableHeader.push(item.col_name);
      });
      let tableBody = originTableData.data[1];
      let tableData = [];
      tableBody.forEach((tableItem) => {
        let temp = {};
        tableItem.forEach((item, index) => {
          temp[tableHeader[index]] = item;
        });
        tableData.push(temp);
      });
      return tableData;
    },
    // 获取会议信息
    do_EventCenter_getMettingInfo(value) {
      console.log("----->", value);

      this.data_id = value.data_id;
      if (value.mettingID) {
        this.conference_id = value.mettingID;
        this.addResources();
        this.searhVideoList();
        this.windowLayout();
      } else {
        creatMetting(value.data_id).then((res) => {
          this.conference_id = res.data.conference_id;
          this.addResources();
          this.searhVideoList();
          this.windowLayout();
        });
      }
    },
  },
  destroyed() {
    window.componentCenter?.removeInstance(this.customConfig?.componentId);
  },
};
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-color: rgba(0, 21, 41, 1);
}
.videoGreen {
  color: #13ce66 !important;
}
.screenNum {
  position: absolute;
  right: 7.1%;
  top: 0.7%;
  /deep/.el-radio-button__inner {
    padding: 5px 5px;
    color: #ffffff;
    border: 0px;
    border-radius: 0;
    background: transparent;
  }
  /deep/.is-active {
    .el-radio-button__inner {
      background: #409eff;
    }
  }
}
.videoRed {
  color: #ff4949 !important;
}
.addressSpan {
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  margin-left: 0.5%;
}
// 上面区域
.mainTop {
  height: 67%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  // 上面左边
  .topLeft {
    border: 3.5px solid #2062a0;
    height: 100%;
    width: 18.5%;
    background-color: #113164;
    /deep/.el-tabs__content,
    .el-tabs {
      height: 90%;
    }
    .tabLable {
      display: flex;
      justify-content: space-between;
      overflow: scroll;
      height: 100%;
      overflow-x: hidden;
      /*滚动条样式*/
      &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(250, 250, 250, 1);
        background: rgba(0, 0, 0, 0.2);
      }
      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
      }
      .checkboxItem {
        display: flex;
        justify-content: space-between;
        .checkboxItemIcon {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .advance {
      height: 10%;
      width: 100%;
      display: flex;
      justify-content: center;
      /deep/.el-button {
        width: 160px;
        height: 40px;
        color: #ffffff;
        border: 0px rgba(80, 115, 237, 0.580392156862745);
        background-color: rgba(80, 115, 237, 0.580392156862745);
        &:hover {
          border-color: rgba(59, 96, 229, 1);
          background-color: rgba(59, 96, 229, 1);
        }
      }
    }
    /deep/ .el-tabs__header {
      border: 0px;
    }
    /deep/.el-tabs__item {
      border-color: #2062a0;
      border-bottom-width: 0px;
      color: #ffffff;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
    }
    /deep/ .el-tabs__nav {
      border-radius: 0px;
      border-color: #2062a0;
      border-top: 0px;
      border-right-color: #2062a0;
      border-left: 0;
      border-bottom: 1px solid #2062a0;
    }
    /deep/.el-checkbox-group {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    /deep/.el-checkbox {
      margin-left: 10px;
      margin-bottom: 27px;
      // margin-top: 5px;
      line-height: 22px;
      width: 60%;
      span {
        margin-right: 5px;
        margin-top: -2px;
      }
    }
    /deep/.is-active {
      background-color: #5073ed;
    }
    /deep/.el-checkbox__label {
      color: #ffffff;
    }
  }
  // 上面中间
  .topCenter {
    border: 3.5px solid #2062a0;
    height: 100%;
    width: 73.5%;
    position: relative;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;

    .topCenterScreen {
      .micIcon {
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: pointer;
      }
      .agreement {
        position: absolute;
        left: 0;
        bottom: 0;
        color: #ffffff;
        font-size: 22px;
        font-weight: 700;
      }
      /deep/.el-input__inner {
        border: 0px;
        width: 100px;
        line-height: 22px;
        font-size: 20px;
        padding: 0;
        color: #ffffff !important;
        background: transparent;
        &::placeholder {
          color: #ffffff !important;
        }
      }

      /deep/.el-input__suffix {
        display: none;
      }
    }
  }
  // 上边右边
  .topRight {
    border: 3.5px solid #2062a0;
    height: 100%;
    width: 6.5%;

    div {
      display: flex;
      height: 60px;
      justify-content: center;
      margin-top: 15px;
      &:first-child {
        border-bottom: 1px solid #ffffff;
      }
    }

    img {
      width: 45px;
      height: 45px;
      cursor: pointer;
    }
  }
}
// 下面区域
.mainBottom {
  margin-top: 0.5%;
  height: 28%;
  box-sizing: border-box;
  width: 99%;
  margin-left: 0.5%;
  border: 3.5px solid #2062a0;
  /deep/ .el-tabs__header {
    border: 0px;
    margin: 0px;
  }
  /deep/ .el-tabs__nav {
    border: 0px;
    padding-left: 100px;
  }
  /deep/ .el-tab-pane,
  .el-tabs {
    height: 100%;
  }
  /deep/ .el-tabs__content {
    height: calc(100% - 40px);
  }
  /deep/.el-tabs__item {
    border-color: #2062a0;
    border-bottom-width: 0px;
    color: #ffffff;
    border: 0px;
  }
  /deep/.is-active {
    background-color: #5073ed;
  }
  /deep/.el-carousel--horizontal {
    height: 100%;
    width: 100%;
  }
  /deep/.el-carousel__container {
    height: 100%;
    width: 92%;
    overflow: hidden;
    margin-left: 3.3%;
  }
  .arrowBox,
  .arrowBoxRight {
    height: 60%;
    width: 40px;
    margin-top: 30px;
    background: #0f264d;
    cursor: pointer;

    img {
      margin-top: 40%;
      margin-left: 20%;
      height: 70%;
      width: 20px;
      cursor: pointer;
    }
  }
  .arrowBoxRight {
    transform: rotateY(180deg);
  }
  /deep/.el-carousel__item {
    width: 100%;
    background-color: #7d7d7d !important;
    display: flex;
    justify-content: space-around;
  }
  .carouselItem {
    height: 100%;
    width: 19.9%;
    position: relative;
    img {
      height: 100%;
      width: 100%;
    }
    .closeBox {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      width: 20px;
      height: 20px;
      background: #ffffff;
      border-radius: 4px;
      line-height: 17px;
      font-size: 20px;
      text-align: center;
      font-weight: 700;
    }
  }
  .tabPane {
    display: flex;
  }
}

/deep/.el-radio {
  margin-bottom: 20px;
}
/deep/.el-dialog {
  border: 0px solid #2062a0 !important;
  background: transparent !important;
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__header {
    display: none;
  }
  .el-dialog__title {
    background: transparent;
  }
  .el-dialog__close,
  .el-dialog__body {
    color: #ffffff;
  }
  .el-radio__label {
    color: #ffffff;
  }
}
.meetingStatus {
  /deep/.el-dialog {
    border: 0px solid #2062a0 !important;
    background: transparent !important;
    .el-dialog__body {
      padding: 0;
    }
    .el-dialog__header {
      display: none;
    }
    .el-dialog__title {
      background: transparent;
    }
    .el-dialog__close,
    .el-dialog__body {
      color: #ffffff;
    }
    .el-radio__label {
      color: #ffffff;
    }
  }
  /deep/.el-dialog__wrapper {
    left: 15%;
    top: 10%;
  }
  // 会议整体
  .metting_all {
    width: 100%;
    height: 100%;
    background: #001529;
    border-radius: 10px;
    border-top-left-radius: 20px;
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
      width: 100%;
      height: 100%;
      border-top-left-radius: 20px;
    }
    // 表格标题
    .table_title {
      margin-left: -3px;
      background: url("../pluginTemp/images/bg_title@2x.png") no-repeat;
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
    .table_img img {
      cursor: pointer;
      margin-top: 7px;
      width: 26px;
      height: 26px;
    }
    // 单选
    .radio_search {
      padding-left: 20px;
      padding-bottom: 10px;
    }
    // 单选框样式
    /deep/ .el-radio-button__inner {
      color: #ffffff;
      border-color: #00a6d3;
      background: #001529;
    }
    /deep/ .el-radio-group .is-active .el-radio-button__inner {
      color: #00a6d3;
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
    }
    // 单选框样式
    /deep/ .el-radio-button__inner {
      color: #ffffff;
      border-color: #00a6d3;
      background: #001529;
    }
    /deep/ .el-radio-group .is-active .el-radio-button__inner {
      color: #00a6d3;
    }
    // 搜索框样式
    /deep/ .el-input__inner {
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
    // 工具栏标题
    .tool_title {
      background: url("../pluginTemp/images/bg_title.png") no-repeat;
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
}
.leaceMeetingDialog,
.switchLine {
  /deep/.el-dialog {
    background: #171f34 !important;
    border-radius: 5px !important;
  }
  /deep/.el-dialog__wrapper {
    left: 15%;
    top: 10%;
  }
  /deep/.el-dialog__header {
    display: block;
    span {
      color: #ffffff;
    }
  }
  /deep/.el-dialog__body {
    padding: 30px 20px !important;
  }
}
.temporaryAdd {
  /deep/.el-table__cell {
    background: #171f34;
    .cell {
      color: #ffffff;
      border: 0px;
    }
  }
  /deep/.is-scrolling-none {
    background: #171f34 !important;
  }
  /deep/.el-table--border {
    border: 0px;
  }
  /deep/.el-dialog {
    background: #171f34 !important;
    border-radius: 5px !important;
  }
  /deep/.el-dialog__body {
    padding: 30px 20px !important;
  }
  /deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
    /*更改鼠标悬停时表格高亮色*/
    background-color: #171f34 !important;
  }
  /deep/.el-table__empty-block {
    background: #171f34;
    span {
      color: #ffffff;
    }
    color: #ffffff;
  }
}
.addRow {
  width: 100% !important;
  border-top: 0px !important;
  border-radius: 0px !important;
}
@font-face {
  font-family: "iconfont";
  src: url("iconfont.woff2?t=1659519918538") format("woff2"), url("iconfont.woff?t=1659519918538") format("woff"), url("iconfont.ttf?t=1659519918538") format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 30px;
  font-weight: 700;
  font-style: normal;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
