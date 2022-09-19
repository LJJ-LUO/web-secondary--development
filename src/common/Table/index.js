import React from "react";
import { Table } from "antd";
import "./style.less";

const TableContainer = (props) => {
  const { configuration } = props;

  return (
    <div className="tree-table-table">
      <Table />
    </div>
  );
};

export default TableContainer;
