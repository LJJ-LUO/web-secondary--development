<template>
  <div class="disai">


    <el-input-number v-model="du" size="small" :controls="false" :min="0" :max="180">
    </el-input-number>°

    <el-input-number v-model="fen" size="small" :controls="false" :min="0" :max="60">
    </el-input-number>′

    <el-input-number v-model="miao" size="small" :controls="false" :min="0" :max="59.9999"
      :precision="configuration.accuracy">
    </el-input-number>″



  </div>

</template>

<script>
import eventActionDefine from "./msgCompConfig";
import myMixin from '../mixin'
export default {
  name: "Set",
  props: {
    customConfig: Object,
  },
  mixins: [myMixin],
  data() {
    return {

      data: this.customConfig.data,
      du: null,
      fen: null,
      miao: null,
      propsConfiguration: this.customConfig.configuration,
      configuration: {},
      miaoMax: null
    };
  },
  methods: {
    Event_Center_getName() {
      let { formConfig, component } = this.customConfig;
      return `${formConfig?.form_name}-${component.columnStyle.title}`;
    },
    Event_Center_getParentInfo() {
      return { scene: "dataForm" };
    },
    sendValue() {
      a = this.du + this.fen / 60 + this.miao / 60
      a.toFixed(8)
    },
    getValue(val) {
      this.du = parseInt(val)
      this.fen = parseInt((val - this.du) * 60)
      let temp = (val - this.du) * 60 - this.fen
      this.miao = ((temp - this.fen) * 60).toFixed(8)
    }
  },
  computed: {

  },

  mounted() {
    let { component, child_id, index } = this.customConfig;
    let initId = component.id;
    if (child_id) {
      initId = `${initId}__childId__${child_id.substr(0, 10)}`;
    }
    if (index > -1) {
      initId = `${initId}__index__${index}`;
    }
    window?.componentCenter?.register(initId, "comp", this, eventActionDefine);
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
    console.log(this.customConfig, '===============');
    this.miaoMax = (Math.pow(10, Number(this.configuration.accuracy)) - 1) / (Math.pow(10, Number(this.configuration.accuracy))) + 59
  },
  destroyed() {
    let { component, child_id, index } = this.customConfig;
    let initId = component.id;
    if (child_id) {
      initId = `${initId}__childId__${child_id.substr(0, 10)}`;
    }
    if (index > -1) {
      initId = `${initId}__index__${index}`;
    }
    window?.componentCenter?.removeInstance(initId);
  },
};
</script>


<style lang="less" scoped>
.disai {
  /deep/ .el-input-number {
    width: 80px;


  }


}
</style>