import React, { Component } from "react";
import PropTypes from "prop-types";
import MySQLSetting from "./mysql-setting";
import "./asset-allocation.less";

class AssetAllocation extends Component {
  static propTypes = {
    asset_type: PropTypes.string,
  };

  getParams = async () => {
    const data = await this.JdbcSetting.getSaveParams();
    return data;
  };

  render() {
    const { asset_type } = this.props;
    return (
      <div className="jdbc-asset-allocation">
        <MySQLSetting {...this.props} ref={(e) => (this.JdbcSetting = e)} />
      </div>
    );
  }
}

export default AssetAllocation;
