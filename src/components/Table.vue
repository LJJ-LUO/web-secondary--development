<template>
  <div class="table-root">{{ data }}</div>
</template>

<script>
export default {
  name: "Table",
  props: {
    customConfig: Object,
  },
  data() {
    return {
      data: this.customConfig.data,
      propsConfiguration: this.customConfig.configuration,
      configuration: {}
    };
  },

  mounted() {
    try {
      this.configuration = JSON.parse(this.propsConfiguration);
    } catch (error) {
      console.error("configuration解析错误", error);

      let valueT = Number(this.data)
      let du1
      let fen1
      let miao1
      if (valueT < 0) {
        valueT = Math.abs(valueT)
        du1 = -parseInt(valueT)
        let du = parseInt(valueT)
        fen1 = parseInt((valueT - du) * 60)
        let temp1 = (valueT - du) * 60 - fen1
        miao1 = (temp1 * 60).toFixed(this.configuration.accuracy)
      } else {
        du1 = parseInt(valueT)
        fen1 = parseInt((valueT - du1) * 60)
        let temp1 = (valueT - du1) * 60 - fen1
        miao1 = (temp1 * 60).toFixed(this.configuration.accuracy)
      }
      this.data = du1 + '°' + fen1 + '′' + miao1 + '″'
    }
  }
};
</script>

<style lang="less" scoped>
.table-root {
  box-sizing: border-box;
  height: 32px;
  line-height: 32px;
  font-size: 13px;
  color: #606266;
}
</style>
