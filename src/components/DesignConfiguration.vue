<template>
  <el-form ref="form" :model="form" label-width="80">
    <!-- 任务资产ID -->
    <el-form-item label="资产ID">
      <el-input v-model="form.mettingID" placeholder="请输入资产ID" size="small"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "DesignConfiguration",

  props: {
    customConfig: Object,
    platformProps: Object,
  },

  data() {
    // 储存配置项数据
    let form = {
      mettingID: "",
    };
    // 赋值平台数据
    if (this.platformProps) {
      form = JSON.parse(this.platformProps.configuration);
    }

    return {
      configForm: {},
      form: form,
    };
  },

  mounted() {
    // 数据隔离
    if (this.platformProps) {
      this.configForm = JSON.parse(this.platformProps.configuration);
    } else {
      this.configForm = this.customConfig.configuration;
    }
  },

  watch: {
    "form.mettingID": function (value, oldValue) {
      this.onFormLayoutChange();
    },
  },

  methods: {
    onFormLayoutChange() {
      this.platformProps?.changeConfiguration(JSON.stringify(this.form));
    },
  },
};
</script>
