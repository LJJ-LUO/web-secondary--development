<template>
  <el-form ref="form" :model="form" label-width="110px" label-position="left">
    <el-form-item label="秒小数精确位数" name="accuracy">
      <el-input-number v-model="form.accuracy" :controls="false" size="small" :min="0" />
    </el-form-item>
    <el-form-item label="保留小数位数" name="latitude">
      <el-input-number v-model="form.latitude" :controls="false" size="small" :min="0" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        accuracy: null,
        latitude: null,
      },
    };
  },

  watch: {
    "form.accuracy": function (value, oldValue) {
      this.onFormLayoutChange();
    },
    "form.latitude": function (value, oldValue) {
      this.onFormLayoutChange();
    },
    "form.allowClear": function (value, oldValue) {
      this.onFormLayoutChange();
    },
  },

  props: {
    changeConfiguration: Function,
    configuration: Object,
    customConfig: Object,
  },
  methods: {
    onFormLayoutChange() {
      this.customConfig.changeConfiguration(JSON.stringify(this.form));
    },
  },
  mounted() {
    this.form = JSON.parse(this.customConfig.configuration);
  },
};
</script>