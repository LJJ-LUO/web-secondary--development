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

  const dataSource = [
    ["货种", "吞吐量"],
    ["A货种", "580"],
    ["B货种", "470"],
    ["C货种", "190"],
    ["D货种", "390"],
    ["E货种", "250"],
    ["F货种", "100"],
  ];

  const options = {
    externalVariables: {
      // 颜色配置
      // 背景颜色: "",
      背景颜色: "#141C34",
      柱状颜色渐变: "rgba(0,0,0,0)-#3FF1FC",
      // 图例配置
      图例图标颜色: "#3FF1FC",
      图例图标宽度: "18",
      图例图标高度: "3",
      图例文字颜色: "#fff",
      图例文字字号: "14",
      图例整体位置: "5",
      // X轴配置
      X轴分割线颜色: "#244364",
      X轴文字颜色: "#fff",
      X轴文字字号: "14",
      // Y轴配置
      Y轴线颜色: "#244364",
      Y轴线宽度: "1",
      Y轴线最大值: "1000",
      Y轴文字颜色: "#fff",
      Y轴文字字号: "14",
      // 柱状数据配置
      数据柱宽度: "22",
      数据柱背景宽度: "22",
      数据柱背景颜色: "#24364B",
      数据柱末尾块宽度: "3",
      数据柱末尾块高度: "30",
      数据柱末尾块颜色: "#3FF1FC",
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
