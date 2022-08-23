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
    ["日期", "售水量", "产销差水量", "供水量", "产销差率"],
    ["2022/01", 12, 5, 42],
    ["2022/02", 15, -4, 22],
    ["2022/03", 17, 5, 59],
    ["2022/04", 9, -5, 68],
    ["2022/05", 16, 5, 48],
    ["2022/06", 13, -7, 25],
    ["2022/07", 11, 5, 60],
    ["2022/08", 5, -9, 55],
    ["2022/09", 13, 5, 46],
    ["2022/10", 12, -2, 38],
    ["2022/11", 14, 5, 44],
    ["2022/12", 8, -4, 80],
  ];

  const options = {
    externalVariables: {
      图例位置: "1",
      图例文字颜色: "#111",
      图例文字字号: "14",
      图例文字字体: "",
      图例图标宽度: "15",
      图例图标高度: "15",

      X轴0刻度线颜色: "#33bbff",
      X轴文字颜色: "#111",
      X轴文字字号: "16",
      X轴文字字体: "",

      柱状图系列颜色: "#15F6EE,#32BBFF",
      柱状图左侧Y轴字体颜色: "#111",
      柱状图左侧Y轴字体字号: "16",
      柱状图左侧Y轴标题: "水量  (万m²)",
      柱状图Y轴标题距离: "35",
      柱状图Y轴标题颜色: "#111",
      柱状图Y轴标题字号: "16",
      柱状图Y轴标题字体: "",
      柱状图数据列间距: "60",
      柱状图分割线颜色: "",
      柱状图使用数据: "1,2",

      折线图系列颜色: "#F7CFAB,#9888CC",
      折线图右侧Y轴字体颜色: "#111",
      折线图右侧Y轴字体字号: "16",
      折线图右侧Y轴标题: "百分比  (%)",
      折线图Y轴标题距离: "35",
      折线图Y轴标题颜色: "#111",
      折线图Y轴标题字号: "16",
      折线图Y轴标题字体: "",
      折线图拐点大小: "6",
      折线图拐点边框颜色: "#111",
      折线图拐点边框宽度: "1",
      折线图分割线颜色: "",
      折线图使用数据: "3,4",
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
