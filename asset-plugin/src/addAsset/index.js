import React, { Component } from "react";
import "./index.less";
import PropTypes from "prop-types";
import { promisify } from "es6-promisify";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Button, Input, message, Select, Spin, Divider } from "antd";
import { Helmet } from "react-helmet";
import * as API from "../api";
import { guid } from "../common/Transform";
import { Encrypt } from "../common/RSA";
import qs from "querystringify";
import history from "@/common/history";
import logo from "../assets/images/mysql.png";
import cloneDeep from 'lodash.clonedeep';
import AddDetailSetting from './AddDetailSetting'


const FormItem = Form.Item;
const Option = Select.Option;
import "./index.less";

class AddAsset extends Component {
  static propTypes = {
    module: PropTypes.string,
    catalogId: PropTypes.string,
    category: PropTypes.string,

    form: PropTypes.object,
    scene: PropTypes.string,
    assetDetail: PropTypes.object,
    sdk: PropTypes.object,
  };
  state = {
    datasources: [],
    readOnly: false,
    loading: false,
    settingDetail:{
      show:false
    },
  };
  validateFieldsAndScroll = promisify(this.props.form.validateFieldsAndScroll);

  submit = async () => {
    const {
      form,
      assetDetail,
    } = this.props;
    const {catalogId, assetType, category} =assetDetail

    const datasource = form.getFieldValue("datasource");
    let sourceId = datasource;
    const { name, ...restProps } = await this.validateFieldsAndScroll();
    if (restProps.password) {
      restProps.password =
        datasource === "new"
          ? Encrypt(restProps.password)
          : this.state.datasources.find(
              ({ source_id }) => sourceId === source_id
            ).detail.password;
    }
    this.setState({
      loading: true,
    });
    try {
      const obj = {
        source_type: assetDetail.type,
        source_detail: JSON.stringify(restProps),
        source_name: name,
        source_id: restProps.datasource,
      };
      await API.testDatasource(obj);
    } catch (err) {
      this.setState({
        loading: false,
      });
      message.error(
        err && err.data && err.data.message
          ? err.data.message
          : "数据源信息有误，无法连接",
        2
      );
      return;
    }
    if (datasource === "new") {
      sourceId = guid();
      try {
        const obj = {
          source_type: assetDetail.type,
          source_detail: JSON.stringify(restProps),
          source_name: name,
          // sys_source_id: assetType.type === 1000 ? assetType.id : undefined,
        };
        await API.addDatasource({
          source_id: sourceId,
          ...obj,
        });
      } catch (err) {
        this.setState({
          loading: false,
        });
        message.error(
          err.data && err.data.message
            ? err.data.message
            : "新增数据源失败,数据源信息有误",
          2
        );
        return;
      }
    }
    this.setState({
      loading: false,
      // settingDetail:{
      //   show:true,
      //   dataSourceId: sourceId,
      //   dataSourceName: name,
      //   catalog_id: catalogId,
      //   asset_cata: category,
      //   asset_type: assetDetail.type,
      //   module: this.props.module,
      // }
    });

    history.push({
      pathname: "/asset/readable/add",
      search: qs.stringify(
        {
          dataSourceId: sourceId,
          dataSourceName: name,
          catalog_id: catalogId,
          asset_cata: category,
          asset_type: assetDetail.type,
          module: this.props.module,
        },
        true
      ),
    });
  };

  componentDidMount() {
    this.loadDatasources();
  }

  loadDatasources = async () => {
    const { assetDetail } = this.props;
    try {
      const { data } = await API.getDatasources({
        type: assetDetail.type,
      });

      this.setState({
        datasources: data.map((result) => ({
          ...result,
          detail: JSON.parse(result.source_detail),
        })),
      });
    } catch (err) {
      console.log("加载数据源失败");
    }
  };

  handleDatasourceChange = (value) => {
    const { form } = this.props;

    if (value !== "new") {
      const options = cloneDeep(this.state.datasources).filter(
        ({ source_id }) => value === source_id
      )[0];
      if (options.detail.password) {
        options.detail.password = "******";
      }
      form.setFieldsValue({
        ...options.detail,
        name: options.source_name,
      });
      this.setState({ readOnly: true });
      return;
    }

    form.resetFields([
      "name",
      "username",
      "url",
      "password",
      "clientEncoding",
      "serverEncoding",
    ]);
    this.setState({ readOnly: false });
  };

  render() {
    const {
      form: { getFieldDecorator },
      assetDetail,
      module,
      sdk,
    } = this.props;

    const { datasources, readOnly,settingDetail } = this.state;

    if(settingDetail?.show){
      return <AddDetailSetting {...settingDetail} />
    }else{
      return (
        <div className="datasource-selector">
          <Spin spinning={this.state.loading}>
            <Helmet>
              <title>{module}</title>
            </Helmet>
            <div className="content-container">
              <div className="navbar">
                <ArrowLeftOutlined onClick={sdk?.GOBACK} />
                创建资产
              </div>
              <div className="asset-type">
                <span>已选资产类型</span>
                <img src={logo} alt="" />
              </div>
              <Form className="ant-customized">
                <FormItem label="选择一个数据源">
                  {getFieldDecorator("datasource", { initialValue: "new" })(
                    <Select onChange={this.handleDatasourceChange}>
                      <Option value="new">新建数据源</Option>
                      {datasources.map(({ source_id, source_name }) => (
                        <Option key={source_id} value={source_id}>
                          {source_name}
                        </Option>
                      ))}
                    </Select>
                  )}
                </FormItem>
                <div className="section-label">基础信息</div>
                <FormItem label="数据源名称">
                  {getFieldDecorator("name", {
                    rules: [{ required: true, message: "数据源名称不能为空" }],
                  })(<Input readOnly={readOnly} />)}
                </FormItem>
  
                <div className="section-label">鉴权信息</div>
                <FormItem className="url-form-item" label="JDBC连接串">
                  {getFieldDecorator("url", {
                    rules: [{ required: true, message: "JDBC连接串不能为空" }],
                    initialValue: assetDetail?.defaults?.url ?? null,
                  })(<Input readOnly={readOnly} />)}
                </FormItem>
                <Divider />
                <FormItem label="用户名">
                  {getFieldDecorator("username", {
                    rules: [{ required: true, message: "用户名不能为空" }],
                  })(<Input readOnly={readOnly} />)}
                </FormItem>
                <Divider />
                <FormItem label="密码">
                  {getFieldDecorator("password", {
                    rules: [{ required: true, message: "密码不能为空" }],
                  })(<Input type="password" readOnly={readOnly} />)}
                </FormItem>
                <div className="section-label">高级设置</div>
                <FormItem label="客户端字符集">
                  {getFieldDecorator("clientEncoding", {
                    rules: [{ required: true, message: "客户端字符集不能为空" }],
                    initialValue: "UTF-8",
                  })(
                    <Select readOnly={readOnly}>
                      <Option value="UTF-8">UTF-8</Option>
                      <Option value="GBK">GBK</Option>
                    </Select>
                  )}
                </FormItem>
                <Divider />
                <FormItem label="数据库字符集">
                  {getFieldDecorator("serverEncoding", {
                    rules: [{ required: true, message: "数据库字符集不能为空" }],
                    initialValue: "AL32UTF8",
                  })(
                    <Select readOnly={readOnly}>
                      <Option value="AL32UTF8">AL32UTF8</Option>
                      <Option value="ZHS16GBK">ZHS16GBK</Option>
                    </Select>
                  )}
                </FormItem>
              </Form>
            </div>
            <div className="bottom ant-customized">
              <div>
                <Button type="primary" onClick={this.submit}>
                  确认
                </Button>
              </div>
            </div>
          </Spin>
        </div>
      );
    }

  }
}

export default Form.create()(AddAsset);
