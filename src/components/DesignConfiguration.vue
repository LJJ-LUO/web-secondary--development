<template>
  <el-form ref="dataForm" :model="dataForm" label-width="80px">
    <el-form-item label="资产ID">
      <el-input size="small" placeholder="请输入资产ID" v-model="dataForm.assetId"></el-input>
    </el-form-item>
    <el-form-item label="列表类型">
      <el-radio-group v-model="dataForm.choiceType">
        <el-radio label="单选"></el-radio>
        <el-radio label="多选"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="回填字段">
      <el-input size="small" placeholder="请输入回填字段" v-model="dataForm.splicingField"></el-input>
    </el-form-item>
    <el-form-item label="拼接符号">
      <el-input size="small" placeholder="请输入拼接符号" v-model="dataForm.splicingRules"></el-input>
    </el-form-item>
    <el-form-item label="展示字段">
      <el-input size="small" placeholder="请输入需要展示的字段" v-model="dataForm.showField"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    customConfig: Object,
  },

  data() {
    return {
      dataForm: {
        assetId: "",
        choiceType: "",
        splicingField: "",
        splicingRules: "",
        showField: "",
      },
    };
  },

  watch: {
    "dataForm.assetId": function (value, oldValue) {
      this.onFormLayoutChange();
    },
    "dataForm.choiceType": function (value, oldValue) {
      this.onFormLayoutChange();
    },
    "dataForm.splicingField": function (value, oldValue) {
      this.onFormLayoutChange();
    },
    "dataForm.splicingRules": function (value, oldValue) {
      this.onFormLayoutChange();
    },
    "dataForm.showField": function (value, oldValue) {
      this.onFormLayoutChange();
    },
  },

  mounted() {
    if (process.env.NODE_ENV !== "development") {
      this.dataForm = JSON.parse(this.customConfig.configuration) || "{}";
      if (!this.dataForm.choiceType) {
        this.dataForm.choiceType = "单选";
      }
    }
  },

  methods: {
    onFormLayoutChange() {
      this.customConfig.changeConfiguration(JSON.stringify(this.dataForm));
    },
  },
};
</script>
