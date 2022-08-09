import React from "react";
import App from "../src/App";
import List from "../src/components/list/index";
import "./mockComponentCenter";
import "antd/dist/antd.css";
import { componentCenter, eventCenter } from "./mockComponentCenter";

const PreviewComponent = (props) => {
  const customConfig = {
    componentId: "111",
    formConfig: {},
    component: {},
    componentCenter,
    eventCenter,
    customParams: {
      width: 600,
      deviceName: "deviceName",
      alarm_content: "alarm_content",
      reportTime: "reportTime",
      deviceId: "deviceId",
      alarm_picture_info: "alarm_picture_info",
      picUrl: "picUrl"
    }
  };
  // return <App {...customConfig} type="set" />;
  return <List {...customConfig} type="set" />;
};

PreviewComponent.propTypes = {};

export default PreviewComponent;
