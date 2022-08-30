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
import './index.css'
import { Table, TableColumn } from "element-ui";

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
      '[["月份","存款业务","货款业务","存款速率"], ["一月",50 , 30,1.2] ,["二月",60,55,1.0], ["三月",72 ,66,0.51 ] ,["四月",88,40,0.88], ["五月",44 , 61,0.37] ,["六月",53,79,0.1]]'
    );
    const options = {
      externalVariables: {
        数据系列颜色: 'red',
        y轴单位: 'a',

        图例位置y: 600,
        图例位置x: 400,
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
