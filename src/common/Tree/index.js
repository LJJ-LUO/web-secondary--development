import React, { useEffect } from "react";
import { Tree } from "antd";
import "./style.less";

const TreeContainer = (props) => {
  const { configuration, ...otherProps } = props;
  return (
    <div className="tree-table-tree">
      <Tree {...otherProps} height={Number(props?.configuration?.treeHeight)} />
    </div>
  );
};

export default TreeContainer;
