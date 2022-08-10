import React, { useEffect } from "react";
import { Form, InputNumber, Input } from "antd";

const DesignConfiguration = ({ changeConfiguration, configuration }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    try {
      form.setFieldsValue(JSON.parse(configuration));
    } catch (error) {
      console.error("configuration解析错误", error);
    }
  }, []);

  const onFormLayoutChange = (changedValues, allValues) => {
    changeConfiguration(allValues);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="宽度：" name="width" initialValue={520}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="告警资产ID:" name="assetId" initialValue={"2f6f3e9b3897472a8af1069fd477ace4"}>
          <Input placeholder="输入告警事件资产表ID" />
        </Form.Item>
        <Form.Item label="告警详情主键:" name="data_id" initialValue={"data_id"}>
          <Input placeholder="输入告警详情主键key值" />
        </Form.Item>
        <Form.Item label="点位字段：" name="deviceName" initialValue={"deviceName"}>
          <Input placeholder="输入对应字段key值" />
        </Form.Item>
        <Form.Item label="事件字段：" name="alarm_content" initialValue={"alarm_content"}>
          <Input placeholder="输入对应字段key值" />
        </Form.Item>
        <Form.Item label="时间字段：" name="reportTime" initialValue={"reportTime"}>
          <Input placeholder="输入对应字段key值" />
        </Form.Item>
        <Form.Item label="设备id字段：" name="deviceId" initialValue={"deviceId"}>
          <Input placeholder="输入对应字段key值" />
        </Form.Item>
        <Form.Item label="图片Id字段：" name="alarm_picture_info" initialValue={"alarm_picture_info"}>
          <Input placeholder="输入对应字段key值" />
        </Form.Item>
        <Form.Item label="图片地址字段：" name="picUrl" initialValue={"picUrl"}>
          <Input placeholder="输入对应字段key值" />
        </Form.Item>
      </Form>
    </>
  );
};

DesignConfiguration.propTypes = {};

export default DesignConfiguration;
