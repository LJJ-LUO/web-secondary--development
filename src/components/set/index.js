import React, { useState, useEffect } from "react";
import { Row, Col, ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import Tree from "../../common/Tree";
import Table from "../../common/Table";
import useTreeData from "../../common/hooks/useTreeData";
import useDelegator from "../../UseDelegator";
import eventActionDefine from "../../msgCompConfig";
import "./style.less";

const Set = (props) => {
  const [configuration, setConfiguration] = useState({});
  const { treeState } = useTreeData({ configuration });

  useEffect(() => {
    try {
      const configuration = JSON.parse(
        props.component.columnStyle.customPluginConfig
      );
      setConfiguration(configuration);
    } catch (e) {
      console.error(e);
    }
  }, [props?.component?.columnStyle?.customPluginConfig]);

  const Event_Center_getName = () => {
    return `${props.formConfig?.form_name}-${props.component.columnStyle.title}`;
  };

  const Event_Center_getParentInfo = () => {
    return { scene: "dataForm" };
  };

  useDelegator(
    props.component.id,
    { Event_Center_getName, Event_Center_getParentInfo },
    eventActionDefine,
    props.formConfig?.id,
    props.child_id,
    props.index,
    { eventCenter: props.eventCenter, componentCenter: props.componentCenter }
  );

  return (
    <ConfigProvider locale={zhCN}>
      <div className="tree-table-set">
        <Row>
          <Col span={6}>
            <Tree configuration={configuration} treeData={treeState.treeData} />
          </Col>
          <Col span={12}>
            <Table configuration={configuration} />
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
};

export default Set;
