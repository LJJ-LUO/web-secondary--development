import Vue from "vue";
import App from "./App.vue";
// 按需引入组件，引入方式见https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru

if (process.env.NODE_ENV !== "production") {
  window.eventCenter = {
    triggerEvent(componentId, eventName) {
      console.log(`${eventName} is triggered`);
    },
  }
  let themeInfo = {
    "theme_id": "52250e971ce3482491f75a7ae01af824",
    "theme_global_config": {
      "--theme-public-pinPai-color": "rgba(24,144,255,1)",
      "--theme-public-sub-color-1": "rgba(37, 55, 97,1)",
      "--theme-public-sub-color-2": "rgba(30, 41, 64,1)",
      "--theme-public-sub-color-3": "rgba(115, 141, 192,1)",
      "--theme-public-text-color-1": "rgba(12, 13, 14,1)",
      "--theme-public-text-color-2": "rgba(85, 85, 85,1)",
      "--theme-public-text-color-3": "rgba(204, 204, 204,1)",
      "--theme-public-text-color-4": "rgba(245, 245, 245,1)",
      "--theme-public-background-color-1": "rgba(245, 246, 250,1)",
      "--theme-public-background-color-2": "rgba(240, 242, 247,1)",
      "--theme-public-function-color-1": "rgba(255, 102, 102,1)",
      "--theme-public-function-color-2": "rgba(255, 148, 0,1)",
      "--theme-public-function-color-4": "rgba(61, 204, 180,1)",
      "--theme-public-function-color-5": "rgba(73, 129, 47,1)",
      "--theme-public-fontSize-1": "56px",
      "--theme-public-fontSize-2": "48px",
      "--theme-public-fontSize-3": "36px",
      "--theme-public-fontSize-4": "20px",
      "--theme-public-fontSize-5": "18px",
      "--theme-public-fontSize-6": "16px",
      "--theme-public-fontSize-7": "14px",
      "--theme-public-fontFamily-1": "Microsoft YaHei"
    }
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
      return <App customConfig={customConfig} themeInfo={themeInfo}/>;
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
