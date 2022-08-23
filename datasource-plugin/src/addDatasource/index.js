import React, { Component } from "react";
import "./index.less";
import PropTypes from "prop-types";
import { promisify } from "es6-promisify";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Button, Input, message, Select, Spin } from "antd";
import { Helmet } from "react-helmet";
import * as API from "../api";
import { guid } from "../common/Transform";
import { Encrypt } from "../common/RSA";
import qs from "querystringify";
import history from "../common/history";
import logo from "../assets/images/mysql.png";
const FormItem = Form.Item;
const Option = Select.Option;

class AddDataSource extends Component {
  static propTypes = {
    form: PropTypes.object,
    scene: PropTypes.string,
    datasourceDetail: PropTypes.object,
    sdk: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.isCustom = window.location.pathname.includes("/datasource2");
    this.query = qs.parse(location.search);
    console.log(props);
  }
  state = {
    loading: false,
    oldName: "",
    isSameName: false,
    passwordFlag: false,
  };
  validateFieldsAndScroll = promisify(this.props.form.validateFieldsAndScroll);

  onTest = async () => {
    const { datasourceDetail } = this.props;
    const { passwordFlag } = this.state;
    if (this.state.isSameName) {
      message.error("数据源重名，请修改后测试");
      return;
    }
    const { name, ...restProps } = await this.validateFieldsAndScroll();
    this.setState({
      loading: true,
    });
    try {
      const { url, username, password, clientEncoding, serverEncoding } =
        restProps;
      if (
        name &&
        url &&
        username &&
        password &&
        clientEncoding &&
        serverEncoding
      ) {
        restProps.password = passwordFlag
          ? Encrypt(restProps.password)
          : datasourceDetail.source_detail.password;
      } else {
        message.error("数据均不能为空，请填写完整！");
        return;
      }
      try {
        const newDatasource = {
          source_type: 2022,
          source_detail: JSON.stringify(restProps),
          source_name: name,
        };
        if (this.props.scene === "edit") {
          newDatasource.source_id = this.props.datasourceDetail.source_id;
        }
        await API.testDatasource(newDatasource);
        this.setState({
          loading: false,
        });
        message.success("成功连接数据源", 2);
      } catch (err) {
        this.setState({
          loading: false,
        });
        message.error(err?.data?.message??"测试数据源失败", 2);
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  };

  submit = async () => {
    const { datasourceDetail, scene, sdk } = this.props;
    const { passwordFlag } = this.state;
    if (this.state.isSameName) {
      message.error("数据源重名，请修改后提交");
      return;
    }
    let sourceId = guid();
    const { name, ...restProps } = await this.validateFieldsAndScroll();
    const { url, username, password, clientEncoding, serverEncoding } =
      restProps;
    let that = this;
    if (
      name &&
      url &&
      username &&
      password &&
      clientEncoding &&
      serverEncoding
    ) {
      restProps.password = passwordFlag
        ? Encrypt(restProps.password)
        : datasourceDetail.source_detail.password;
    } else {
      message.error("数据均不能为空，请填写完整！");
      return;
    }
    this.setState({
      loading: true,
    });
    try {
      let newDatasource = {
        source_id: sourceId,
        source_type: 2022,
        source_detail: JSON.stringify(restProps),
        source_name: name,
        sys_source_id: datasourceDetail?.id,
      };
      if (scene === "add") {
        const { data } = await API.addDatasource(newDatasource);
        message.success("成功保存数据源", 2);
        localStorage.setItem("dataSourceNeedReload", true);
        // 元数据采集新增数据源跳转到选择表页面
        if (that?.query?.showType === "metadata") {
          history.push({
            pathname: `/import-assets/${data}`,
            search: qs.stringify(
              {
                catalog: this.query.catalog,
                category: this.query.category,
                showType: this.query.showType,
                sourceType: datasourceDetail.type,
                module: "元数据采集",
              },
              true
            ),
          });
        } else if (that?.query?.showType === "assetList") {
          history.push({
            pathname: `/import-assets/${data}`,
            search: qs.stringify(
              {
                catalog: this.query.catalog,
                category: this.query.category,
                showType: this.query.showType,
                sourceType: datasourceDetail.type,
              },
              true
            ),
          });
        } else {
          setInterval(() => {
            if (this.isCustom) {
              history.goBack();
            } else {
              window.close();
            }
          }, 1500);
        }
      } else if (scene === "edit") {
        newDatasource.source_id = datasourceDetail.source_id;
        newDatasource.sys_source_id = datasourceDetail.sys_source_id;
        const { data } = await API.updateDatasource(newDatasource);
        message.success("成功保存数据源", 2);
        localStorage.setItem("dataSourceNeedReload", true);
        sdk?.GOBACK(true);
      }
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 2000);
    } catch (err) {
      console.log(err);
      if (err?.data?.message === "数据源重名") {
        message.error(err.data.message, 2);
      } else {
        message.error("保存数据源失败", 2);
      }
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 2000);
    }
  };
  // 数据源名称input获得焦点
  onNameFocus = async () => {
    const name = this.props.form.getFieldValue("name");
    this.setState({
      oldName: name,
    });
  };

  // 数据源名称input失去焦点
  onNameBlur = async () => {
    const name = this.props.form.getFieldValue("name");
    // console.log('new--' + name + ',old--' + this.state.oldName);
    if (name && name !== "" && name !== this.state.oldName) {
      try {
        await API.duplicateCheck(name);
        this.setState({
          isSameName: false,
        });
      } catch (err) {
        message.error(err?.data?.message??"数据源重名,请修改", 2);
        this.setState({
          isSameName: true,
        });
      }
    }
  };
  renderBasic() {
    const {
      datasourceDetail,
      scene,
      form: { getFieldDecorator },
    } = this.props;
    const {passwordFlag}=this.state;
    const detail = datasourceDetail.source_detail;
    return (
      <div className="info-content">
        <div className="info-title">连接信息</div>
        <div className="info-detail">
          <FormItem label="JDBC连接串">
            {getFieldDecorator("url", {
              rules: [
                {
                  required: true,
                  message: "请输入JDBC连接串",
                },
              ],
              initialValue:
                scene === "edit"
                  ? detail?.url
                  : "jdbc:mysql://[ip]:[port]/[databaseName]?useUnicode=true&characterEncoding=utf-8&zeroDateTimeBehavior=convertToNull&useSSL=false",
            })(<Input style={{ width: 600 }} />)}
          </FormItem>
          <FormItem label="用户名">
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "请输入用户名",
                },
              ],
              initialValue: scene === "edit" ? detail?.username : "",
            })(<Input style={{ width: 220 }} />)}
          </FormItem>
          <FormItem label="密码">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "请输入密码",
                },
              ],
              initialValue: scene === "edit" ? detail?.username : "",
            })(
              <Input
                type="password"
                onFocus={() => {
                  if (!passwordFlag) {
                    this.props.form.setFieldsValue({ password: "" });
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value === "")
                    this.setState(
                      {
                        passwordFlag: false,
                      },
                      () =>
                        this.props.form.setFieldsValue({
                          password: detail.password,
                        })
                    );
                }}
                onChange={(e) => {
                  this.setState({
                    passwordFlag: true,
                  });
                }}
                style={{ width: 220 }}
              />
            )}
          </FormItem>
          <FormItem label="客户端字符集">
            {getFieldDecorator("clientEncoding", {
              initialValue: scene === "edit" ? detail?.clientEncoding : "UTF-8",
            })(
              <Select style={{ width: 220 }}>
                <Option value="UTF-8">UTF-8</Option>
                <Option value="GBK">GBK</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="数据库字符集">
            {getFieldDecorator("serverEncoding", {
              initialValue:
                scene === "edit" ? detail?.serverEncoding : "AL32UTF8",
            })(
              <Select style={{ width: 220 }}>
                <Option value="AL32UTF8">AL32UTF8</Option>
                <Option value="ZHS16GBK">ZHS16GBK</Option>
              </Select>
            )}
          </FormItem>
        </div>
      </div>
    );
  }
  render() {
    const {
      module,
      sdk,
      form: { getFieldDecorator },
      scene,
      datasourceDetail,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div className="datasource-mysql-container">
        <Helmet>
          <title>{module}</title>
        </Helmet>
        <Spin spinning={this.state.loading}>
          <div
            className="content-container"
            style={{
              width: this.isCustom ? "100%" : "1170px",
            }}
          >
            <div className="navbar">
              <ArrowLeftOutlined onClick={sdk?.GOBACK} />
              {scene === "edit" ? "编辑数据源" : "新建数据源"}
            </div>
            <Form {...formItemLayout}>
              <div className="type-content">
                <span>数据类型</span>
                <img src={logo} alt="" />
              </div>
              <div className="basic-content">
                <div className="basic-title">基础信息</div>
                <div className="basic-detail">
                  <FormItem label="数据源名称">
                    {getFieldDecorator("name", {
                      rules: [
                        {
                          required: true,
                          message: "请输入数据源名称",
                        },
                        {
                          max: 24,
                          message: "数据源名称过长",
                        },
                      ],
                      initialValue:
                        scene === "edit" ? datasourceDetail.source_name : "",
                    })(
                      <Input
                        style={{ width: 220 }}
                        onBlur={this.onNameBlur}
                        onFocus={this.onNameFocus}
                      />
                    )}
                  </FormItem>
                </div>
              </div>
              {this.renderBasic()}
            </Form>
          </div>
          <div className="bottom ant-customized">
            <div style={{ width: this.isCustom ? "100%" : "1170px" }}>
              <Button key="test" onClick={this.onTest}>
                测试连接
              </Button>
              <Button
                type="primary"
                onClick={this.submit}
                loading={this.state.loading}
              >
                保存
              </Button>
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}
export default Form.create()(AddDataSource);

// class AddDataSource1 extends Component{
//   render(){
//     return <div onClick={this.props.goBack}>121212</div>
//   }
// }
// export default Form.create()(AddDataSource1);
