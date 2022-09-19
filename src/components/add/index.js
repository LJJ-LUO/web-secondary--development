import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Button, ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import Tree from "../../common/Tree";
import Table from "../../common/Table";
import useTreeData from "../../common/hooks/useTreeData";
import useDelegator from "../../UseDelegator";
import eventActionDefine from "../../msgCompConfig";
import "./style.less";

const conditionMap = {
  等于: 2,
};
const Add = (props) => {
  const {
    data,
    onChange,
    formConfig,
    component,
    configuration: propsConfiguration,
    eventCenter,
    componentCenter,
  } = props;

  const [configuration, setConfiguration] = useState({});
  const [visible, setVisible] = useState(false);

  const { treeState, setList, setTreeExpand, setTreeSelect } = useTreeData({
    configuration,
  });

  const { showBtn = false, btnName = "按钮" } = configuration;

  useEffect(() => {
    try {
      const configuration = JSON.parse(propsConfiguration);
      setConfiguration(configuration);
    } catch (error) {}
  }, []);

  //逻辑控制
  const triggerEventCenter = async ({ payload, event }) => {
    await eventCenter.triggerEventNew({
      objectId: formConfig?.id,
      componentId: component.id,
      type: "report",
      event: event,
      payload: payload,
    });
  };

  const do_EventCenter_filterData = ({ list = [] }) => {
    const result = list.map((item) => {
      return {
        colName: item.name,
        type: conditionMap[item.condition] || 2,
        value: item.value,
      };
    });

    setList(result);
  };

  const Event_Center_getName = () => {
    return `${formConfig?.form_name}-${component.columnStyle.title}`;
  };

  // 事件中心注册挂载
  useDelegator(
    component.id,
    { Event_Center_getName, do_EventCenter_filterData },
    eventActionDefine,
    formConfig?.id,
    null,
    -1,
    { eventCenter, componentCenter }
  );

  // tree
  const handleTreeExpand = (expandedKeys) => {
    setTreeExpand(expandedKeys);
  };

  const handleTreeSelect = (selectedKeys) => {
    setTreeSelect(selectedKeys);
  };

  //弹窗操作
  const showModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const saveModal = () => {
    setVisible(false);
  };

  const contentRender = () => {
    return (
      <ConfigProvider locale={zhCN}>
        <div className="tree-table-add">
          <Row>
            <Col span={6}>
              <Tree
                configuration={configuration}
                treeData={treeState.treeData}
                expandedKeys={treeState.expandedKeys}
                selectedKeys={treeState.selectedKeys}
                onExpand={handleTreeExpand}
                onSelect={handleTreeSelect}
              />
            </Col>
            <Col span={12}>
              <Table configuration={configuration} />
            </Col>
          </Row>
        </div>
      </ConfigProvider>
    );
  };
  if (showBtn) {
    return (
      <>
        <Button type="primary" onClick={showModal}>
          {btnName}
        </Button>
        {visible && (
          <Modal
            visible={visible}
            onCancel={closeModal}
            onOk={saveModal}
            okText={"确认"}
            cancelText={"取消"}
            width={1300}
            bodyStyle={{
              height: 600,
            }}
          >
            {contentRender()}
          </Modal>
        )}
      </>
    );
  }

  return contentRender();
};

export default Add;
