<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="子表id">
      <el-input v-model="form.placeholder"></el-input>
    </el-form-item>
    <el-form-item label="左实例字段">
      <el-input v-model="form.l_entity_name"></el-input>
    </el-form-item>
    <el-form-item label="右实例字段">
      <el-input v-model="form.r_entity_name"></el-input>
    </el-form-item>
    <el-form-item label="关系字段">
      <el-input v-model="form.relationship"></el-input>
    </el-form-item>
    <el-form-item label="图谱宽">
      <el-input v-model="form.width"></el-input>
    </el-form-item>
    <el-form-item label="图谱高">
      <el-input v-model="form.height"></el-input>
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input v-model="form.fontSzie"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        placeholder: "",
        r_entity_name: '',
        l_entity_name: '',
        relationship: '',
        width: '',
        height: '',
        fontSize: '',
      },
    };
  },

  watch: {
    "form.l_entity_name": function (value, oldValue) {
      this.onFormLayoutChange();
    },
    "form.placeholder": function (value, oldValue) {
      this.onFormLayoutChange();
    },
    "form.r_entity_name": function (value, oldValue) {
      this.onFormLayoutChange();
    },
    "form.relationship": function (value, oldValue) {
      this.onFormLayoutChange();
    },
    "form.width": function (value, oldValue) {
      this.onFormLayoutChange();
    },
    "form.height": function (value, oldValue) {
      this.onFormLayoutChange();
    },
    "form.fontSize": function (value, oldValue) {
      this.onFormLayoutChange();
    },
  },

  props: {
    customConfig: Object,
  },
  methods: {
    onFormLayoutChange() {
      this.customConfig.changeConfiguration(JSON.stringify(this.form));
    },
  },
  mounted() {
    this.form = JSON.parse(this.customConfig.configuration || "{}");
  },
};
</script>
