import React, { Component } from "react";
import AddDataSource from "./addDatasource";
import AddAsset from "./addAsset";
import { Result } from "antd";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import history from "@/common/history";
import AddDetailSetting from "./addAsset/AddDetailSetting";
import Test1 from "./test";

function App(props) {
  const { scene } = props;
  // if(scene==='add'){
  //     return <AddAsset {...props}/>
  // }else{
  //     return <Result
  //     status="404"
  //     title="404"
  //     subTitle="Sorry, the page you visited does not exist."
  //   />
  // }
  // if (scene === "add") {
  //   history.push({
  //     pathname: "/asset/readable/test",
  //   });
  // }
  return (
    <BrowserRouter>
      <Switch>
        <Route  path="/asset/readable/new">
          <AddAsset {...props}></AddAsset>
        </Route>
        <Route
          path="/asset/readable/add"
          >
          <AddDetailSetting />
        </Route>
        <Route
          path="/asset/readable/test"
        >
          <Test1 history={history} /> 
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default App;
