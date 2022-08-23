<template>
  <el-input size="small" />
</template>

<script>
export default {
  name: "Set",
  props: {
    customConfig: Object,
  },
  data() {
    return {
      data: this.customConfig.data,
    };
  },
};
</script>
