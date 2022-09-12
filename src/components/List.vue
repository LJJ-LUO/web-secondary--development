<template>
  <div class="metting_reserve" ref="mettingReserve">
    <!-- 会议预定顶部 -->
    <div class="metting_top">
      <!-- 日期选择器 -->
      <div class="metting_date_picker">
        <el-date-picker class="pieker_icon" align="left" v-model="mettingTopDate" prefix-icon="el-icon-arrow-down" format="MM月dd日" @change="datePickerFormat" :picker-options="pickerOptions" :editable="false" :clearable="false" type="date" placeholder="选择日期"> </el-date-picker>
      </div>
      <!-- 搜索框 -->
      <div class="metting_input">
        <el-input v-model="mettingTopInput" size="small" prefix-icon="el-icon-search" placeholder="搜索会议室" @change="searchMettingRomm"></el-input>
      </div>
    </div>
    <!-- 会议预定中部 -->
    <div class="metting_middle">
      <!--会议室整体 -->
      <div class="metting_room" v-for="(item, index) in mettingRoomDataShow" :key="index">
        <!--会议室标题 -->
        <div class="metting_room_title">{{ item.concatname }}</div>
        <!--会议室单元格 -->
        <div class="metting_room_row">
          <div v-for="number in 32" :key="number" style="width: 3.125%">
            <el-popover placement="top" trigger="click">
              <el-button :id="`${item.data_id}_${number}`" class="metting_room_cell" slot="reference" @click="handleCell(item.data_id, number)" :disabled="number * 0.5 + 8 < disabledTime" :style="{ background: number * 0.5 + 8 < disabledTime ? '#E0E0E0' : '' }"></el-button>
              <!-- 预定会议 -->
              <div v-if="!mettingPopoverType">
                <div>{{ item.concatname }}</div>
                <div style="margin-top: 6px; font-weight: bolder">{{ reserveMonth + " " + reserveTime }}</div>
                <el-button type="primary" size="small" class="popover_reserve_button" @click="saveMettingReserve(item.data_id, number)">预定</el-button>
              </div>
              <!-- 已预定会议 -->
              <div v-if="mettingPopoverType">
                <div>{{ reservedName }}</div>
                <div style="display: flex; margin-top: 6px">
                  <div style="color: #75c2ff; margin-right: 6px">{{ reservedType }}</div>
                  <div>{{ reservedTime }}</div>
                </div>
              </div>
            </el-popover>
          </div>
        </div>
        <!--会议室时间行 -->
        <div class="metting_time_row">
          <div v-for="item in 17" :key="item" style="width: 6.25%">
            <div>{{ item + 7 }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 会议预定底部 -->
    <div class="metting_bottom">
      <el-pagination background layout="total, sizes, prev, pager, next" :total="mettingRoomDataSearch.length" :page-size="pageSize" @size-change="handleSizeChange" :page-sizes="[5, 10, 20, 50]" @current-change="handlerCurrentChange"> </el-pagination>
    </div>
  </div>
</template>

<script>
// 引入接口
import { queryAssetById } from "../api/asset";
import $ from "jquery";
import moment from "moment";

import eventActionDefine from "./msgCompConfig";

export default {
  name: "List",

  props: {
    // 平台数据
    platformProps: Object,
    // 本地数据
    customConfig: Object,
  },

  data() {
    return {
      name: "会议预定",
      id: "",
      // 配置项数据
      configForm: {
        mettingID: "",
      },
      // 分页配置项
      pageSize: 10,
      // 页码
      page: 1,
      // 日期选择器
      mettingTopDate: new Date(),
      // 日期格式
      pickerOptions: {
        disabledDate(date) {
          return date.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        },
      },
      // 搜索框
      mettingTopInput: "",
      // 会议室数据
      mettingRoomData: [],
      // 会议室展示
      mettingRoomDataShow: [],
      // 会议室搜索
      mettingRoomDataSearch: [],
      // 会议数据
      mettingReserveData: [],

      // 已渲染数据
      renderdDataList: [],

      // 会议弹窗状态
      mettingPopoverType: false,

      // 会议预定日期
      reserveMonth: moment(this.mettingTopDate).format("MM-DD"),
      // 会议预定时间
      reserveTime: "",

      // 会议预定开始时间戳
      reserveStartStamp: "",
      // 会议预定开始后缀
      reserveStartSuffix: "",
      // 会议预定结束时间戳
      reserveEndStamp: "",
      // 会议预定结束后缀
      reserveEndSuffix: "",

      // 已预定会议人名
      reservedName: "",
      // 已预定会议状态
      reservedType: "已预定",
      // 已预定会议时间
      reservedTime: "",

      // 当前选中行ID
      sectionRowID: "",

      // 会议室置灰时间
      disabledTime: null,
      // 是否开启范围选择
      isSection: false,
      // 范围起始单元格
      sectionStart: "",
      // 首次起始单元格ID
      sectionFirstStartID: "",
      // 首次起始单元格下标
      sectionFirstStartIndex: "",
      // 范围结束单元格
      sectionEnd: "",
      // 首次结束单元格ID
      sectionFirstEndID: "",
      // 首次结束单元格下标
      sectionFirstEndIndex: "",

      // 预定开始下标
      reseverdStartIndex: "",
      // 预定结束下标
      reseverdEndIndex: "",

      reseverdType: true,

      // 选择会议室的ID
      sectionRoomID: "",

      // 模拟会议室数据
      mokeMettingRoomData: [
        [
          {
            label: "会议室名称",
            columnId: "fbd2b1df-4fd1-409d-b251-8068cb54673d",
            value: {
              value: "开发建设公司1701",
              display: "开发建设公司1701",
            },
            showType: "input",
          },
          {
            label: "会议室ID",
            columnId: "d9101b3f-f30e-400c-9621-7d53563970da",
            value: {
              value: "1174a3b89bd243c1ba940c4088c614d6",
              display: "1174a3b89bd243c1ba940c4088c614d6",
            },
            showType: "input",
          },
        ],
        [
          {
            label: "会议室名称",
            columnId: "fbd2b1df-4fd1-409d-b251-8068cb54673d",
            value: {
              value: "集团本部1503",
              display: "集团本部1503",
            },
            showType: "input",
          },
          {
            label: "会议室ID",
            columnId: "d9101b3f-f30e-400c-9621-7d53563970da",
            value: {
              value: "5bf66e2ea97a428bbce15e97ddf3b691",
              display: "5bf66e2ea97a428bbce15e97ddf3b691",
            },
            showType: "input",
          },
        ],
        [
          {
            label: "会议室名称",
            columnId: "fbd2b1df-4fd1-409d-b251-8068cb54673d",
            value: {
              value: "科技公司科技会议室501",
              display: "科技公司科技会议室501",
            },
            showType: "input",
          },
          {
            label: "会议室ID",
            columnId: "d9101b3f-f30e-400c-9621-7d53563970da",
            value: {
              value: "8985ea5a485842bc8ac6b3745c63d5e7",
              display: "8985ea5a485842bc8ac6b3745c63d5e7",
            },
            showType: "input",
          },
        ],
        [
          {
            label: "会议室名称",
            columnId: "fbd2b1df-4fd1-409d-b251-8068cb54673d",
            value: {
              value: "财务部1502",
              display: "财务部1502",
            },
            showType: "input",
          },
          {
            label: "会议室ID",
            columnId: "d9101b3f-f30e-400c-9621-7d53563970da",
            value: {
              value: "89fc2c4b130d449a95f5e5bb5f932b5c",
              display: "89fc2c4b130d449a95f5e5bb5f932b5c",
            },
            showType: "input",
          },
        ],
        [
          {
            label: "会议室名称",
            columnId: "fbd2b1df-4fd1-409d-b251-8068cb54673d",
            value: {
              value: "项目管理部会议室502",
              display: "项目管理部会议室502",
            },
            showType: "input",
          },
          {
            label: "会议室ID",
            columnId: "d9101b3f-f30e-400c-9621-7d53563970da",
            value: {
              value: "bd53535036ea4575beb66e0e5ddc2411",
              display: "bd53535036ea4575beb66e0e5ddc2411",
            },
            showType: "input",
          },
        ],
        [
          {
            label: "会议室名称",
            columnId: "fbd2b1df-4fd1-409d-b251-8068cb54673d",
            value: {
              value: "科技公司会议302",
              display: "科技公司会议302",
            },
            showType: "input",
          },
          {
            label: "会议室ID",
            columnId: "d9101b3f-f30e-400c-9621-7d53563970da",
            value: {
              value: "c3ce3641ed774e91a857e163a1a6943e",
              display: "c3ce3641ed774e91a857e163a1a6943e",
            },
            showType: "input",
          },
        ],
        [
          {
            label: "会议室名称",
            columnId: "fbd2b1df-4fd1-409d-b251-8068cb54673d",
            value: {
              value: "运营部会议室601",
              display: "运营部会议室601",
            },
            showType: "input",
          },
          {
            label: "会议室ID",
            columnId: "d9101b3f-f30e-400c-9621-7d53563970da",
            value: {
              value: "e87ae11b88b14bbdafa4522e91dadcdd",
              display: "e87ae11b88b14bbdafa4522e91dadcdd",
            },
            showType: "input",
          },
        ],
        [
          {
            label: "会议室名称",
            columnId: "fbd2b1df-4fd1-409d-b251-8068cb54673d",
            value: {
              value: "集团会议室1",
              display: "集团会议室1",
            },
            showType: "input",
          },
          {
            label: "会议室ID",
            columnId: "d9101b3f-f30e-400c-9621-7d53563970da",
            value: {
              value: "e962919599f04d63b125f0ef32481fca",
              display: "e962919599f04d63b125f0ef32481fca",
            },
            showType: "input",
          },
        ],
        [
          {
            label: "会议室名称",
            columnId: "fbd2b1df-4fd1-409d-b251-8068cb54673d",
            value: {
              value: "产业公司1601",
              display: "产业公司1601",
            },
            showType: "input",
          },
          {
            label: "会议室ID",
            columnId: "d9101b3f-f30e-400c-9621-7d53563970da",
            value: {
              value: "f574aa7ac63749119b32eca05d6ba2de",
              display: "f574aa7ac63749119b32eca05d6ba2de",
            },
            showType: "input",
          },
        ],
        [
          {
            label: "会议室名称",
            columnId: "fbd2b1df-4fd1-409d-b251-8068cb54673d",
            value: {
              value: "集团本部1708",
              display: "集团本部1708",
            },
            showType: "input",
          },
          {
            label: "会议室ID",
            columnId: "d9101b3f-f30e-400c-9621-7d53563970da",
            value: {
              value: "fd80b8e7f8ef43b39a7bafcb36151d42",
              display: "fd80b8e7f8ef43b39a7bafcb36151d42",
            },
            showType: "input",
          },
        ],
      ],
    };
  },

  watch: {
    "platformProps.data": {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        console.log("触发监听", this.platformProps);

        this.$nextTick(() => {
          this.configForm = this.platformProps.pluginConfig;
          this.id = this.platformProps.pluginId;
          window?.componentCenter.moduleRegister(this.platformProps.pluginId, "comp", this, eventActionDefine, this.platformProps.viewId);
          this.getMettingRoomData();
        });
      },
    },
  },

  mounted() {
    // 配置项数据隔离
    if (this.platformProps) {
      this.configForm = this.platformProps.pluginConfig;
    } else {
      this.configForm = this.customConfig.configuration;
    }

    // 添加日期图标
    let tag_i = `<i class="el-icon-arrow-down" style="position: absolute; top: 10px; right: 15px; pointer-events: none"></i>`;
    $(".pieker_icon").append(tag_i);
  },

  methods: {
    // 数据转换
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

    // 切换时间
    datePickerFormat(date) {
      this.mettingTopDate = date;
      if (this.sectionEnd) {
        if (this.sectionStart < this.sectionEnd) {
          for (let i = this.sectionStart; i < this.sectionEnd + 1; i++) {
            $(`#${this.sectionRowID}_${i}`).css("background", "");
          }
        } else if (this.sectionStart > this.sectionEnd) {
          for (let i = this.sectionEnd; i < this.sectionStart + 1; i++) {
            $(`#${this.sectionRowID}_${i}`).css("background", "");
          }
        }
      } else {
        $(`#${this.sectionRowID}_${this.sectionStart}`).css("background", "");
      }
      this.getMettingReserveData();
    },

    // 搜索会议室
    searchMettingRomm(value) {
      let searchArr = [];
      if (!value) {
        this.mettingRoomDataSearch = [];
        this.getMettingRoomData();
        return;
      }
      this.mettingRoomData.forEach((item, index) => {
        if (item.concatname.indexOf(value) != -1) {
          searchArr.push(item);
        }
      });

      let handleSeach = this.dataPaging(searchArr);

      this.mettingRoomDataShow = handleSeach;
    },

    // 切换显示条数
    handleSizeChange(value) {
      this.pageSize = value;
      this.getMettingRoomData();
    },

    // 切换分页
    handlerCurrentChange(page) {
      this.page = page;
      this.getMettingRoomData();
    },

    // 判断禁选单元格
    judgeCellDisabled() {
      let _time = new Date();
      let _hours = _time.getHours();
      let _minutes = _time.getMinutes();
      if (_minutes >= 30) {
        this.disabledTime = Number(_hours + 1.5);
      } else {
        this.disabledTime = _hours + 1;
      }
      // this.disabledTime = 0;
    },

    // 点击单元格
    handleCell(data_id, number) {
      this.sectionRowID = data_id;
      let _reseverdStartIndex = "";
      let _reseverdEndIndex = "";
      let _isReserved = false;
      let _filterDate = this.mettingReserveData.filter((item) => moment(new Date(item.startTime)).format("yyyy-MM-DD") == moment(new Date(this.mettingTopDate)).format("yyyy-MM-DD"));
      // 今日有预定
      if (_filterDate.length) {
        let _filterID = _filterDate.filter((item) => item.room_choice == data_id);
        // 当前会议室有预定
        if (_filterID.length) {
          let _startHours = new Date(_filterID[0].startTime).getHours();
          let _startMinutes = new Date(_filterID[0].startTime).getMinutes();
          let _endHours = new Date(_filterID[0].endTime).getHours();
          let _endMinutes = new Date(_filterID[0].endTime).getMinutes();
          _startMinutes > 30 ? (_startHours += 1) : _startHours;
          _endMinutes > 30 ? (_endHours += 1) : (_endHours += 0.5);
          let startNumber = (_startHours - 8) * 2;
          let endNumber = (_endHours - 8) * 2;

          _reseverdStartIndex = startNumber;
          _reseverdEndIndex = endNumber;

          if (this.reseverdType) {
            this.reseverdType = false;
            this.reseverdStartIndex = startNumber;
            this.reseverdEndIndex = endNumber;
          }

          // 预定单元格
          if (number >= startNumber && number <= endNumber) {
            if (_filterID[0].meeting_status == "已预定") {
              this.mettingPopoverType = true;
              _isReserved = true;
              let _startTime = moment(new Date(_filterID[0].startTime));
              let _endTime = moment(new Date(_filterID[0].endTime));
              this.reservedName = _filterID[0].create_member;
              this.reservedTime = `${_startTime.format("MM月DD日")} ${_startTime.format("HH:mm")} - ${_endTime.format("HH:mm")}`;
            }
          } else {
            // 无预定单元格
            this.mettingPopoverType = false;
          }
        } else {
          // 当前会议室无预定
          this.mettingPopoverType = false;
          this.reseverdType = false;
        }
      } else {
        // 今日无预定
        this.mettingPopoverType = false;
      }

      if (!_isReserved) {
        // 首次点击或换行
        if (this.sectionRoomID != data_id || this.sectionStart == "") {
          this.sectionEnd = "";
          // 如果选中单元格与起始单元格不同
          if (this.sectionFirstStartID != data_id) {
            $(`#${this.sectionFirstStartID}_${this.sectionFirstStartIndex}`).css("background", "");
          }
          // 如果存在范围结束单元格
          if (this.sectionFirstEndID) {
            if (this.sectionFirstEndIndex > this.sectionFirstStartIndex) {
              for (let i = this.sectionFirstStartIndex; i < this.sectionFirstEndIndex + 1; i++) {
                if (i < this.reseverdStartIndex || i > this.reseverdEndIndex) {
                  $(`#${this.sectionFirstEndID}_${i}`).css("background", "");
                }
              }
            } else if (this.sectionFirstEndIndex < this.sectionFirstStartIndex) {
              for (let i = this.sectionFirstEndIndex; i < this.sectionFirstStartIndex + 1; i++) {
                if (i < this.reseverdStartIndex || i > this.reseverdEndIndex) {
                  $(`#${this.sectionFirstEndID}_${i}`).css("background", "");
                }
              }
            }
            this.reseverdStartIndex = _reseverdStartIndex;
            this.reseverdEndIndex = _reseverdEndIndex;
          }

          this.sectionStart = number;
          this.sectionFirstStartID = data_id;
          this.sectionFirstStartIndex = number;
          this.isSection = true;
          $(`#${data_id}_${number}`).css("background", "#008DFF");
        } else {
          // 二次点击
          if (this.sectionStart) {
            // 清除选中范围
            if (this.sectionEnd) {
              if (this.sectionEnd > this.sectionStart) {
                for (let i = this.sectionStart; i < this.sectionEnd + 1; i++) {
                  if (i < _reseverdStartIndex || i > _reseverdEndIndex) {
                    $(`#${data_id}_${i}`).css("background", "");
                  }
                }
              } else if (this.sectionEnd < this.sectionStart) {
                for (let i = this.sectionEnd; i < this.sectionStart + 1; i++) {
                  if (i < _reseverdStartIndex || i > _reseverdEndIndex) {
                    $(`#${data_id}_${i}`).css("background", "");
                  }
                }
              }
            }
            // 选中时间 > 开始时间
            if (number > this.sectionStart) {
              for (let i = this.sectionStart; i < number + 1; i++) {
                if (i < _reseverdStartIndex || i > _reseverdEndIndex) {
                  $(`#${data_id}_${i}`).css("background", "#008DFF");
                }
              }
            } else if (number < this.sectionStart) {
              for (let i = number; i < this.sectionStart + 1; i++) {
                if (i < _reseverdStartIndex || i > _reseverdEndIndex) {
                  $(`#${data_id}_${i}`).css("background", "#008DFF");
                }
              }
            } else {
              this.sectionStart = "";
              this.sectionEnd = "";
            }
            this.sectionEnd = number;
            this.sectionFirstEndID = data_id;
            this.sectionFirstEndIndex = number;
          }
        }
        this.sectionRoomID = data_id;
      }

      let _startMinutes = String(this.sectionStart * 0.5 + 8).indexOf(".") != -1 ? ":30" : ":00";
      let _endMinutes = String(this.sectionEnd * 0.5 + 8).indexOf(".") != -1 ? ":30" : ":00";

      this.reserveStartSuffix = String(_startMinutes).slice(1);
      this.reserveEndSuffix = String(_endMinutes).slice(1);

      let _reserveStartTime = "";
      let _reserveEndTime = "";

      if (this.sectionStart) {
        if (String(this.sectionStart * 0.5 + 8).length == 3) {
          _reserveStartTime = "0" + String(this.sectionStart * 0.5 + 8).slice(0, 1) + _startMinutes;
          this.reserveStartStamp = "0" + String(this.sectionStart * 0.5 + 8).slice(0, 1);
        } else {
          _reserveStartTime = String(this.sectionStart * 0.5 + 8).slice(0, 2) + _startMinutes;
          this.reserveStartStamp = String(this.sectionStart * 0.5 + 8).slice(0, 2);
        }
      } else {
        _reserveStartTime = "";
      }

      if (this.sectionEnd) {
        if (String(this.sectionEnd * 0.5 + 8).length == 3) {
          _reserveEndTime = "0" + String(this.sectionEnd * 0.5 + 8).slice(0, 1) + _endMinutes;
          this.reserveEndStamp = "0" + String(this.sectionEnd * 0.5 + 8).slice(0, 1);
        } else {
          _reserveEndTime = String(this.sectionEnd * 0.5 + 8).slice(0, 2) + _endMinutes;
          this.reserveEndStamp = String(this.sectionEnd * 0.5 + 8).slice(0, 2);
        }
      } else {
        _reserveEndTime = _reserveStartTime;
      }

      if (!_isReserved) {
        if (number > this.sectionStart) {
          this.reserveTime = `${_reserveStartTime} - ${_reserveEndTime}`;
        } else {
          this.reserveTime = `${_reserveEndTime} - ${_reserveStartTime}`;
        }
      }
    },

    // 预定会议
    async saveMettingReserve(data_id) {
      let _filterDate = this.mettingReserveData.filter((item) => moment(new Date(item.startTime)).format("yyyy-MM-DD") == moment(new Date(this.mettingTopDate)).format("yyyy-MM-DD"));
      if (_filterDate.length) {
        let _filterID = _filterDate.filter((item) => item.room_choice == data_id);
        if (_filterID.length) {
          let _startHours = new Date(_filterID[0].startTime).getHours();
          let _startMinutes = new Date(_filterID[0].startTime).getMinutes();
          let _endHours = new Date(_filterID[0].endTime).getHours();
          let _endMinutes = new Date(_filterID[0].endTime).getMinutes();
          _startMinutes > 30 ? (_startHours += 1) : _startHours;
          _endMinutes > 30 ? (_endHours += 1) : (_endHours += 0.5);
          let startNumber = (_startHours - 8) * 2;
          if (this.sectionEnd > this.sectionStart) {
            if (startNumber > this.sectionStart && startNumber < this.sectionEnd) {
              this.$message.warning("当前选择的时间有冲突，请重新选择预定时间");
              return;
            }
          } else if (this.sectionEnd < this.sectionStart) {
            if (startNumber > this.sectionEnd && startNumber < this.sectionStart) {
              this.$message.warning("当前选择的时间有冲突，请重新选择预定时间");
              return;
            }
          }
        }
      }

      let _startHour = `${moment(this.mettingTopDate).format("yyyy-MM-DD")} ${this.reserveStartStamp}:00:00`;
      let _endHour = `${moment(this.mettingTopDate).format("yyyy-MM-DD")} ${this.reserveEndStamp}:00:00`;

      let eventData = {
        objectId: this.platformProps?.viewId,
        componentId: this.platformProps.pluginId,
        type: "viewer",
        event: "mettingReserve",
        payload: {
          startHour: Date.parse(new Date(_startHour)),
          startMinute: this.reserveStartSuffix,
          endHour: Date.parse(new Date(_endHour)),
          endMinute: this.reserveEndSuffix,
          mettingID: data_id,
        },
      };
      console.log("逻辑控制传参", eventData);

      await window?.eventCenter?.triggerEventNew(eventData);
    },

    // 获取会议室数据
    getMettingRoomData() {
      let dataArray = [];

      this.platformProps.data.forEach((item, index) => {
        // this.mokeMettingRoomData.forEach((item, index) => {
        let dataObj = {};
        // 去除默认字段
        if (item.length > 9) item.splice(-9, 9);
        // 过滤数据
        item.forEach((e, i) => {
          switch (e.label) {
            case "会议室ID":
              dataObj.data_id = e.value.display || "";
              break;
            case "会议室名称":
              dataObj.concatname = e.value.display || "";
              break;
          }
        });
        dataArray.push(dataObj);
      });
      this.mettingRoomData = dataArray;

      if (!this.mettingRoomDataSearch.length) {
        this.mettingRoomDataSearch = dataArray;
      }

      this.mettingRoomDataShow = this.dataPaging(this.mettingRoomDataSearch);
    },

    // 获取会议预定数据
    getMettingReserveData() {
      // 清除上一次数据
      if (this.renderdDataList.length) {
        this.renderdDataList.forEach((item, index) => {
          let _startHours = new Date(item.startTime).getHours();
          let _startMinutes = new Date(item.startTime).getMinutes();
          let _endHours = new Date(item.endTime).getHours();
          let _endMinutes = new Date(item.endTime).getMinutes();
          _startMinutes > 30 ? (_startHours += 1) : _startHours;
          _endMinutes > 30 ? (_endHours += 1) : (_endHours += 0.5);
          let startNumber = (_startHours - 8) * 2;
          let endNumber = (_endHours - 8) * 2;

          for (let i = startNumber; i < endNumber + 1; i++) {
            $(`#${item.room_choice}_${i}`).css("background", "");
          }
        });
      }

      queryAssetById(this.configForm.mettingID).then((res) => {
        // queryAssetById("17f9cc00-74fa-5024-7a6e-43b18c2bc27f").then((res) => {
        let resData = this.translatePlatformDataToJsonArray(res);
        this.mettingReserveData = JSON.parse(JSON.stringify(resData));
        // 渲染已预定
        this.mettingReserveData.forEach((item, index) => {
          if (moment(new Date(item.startTime)).format("yyyy-MM-DD") == moment(new Date(this.mettingTopDate)).format("yyyy-MM-DD")) {
            let _startHours = new Date(item.startTime).getHours();
            let _startMinutes = new Date(item.startTime).getMinutes();
            let _endHours = new Date(item.endTime).getHours();
            let _endMinutes = new Date(item.endTime).getMinutes();
            _startMinutes > 30 ? (_startHours += 1) : _startHours;
            _endMinutes > 30 ? (_endHours += 1) : (_endHours += 0.5);
            let startNumber = (_startHours - 8) * 2;
            let endNumber = (_endHours - 8) * 2;

            if (startNumber >= this.disabledTime) {
              this.renderdDataList.push(item);
              if (item.meeting_status == "已预定") {
                for (let i = startNumber; i < endNumber + 1; i++) {
                  $(`#${item.room_choice}_${i}`).css("background", "#9ED4FF");
                }
              }
            }
          }
        });
      });
    },

    // 数据分页
    dataPaging(dataList) {
      let pageArray = [];
      this.mettingRoomDataSearch = dataList;

      dataList.forEach((item, index) => {
        if (this.page != 1) {
          if (index >= this.pageSize * (this.page - 1)) {
            pageArray.push(item);
          }
        } else {
          if (index < this.pageSize) {
            pageArray.push(item);
          }
        }
      });
      this.judgeCellDisabled();
      this.getMettingReserveData();
      return pageArray;
    },

    Event_Center_getName() {
      return "会议预定";
    },
  },
};
</script>

<style lang="less" scoped>
// 会议预定整体
.metting_reserve {
  width: 100%;
  height: 100%;
  padding: 10px 30px 0 30px;
  box-sizing: border-box;
}
// 会议预定头部
.metting_top {
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  // 日期选择器整体
  .metting_date_picker {
    /deep/ .el-date-editor {
      width: 110px;
    }
    /deep/ .el-input__inner {
      padding: 0;
      padding-left: 10px;
      height: 32px;
      font-size: 15px;
      border: 1px solid #cfcfcf;
      background: none;
    }
    /deep/ .el-input__prefix {
      display: none;
    }
  }
  // 搜索框
  .metting_input {
    /deep/ .el-input {
      width: 260px;
    }
    /deep/ .el-input__inner {
      border-radius: 20px;
    }
  }
}
// 会议预定中部
.metting_middle {
  width: 100%;
  min-height: 90%;
  margin-top: -15px;
  // 会议室整体
  .metting_room {
    width: 100%;
  }
  // 会议室标题
  .metting_room_title {
    font-weight: bolder;
  }
  // 会议室行
  .metting_room_row {
    width: 100%;
    display: flex;
  }
  // 会议室单元格
  .metting_room_cell {
    width: 100%;
    height: 25px;
    border-radius: 0;
  }
  // 时间行
  .metting_time_row {
    width: 100%;
    margin-top: 2px;
    display: flex;
    align-items: center;
    div {
      font-size: 14px;
      color: #535353;
    }
    div:last-child {
      width: 0.5% !important;
    }
  }
  .metting_type {
    display: flex;
    align-items: center;
  }
}
// 预定按钮
.popover_reserve_button {
  margin-top: 10px;
  width: 75px;
  height: 30px;
}
// 会议预定底部
.metting_bottom {
  width: 100%;
  height: 5%;
  margin-top: 20px;
  margin-left: 12px;
  display: flex;
  justify-content: right;
  align-items: center;
  // 按钮
  /deep/ .btn-prev,
  /deep/ .btn-next {
    background: #fff;
    border: 1px solid #cfcfcf;
  }
  /deep/ .number {
    font-weight: normal;
    line-height: 26px;
    border: 1px solid #cfcfcf;
    background: #fff !important;
  }
  /deep/ .active {
    background: #409eff !important;
  }
}
</style>
