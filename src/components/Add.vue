<template>
  <div class="addSS">
    <el-input-number v-model="du1" size="small" :controls="false" :max="179" @blur="longitudeBlur">
    </el-input-number>°

    <el-input-number v-model="fen1" size="small" :controls="false" :min="0" :max="59" @blur="longitudeBlur">
    </el-input-number>′

    <el-input-number v-model="miao1" size="small" :controls="false" :min="0" :precision="configuration.accuracy"
      :max="miaoMax" @blur="longitudeBlur">
    </el-input-number>″
  </div>

</template>

<script>


import eventActionDefine from "./msgCompConfig";
import myMixin from '../mixin'
export default {
  name: "Add",
  props: {
    customConfig: Object,
  },
  mixins: [myMixin],
  data() {
    return {
      data: this.customConfig.data,
      du1: undefined,
      fen1: undefined,
      miao1: undefined,
      propsConfiguration: this.customConfig.configuration,
      configuration: {},
      miaoMax: null
    };
  },
  created() {

  },

  mounted() {
    window?.componentCenter?.register(
      this.customConfig.componentId,
      "comp",
      this,
      eventActionDefine
    );
    let { component, child_id, index } = this.customConfig;
    this.mixData.id = component.id
    this.mixData.child_id = child_id
    this.mixData.index = index
    this.mixData.eventActionDefine = eventActionDefine
    this.mixData.actions = { Event_Center_getName: this.Event_Center_getName, Event_Center_getParentInfo: this.Event_Center_getParentInfo }
    this.mixData.componentCenter = window?.componentCenter
    try {
      this.configuration = JSON.parse(this.propsConfiguration);
    } catch (error) {
      console.error("configuration解析错误", error);
    }
    this.miaoMax = (Math.pow(10, Number(this.configuration.accuracy)) - 1) / (Math.pow(10, Number(this.configuration.accuracy))) + 59

    if (this.customConfig.data) {
      let value = Number(this.customConfig.data)

      if (value < 0) {
        value = Math.abs(value)
        let du = parseInt(value)
        this.du1 = -parseInt(value)
        this.fen1 = parseInt((value - du) * 60)

        let temp1 = (value - du) * 60 - this.fen1

        this.miao1 = (temp1 * 60).toFixed(this.configuration.accuracy)
      } else {

        this.du1 = parseInt(value)

        this.fen1 = parseInt((value - this.du1) * 60)

        let temp1 = (value - this.du1) * 60 - this.fen1

        this.miao1 = (temp1 * 60).toFixed(this.configuration.accuracy)
      }
    }


  },
  methods: {


    longitudeBlur() {
      let du = this.du1 ? this.du1 : 0
      let zhen = true
      if (du < 0) {
        du = Math.abs(du)
        zhen = false
      }
      let fen = this.fen1 ? this.fen1 : 0
      let miao = this.miao1 ? this.miao1 : 0
      let a = du + fen / 60 + miao / 3600
      a = zhen ? a.toFixed(this.configuration.latitude) : -a.toFixed(this.configuration.latitude)
      this.inputChange(a)
    },
    async inputChange(e) {
      this.data = e;
      let { formConfig, component, onChange } = this.customConfig;
      await window.eventCenter.triggerEventNew({
        objectId: formConfig?.id,
        componentId: component.id,
        type: "report",
        event: "bulr",
        payload: {
          value: e,
        },
      });
      onChange(e);
    },
    Event_Center_getName() {
      let { formConfig, component } = this.customConfig;
      return `${formConfig?.form_name}-${component.columnStyle.title}`;
    },
    do_EventCenter_setValue({ value }) {
      this.data = value;
      let valueT = Number(value)
      if (valueT < 0) {
        valueT = Math.abs(valueT)
        this.du1 = -parseInt(valueT)
        let du = parseInt(valueT)
        this.fen1 = parseInt((valueT - du) * 60)
        let temp1 = (valueT - du) * 60 - this.fen1
        this.miao1 = (temp1 * 60).toFixed(8)
      } else {
        this.du1 = parseInt(valueT)
        this.fen1 = parseInt((valueT - this.du1) * 60)
        let temp1 = (valueT - this.du1) * 60 - this.fen1
        this.miao1 = (temp1 * 60).toFixed(8)
      }
      this.longitudeBlur()
      // this.du1 = parseInt(valueT)



    },
    do_EventCenter_getValue({ value }) {
      console.log(value);
    }
  },
  destroyed() {
    window?.componentCenter?.removeInstance(this.customConfig.componentId);
  },
};
</script>

<style lang="less" scoped>
.addSS {
  /deep/ .el-input-number {
    width: 80px;

    span {
      display: none;
    }
  }
}
</style>
