<template>
  <div class="menu_all">
    <el-menu @select="handleSelect" :default-openeds="openFirst()" @open="openMenu" @close="closeMenu" :default-active="defaultActive()">
      <div v-for="(item, index) in menuList" :key="index">
        <el-submenu :index="item.id" v-if="JSON.stringify(item.children) != '[]'">
          <!-- 一级菜单 -->
          <template slot="title">
            <span class="nav_line"></span>
            <div class="title_image">
              <img :src="getImgUrl(item)" alt="" v-if="item.icon" />
              <img src="./assets/menuTitle.png" alt="" v-else />
            </div>
            <span class="menu_first">{{ item.name }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item-group>
            <el-row class="menu_row" :gutter="8">
              <el-col :span="12" v-for="(e, i) in item.children" :key="i" class="menu_col">
                <el-menu-item :index="e.id">
                  <el-badge :value="getBadge(e, 'value')" class="ment_badge" :max="99" :hidden="getBadge(e, 'type')">
                    <img :src="getImgUrl(e)" alt="" v-if="e.icon" />
                    <img src="./assets/menuIcon.png" alt="" v-else />
                  </el-badge>
                  <div class="menu_label">{{ e.name }}</div>
                </el-menu-item>
              </el-col>
            </el-row>
          </el-menu-item-group>
        </el-submenu>
        <!-- 应用管理 -->
        <el-menu-item :index="item.id" v-if="JSON.stringify(item.children) == '[]'">
          <div class="title_image">
            <img :src="getImgUrl(item)" alt="" v-if="item.icon" />
            <img src="./assets/menuTitle.png" alt="" v-else />
          </div>
          <span class="menu_last" slot="title">{{ item.name }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import eventActionDefine from "./components/msgCompConfig";
import "./index.css";

import Cookies from "js-cookie";

import { queryByDatappId } from "./api/asset";

import qs from "querystringify";

export default {
  name: "App",

  props: {
    appVariables: Array,
    customConfig: Object,
    goHistory: Function,
    variables: Object,
  },

  data() {
    return {
      // 展示的菜单数据
      menuList: [],
      // 菜单id
      appid: "",
      // 小红点状态
      badgeHidden: true,
      // 定时刷新
      timer: null,
      // 是否第一次展开
      isFirstOpen: true,
      // 展开状态列表
      menuOpenTypeList: [],

      badgeData: null,
    };
  },

  mounted() {
    let { componentId } = this.customConfig || {};
    componentId && window.componentCenter?.register(componentId, "comp", this, eventActionDefine);

    // this.appid = "1cc59075-95c1-409a-498d-ffb67f64c14a";
    this.appid = qs.parse(window.location.search).appid;
    this.getMenuList();

    window.notification = this.getMenuList;
  },

  methods: {
    // 默认展开
    openFirst() {
      // let search = qs.parse(window.location.search);
      let search = Cookies.get("menuOpenType");
      this.menuOpenTypeList = [];
      let menuArr = [];
      if (search) {
        let mentList = search.split(",");
        mentList.forEach((item, index) => {
          if (this.menuList[item]) {
            menuArr.push(this.menuList[item]["id"] || "");
          }
        });
        this.$nextTick(() => {
          this.menuOpenTypeList = menuArr;
        });
        return menuArr;
      } else {
        if (this.menuList[0]) {
          let id = this.menuList[0]["id"];
          this.$nextTick(() => {
            if (id) {
              this.menuOpenTypeList.push(id);
              return [id];
            }
          });
        }
      }
    },

    // 默认选中
    defaultActive() {
      console.log("-------------->", this.menuList);
      if (this.menuList[0]) {
        let _chlidren = this.menuList[0].children;
        if (_chlidren[0]) {
          let id = _chlidren[0]["id"];
          if (id) {
            console.log(id);
            return id;
          }
        }
      }
    },

    // 获取菜单数据
    getMenuList(badgeObject) {
      this.badgeData = badgeObject;
      queryByDatappId(this.appid, 1).then((res) => {
        this.menuList = res.data;
      });
      this.$forceUpdate();
    },

    // 切换菜单
    handleSelect(rowId) {
      let menuRow = {};
      this.menuList.forEach((item, index) => {
        if (JSON.stringify(item.children) != "[]") {
          item.children.forEach((e) => {
            if (rowId == e.id) {
              menuRow = e;
            }
          });
        } else {
          if (rowId == item.id) {
            menuRow = item;
            if (item.name == "应用管理") {
              menuRow.id = "system#1";
            }
          }
        }
      });
      this.routerHistry(menuRow);
    },

    openMenu(rowId) {
      this.menuOpenTypeList.push(rowId);

      let mentType = [];
      this.menuOpenTypeList.forEach((item, index) => {
        this.menuList.forEach((e, i) => {
          if (item == e.id) {
            mentType.push(i);
          }
        });
      });

      Cookies.set("menuOpenType", mentType.toString());
    },

    closeMenu(rowId) {
      this.menuOpenTypeList = this.menuOpenTypeList.filter((item) => item != rowId);

      let mentType = [];
      this.menuOpenTypeList.forEach((item, index) => {
        this.menuList.forEach((e, i) => {
          if (item == e.id) {
            mentType.push(i);
          }
        });
      });

      Cookies.set("menuOpenType", mentType.toString());
    },

    // 菜单跳转
    routerHistry(row) {
      console.log("菜单ID", row.id);
      let mentType = [];
      this.menuOpenTypeList.forEach((item, index) => {
        this.menuList.forEach((e, i) => {
          if (item == e.id) {
            mentType.push(i);
          }
        });
      });

      Cookies.set("menuOpenType", mentType.toString());

      function filterSearchParams() {
        const search = qs.parse(location.search);
        const required = ["appid", "menuId", "type", "otherappid"];

        return Object.fromEntries(Object.entries(search).filter(([k, v]) => required.includes(k) && v !== "undefined"));
      }
      // 添加参数
      const search = filterSearchParams();
      search.appid = this.appid;
      search.menuId = row.id;
      search.type = "view";

      // 过滤undefined
      for (let i in search) {
        if (search[i] === undefined) {
          delete search[i];
        }
      }
      // 跳转
      this.goHistory({
        pathname: `/applicationview/content/view`,
        search: qs.stringify(search),
      });
    },

    // 计算小红点
    getBadge(row, type) {
      let badgeNumber = 0;
      let badgeType = false;

      let _appVariables = null;
      let _variables = null;

      if (this.badgeData) {
        _appVariables = this.badgeData.appVariables;
        _variables = this.badgeData.variables;
      } else {
        _appVariables = this.appVariables;
        _variables = this.variables;
      }

      _appVariables &&
        _appVariables.forEach((item, index) => {
          if (item.id == row.variables) {
            if (_variables[item.name] != 0) {
              badgeNumber = _variables[item.name];
            } else {
              if (item.default_value != 0) {
                badgeNumber = item.default_value;
              }
            }
          }
        });

      badgeNumber <= 0 ? (badgeType = true) : (badgeType = false);

      if (type == "value") {
        return badgeNumber;
      } else {
        return badgeType;
      }
    },

    // 获取图片地址
    getImgUrl(row) {
      let imageUrl = "";
      if (row.icon) {
        imageUrl = JSON.parse(row.icon).url;
      }
      return `${window.location.origin}${imageUrl}`;
    },

    // 触发事件
    triggerEvent() {
      let { componentId, appId } = this.customConfig || {};
      componentId &&
        appId &&
        window.eventCenter?.triggerEventNew({
          objectId: appId,
          componentId: componentId,
          type: "app",
          event: "onImgClick",
          payload: {
            value: "sasdasd",
          },
        });
    },

    // 触发动作
    do_EventCenter_messageSuccess() {
      alert("动作执行成功！");
    },
    Event_Center_getName() {
      return "三汇左侧菜单栏";
    },
  },

  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },

  destroyed() {
    window.componentCenter?.removeInstance(this.customConfig?.componentId);
  },
};
</script>

<style lang="less" scoped>
.menu_all {
  position: absolute;
  height: 100%;
  width: 100%;
  background: url("./assets/navBackground.png") no-repeat;
  background-size: 100% 100%;
}
.title_image {
  float: left;
  width: 20px;
  height: 20px;
}
/deep/ .el-badge__content {
  transform: scale(0.9);
  left: 50px;
  top: -8px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  border: none;
  padding: 0;
}
.title_image img {
  width: 100%;
  height: 100%;
}
/deep/ .el-submenu.is-opened {
  background: linear-gradient(to right, #7a9bed, rgba(227, 233, 250, 0.9));
}
/deep/ .is-opened .el-menu--inline {
  background: #e3e9fa;
}
/deep/ .el-submenu.is-opened .el-submenu__title {
  color: #2850c7;
}
/deep/ .el-submenu__title {
  font-size: 16px;
  font-weight: bolder;
}
/deep/ .el-submenu__title:hover {
  background: none;
}
/deep/ .el-submenu.is-opened .nav_line {
  position: absolute;
  left: 0;
  width: 4px;
  height: 100%;
  background: #1e56e3;
}
.menu_first,
.menu_last {
  margin-left: 20px;
  font-size: 16px;
  font-weight: bolder;
}
/deep/ .el-menu {
  background-color: #eceff7;
}
/deep/ .el-menu-item:focus {
  background: none;
}

/deep/ .el-menu-item-group {
  padding: 10px 10px 5px 10px;
}
/deep/ .el-submenu .el-menu-item {
  padding: 0 !important;
  min-width: 0;
  height: 100%;
  margin-bottom: 5px;
}
/deep/ .el-menu-item-group__title {
  padding: 0;
}
/deep/ .menu_row .el-col {
  text-align: center;
}
/deep/ .menu_label {
  margin-top: 4px;
  line-height: 30px;
  width: 100%;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/ .el-menu-item.is-active {
  color: #1751e2;
  background: #beddff;
}
/deep/ .menu_col:hover .menu_label {
  color: #1751e2;
}
.ment_badge {
  width: 62px;
  height: 62px;
  line-height: 62px;
}
.ment_badge img {
  width: 100%;
  height: 100%;
}

/* 导航栏三角 */
/deep/ .el-submenu__icon-arrow {
  transform: rotate(-90deg);
}
/deep/ .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
  transform: rotate(0deg);
}
/deep/ .el-submenu.is-opened > .el-submenu__title i {
  color: #285de4;
}
/deep/ .el-submenu__icon-arrow {
  font-size: 16px;
  font-weight: bolder;
}
</style>
