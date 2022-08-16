<template>
  <div class="menu_list">
    <div class="top_box">
      <div class="menu_title">{{title}}</div>
      <div class="menu_more" :style="{color: pinPaiColor}" @click="lineHerf()">更多</div>
    </div>
    <div class="list_box">
      <div class="for_box" v-for="(item,i) in menuList" :key="i">
        <div class="menu_litm" :class="{'activeItem': active == i}" :style="{borderWidth: active == i ? '1px' : '0px',borderStyle:'solid',borderColor: pinPaiColor}" @click="setActive(i,item)">
          <img :src="item[imgSrc]" class="menu_img" alt="">
          <div class="right_box">
            <span class="name" :style="{color: active == i ? pinPaiColor : '#2a2b2d'}">{{item[menuTitle]}}</span>
            <div class="desc">{{item[menuDesc]}}</div>
          </div>
        </div>
        <div v-if="(i%2) == 0" class="line_box"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import appService from "@njsdata/app-sdk";
import eventActionDefine from "./components/msgCompConfig";
import "./index.css";
import {getAssetById} from "./api/asset"
export default {
  name: "App",
  props: {
    customConfig: Object,
    themeInfo: Object
  },
  data () {
    return {
      title: "",
      active: 0,
      menuTitle: "",
      menuDesc: "",
      themeList: [],
      imgSrc: "",
      lineTo: "",
      menuTo: "",
      menuList:[]
    }
  },
  computed: {
    // title() {
    //   return this.customConfig?.title || "数据构建";
    // },
    pinPaiColor() {
      let {theme_global_config} = this.themeInfo || {theme_global_config: {"--theme-public-pinPai-color": "rgba(24,144,255,1)"}}
      let themeColor = theme_global_config["--theme-public-pinPai-color"]
      return themeColor
    },
  },
  mounted() {
    this.assetId = this.customConfig?.assetId;
    this.title = this.customConfig?.title;
    this.menuTitle = this.customConfig?.menuTitle;
    this.menuDesc = this.customConfig?.menuDesc;
    this.themeList = JSON.parse(this.customConfig?.themePic);
    this.lineTo = this.customConfig?.moreTo;
    this.menuTo = this.customConfig?.menuTo;
    console.log('this.themeInfo',this.themeInfo);
    this.getData();
    let { componentId } = this.customConfig || {};
    componentId &&
      window.componentCenter?.register(
        componentId,
        "comp",
        this,
        eventActionDefine
      );
  },
  methods: {
    async getData() {
      console.log(this.themeList);
      let {theme_id} = this.themeInfo;
      this.imgSrc = "";
      this.themeList.forEach(y=>{
        if (y.themeId == theme_id) {
          this.imgSrc = y.image
        }
      });
      console.log('this.imgSrc',this.imgSrc);
      let {data} = await getAssetById(this.assetId);
      let key = data[0]
      let value = data[1]
      this.menuList = value.map(val => {
        let obj = {};
        key.forEach((k,index) =>{
          obj[k.col_name] = val[index]
        })
        return obj;
      })
      console.log('this.menuList',this.menuList);
    },
    lineHerf() {
      window.open(this.lineTo)
    },
    setActive(i,item) {
      this.active = i;
      window.open(item[this.menuTo])
    },
    triggerEvent() {
      let { componentId, appId } = this.customConfig || {};
      componentId &&
        appId &&
        window.eventCenter?.triggerEventNew({
          objectId: appId,
          componentId: componentId,
          type: "app",
          event: "",
          payload: {
            value: "",
          },
        });
    },
    do_EventCenter_messageSuccess() {
      alert("动作执行成功！");
    },
    Event_Center_getName() {
      return "";
    },
  },
  destroyed() {
    window.componentCenter?.removeInstance(this.customConfig?.componentId);
  },
};
</script>

<style lang="less" scoped>
.menu_list {
  padding: 15px;
  width: 398px;
  background: #f1f2f7;
  border-radius: 4px;
  .top_box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .menu_title {
      font-size: 15px;
      color: #333;
      font-weight: 600;
    }
    .menu_more {
      cursor: pointer;
      font-size: 13px;
    }
  }
  .list_box {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    width: 100%;
    .for_box {
      margin-top: 10px;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      cursor: pointer;
      .menu_litm {
        display: flex;
        align-items: center;
        padding: 10px;
        background: #f7f8fc;
        border-radius: 4px;
        height: 60px;
        width: 180px;
        box-sizing: border-box;
        .menu_img {
          margin-right: 10px;
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
        .right_box {
          height: 44px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name {
            font-size: 14px;
            font-weight: 600;
          }
          .desc{
            font-size: 12px;
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .activeItem{
        background: #ffffff;
      }
      .line_box {
        height: 60px;
        width: 6px;
        min-width: 6px;
      }
    }
  }
}
</style>