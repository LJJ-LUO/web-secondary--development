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
    ["月份", "南京", "苏州", "镇江"],
    ["一月", "350", "210", "280"],
    ["二月", "280", "200", "140"],
    ["三月", "320", "340", "180"],
    ["四月", "300", "180", "270"],
    ["五月", "210", "290", "150"],
    ["六月", "290", "210", "140"],
  ];

  const options = {
    externalVariables: {
      // 系列颜色
      背景颜色: "",
      系列颜色数组: "#3FF2FD-#F39924-#27A6FE",
      对应渐变颜色数组: "#F60C0D-#2EBC27-#0413FF",
      // 图例配置
      图例图标宽度: "18",
      图例图标高度: "3",
      图例文字颜色: "#fff",
      图例文字字号: "14",
      图例间距: "20",
      图例整体位置: "5",
      // X轴配置
      X轴线颜色: "#fff",
      X轴文字颜色: "#fff",
      X轴文字字号: "14",
      // Y轴配置
      Y轴最大值: "500",
      Y轴线颜色: "#fff",
      Y轴分割线颜色: "#fff",
      Y轴文字颜色: "#fff",
      Y轴文字字号: "14",
      // 柱形数据配置
      柱形数据宽度: "30",
      柱形数据倾斜角度: "30",
      柱形数据间距: "25",
      柱形数据向左偏移系数: "-0.6",
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
