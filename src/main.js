import Vue from "vue";
import App from "./App.vue";
// 按需引入组件，引入方式见https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru

if (process.env.NODE_ENV !== "production") {
  window.eventCenter = {
    triggerEvent(componentId, eventName) {
      console.log(`${eventName} is triggered`);
    },
  }
  // 添加 customConfig 进行测试
  let customConfig = {
    componentId: "123",
    appId: "123",
    buttons: JSON.stringify({
      defaultValue: "战勤部",
      data: [
        {
          label: "战勤部",
          value: "战勤部"
        },
        {
          label: "政治工作部",
          value: "政治工作部"
        },
        {
          label: "基层一队",
          value: "基层一队"
        },
        {
          label: "基层二队",
          value: "基层二队"
        },
        {
          label: "基层三队",
          value: "基层三队"
        },
        {
          label: "基层四队",
          value: "基层四队"
        },
        {
          label: "基层五队",
          value: "基层五队"
        },
        {
          label: "基层六队",
          value: "基层六队"
        }
      ]
    })

  };

  new Vue({
    render: h => {
      return <App customConfig={customConfig}/>;
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
        render: h => <App {...{props}} />,
      }).$mount(div);
    }
  );
}
