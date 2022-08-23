import Vue from "vue";
import App from "./App.vue";
import VueMeta from "vue-meta";
// import ElementUI from 'element-ui';
import {
  Input,
  Select,
  Option,
  Button,
  Form,
  FormItem,
  Icon,
  Message,
  Loading,
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 按需引入组件，引入方式见https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru
import "./index.css";
// Vue.use(ElementUI);
Vue.use(VueMeta);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Icon);
Vue.use(Loading.directive);
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;
Vue.config.productionTip = false;

if (process.env.NODE_ENV !== "production") {
  const customConfig = {
    module: "数据源",
    scene: "add",
    datasourceDetail: {
      id: "asas",
      type: "102",
      source_name: "sdsd",
    },
    sdk: {
      GOBACK: function () {
        alert("goback");
      },
    },
  };

  new Vue({
    render: h => {
      return <App customConfig={customConfig} scene={customConfig.scene} />;
    },
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
