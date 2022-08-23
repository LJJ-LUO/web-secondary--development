import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./index.css";
import "./common/style/customized-new.less";
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
    module: '资产',
    scene: "add",
    assetDetail:{
      active: 1,
      catalogId: "095af5c3-2b21-c5ee-ce4f-7f25d1ed400e",
      catalog_id: "defaultTeam",
      category: "1",
      company_id: "123456789",
      create_member: "1234567890",
      create_time: 1635155441000,
      ds_type: "secondary-dev",
      export_path: "/devops/dataflow/secondary_dev/123456789/plugin-1635155414473.zip",
      file_back_name: "",
      file_name: "plugin-1635155414473.zip",
      id: "3519b44f-8f66-47ca-bdbf-75d655206b47",
      image: {src: 'http://localhost:8080/storage_area/ext_plugins/web…b44f-8f66-47ca-bdbf-75d655206b47/images/mysql.png', bg: '#0099D4'},
      last_modifier: "1234567890",
      last_modify_time: 1635155441000,
      name: "dsdsd",
      owner: 0,
      param: "{\"main\":\"main.e2929229.js\",\"id\":\"3519b44f-8f66-47ca-bdbf-75d655206b47\",\"type\":\"asset\",\"version\":\"2\",\"props\":{\"sourceType\":102,\"logoBg\":\"#0099D4\",\"logo\":\"mysql.png\"}}",
      pluginId: "a90ddd76-8bc1-436f-83b9-5be34b908c5b",
      type: 102,
      version: "2",
      web_id: "3519b44f-8f66-47ca-bdbf-75d655206b47"
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
