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
  // const dataSource = [
  //   ["所属图例", "名称", "数据"],
  //   ["居民用水", "15吨以上", "2000"],
  //   ["居民用水", "零水量", "4000"],
  //   ["居民用水", "11-15吨", "6000"],
  //   ["居民用水", "6-10吨", "8000"],
  //   ["居民用水", "1-5吨", "10000"],
  // ];

  const dataSource = [
    ["所属图例", "名称", "数据"],
    ["居民用水", "15吨以上", "1000"],
    ["居民用水", "零水量", "3000"],
    ["居民用水", "11-15吨", "5000"],
    ["居民用水", "6-10吨", "7000"],
    ["居民用水", "1-5吨", "9000"],
    ["非居民用水", "15吨以上", "2000"],
    ["非居民用水", "零水量", "4000"],
    ["非居民用水", "11-15吨", "6000"],
    ["非居民用水", "6-10吨", "8000"],
    ["非居民用水", "1-5吨", "10000"],
  ];

  const options = {
    externalVariables: {
      标题: "居民用水",
      标题位置: "90",
      标题颜色: "#111",
      标题字号: "22",
      标题字体: "",

      图例是否显示: "false",
      图例间距: "30",
      图例位置: "8",
      图例文字颜色: "#111",
      图例文字字号: "20",
      图例文字字体: "",

      雷达图大小: "70",
      雷达图位置: "45",
      雷达图背景颜色: "#FFFFFF",
      雷达图X轴颜色: "#153269",
      雷达图Y轴颜色: "#113865",
      雷达图边框宽度: "1",

      雷达图拐点大小: "5",
      雷达图是否开启轮播: "false",
      雷达图轮播间隔: "2000",
      雷达图轮播拐点大小: "10",
      雷达图轮播拐点颜色: "#FFFFFF",

      边角最大值: "10000",
      边角标题颜色: "#111",
      边角标题字号: "18",
      边角标题字体: "",

      数据系列颜色: "#4A99FF,#4BFFFC",
    },
  };

  ReactDOM.render(
    <App dataSource={dataSource} options={options} />,
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
