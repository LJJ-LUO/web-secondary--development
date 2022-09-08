import React from "react";
import PropTypes from "prop-types";
import { Tabs } from "antd";
import qs from "querystringify";
// import appService from "@njsdata/app-sdk";
import "./app.less";

const { TabPane } = Tabs;

const App = props => {
  const {
    pageTabs = [],
    // menuDatas = [],
    onChange,
    onRemove,
    getMenuName,
  } = props;
  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      hideAdd={true}
      onEdit={onRemove}
      activeKey={qs.parse(window.location.search).menuId}
    >
      {pageTabs.map(pane => (
        <TabPane
          tab={getMenuName(pane.id)}
          key={pane.id}
          closable={pageTabs.length !== 1}
        />
      ))}
    </Tabs>
  );
};

App.propTypes = {
  pageTabs: PropTypes.array, // 应用页签集合
  menuDatas: PropTypes.array, // 应用页签菜单数据
  onChange: PropTypes.func, // 应用页签的change方法
  onRemove: PropTypes.func, // 应用页签的删除方法
  getMenuName: PropTypes.func, // 获取应用页签的名称
};

export default App;
