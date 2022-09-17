<template>
  <div class="preview-root">{{ data }}</div>
</template>

<script>
// 引入接口
import { getAssetsData } from "../api/asset";

export default {
  name: "Preview",

  props: {
    customConfig: Object,
  },

  data() {
    return {
      data: this.customConfig.data,
      assetId: "",
      tableChoiceType: "",
    };
  },

  created() {
    if (process.env.NODE_ENV !== "development") {
      let _config = JSON.parse(this.customConfig.component.columnStyle.customPluginConfig);
      this.assetId = _config.assetId;
      _config.choiceType == "单选" ? (this.tableChoiceType = true) : (this.tableChoiceType = false);
      this.inputSplicingField = _config.splicingField;
      this.inputSplicingRules = _config.splicingRules;
      this.filterData();
    }
  },

  methods: {
    filterData() {
      getAssetsData({ assetId: this.assetId }).then((res) => {
        if (this.tableChoiceType) {
          res.data.forEach((item, index) => {
            if (this.customConfig.data == item.data_id) {
              this.data = item[this.inputSplicingField];
            }
          });
        } else {
          let _dataArr = this.customConfig.data.split(",");
          let _strArr = [];
          res.data.forEach((item, index) => {
            _dataArr.forEach((e, i) => {
              if (item.data_id == e) {
                _strArr.push(item[this.inputSplicingField]);
              }
            });
          });
          this.data = _strArr.join(this.inputSplicingRules);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.preview-root {
  box-sizing: border-box;
  height: 32px;
  line-height: 32px;
  font-size: 13px;
  color: #606266;
}
</style>
