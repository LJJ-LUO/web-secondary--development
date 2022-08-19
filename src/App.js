import React, { Component } from "react";
import { notification } from "antd";
// import appService from "@njsdata/app-sdk";
import { queryMessage } from "./api/asset";
import "./app.less";

export default class App extends Component {
  constructor(props) {
    super(props);
    console.log('props',props);
  }
  componentDidMount() {
    this.intervalId = null;
    // let intervalTime = parseInt(this.props.customConfig.intervalTime);
    this.myFunction();
    let intervalTime = 30000;
    this.intervalId = setInterval(()=>{ 
      this.myFunction();
    }, intervalTime);
    const events = [];
    const actions = [];
    this.props?.customConfig?.componentId &&
      window.componentCenter?.register(
        this.props?.customConfig?.componentId,
        "",
        this,
        {
          events,
          actions,
        }
      );
    // window.componentCenter.registerTriggerForType(
    //   this.props.componentId,
    //   "process",
    //   this,
    //   {
    //     events,
    //     actions,
    //   }
    // );
  }
  myStopFunction = () => {
    console.log('this.intervalId',this.intervalId);
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  myFunction = async () => {
    let userId = window.currentUser.id;
    if (userId === "") {
      this.myStopFunction()
      throw new Error("用户id为空");
    }
    // let intervalTime = parseInt(this.props.customConfig.intervalTime);
    let intervalTime = 30000;
    // let list = await queryMessage("1234567890");
    let list = await queryMessage(userId);
    console.log(list);
    if (list.status === 200) {
      this.openNotification(list.data)
    }else {
      this.myStopFunction()
      this.intervalId = setInterval(()=>{ 
        this.myFunction();
      }, intervalTime);
    }
  }

  openNotification = (list) => {
    // let duration = parseInt(this.props.customConfig.duration);
    let duration = 300000;
    for (let index = 0; index < list.length; index++) {
      notification.info({
        message: list[index].remind_title,
        duration: duration,
        description: list[index].remind_content,
        placement: "bottomRight"
      });
    }
    
  };

  componentWillUnmount() {
    console.log('8-组件销毁')
    this.myStopFunction()
  }

  do_EventCenter_messageSuccess() {
    window.location.reload();
  }

  // 逻辑控制用，不可删
  Event_Center_getName() {
    return "";
  }

  render() {
    return (
      // <Button
      //   type="primary"
      //   onClick={() => this.myStopFunction()}
      // >
      //   bottomRight
      // </Button>
      <div></div>
    )
  }
}
