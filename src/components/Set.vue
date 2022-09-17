<template>
  <div>
    <!-- 输入框 -->
    <el-input size="small" v-model="data" @focus="openDialog" />
    <!-- 表格弹窗 -->
    <el-dialog title="选择公摊表" :visible.sync="tableDialog">
      <!-- 单选表格 -->
      <el-table v-if="tableChoiceType" :data="tableData" style="width: 100%" @row-click="tableSingleChoice">
        <el-table-column header-align="center" align="center" width="60" label="选择">
          <template slot-scope="scope">
            <el-radio class="table_radio" v-model="tableRadio" :label="scope.row.data_id">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column v-for="(item, index) in tableShowField" :key="index" :prop="item.key" :label="item.label" header-align="center" align="center"></el-table-column>
      </el-table>

      <!-- 多选表格 -->
      <el-table v-if="!tableChoiceType" :data="tableData" @selection-change="tableMultipleChoice">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-for="(item, index) in tableShowField" :key="index" :prop="item.key" :label="item.label" header-align="center" align="center"></el-table-column>
      </el-table>

      <!-- 按钮 -->
      <div class="dialog_button">
        <el-button size="small" type="primary" @click="saveDialog">确 定</el-button>
        <el-button size="small" @click="coloseDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入逻辑控制
import eventActionDefine from "./msgCompConfig";
// 引入接口
import { getAssetsData } from "../api/asset";

export default {
  name: "Set",

  props: {
    customConfig: Object,
  },

  data() {
    return {
      // 资产ID
      assetId: "",
      // 表格数据
      tableData: [],

      // 表格选择状态
      tableChoiceType: true,
      // 拼接字段
      inputSplicingField: "",
      // 拼接规则
      inputSplicingRules: "",
      // 表格展示字段
      tableShowField: [],

      // 输入框数据
      data: this.customConfig.data,
      // 弹窗开关
      tableDialog: false,

      // 表格单选当前行
      tableRadio: "",
      // 表格单选数据
      tableRadioRow: {},
      // 表格多选数据
      tableCheckboxList: [],
    };
  },

  created() {
    if (process.env.NODE_ENV !== "development") {
      let _config = JSON.parse(this.customConfig.component.columnStyle.customPluginConfig);
      // 判断表格状态
      _config.choiceType == "单选" ? (this.tableChoiceType = true) : (this.tableChoiceType = false);
      // 资产ID
      this.assetId = _config.assetId;
      // 回填字段
      this.inputSplicingField = _config.splicingField;
      // 拼接规则
      this.inputSplicingRules = _config.splicingRules;
      // 展示字段
      this.tableShowField = JSON.parse(_config.showField);
    } else {
      this.assetId = "9d1efdbe-01b3-3054-952b-15a92b23f84c";
      this.inputSplicingField = "instrument";
      this.inputSplicingRules = "-";
      this.tableShowField = [
        { key: "instrument", label: "仪表号" },
        { key: "park_name", label: "园区名称" },
        { key: "equally_shared_name", label: "公摊名称" },
      ];
    }
  },

  mounted() {
    let { component, child_id, index } = this.customConfig;
    let initId = component.id;
    if (child_id) {
      initId = `${initId}__childId__${child_id.substr(0, 10)}`;
    }
    if (index > -1) {
      initId = `${initId}__index__${index}`;
    }
    window?.componentCenter?.register(initId, "comp", this, eventActionDefine);
  },

  methods: {
    // 保存弹窗数据
    saveDialog() {
      if (this.tableChoiceType) {
        this.data = this.tableRadioRow[this.inputSplicingField];
      } else {
        let _dataShowList = [];
        this.tableCheckboxList.forEach((item, index) => {
          _dataShowList.push(item[this.inputSplicingField]);
        });
        this.data = _dataShowList.join(this.inputSplicingRules);
      }

      this.tableDialog = false;
    },

    // 打开弹窗
    openDialog() {
      this.tableDialog = true;
      this.getTableData();
    },

    // 关闭弹窗
    coloseDialog() {
      this.tableRadioRow = {};
      this.tableCheckboxList = [];
      this.tableDialog = false;
    },

    // 获取表格数据
    getTableData() {
      let dataForm = {
        assetId: this.assetId,
      };
      getAssetsData(dataForm).then((res) => {
        this.tableData = res.data;
      });
    },

    // 表格单选
    tableSingleChoice(row) {
      this.tableRadio = row.id;
      this.tableRadioRow = row;
    },

    // 表格多选
    tableMultipleChoice(rowList) {
      this.tableCheckboxList = rowList;
    },

    // 注册组件名称
    Event_Center_getName() {
      let { formConfig, component } = this.customConfig;
      return `${formConfig?.form_name}-${component.columnStyle.title}`;
    },
  },

  destroyed() {
    let { component, child_id, index } = this.customConfig;
    let initId = component.id;
    if (child_id) {
      initId = `${initId}__childId__${child_id.substr(0, 10)}`;
    }
    if (index > -1) {
      initId = `${initId}__index__${index}`;
    }
    window?.componentCenter?.removeInstance(initId);
  },
};
</script>

<style lang="less" scoped>
// 单选表格
.table_radio {
  /deep/ .el-radio__label {
    display: none;
  }
}
.dialog_button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  /deep/ .el-button:first-child {
    margin-right: 10px;
  }
}
</style>
