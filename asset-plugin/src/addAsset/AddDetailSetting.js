import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Layout, message } from 'antd';
import qs from 'querystringify';

import history from '@/common/history';
import * as API from '@/api';
import { guid } from '@/common/Transform.js';

import Header from '../components/header';
import AssetAllocation from '../components/asset-allocation';

import './AddDetailSetting.less';

const { Content } = Layout;

class AddDetailSetting extends Component {
  static propTypes = {
    match: PropTypes.object,
  };

  constructor(props) {
    super(props);
    // this.query = qs.parse(location.search);
    console.log(this.props)
  }

  state = {
    name: undefined,
    saveLoading: false,
  };

  componentDidMount() {}

  save = async () => {
    const { asset_cata, asset_type, catalog_id, dataSourceId } = this.props;
    const { name } = this.state;
    if (!name || name === '') {
      message.error('请输入资产名称');
      return false;
    }
    this.setState({ saveLoading: true });
    try {
      const params = await this.assetAllocation.getParams();
      if (parseInt(asset_type) === 501 || params.storage_detail) {
        const { data } = await API.addAsset({
          asset_id: guid(),
          asset_cata: parseInt(asset_cata),
          asset_name: name,
          asset_type: parseInt(asset_type),
          catalog_id,
          source_id: dataSourceId,
          ...params,
        });
        message.success('新增数据成功！');
        localStorage.setItem('assetNeedReload', true);
        if (
          this.props.showType &&
          this.props.showType !== '' &&
          this.props.showType !== 'undefined'
        ) {
          history.replace({
            pathname: `/asset/readable/edit/${data}`,
            search: qs.stringify({
              showType: 'metadataEdit',
            }),
          });
        } else {
          history.replace({
            pathname: `/asset/readable/edit/${data}`,
          });
        }
      } else {
        this.setState({ saveLoading: false });
      }
    } catch (err) {
      if (err?.data?.code === 10010010) {
        message.error('neo4j数据库需要安装apoc');
      } else if (err?.data?.code === 10010005) {
        message.error('该资产对应的数据源访问账号无数据库操作权限！');
      } else {
        message.error(err?.data?.message || err || '新增数据失败！');
      }

      this.setState({ saveLoading: false });
    }
  };

  changeKey = async key => {
    this.setState({ activekey: key });
  };

  changeName = value => {
    this.setState({ name: value });
  };

  onCancel = () => {
    window.close();
  };

  render() {
    const { name, activekey, saveLoading } = this.state;
    return (
      <Layout className="jdbc-asset">
        <Helmet>
          <title>{this.props.module}</title>
        </Helmet>
        <Content>
          <Header
            name={name}
            changeName={this.changeName}
            activekey={activekey}
            changeKey={this.changeKey}
            onCancel={this.onCancel}
            save={this.save}
            isNew={!this.id}
            assetType={parseInt(this.props.asset_type)}
            saveLoading={saveLoading}
          />
          <div className="jdbc-asset-content">
            {
              <AssetAllocation
                query={this.props}
                asset_type={parseInt(this.props.asset_type)}
                ref={e => (this.assetAllocation = e)}
              />
            }
          </div>
        </Content>
      </Layout>
    );
  }
}

export default AddDetailSetting;
