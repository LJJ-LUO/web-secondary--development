/*
 * @Author: zhangzhuo
 * @Email: zhangzhuo@njsdata.com
 * @LastEditors: Do not edit
 * @Date: 2021-10-21 19:40:39
 * @LastEditTime: 2021-10-22 10:34:09
 * @Description: 请描述文件作用
 */
import Vue from "vue";
import App from "./App.vue";

import { Table, TableColumn } from "element-ui";

import './index.css'

Vue.config.productionTip = false;
Vue.use(Table);
Vue.use(TableColumn);

import config from "../pluginTemp/config.json";

let { domId } = Object.values(config)[0];

let dom = document.getElementById(domId);

if (dom) {
  if (dom.childNodes.length > 0) {
    dom.removeChild(dom.childNodes[0]);
  }

  const App = require("./App.vue").default;
  let wrapper = document.createElement("div");
  wrapper.style = "width: 100%; height: 100%";
  dom.appendChild(wrapper);

  new Vue({
    render: h => h(App),
  }).$mount(wrapper);
} else {
  if (process.env.NODE_ENV !== "production") {
    const dataSource = JSON.parse(
      '[["区域","已收金额","应收金额","欠费金额"],["在线","610","正常","100"],["离线","50","正常","200"],["在线","300","异常","400"],["离线","400","异常","50"]]'
    );
    const options = {
      externalVariables: {
        // 数据系列颜色: '',
        内半径: '42%,55%',
        外半径: '',
        饼图水平位置: '50',
        饼图垂直位置: '50',
        标题水平位置: '47%',
        标题垂直位置: '43%',
        图例水平位置: '70%,70%',
        图例垂直位置: '40%,50%',
        图例图形宽: '',
        图例图形高: '4',
        图例文字大小: '18',
        图例文字字体: '',
        图例宽: '',
        标题显示: 'true',
        标题内容: '白色d车',
        单位内容: '个',
        标题颜色: 'black',
        标题文字大小: '20',
        标题字体: '宋体',
        总计字体: '',
        总计颜色: 'red',
        总计字体大小: '40',
        总计加粗: 'true',
        跳转图例: '在线,离线',
        跳转地址: 'http://tool.c7sky.com/webcolor/,https://www.baidu.com/'
      },
    };
    const props = {
      dataSource,
      options,
    };
    const App = require("./App.vue").default;
    new Vue({
      render: h => <App {...{ props }} />,
    }).$mount("#app");
  } else {
    if (!window.CUSTOM_PLUGIN) {
      window.CUSTOM_PLUGIN = new Map();
    }

    window.CUSTOM_PLUGIN.set(
      process.env.VUE_APP_CUSTOM_PLUGIN_ID,
      (dom, props) => {
        if (dom.childNodes.length > 0) {
          dom.removeChild(dom.childNodes[0]);
        }
        const div = document.createElement("div");
        dom.appendChild(div);
        new Vue({
          render: h => <App {...{ props }} />,
        }).$mount(div);
      }
    );
  }
}
