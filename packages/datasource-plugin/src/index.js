import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./index.css";

/**
 * 生产打包时为了减少体积，不引入 antd.css (可节约 2.5M左右的包体积)
 * 生产包是当做 onemind 主站插件使用的，页面里已经有一份 ant.css 了，所以这里可以省去
 * 从功能通过 webpack.IgnorePlugin 插件实现，如果想要打入此 css，请在 webpack 配置中做修改。
 */
 if (process.env.NODE_ENV !== "production") {
  require("antd/dist/antd.css");
}
/**
 * 开发环境模拟生产传参
 */
if (process.env.NODE_ENV !== "production") {
  const customConfig = {
    module: '数据源',
    scene: "add",
    datasourceDetail:{
      id:'asas',
      type:'102'
    },
    sdk:{
      GOBACK: function () {
        alert("goback");
      },
    }
  };

  ReactDOM.render(
    <App {...customConfig}/>,
    document.getElementById("root")
  );
} else {
  if (!window.CUSTOM_PLUGIN) {
    window.CUSTOM_PLUGIN = new Map();
  }

  window.CUSTOM_PLUGIN.set(process.env.CUSTOM_PLUGIN_ID, (dom, props) => {
    ReactDOM.render(<App {...props} />, dom);
  });

}
