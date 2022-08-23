import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';
import { Layout, Input, Tabs, message } from 'antd';
import logo from "../assets/images/mysql.png";
import * as API from "../api";
import { ErrorCode } from '@/common/errorCode';
// import qs from 'querystringify';

const { TabPane } = Tabs;

const noSetting = [206, 207, 401];

class Header extends Component {
  static propTypes = {
    changeKey: PropTypes.func,
    save: PropTypes.func,
    onCancel: PropTypes.func,
    name: PropTypes.string,
    activekey: PropTypes.string,
    isNew: PropTypes.bool,
    changeName: PropTypes.func,
    assetType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    saveLoading: PropTypes.bool,
    saveName: PropTypes.func,
    asset_owner: PropTypes.string,
    showType: PropTypes.string,
  };

  state = {
    Permissions: [],
  };

  componentDidMount() {
    this.loadPermission();
  }

  loadPermission = async () => {
    let code = 'e98fc7ab4207004f';

    try {
      const { data } = await API.identifyPermission(code);
      // e: '可编辑',
      // s: '可分享',
      // t: '可共享',
      // b: '可购买',
      // r: '可查看数据'
      this.setState({
        Permissions: data,
      });
    } catch (err) {
      if (err.data.code) {
        message.error(ErrorCode[err.data.message]);
      } else {
        message.error(err.data.message);
      }

      history.push('/');
      console.log(err);
    }
  };

  render() {
    const {
      name,
      activekey,
      isNew,
      assetType,
      saveLoading,
      asset_owner,
      showType,
    } = this.props;
    const { Permissions } = this.state;
    return (
      <Layout>
        <div className="jdbc-asset-header">
          <div className="left">
            <img src={logo} />
            {isNew || asset_owner === 'self' || asset_owner === 'team' ? (
              <Input
                className="titleInputStyle"
                value={name}
                placeholder="请输入资产名称"
                maxLength={64}
                onChange={e => {
                  this.props.changeName(e.target.value);
                }}
                onBlur={() => !isNew && this.props.saveName()}
                onKeyDown={() => {
                  if (name?.length === 64) {
                    message.warning('名称最长64个字符', 0.5);
                  }
                }}
              />
            ) : (
              <span className="assetName" title={name}>
                {name}
              </span>
            )}
          </div>
          <div className="middle">
            {!isNew &&
              (showType && showType !== '' ? (
                showType === 'metadataEdit' ? (
                  <Tabs activeKey={activekey} onChange={this.props.changeKey}>
                    <TabPane tab="资产数据" key="1" />
                    {!noSetting.includes(assetType) && (
                      <TabPane tab="资产配置" key="2" />
                    )}
                    <TabPane tab="数据结构" key="3" />
                    <TabPane tab="标准映射" key="standardmap" />
                    {/* <TabPane tab="数据安全" key="dataSecurity" /> */}
                    <TabPane tab="质量检测" key="qualityInspection" />
                    {/* <TabPane tab="数据生成报告" key="dataAnalysisReport" /> */}
                    {Permissions.includes('t') && (
                      <TabPane tab="数据权限" key="7" />
                    )}
                    {[101, 102, 104].includes(assetType) && (
                      <TabPane tab="生命周期" key="lifeCycle" />
                    )}
                  </Tabs>
                ) : (
                  <Tabs activeKey={activekey} onChange={this.props.changeKey}>
                    <TabPane tab="关联关系" key="4" />
                    <TabPane tab="血缘关系" key="5" />
                    <TabPane tab="分析图表" key="6" />
                    {/* <TabPane tab="数据安全" key="dataSecurity" /> */}
                    <TabPane tab="质量检测" key="qualityInspection" />
                    {/* <TabPane tab="数据生成报告" key="dataAnalysisReport" /> */}
                  </Tabs>
                )
              ) : assetType === 601 ? (
                <Tabs activeKey={activekey} onChange={this.props.changeKey}>
                  <TabPane tab="资产数据" key="1" />
                  <TabPane tab="资产配置" key="2" />
                  <TabPane tab="数据结构" key="3" />
                  <TabPane tab="分析图表" key="6" />
                </Tabs>
              ) : (
                <Tabs activeKey={activekey} onChange={this.props.changeKey}>
                  <TabPane tab="资产数据" key="1" />
                  {!noSetting.includes(assetType) && (
                    <TabPane tab="资产配置" key="2" />
                  )}
                  <TabPane tab="数据结构" key="3" />
                  {assetType === 2001 && <TabPane tab="图谱关系" key="8" />}
                  {assetType && assetType !== 406 && (
                    <>
                      <TabPane tab="关联关系" key="4" />
                      <TabPane tab="血缘关系" key="5" />
                      <TabPane tab="分析图表" key="6" />
                      {/* <TabPane tab="数据安全" key="dataSecurity" /> */}
                      <TabPane tab="质量检测" key="qualityInspection" />
                      {/* <TabPane tab="数据生成报告" key="dataAnalysisReport" /> */}
                      {assetType !== 2001 && Permissions.includes('t') && (
                        <TabPane tab="数据权限" key="7" />
                      )}
                      {[101, 102, 104].includes(assetType) && (
                        <TabPane tab="生命周期" key="lifeCycle" />
                      )}
                    </>
                  )}
                </Tabs>
              ))}
          </div>
          <div className="right" style={{ width: 236, textAlign: 'right' }}>
            {isNew && (
              <span
                className={
                  saveLoading ? 'sdata-btn-primary nosave' : 'sdata-btn-primary'
                }
                onClick={() => !saveLoading && this.props.save()}
              >
                {saveLoading && Permissions.includes('e') && (
                  <LoadingOutlined style={{ marginRight: 10 }} />
                )}
                保存
              </span>
            )}
            <span className="sdata-btn" onClick={this.props.onCancel}>
              关闭
            </span>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Header;
