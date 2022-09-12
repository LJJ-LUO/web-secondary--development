import Vue from "vue";
import App from "./App.vue";
// 按需引入组件，引入方式见https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru
import "./index.css";
import { Dropdown, DropdownMenu, DropdownItem, DatePicker, Icon, Input, Pagination, Button, Popover, Message, Form, FormItem } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(DatePicker);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Popover);
Vue.use(Form);
Vue.use(FormItem);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

// Vue.use(Element);

if (process.env.NODE_ENV !== "production") {
  const appArr = [
    { title: "列表页", type: "list" },
    // { title: "配置项", type: "designConfiguration" },
  ];

  const customConfig = {
    // 列数据
    columns: [],
    // 行数据
    data: [],
    // 配置项
    configuration: {
      // mettingID: "e1a02ed7-ae11-541f-7f5e-fe7617d81f79",
      mettingID: "17f9cc00-74fa-5024-7a6e-43b18c2bc27f",
    },
  };

  new Vue({
    render: (h) => {
      return (
        <div class="app-container">
          {appArr.map((item, index) => {
            return (
              <div class="components">
                <span class="title">{item.title}:</span>
                <App style={{ width: "calc(100% - 220px)" }} customConfig={customConfig} type={item.type} />
              </div>
            );
          })}
        </div>
      );
    },
  }).$mount("#app");
} else {
  if (!window.CUSTOM_PLUGIN) {
    window.CUSTOM_PLUGIN = new Map();
  }

  window.CUSTOM_PLUGIN.set(process.env.VUE_APP_CUSTOM_PLUGIN_ID, (dom, props) => {
    if (dom.childNodes.length > 0) {
      dom.removeChild(dom.childNodes[0]);
    }
    const div = document.createElement("div");
    dom.appendChild(div);
    new Vue({
      render: (h) => <App platformProps={{ ...props }} />,
    }).$mount(div);

    props.setSetPluginProps((props) => {
      if (dom.childNodes.length > 0) {
        dom.removeChild(dom.childNodes[0]);
      }
      const divs = document.createElement("div");
      dom.appendChild(divs);
      new Vue({
        render: (h) => <App platformProps={{ ...props }} />,
      }).$mount(divs);
    });
  });
}
