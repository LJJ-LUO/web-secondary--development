/*
 * @Author: wangchengyuan
 * @Email: wangchengyuan@njsdata.com
 * @LastEditors: Do not edit
 * @Date: 2021-04-06 09:58:34
 * @LastEditTime: 2021-10-19 17:43:29
 * @FilePath: \om-app-plugin-react-boilerplate\src\index.js
 * @Description: 请描述文件作用
 */
/* 可以考虑在发布的代码里移除这个css */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

/**
 * 生产打包时为了减少体积，不引入 antd.css (可节约 2.5M左右的包体积)
 * 生产包是当做 onemind 主站插件使用的，页面里已经有一份 ant.css 了，所以这里可以省去
 * 从功能通过 webpack.IgnorePlugin 插件实现，如果想要打入此 css，请在 webpack 配置中做修改。
 */
if (process.env.NODE_ENV !== "production") {
  require("antd/dist/antd.css");
  const dataSource = JSON.parse(
    '[["name","总量","完成量"],["泵房通检工单","38848","21300"],["管网维修工单","10633","21300"],["二供维修工单","6239","2130"],["水表更换工单","2739","2130"],["欠费停水工单","1200","2130"],["二供告警工单","3","213"]]'
  );
  const options = {
    externalVariables: {
      X轴线颜色: "",
      Y轴线颜色: "",
      轴线文字大小: "",
      轴线文字颜色: "",
      色块缝隙宽度: "",
      网格线颜色: "",
      标签字体颜色: "",
      标签字体大小: "",
      标签字体: "",
      图例字体颜色: "",
      图例字体大小: "",
      数据列背景颜色: "",
      数据柱形颜色: '',
    },
  };
  ReactDOM.render(<App dataSource={dataSource} options={options} />, document.getElementById("root"));
} else {
  if (!window.CUSTOM_PLUGIN) {
    window.CUSTOM_PLUGIN = new Map();
  }
  window.CUSTOM_PLUGIN.set(process.env.CUSTOM_PLUGIN_ID, (dom, props) => {
    ReactDOM.render(<App {...props} />, dom);
  });
}
