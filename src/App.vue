<template>
  <!-- 定义外层容器标识，宽高百分百 -->
  <div :id="identification" style="width: 100%;height: 100%" :ref="identification">
    <!-- 不可删除-->
    <el-radio-group
      v-model="defaultValue"
      v-for="item in buttons"
      @change="handleValueChange"
      :fill="themeColor"
      :text-color="themeColor"
    >
      <el-radio-button :label="item.label"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import eventActionDefine from "./components/msgCompConfig";
import {
  RadioButton,
  RadioGroup
} from "element-ui";
import Vue from "vue"
import utils from "@/utils";


Vue.use(RadioGroup)
Vue.use(RadioButton)

export default {
  //这里写组件英文名称，容器dom的id及事件中心命名均用到这个name，请认真填写
  name: "ButtonChange",
  props: {
    customConfig: Object,
    info: Object,
    //应用变量和系统变量 7.26 V8R4C50SPC220需求新加 之前版本取不到appVariables和sysVariables
    appVariables:Array,
    sysVariables:Array,
    //8.11 V8R4C60SPC100需求新加，之前版本取不到themeInfo
    themeInfo: Object
  },
  computed: {
    themeColor() {
      let {theme_global_config} = this.themeInfo || {theme_global_config: {"--theme-public-pinPai-color": "rgba(24,144,255,1)"}}
      let themeColor = theme_global_config["--theme-public-pinPai-color"]
      return themeColor
    },
  },
  data() {
    return {
      identification: "",
      selected: "",
      buttons: [],
      defaultValue: "",
    }
  },
  mounted() {
    //用于注册事件定义，不可删除
    let {componentId} = this.customConfig || {};
    componentId &&
    window.componentCenter?.register(
      componentId,
      "comp",
      this,
      eventActionDefine
    );
    let {buttons, id} = this.customConfig
    let componentName = this.$vnode.tag.split("-").pop().toLowerCase()
    this.identification = id ? `secondary_${componentName}_${id}` : `secondary_${componentName}_${utils.generateUUID()}`
    //用于定义接收用户输入
    this.buttons = JSON.parse(buttons).data;
    this.defaultValue = JSON.parse(buttons).defaultValue;
    if (this.defaultValue) {
      this.triggerEvent("valueChange",
        {
          value: this.defaultValue
        }
      )
    }
  },
  methods: {
    handleValueChange(value) {
      console.log(value);
      this.triggerEvent("valueChange",
        {
          value
        }
      )
    },

    /**
     * 触发事件
     * @param {String} eventName 事件名
     * @param {Array} payload 事件传参
     *
     */
    triggerEvent(eventName, payload) {
      let {componentId, appId} = this.customConfig || {};
      componentId && appId && window.eventCenter?.triggerEvent(
        componentId,
        eventName,
        payload
      );
    },
    Event_Center_getName() {
      return this.identification;
    },
  },
  destroyed() {
    window.componentCenter?.removeInstance(this.customConfig?.componentId);
  },
};
</script>
