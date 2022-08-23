<template>
  <el-input v-model="data" @input="inputChange" size="small" />
</template>

<script>
export default {
  name: "Child",
  props: {
    customConfig: Object,
  },
  data() {
    return {
      data: this.customConfig.data,
    };
  },
  methods: {
    inputChange(e) {
      this.customConfig.onChange(e);
    },
  },
};
</script>

<style></style>
