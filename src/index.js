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
import App from "./gis/index.js";
import customProps from "./props.json"
/**
 * 生产打包时为了减少体积，不引入 antd.css (可节约 2.5M左右的包体积)
 * 生产包是当做 onemind 主站插件使用的，页面里已经有一份 ant.css 了，所以这里可以省去
 * 从功能通过 webpack.IgnorePlugin 插件实现，如果想要打入此 css，请在 webpack 配置中做修改。
 */

if (process.env.NODE_ENV !== "production") {



  require("antd/dist/antd.css");
  const dataSource = [
    ["城市", "纬度", "经度", "区域", "省份", "跳转链接", "状态"],
    ["标题一数据一", "标题二数据一", "标题三数据一"],
    ["标题一数据二", "标题二数据二", "标题三数据二"],
    ["标题一数据三", "标题二数据三", "标题三数据三"],
  ];
  const options = {
    externalVariables: {
      // assetId: "bcc21947-a002-498c-a1ca-ca5f2adc8f43",
      assetId: "a7099e7e-59ba-33ae-ac47-3d1312c4b9b9",
      // layers: '2',
      // checkedList: '5,ddd',//后面要处理
      // treeLegends: '5,ddd',
      iconColor: '#32AFEF',
      // WMS服务地址: 'https://ahocevar.com/geoserver/wms',
      // WMS参数配置: '',
      jumpField: '区域',
      latlng: '经度,纬度',
      // searchColumn: '区域'
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
