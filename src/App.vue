<template>
  <div :style="{ width: '100%', height: '100%', position: 'relative' }">
    <help
      theme="outline"
      class="helpTips"
      :size="this.option?.tip图标大小 ? this.option?.tip图标大小 : '24'"
      :fill="this.option?.tip图标颜色 ? this.option?.tip图标颜色 : '#22C9D3'"
    />
    <div
      class="tips_Content"
      :style="{
        top: this.option?.tip图标大小 ? +this.option?.tip图标大小 / 2 + 'px' : '12px',
        left: this.option?.tip图标大小 ? this.option?.tip图标大小 + 'px' : '24px',
        background: this.option?.tip内容背景颜色 ? this.option?.tip内容背景颜色 : background,
      }"
    >
      <span
        class="tips_Content_Title"
        :style="{
          color: this.option?.tip标题文字颜色 ? this.option?.tip标题文字颜色 : '#ffffff',
          fontSize: this.option?.tip标题文字大小 ? this.option?.tip标题文字大小 + 'px' : '22px',
        }"
        v-show="this.option?.tip标题"
        >{{ this.option?.tip标题 }}</span
      >
      <div
        :style="{
          width: this.option?.tip内容宽度 ? this.option?.tip内容宽度 + 'px' : '410px',
          color: this.option?.tip内容文字颜色 ? this.option?.tip内容文字颜色 : 'black',
          lineHeight: this.option?.tip内容文字大小 ? +this.option?.tip内容文字大小 * 2 + 'px' : '40px',
          fontSize: this.option?.tip内容文字大小 ? this.option?.tip内容文字大小 + 'px' : '20px',
        }"
        v-html="tip"
      ></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { normalizeData } from "./normalizeData";
import { Help } from "@icon-park/vue";
import { relative } from "path";
export default {
  name: "App",
  props: {
    customConfig: Object,
    options: Object,
  },
  components: {
    Help,
  },
  data() {
    return {
      tipShow: false,
      tip: "",
      option: {},
      background: "linear-gradient(180deg, rgba(4, 171, 229, 0.39539565826330536) 0%, rgba(4, 171, 229, 0.17690826330532217) 100%)",
    };
  },
  created() {
    console.log(this.options, this.customConfig);
    this.option = this.options?.externalVariables;
    if (this.option?.tip图标大小) {
      if (Number.isNaN(+this.option?.tip图标大小)) {
        this.option.tip图标大小 = 24;
      }
    }
    this.tip = this.options?.externalVariables.tip内容;
    const pubSub = this.customConfig.pubSub;
    pubSub &&
      pubSub.subscribe("updateChart" + this.customConfig.componentId, (data) => {
        console.log("updateChart");
        this.initChart(data.variable, data.option, data.data);
      });
  },
  mounted() {
    const events = [];

    const actions = [];
    window.componentCenter?.register &&
      window.componentCenter.register(this.customConfig.componentId, "comp", this, {
        events,
        actions,
      });
    this.customConfig?.updateProcess && this.customConfig.updateProcess();
  },

  methods: {},
};
</script>
<style lang="less" scoped>
.helpTips {
  cursor: pointer;
  &:hover + .tips_Content {
    display: block;
  }
}
.tips_Content {
  display: none;
  padding: 20px;
  border-top: 3px solid #04abe5;
  position: absolute;
}
.tips_Content_Title {
  font-size: 19px;
  line-height: 22px;
  font-weight: 700;
  color: #ffffff;
}
</style>
